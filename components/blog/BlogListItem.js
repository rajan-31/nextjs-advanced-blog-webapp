import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'

import styles from '@/styles/components/blog/BlogListItem.module.css'

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
			<div className={styles['blog-item']}>
				<Link href={'/blog/' + blogData._id}>{blogData.title}</Link>
				{editBtn && (
					<button className={`${styles['btn']} ${styles['btn-edit']}`} onClick={handleEdit}>
						Edit
					</button>
				)}
				{deleteBtn && (
					<button className={`${styles['btn']} ${styles['btn-delete']}`} onClick={handleDelete}>
						Delete
					</button>
				)}
			</div>
			<div className={styles['blog-content']}>
				<p>{blogData.content}</p>
			</div>
		</>
	)
}
