import PDFDocument from 'pdfkit'
import { join } from 'path'
import { writeFile } from 'fs/promises'
import { PDFOptions, PDFTemplate } from './types'
import { compressFile } from '../utils/compression'

export class PDFService {
  private readonly TEMPLATES_DIR = join(process.cwd(), 'templates', 'pdf')
  private readonly OUTPUT_DIR = join(process.cwd(), 'public', 'uploads', 'decomptes')

  async generatePDF(data: any, options: PDFOptions): Promise<string> {
    const doc = new PDFDocument({
      size: options.pageSize || 'A4',
      margin: options.margin || 50,
      info: {
        Title: options.title,
        Author: options.author,
        Subject: options.subject
      }
    })

    // Appliquer le template
    const template = await this.loadTemplate(options.template)
    await template.apply(doc, data)

    // Générer le fichier
    const filename = `${data.numero}-${Date.now()}.pdf`
    const filepath = join(this.OUTPUT_DIR, filename)
    
    await this.writePDF(doc, filepath)

    // Compression si demandée
    if (options.compress) {
      await compressFile(filepath)
    }

    return `/uploads/decomptes/${filename}`
  }

  private async loadTemplate(name: string): Promise<PDFTemplate> {
    const templatePath = join(this.TEMPLATES_DIR, `${name}.js`)
    return import(templatePath)
  }

  private async writePDF(doc: PDFKit.PDFDocument, filepath: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const stream = doc.pipe(writeFile(filepath))
      doc.end()
      stream.on('finish', resolve)
      stream.on('error', reject)
    })
  }
}

export const pdfService = new PDFService()