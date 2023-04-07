import mongoose from 'mongoose'

const blogSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
		unique: true,
	},
	content: {
		type: String,
		required: true,
	},
	image: {
		type: {
			data: Buffer,
			mimetype: String,
		},
	},
	owner: {
		type: mongoose.ObjectId,
		required: true,
	},
	comments: [
		{
			commentor: mongoose.ObjectId,
			text: String,
		},
	],
})

export default mongoose.models.Blog || mongoose.model('Blog', blogSchema)
