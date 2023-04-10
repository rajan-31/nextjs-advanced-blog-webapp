import styles from '@/styles/components/comment/Comment.module.css'

export default function Comment({ commentorName, text }) {
	return (
		<div className={styles.comment}>
			<div className={styles.commentatorName}>{commentorName}</div>
			<div className={styles.commentText}>{text}</div>
		</div>
	)
}
