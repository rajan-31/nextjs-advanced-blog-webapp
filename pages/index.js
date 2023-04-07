import BlogList from '@/components/blog/BlogList'
import { findAllBlogs } from '@/lib/blog'

const Home = ({ blogs }) => {
	return (
		<>
			<h1>Home</h1>
			<BlogList blogs={blogs} />
		</>
	)
}

export async function getServerSideProps({ req, res }) {
	let blogs = []

	try {
		blogs = await findAllBlogs()
	} catch (error) {
		console.log(error)
	}

	return {
		props: { blogs: JSON.parse(JSON.stringify(blogs)) },
		// props: { blogs: blogs },
	}
}

export default Home
