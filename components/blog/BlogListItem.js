import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'

export default function BlogListItem({ blogData, deleteBtn, editBtn }) {
	const [isVisible, setIsVisible] = useState(true)

	const router = useRouter()
	const handleEdit = e => {
		e.preventDefault()

		router.push(`/blog/${blogData._id}/edit`)
	}

	const handleDelete = e => {
		e.preventDefault()

		console.log(`/blog/${blogData._id}`)

		fetch(`/api/blog/${blogData._id}`, {
			method: 'DELETE',
		})
			.then(response => {
				if (response.status === 200) setIsVisible(false)
				else alert('Something went wrong, try again!')
			})
			.catch(err => [console.log(err)])
	}

	return (
		<div className={!isVisible ? 'blog-item hidden' : 'blog-item'}>
			<Link href={'/blog/' + blogData._id}>{blogData.title}</Link>
			{editBtn && (
				<button className='btn btn-edit' onClick={handleEdit}>
					Edit
				</button>
			)}
			{deleteBtn && (
				<button className='btn btn-delete' onClick={handleDelete}>
					Delete
				</button>
			)}
		</div>
	)
}
