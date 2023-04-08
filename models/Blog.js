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
			commentorId: mongoose.ObjectId,
			commentorName: String,
			text: String,
			_id: false,
		},
	],
})

export default mongoose.models.Blog || mongoose.model('Blog', blogSchema)
