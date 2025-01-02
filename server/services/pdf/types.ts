import PDFDocument from 'pdfkit'

export interface PDFOptions {
  template: string
  title?: string
  author?: string
  subject?: string
  pageSize?: string
  margin?: number
  compress?: boolean
  language?: string
}

export interface PDFTemplate {
  apply(doc: PDFKit.PDFDocument, data: any): Promise<void>
}

export interface PDFHeader {
  logo?: string
  title: string
  subtitle?: string
}