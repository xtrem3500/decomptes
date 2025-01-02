import { PDFTemplate, PDFHeader } from '../types'
import { formatCurrency } from '../../utils/currency'

export class DefaultTemplate implements PDFTemplate {
  async apply(doc: PDFKit.PDFDocument, data: any): Promise<void> {
    // En-tête
    const header: PDFHeader = {
      title: 'Décompte de frais',
      subtitle: `N° ${data.numero}`
    }
    this.addHeader(doc, header)

    // Informations générales
    this.addGeneralInfo(doc, data)

    // Détails des lignes
    if (data.lignes?.length) {
      this.addLines(doc, data.lignes)
    }

    // Signatures
    if (data.signatures?.length) {
      this.addSignatures(doc, data.signatures)
    }
  }

  private addHeader(doc: PDFKit.PDFDocument, header: PDFHeader): void {
    doc.fontSize(20)
      .text(header.title, { align: 'center' })
    
    if (header.subtitle) {
      doc.fontSize(14)
        .text(header.subtitle, { align: 'center' })
    }
    
    doc.moveDown(2)
  }

  private addGeneralInfo(doc: PDFKit.PDFDocument, data: any): void {
    doc.fontSize(12)
      .text(`Date: ${new Date(data.date).toLocaleDateString()}`)
      .text(`Montant total: ${formatCurrency(data.montant)}`)
      .text(`Statut: ${data.status}`)
      .moveDown()
  }

  private addLines(doc: PDFKit.PDFDocument, lines: any[]): void {
    doc.fontSize(14)
      .text('Détail des lignes:', { underline: true })
      .moveDown()

    lines.forEach(line => {
      doc.fontSize(12)
        .text(`${line.description}: ${formatCurrency(line.montant)}`)
    })
    
    doc.moveDown()
  }

  private addSignatures(doc: PDFKit.PDFDocument, signatures: any[]): void {
    doc.fontSize(14)
      .text('Signatures:', { underline: true })
      .moveDown()

    signatures.forEach(sig => {
      doc.fontSize(12)
        .text(`${sig.role} - ${new Date(sig.date).toLocaleDateString()}`)
        .text(`Type: ${sig.type}`)
        .text(`Signature: ${sig.signature}`)
      
      if (sig.comment) {
        doc.text(`Commentaire: ${sig.comment}`)
      }
      
      doc.moveDown()
    })
  }
}