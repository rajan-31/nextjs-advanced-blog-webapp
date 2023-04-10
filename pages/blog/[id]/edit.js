import Link from 'next/link'
import { useState } from 'react'
import dynamic from 'next/dynamic'
import { findBlogByID } from '@/lib/blog'
import Image from 'next/image'

import styles from '@/styles/pages/blog/new.module.css'
import { blogImg } from '@/styles/pages/blog/[id].module.css'
import Head from 'next/head'

const NoSSRTextEditor = dynamic(() => import('@/components/blog/NoSSRTextEditor'), {
	ssr: false,
	loading: () => <div>Loading ...</div>,
})

export default function EditBlog({ blog }) {
	const [title, setTitle] = useState(blog.title)
	const [content, setContent] = useState(blog.content)
	const [image, setImage] = useState(null)

	const [blogURL, setBlogURL] = useState('')

	const imageSrc = rawImage =>
		rawImage.data ? 'data:' + rawImage.mimetype + ';base64,' + rawImage.data.toString('base64') : ''

	const handleSubmit = e => {
		e.preventDefault()

		const formData = new FormData()

		formData.append('title', title)
		formData.append('content', content)
		if (image) formData.append('image', image)

		console.log(Object.fromEntries(formData))

		fetch(`/api/blog/${blog._id}`, {
			method: 'PUT',
			body: formData,
		})
			.then(response => {
				if (response.status === 200) {
					setBlogURL(`/blog/${blog._id}`)
				} else {
					alert('Something went wrong, try again!')
				}
			})
			.catch(err => {
				console.log(err)
			})
	}

	return (
		<>
			<Head>
				<title>Edit Blog</title>
			</Head>
			{blog.image && (
				<Image src={imageSrc(blog.image)} width={300} height={300} alt='Blog Image' className={blogImg}></Image>
			)}
			<form onSubmit={handleSubmit} className={styles.form}>
				<input
					type='text'
					placeholder='Title'
					required
					defaultValue={title}
					onChange={e => setTitle(e.target.value)}
				/>

				<NoSSRTextEditor value={content} onChange={setContent} />

				<br />

				<small>!Only choose new image if you want to replace old file.</small>

				<input
					type='file'
					placeholder='Image'
					accept='.jpg, .jpeg, .png'
					onChange={e => setImage(e.target.files[0])}
				></input>
				<button type='submit'>Submit</button>
			</form>

			{blogURL && (
				<div className={styles['blog-link']}>
					To view updated blog click <Link href={blogURL}>here</Link> or copy following link{' '}
					<span>{window.location.host + blogURL}</span>
				</div>
			)}
		</>
	)
}

export async function getServerSideProps({ req, res, params }) {
	let blog = {}

	try {
		blog = await findBlogByID(params.id)
	} catch (error) {
		console.log(error)
	}
	return {
		props: { blog: JSON.parse(JSON.stringify(blog)) },
	}
}
