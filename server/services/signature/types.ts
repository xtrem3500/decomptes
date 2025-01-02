export interface SignatureAttempt {
  userId: string
  verificationId: string
  success: boolean
  timestamp: Date
}

export interface SignatureVerification {
  verificationId: string
  expiresIn: number
}