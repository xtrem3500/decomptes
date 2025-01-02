import { H3Error } from 'h3'

export default defineEventHandler((event) => {
  event.node.res.on('error', (error) => {
    console.error('Response error:', error)
  })

  return new Promise((resolve) => {
    event.node.req.on('error', (error) => {
      console.error('Request error:', error)
      resolve(createError({
        statusCode: 500,
        message: 'Internal Server Error'
      }))
    })

    resolve(undefined)
  })
})