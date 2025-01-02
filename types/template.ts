export interface DecompteTemplate {
  _id: string
  name: string
  description: string
  defaultMontant: number
  currency: string
  categories?: Array<{
    name: string
    defaultAmount: number
  }>
}