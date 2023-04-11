import { useState } from 'react'

import styles from '@/styles/components/comment/CommentForm.module.css'

export default function CommentForm({ blogId, allComments, setAllComments }) {
	const [comment, setComment] = useState('')

	const handleSubmitComment = e => {
		e.preventDefault()

		// validation
		// not required - handled by required attribute

		const formData = new FormData()
		formData.append('text', comment)

		fetch(`/api/blog/${blogId}/comment`, {
			method: 'POST',
			body: formData,
		})
			.then(response => {
				if (response.status === 200) return response.json()
				else throw new Error('Request status not 200')
			})
			.then(data => {
				setAllComments([...allComments, data.comment])
				setComment('')
			})
			.catch(err => console.log(err))
	}

	return (
		<div>
			<form className={styles.commentForm} onSubmit={handleSubmitComment}>
				<input
					type='text'
					placeholder='Type your comment...'
					onChange={e => setComment(e.target.value)}
					value={comment}
					required
				/>
				<div className={styles['btn-comment-wrapper']}>
					<button className={styles['btn-comment']} type='submit'>
						Submit
					</button>
				</div>
			</form>
		</div>
	)
}
