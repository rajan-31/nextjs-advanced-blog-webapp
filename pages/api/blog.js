import { getLoginSession } from '@/lib/auth'
import { createBlog, findBlogsWithPaging } from '@/lib/blog'
import multerConfig from '@/lib/multerConfig'
import DOMPurify from 'isomorphic-dompurify'

export default async function handler(req, res) {
	const { method } = req

	switch (method) {
		case 'GET':
			let { page, limit } = req.query
			page = Number(page)
			limit = Number(limit)
			try {
				const blogs = await findBlogsWithPaging(page, limit)
				return res.status(200).json(blogs || [])
			} catch (error) {
				return res.status(500).json({ message: 'Internal server error' })
			}
			break
		case 'POST':
			try {
				await new Promise((resolve, reject) => {
					multerConfig.single('image')(req, res, async err => {
						if (err) {
							console.log(err)
							return res.status(400).json({ message: 'Error uploading file' })
						}
						resolve()
					})
				})

				const user = await getLoginSession(req)
				if (!user) {
					return res.status(401).json({ message: 'Unauthorized user' })
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
				return res.status(200).json(blog)
			} catch (error) {
				if (error.name === 'MongoServerError' && error.code === 11000) {
					return res.status(400).json({ message: 'Duplicate blog title' })
				} else return res.status(500).json({ message: 'Internal server error' })
			}
			break
		default:
			return res.status(405).json({ message: 'Method not allowed' })
			break
	}
}

export const config = {
	api: {
		bodyParser: false,
	},
}
