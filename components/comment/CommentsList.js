import Comment from './Comment'

import styles from '@/styles/components/comment/CommentsList.module.css'

export default function CommentsList({ allComments }) {
	return (
		allComments.length > 0 && (
			<div className={styles['comments-list']}>
				{allComments.map((item, index) => (
					<Comment commentorName={item.commentorName} text={item.text} key={index} />
				))}
			</div>
		)
	)
}
