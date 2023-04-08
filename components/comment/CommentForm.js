import { useState } from 'react'

export default function CommentForm({ blogId, allComments, setAllComments }) {
	const [comment, setComment] = useState('Test comment ' + Math.floor(Math.random() * 1000))

	const handleSubmitComment = e => {
		e.preventDefault()

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
			})
			.catch(err => console.log(err))
	}

	return (
		<div>
			<form onSubmit={handleSubmitComment}>
				<input
					type='text'
					placeholder='Type your comment...'
					defaultValue={comment}
					onChange={e => setComment(e.target.value)}
					required
				/>
				<button className='btn btn-comment' type='submit'>
					Submit
				</button>
			</form>
		</div>
	)
}
