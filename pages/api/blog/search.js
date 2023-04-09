import { searchBlogs } from '@/lib/blog'
import Blog from '@/pages/blog/[id]'

export default async function search(req, res) {
	const { q } = req.query

	try {
		console.log(q)
		const matchingBlogsByScore = await searchBlogs(q)

		res.status(200).json(matchingBlogsByScore)
	} catch (error) {
		console.error(error)
		res.status(500).json({ message: 'Internal server error' })
	}
}
