import { generateSecret } from './generateSecret.js'
import { createAdmin } from './createAdmin.js'

async function setup() {
  console.log('🚀 Starting project setup...')
  
  try {
    await generateSecret()
    await createAdmin()
    console.log('✅ Setup completed successfully!')
  } catch (error) {
    console.error('❌ Setup failed:', error)
    process.exit(1)
  }
}

setup()