import CommentForm from '@/components/comment/CommentForm'
import CommentsList from '@/components/comment/CommentsList'
import { getLoginSession } from '@/lib/auth'
import { findBlogByID } from '@/lib/blog'
import Image from 'next/image'
import { useState } from 'react'

export default function Blog({ blog, user }) {
	const [allComments, setAllComments] = useState(blog.comments ? blog.comments : [])

	const imageSrc = rawImage =>
		rawImage.data ? 'data:' + rawImage.mimetype + ';base64,' + rawImage.data.toString('base64') : ''

	return (
		<>
			{blog.image && <Image src={imageSrc(blog.image)} width={300} height={300} alt='Blog Image'></Image>}
			<h1>{blog.title}</h1>
			<div dangerouslySetInnerHTML={{ __html: blog.content }} />

			{allComments.length > 0 && (
				<div className='comments-section'>
					<h3>Comments</h3>
					{user?.role && (
						<CommentForm blogId={blog._id} allComments={allComments} setAllComments={setAllComments} />
					)}
					<CommentsList allComments={allComments} />
				</div>
			)}
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
