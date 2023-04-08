import Comment from './Comment'

export default function CommentsList({ allComments }) {
	return (
		allComments.length > 0 && (
			<div className='comments-list'>
				{allComments.map((item, index) => (
					<Comment commentorName={item.commentorName} text={item.text} key={index} />
				))}
			</div>
		)
	)
}
