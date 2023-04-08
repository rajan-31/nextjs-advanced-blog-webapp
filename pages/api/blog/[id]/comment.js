import { getLoginSession } from '@/lib/auth'
import { addCommentById } from '@/lib/blog'
import multerConfig from '@/lib/multerConfig'

export default async function handler(req, res) {
	const { method } = req
	const { id } = req.query

	switch (method) {
		case 'POST':
			multerConfig.none()(req, res, async err => {
				if (err) {
					console.log(err)
					return res.status(400).json({ message: 'Error parsing form-data' })
				}

				if (!req.body.text) return res.status(400).json({ message: 'Empty comments not allowed' })

				try {
					const user = await getLoginSession(req)
					if (!user) {
						return res.status(401).json({ message: 'Unauthorized user' })
					}

					const comment = { commentorId: user._id, commentorName: user.fullName, text: req.body.text }

					const blog = await addCommentById(id, comment)
					if (blog) return res.status(200).json({ message: 'Comment added successfully', comment: comment })
					else return res.status(400).json({ message: 'Invalid request' })
				} catch (error) {
					return res.status(500).json({ message: 'Internal server error' })
				}
			})
			break
		default:
			res.status(405).json({ message: 'Method not allowed' })
			break
	}
}

export const config = {
	api: {
		bodyParser: false,
	},
}
