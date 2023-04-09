import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'

export default function BlogListItem({ blogData, triggerBlogDeletion, deleteBtn, editBtn }) {
	const router = useRouter()
	const handleEdit = e => {
		e.preventDefault()

		router.push(`/blog/${blogData._id}/edit`)
	}

	const handleDelete = e => {
		e.preventDefault()

		fetch(`/api/blog/${blogData._id}`, {
			method: 'DELETE',
		})
			.then(response => {
				if (response.status === 200) triggerBlogDeletion(blogData._id)
				else alert('Something went wrong, try again!')
			})
			.catch(err => [console.log(err)])
	}

	return (
		<>
			<div className='blog-item'>
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
			<div className='blog-content'>{blogData.content}</div>
		</>
	)
}
