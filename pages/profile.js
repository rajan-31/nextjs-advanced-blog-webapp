import BlogList from '@/components/blog/BlogList'
import Link from 'next/link'
import { useUser } from '../lib/hooks'
import { getLoginSession } from '@/lib/auth'
import { findBlogsByOwner } from '@/lib/blog'

const Profile = ({ blogs }) => {
	const user = useUser({ redirectTo: '/login' })

	return (
		<>
			<Link href='/'>Home</Link>
			<h1>Profile</h1>
			{user && (
				<>
					<p>Your session:</p>
					<pre>{JSON.stringify(user, null, 2)}</pre>
				</>
			)}

			<BlogList blogs={blogs} deleteBtn={true} editBtn={true} />

			<style jsx>{`
				pre {
					white-space: pre-wrap;
					word-wrap: break-word;
				}
			`}</style>
		</>
	)
}

export async function getServerSideProps({ req, res }) {
	let blogs = []

	try {
		const user = await getLoginSession(req)

		if (user) {
			blogs = await findBlogsByOwner(user._id)
		}
	} catch (error) {
		console.log(error)
	}

	return {
		props: { blogs: JSON.parse(JSON.stringify(blogs)) },
		// props: { blogs: blogs },
	}
}

export default Profile
