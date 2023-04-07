import Link from 'next/link'
import { useState } from 'react'
import 'react-quill/dist/quill.snow.css'
import dynamic from 'next/dynamic'

const NoSSRQuill = dynamic(() => import('react-quill'), { ssr: false, loading: () => <div>Loading ...</div> })

export default function NewBlog() {
	const [title, setTitle] = useState('Blog Title' + Math.floor(Math.random() * 10000))

	const [content, setContent] = useState(
		`<h2><strong>Blog for ABC</strong></h2><p>Lorem ipsum dolor sit <u>amet consectetur adipisicing elit</u>. Dolorum voluptates nam itaque rem blanditiis repellat nesciunt sint <strong>dolores</strong> sed, asperiores quidem amet ad veritatis deserunt consequatur, magni rerum in quibusdam! Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus dolorem porro aperiam quod dolores nisi, enim tempora! Tenetur, consequuntur sint mollitia exercitationem qui explicabo? Minima repudiandae est sint quibusdam iure</p><p><br></p><ul><li>item 1</li><li>item 2</li></ul><p><em>Click </em><a href="https://www.google.com" rel="noopener noreferrer" target="_blank"><em>here</em></a><em> for more info</em></p>`
	)

	const [image, setImage] = useState(null)

	const [blogURL, setBlogURL] = useState('')

	const handleSubmit = e => {
		e.preventDefault()

		const formData = new FormData()

		formData.append('title', title)
		formData.append('content', content)
		if (image) formData.append('image', image)

		fetch('/api/blog', {
			method: 'POST',
			body: formData,
		})
			.then(response => response.json())
			.then(data => {
				setTitle('Blog Title' + Math.floor(Math.random() * 10000))
				console.log(data)
				if (data) {
					setBlogURL(`/blog/${data._id}`)
				}
			})
			.catch(err => {
				console.log(err)
			})
	}

	const quillModules = {
		toolbar: [
			[{ header: [1, 2, 3, 4, 5, 6, false] }],
			['bold', 'italic', 'underline', 'strike'], // toggled buttons
			['blockquote', 'code-block'],

			// [{ header: 1 }, { header: 2 }], // custom button values
			[{ list: 'ordered' }, { list: 'bullet' }],
			[{ script: 'sub' }, { script: 'super' }], // superscript/subscript
			[{ indent: '-1' }, { indent: '+1' }], // outdent/indent
			[{ direction: 'rtl' }], // text direction

			// [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown

			[{ color: [] }, { background: [] }], // dropdown with defaults from theme
			[{ font: [] }],
			[{ align: [] }],

			['clean'], // remove formatting button
		],
	}

	return (
		<>
			<form onSubmit={handleSubmit}>
				<input
					type='text'
					placeholder='Title'
					required
					defaultValue={title}
					onChange={e => setTitle(e.target.value)}
				/>

				<NoSSRQuill
					value={content}
					onChange={setContent}
					theme='snow'
					placeholder='Compose your blog...'
					modules={quillModules}
				/>

				<input
					type='file'
					placeholder='Image'
					accept='.jpg, .jpeg, .png'
					onChange={e => setImage(e.target.files[0])}
				></input>
				<button type='submit'>Submit</button>
			</form>

			{blogURL && (
				<div className='blog-link'>
					To view newly created blog click <Link href={blogURL}>here</Link> or copy following link{' '}
					<span>{window.location.host + blogURL}</span>
				</div>
			)}
		</>
	)
}
