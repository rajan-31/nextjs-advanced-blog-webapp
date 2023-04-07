import BlogListItem from './BlogListItem'

export default function BlogList({ blogs, deleteBtn, editBtn }) {
	return (
		<div className='blog-list'>
			{blogs.map((item, index) => (
				<BlogListItem blogData={item} deleteBtn={deleteBtn} editBtn={editBtn} key={index} />
			))}
		</div>
	)
}
