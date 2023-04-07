import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: [true, 'Username required'],
		unique: [true, 'Duplicate username'],
	},
	fullName: {
		type: String,
		required: [true, 'Full name required'],
	},
	hash: {
		type: String,
		required: true,
	},
	salt: {
		type: String,
		required: true,
	},
	role: {
		type: String,
		required: true,
	},
	createdAt: Date,
})

export default mongoose.models.User || mongoose.model('User', userSchema)
