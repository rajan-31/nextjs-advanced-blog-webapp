import Navbar from './Navbar'

const Layout = ({ children }) => (
	<div className='main-container'>
		<Navbar />
		<main>{children}</main>
		<footer>Copyright 2023</footer>
	</div>
)

export default Layout
