import Link from 'next/link'

export default function BlogListItem({ blogData, deleteBtn, editBtn }) {
	const handleEdit = e => {
		e.preventDefault()

		alert(`edit ${blogData.title}`)
	}

	const handleDelete = e => {
		e.preventDefault()
		alert(`delete ${blogData.title}`)
	}

	return (
		<div>
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
			<div>{blogData.content.}</div>
		</div>
	)
}
