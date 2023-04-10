import CommentForm from '@/components/comment/CommentForm'
import CommentsList from '@/components/comment/CommentsList'
import { getLoginSession } from '@/lib/auth'
import { findBlogByID } from '@/lib/blog'
import Image from 'next/image'
import { useState } from 'react'

import styles from '@/styles/pages/blog/[id].module.css'
import Head from 'next/head'

export default function Blog({ blog, user }) {
	const [allComments, setAllComments] = useState(blog.comments ? blog.comments : [])

	const imageSrc = rawImage =>
		rawImage.data ? 'data:' + rawImage.mimetype + ';base64,' + rawImage.data.toString('base64') : ''

	return (
		<>
			<Head>
				<title>{blog.title}</title>
			</Head>
			<div className={styles.blogDetails}>
				<h1>{blog.title}</h1>
				{blog.image && <Image src={imageSrc(blog.image)} width={300} height={300} alt='Blog Image'></Image>}
				<div dangerouslySetInnerHTML={{ __html: blog.content }} className={styles.content} />

				<div className={styles['comments-section']}>
					<h3>Comments ({allComments.length})</h3>
					{user?.role && (
						<CommentForm blogId={blog._id} allComments={allComments} setAllComments={setAllComments} />
					)}
					<CommentsList allComments={allComments} />
				</div>
			</div>
		</>
	)
}

export async function getServerSideProps({ req, res, params }) {
	let blog = {}
	let user = {}
	try {
		user = await getLoginSession(req)
		blog = await findBlogByID(params.id)
	} catch (error) {
		console.log(error)
	}

	return {
		props: { blog: JSON.parse(JSON.stringify(blog)), user: user ? user : {} },
	}
}
