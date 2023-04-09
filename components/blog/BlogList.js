import { useState } from 'react'
import BlogListItem from './BlogListItem'

export default function BlogList({ blogs, triggerBlogDeletion, deleteBtn, editBtn, show }) {
	return (
		show &&
		blogs && (
			<div className='blog-list'>
				{blogs.map((item, index) => (
					<BlogListItem
						blogData={item}
						triggerBlogDeletion={triggerBlogDeletion}
						deleteBtn={deleteBtn}
						editBtn={editBtn}
						key={index}
					/>
				))}
			</div>
		)
	)
}
