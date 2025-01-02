import { z } from 'zod'

// Validation du numéro de téléphone
export const phoneNumberSchema = z.string()
  .regex(/^\+[1-9]\d{1,14}$/, 'Le numéro doit être au format international (+XXX...)')

// Types pour le service SMS
export interface SMSMessage {
  to: string
  template: string
  variables: Record<string, string>
}

export interface SMSResponse {
  success: boolean
  messageId?: string
  error?: string
}

// Service SMS
export class SMSService {
  private templates: Record<string, string> = {
    SIGNATURE_CODE: 'Votre code de signature pour le décompte {decompteId} est: {code}',
    DECOMPTE_APPROVED: 'Votre décompte {decompteId} a été approuvé',
    DECOMPTE_REJECTED: 'Votre décompte {decompteId} a été rejeté: {reason}'
  }

  async sendSMS(message: SMSMessage): Promise<SMSResponse> {
    try {
      // Validation du numéro
      phoneNumberSchema.parse(message.to)
      
      // Récupération et compilation du template
      const template = this.templates[message.template]
      if (!template) {
        throw new Error('Template non trouvé')
      }

      const compiledMessage = this.compileTemplate(template, message.variables)

      // TODO: Intégrer un vrai service SMS (Twilio, Nexmo, etc.)
      console.log('SMS envoyé:', { to: message.to, message: compiledMessage })

      return {
        success: true,
        messageId: Date.now().toString()
      }
    } catch (error: any) {
      return {
        success: false,
        error: error.message
      }
    }
  }

  private compileTemplate(template: string, variables: Record<string, string>): string {
    return template.replace(/{(\w+)}/g, (match, key) => variables[key] || match)
  }
}

// Instance singleton
export const smsService = new SMSService()