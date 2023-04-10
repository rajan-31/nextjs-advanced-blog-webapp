import Navbar from './Navbar'
import styles from '@/styles/components/layout.module.css'

const Layout = ({ children }) => (
	<div className={styles['main-container']}>
		<Navbar />
		<main>{children}</main>
		<footer>Copyright 2023</footer>
	</div>
)

export default Layout
