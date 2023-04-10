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
	const [title, setTitle] = useState('Blog Title' + Math.floor(Math.random() * 10000))

	const [content, setContent] = useState(
		`<h2><strong>Blog for ABC</strong></h2><p>Lorem ipsum dolor sit <u>amet consectetur adipisicing elit</u>. Dolorum voluptates nam itaque rem blanditiis repellat nesciunt sint <strong>dolores</strong> sed, asperiores quidem amet ad veritatis deserunt consequatur, magni rerum in quibusdam! Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus dolorem porro aperiam quod dolores nisi, enim tempora! Tenetur, consequuntur sint mollitia exercitationem qui explicabo? Minima repudiandae est sint quibusdam iure</p><p><br></p><ul><li>item 1</li><li>item 2</li></ul><p><em>Click </em><a href="https://www.google.com" rel="noopener noreferrer" target="_blank"><em>here</em></a><em> for more info</em></p>`
	)

	const [image, setImage] = useState(null)

	const [blogURL, setBlogURL] = useState('')

	const handleSubmit = e => {
		e.preventDefault()

		// remove this line
		setTitle('Blog Title' + Math.floor(Math.random() * 10000))

		setBlogURL('')
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
					defaultValue={title}
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
