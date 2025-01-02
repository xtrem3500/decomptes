import { z } from 'zod'

export const supportedCurrencies = ['EUR', 'USD', 'GBP', 'CHF'] as const

export const currencySchema = z.enum(supportedCurrencies)

export type Currency = z.infer<typeof currencySchema>

interface ExchangeRate {
  from: Currency
  to: Currency
  rate: number
}

// Note: Dans un environnement de production, utilisez une API de taux de change
const mockRates: ExchangeRate[] = [
  { from: 'EUR', to: 'USD', rate: 1.09 },
  { from: 'EUR', to: 'GBP', rate: 0.86 },
  { from: 'EUR', to: 'CHF', rate: 0.96 }
]

export function convertAmount(amount: number, from: Currency, to: Currency): number {
  if (from === to) return amount
  
  const rate = mockRates.find(r => r.from === from && r.to === to)
  if (!rate) throw new Error(`Taux de change non disponible pour ${from} vers ${to}`)
  
  return amount * rate.rate
}