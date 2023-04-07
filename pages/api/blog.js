import { getLoginSession } from '@/lib/auth'
import { createBlog } from '@/lib/blog'
import multerConfig from '@/lib/multerConfig'
import DOMPurify from 'isomorphic-dompurify'

export default async function handler(req, res) {
	const { method } = req

	switch (method) {
		case 'POST':
			multerConfig.single('image')(req, res, async err => {
				if (err) {
					console.log(err)
					res.status(400).json({ message: 'Error uploading file' })
				}

				try {
					const user = await getLoginSession(req)
					if (!user) {
						res.status(401).json({ message: 'Unauthorized user' })
					}

					const newBlog = req.body
					newBlog.content = DOMPurify.sanitize(newBlog.content)
					newBlog.owner = user._id
					if (req.file)
						newBlog.image = {
							data: req.file.buffer,
							mimetype: req.file.mimetype,
						}

					const blog = await createBlog(newBlog)
					res.status(200).json(blog)
				} catch (error) {
					res.status(500).json({ message: 'Internal server error' })
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
