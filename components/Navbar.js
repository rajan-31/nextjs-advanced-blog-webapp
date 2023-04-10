import Link from 'next/link'
import { useUser } from '@/lib/hooks'
import styles from '@/styles/components/Navbar.module.css'

const Navbar = () => {
	const user = useUser()

	return (
		<header className={styles['nav-container']}>
			<nav>
				<ul>
					<li>
						<Link href='/'>Home</Link>
					</li>
					{!user ? (
						<li>
							<Link href='/login'>Login</Link>
						</li>
					) : (
						<>
							<li>
								<Link href='/profile'>Profile</Link>
							</li>
							<li>
								<Link href='/blog/new'>New Blog</Link>
							</li>
							<li>
								<a href='/api/logout'>Logout</a>
							</li>
						</>
					)}
				</ul>
			</nav>
		</header>
	)
}

export default Navbar
