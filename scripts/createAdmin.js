import { hashPassword } from '../server/utils/auth.js'
import { User } from '../server/models/User.js'
import { connectDB, disconnectDB } from '../server/utils/db.js'

async function createAdminUser() {
  try {
    await connectDB()
    
    const adminEmail = '2024dibo@gmail.com'
    const adminPassword = process.env.PASSWORD_ADMIN || 'superpassword'
    const hashedPassword = await hashPassword(adminPassword)

    const existingAdmin = await User.findOne({ email: adminEmail })
    if (existingAdmin) {
      console.log('Admin user already exists')
      return
    }

    const admin = await User.create({
      email: adminEmail,
      password: hashedPassword,
      role: 'ADMIN'
    })

    console.log('Admin user created successfully')
    console.log('Email:', adminEmail)
    console.log('Password:', adminPassword)
    console.log('Please change your password after first login')

  } catch (error) {
    console.error('Error creating admin user:', error)
  } finally {
    await disconnectDB()
  }
}

createAdminUser()