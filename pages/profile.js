import BlogList from '@/components/blog/BlogList'
import { useUser } from '../lib/hooks'
import { getLoginSession } from '@/lib/auth'
import { findBlogsByOwner } from '@/lib/blog'
import { convertHtmlContentToText } from '@/lib/utility'
import { useState } from 'react'
import styles from '@/styles/pages/profile.module.css'
import Head from 'next/head'

const Profile = ({ blogs }) => {
	const user = useUser({ redirectTo: '/login' })

	const [allBlogs, setAllBlogs] = useState(blogs)

	const triggerBlogDeletion = _id => {
		setAllBlogs(allBlogs.filter(item => item._id !== _id))
	}

	return (
		<>
			<Head>
				<title>Profile</title>
			</Head>
			<div className={styles.profilePage}>
				{user && (
					<>
						<h1>Profile</h1>
						<div className={styles.profileDetails}>
							<div>Username: {user.username}</div>
							<div>Full Name: {user.fullName}</div>
							<div>Created At: {new Date(user.createdAt).toLocaleString()}</div>
						</div>
					</>
				)}

				<div className={styles.userBlogs}>
					{allBlogs && <h1>Your Blogs</h1>}
					<BlogList
						blogs={allBlogs}
						triggerBlogDeletion={triggerBlogDeletion}
						show={true}
						deleteBtn={true}
						editBtn={true}
					/>
				</div>
			</div>
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

		blogs = convertHtmlContentToText(blogs)
	} catch (error) {
		console.log(error)
	}

	return {
		props: { blogs: JSON.parse(JSON.stringify(blogs)) },
		// props: { blogs: blogs },
	}
}

export default Profile
