import Link from 'next/link'
import { useState } from 'react'
import dynamic from 'next/dynamic'

import styles from '@/styles/pages/blog/new.module.css'
import Head from 'next/head'

const NoSSRTextEditor = dynamic(() => import('@/components/blog/NoSSRTextEditor'), {
	ssr: false,
	loading: () => <div>Loading ...</div>,
})

export default function NewBlog() {
	const [title, setTitle] = useState('')

	const [content, setContent] = useState('')

	const [image, setImage] = useState(null)

	const [blogURL, setBlogURL] = useState('')

	const handleSubmit = e => {
		e.preventDefault()

		setBlogURL('')

		// validation
		if (title.length < 3) return alert('Please use longer title.')
		else if (content.length < 10) return alert('Please add some more content.')

		const formData = new FormData()

		formData.append('title', title)
		formData.append('content', content)
		if (image) formData.append('image', image)

		fetch('/api/blog', {
			method: 'POST',
			body: formData,
		})
			.then(response => {
				if (response.status === 200) return response.json()
				else if (response.status === 400) {
					alert('Duplicate blog title')
				}
			})
			.then(data => {
				if (data) {
					setBlogURL(`/blog/${data._id}`)
					setTitle('')
					setContent('')
					setImage('')
					e.target.reset()
				}
			})
			.catch(err => {
				console.log(err)
			})
	}

	return (
		<>
			<Head>
				<title>New Blog</title>
			</Head>
			<form onSubmit={handleSubmit} className={styles.form}>
				<input
					type='text'
					placeholder='Title'
					required
					value={title}
					onChange={e => setTitle(e.target.value)}
				/>

				<NoSSRTextEditor value={content} onChange={setContent} />

				<input
					type='file'
					placeholder='Image'
					accept='.jpg, .jpeg, .png'
					onChange={e => setImage(e.target.files[0])}
				></input>
				<div>
					<button type='submit'>Submit</button>
				</div>
			</form>

			{blogURL && (
				<div className={styles['blog-link']}>
					To view newly created blog click <Link href={blogURL}>here</Link> or copy following link{' '}
					<span>{window.location.host + blogURL}</span>
				</div>
			)}
		</>
	)
}
