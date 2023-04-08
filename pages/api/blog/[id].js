import { getLoginSession } from '@/lib/auth'
import { deleteBlogById, findBlogByID, updateBlogById } from '@/lib/blog'
import multerConfig from '@/lib/multerConfig'
import DOMPurify from 'isomorphic-dompurify'

export default async function handler(req, res) {
	const { method } = req
	const { id } = req.query

	switch (method) {
		case 'DELETE':
			try {
				// get old blog, to check owner
				const oldBlog = await findBlogByID(id)
				if (!oldBlog) res.status(404).json({ message: `Blog with ID ${id} could not be found` })
				else
					try {
						const user = await getLoginSession(req)

						if (user && (oldBlog.owner?.toString() === user._id || user.role === 'admin')) {
							const blog = await deleteBlogById(id)
							res.status(200).json({ message: `Blog deleted successfully` })
						} else {
							res.status(401).json({ message: 'Unauthorized user' })
						}
					} catch (error) {
						console.error(error)
						res.status(500).json({ message: 'Internal server error' })
					}
			} catch (error) {
				console.error(error)
				res.status(500).json({ message: 'Internal server error' })
			}
			break

		case 'PUT':
			multerConfig.single('image')(req, res, async err => {
				if (err) {
					console.log(err)
					res.status(400).json({ message: 'Error uploading file' })
				} else
					try {
						// get old blog, to check owner

						const oldBlog = await findBlogByID(id)
						if (!oldBlog) res.status(404).json({ message: `Blog with ID ${id} could not be found` })
						else
							try {
								const user = await getLoginSession(req)

								if (user && (oldBlog.owner?.toString() === user._id || user.role === 'admin')) {
									const updatedBlog = req.body
									updatedBlog.content = DOMPurify.sanitize(updatedBlog.content)

									if (req.file)
										updatedBlog.image = {
											data: req.file.buffer,
											mimetype: req.file.mimetype,
										}

									const blog = await updateBlogById(id, updatedBlog)
									res.status(200).json({
										message: 'Blog updated successfully',
									})
								} else {
									res.status(401).json({ message: 'Unauthorized user' })
								}
							} catch (error) {
								console.log(error)
								res.status(500).json({ message: 'Internal server error' })
							}
					} catch (error) {
						console.log(error)
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
