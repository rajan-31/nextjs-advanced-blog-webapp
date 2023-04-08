export default function Comment({ commentorName, text }) {
	return (
		<div className='comment'>
			<div className='commentatorName'>{commentorName}</div>
			<div className='commentText'>{text}</div>
		</div>
	)
}
