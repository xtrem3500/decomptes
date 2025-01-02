import { defineEventHandler, createError } from 'h3'
import { Decompte } from '~/server/models/Decompte'

export default defineEventHandler(async (event) => {
  const auth = event.context.auth
  if (!auth) {
    throw createError({
      statusCode: 401,
      message: 'Non autorisé'
    })
  }

  const [totalCount, totalAmount, statusCount, monthlyStats] = await Promise.all([
    Decompte.countDocuments({ userId: auth.userId }),
    Decompte.aggregate([
      { $match: { userId: auth.userId } },
      { $group: { _id: null, total: { $sum: '$montant' } } }
    ]),
    Decompte.aggregate([
      { $match: { userId: auth.userId } },
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]),
    Decompte.aggregate([
      { $match: { userId: auth.userId } },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' }
          },
          count: { $sum: 1 },
          total: { $sum: '$montant' }
        }
      },
      { $sort: { '_id.year': -1, '_id.month': -1 } },
      { $limit: 12 }
    ])
  ])

  return {
    totalDecomptes: totalCount,
    totalAmount: totalAmount[0]?.total || 0,
    byStatus: statusCount,
    monthlyStats
  }
})