import crypto from 'crypto'

import User from '../models/User'
import dbConnect from '../lib/dbConnect'
import { findUser } from './user'

export async function createAdmin() {
	await dbConnect()

	const username = 'admin',
		password = '123456',
		fullName = 'Admin'

	const salt = crypto.randomBytes(16).toString('hex')
	const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex')

	const role = 'admin'

	const user = {
		createdAt: Date.now(),
		username,
		fullName,
		role,
		hash,
		salt,
	}

	try {
		const oldAdmin = await findUser({ username: 'admin' })
		if (oldAdmin) return { message: 'Admin already exists' }
	} catch (error) {
		throw error
		return null
	}

	try {
		const newUser = await User.create([user], { lean: true })
		return { username, createdAt: user.createdAt }
	} catch (error) {
		throw error
	}
}
