import BlogList from '@/components/blog/BlogList'
import { findAllBlogs } from '@/lib/blog'
import { getLoginSession } from '@/lib/auth'

const Home = ({ blogs, user }) => {
	return (
		<>
			<h1>Home</h1>
			<BlogList blogs={blogs} deleteBtn={user.role === 'admin'} editBtn={user.role === 'admin'} />
		</>
	)
}

export async function getServerSideProps({ req, res }) {
	let blogs = []
	let user = {}

	try {
		user = await getLoginSession(req)
		blogs = await findAllBlogs()
	} catch (error) {
		console.log(error)
	}

	if (!user) user = {}

	return {
		props: { blogs: JSON.parse(JSON.stringify(blogs)), user: user },
	}
}

export default Home
