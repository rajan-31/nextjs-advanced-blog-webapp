import crypto from 'crypto'
// import { v4 as uuidv4 } from 'uuid'

import User from '../models/User'
import dbConnect from '../lib/dbConnect'

export async function createUser({ username, password, fullName }) {
	await dbConnect()
	const salt = crypto.randomBytes(16).toString('hex')
	const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex')

	const role = 'author'

	const user = {
		createdAt: Date.now(),
		username,
		fullName,
		role,
		hash,
		salt,
	}
	try {
		const newUser = await User.create([user], { lean: true })
		return { username, createdAt: user.createdAt }
	} catch (error) {
		throw error
	}
}

export async function findUser({ _id, username }) {
	await dbConnect()

	try {
		const user = await User.findOne(_id ? { _id } : { username }, null, { lean: true })
		return user
	} catch (error) {
		throw error
	}
}

// Compare the password of an already fetched user (using `findUser`) and compare the
// password for a potential match
export function validatePassword(user, inputPassword) {
	const inputHash = crypto.pbkdf2Sync(inputPassword, user.salt, 1000, 64, 'sha512').toString('hex')
	const passwordsMatch = user.hash === inputHash
	return passwordsMatch
}
