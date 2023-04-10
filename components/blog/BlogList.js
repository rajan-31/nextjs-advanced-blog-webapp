import { useState } from 'react'
import BlogListItem from './BlogListItem'

import styles from '@/styles/components/blog/BlogList.module.css'

export default function BlogList({ blogs, triggerBlogDeletion, deleteBtn, editBtn, show }) {
	return (
		show &&
		blogs && (
			<div className={styles['blog-list']}>
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
