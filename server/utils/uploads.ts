import { mkdir } from 'fs/promises'
import { join } from 'path'

const UPLOAD_DIR = join(process.cwd(), 'public/uploads/decomptes')

export async function ensureUploadDir() {
  try {
    await mkdir(UPLOAD_DIR, { recursive: true })
    console.log('✅ Upload directory created')
  } catch (error) {
    console.error('❌ Error creating upload directory:', error)
    throw error
  }
}

export function getUploadPath(filename: string): string {
  return join(UPLOAD_DIR, filename)
}