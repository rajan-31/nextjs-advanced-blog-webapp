import mongoose from 'mongoose'

const blogSchema = new mongoose.Schema(
	{
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
			type: mongoose.Schema.Types.ObjectId,
			required: true,
		},
		comments: [
			{
				commentorId: mongoose.Schema.Types.ObjectId,
				commentorName: String,
				text: String,
				_id: false,
			},
		],
	},
	{
		timestamps: true,
	}
)

// blogSchema.index({ title: 'text', content: 'text' })
blogSchema.index({ title: 1, content: 1 })

export default mongoose.models?.Blog || mongoose.model('Blog', blogSchema)
