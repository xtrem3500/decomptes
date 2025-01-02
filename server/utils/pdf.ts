import PDFDocument from 'pdfkit'
import { writeFile } from 'fs/promises'
import { join } from 'path'
import type { Decompte } from '../models/decompte'

const UPLOAD_DIR = 'public/uploads/decomptes'

export async function generatePDF(decompte: any): Promise<string> {
  const doc = new PDFDocument()
  const filename = `decompte-${decompte.numero}-${decompte.status}.pdf`
  const filepath = join(UPLOAD_DIR, filename)
  
  // Création du stream d'écriture
  const stream = doc.pipe(await writeFile(filepath))

  // En-tête
  doc.fontSize(20).text('Décompte de frais', { align: 'center' })
  doc.moveDown()
  
  // Informations générales
  doc.fontSize(12)
    .text(`Numéro: ${decompte.numero}`)
    .text(`Date: ${new Date(decompte.date).toLocaleDateString()}`)
    .text(`Montant total: ${decompte.montant.toFixed(2)} €`)
    .text(`Statut: ${decompte.status}`)
    .moveDown()

  // Description
  doc.fontSize(14).text('Description:', { underline: true })
  doc.fontSize(12).text(decompte.description)
  doc.moveDown()

  // Lignes de décompte
  if (decompte.lignes?.length) {
    doc.fontSize(14).text('Détail des lignes:', { underline: true })
    decompte.lignes.forEach((ligne: any) => {
      doc.fontSize(12)
        .text(`${ligne.description}: ${ligne.montant.toFixed(2)} €`)
    })
    doc.moveDown()
  }

  // Signatures
  if (decompte.signatures?.length) {
    doc.fontSize(14).text('Signatures:', { underline: true })
    decompte.signatures.forEach((signature: any) => {
      doc.fontSize(12)
        .text(`${signature.role} - ${new Date(signature.date).toLocaleDateString()}`)
        .text(`Type: ${signature.type}`)
        .text(`Signature: ${signature.signature}`)
      if (signature.comment) {
        doc.text(`Commentaire: ${signature.comment}`)
      }
      doc.moveDown()
    })
  }

  // Finalisation du document
  doc.end()
  await new Promise(resolve => stream.on('finish', resolve))

  return `/uploads/decomptes/${filename}`
}