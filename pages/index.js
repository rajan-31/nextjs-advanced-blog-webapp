import BlogList from '@/components/blog/BlogList'
import { findBlogsWithPaging } from '@/lib/blog'
import { convertHtmlContentToText } from '@/lib/utility'
import { getLoginSession } from '@/lib/auth'
import SearchForm from '@/components/SearchForm'
import { useState } from 'react'

import styles from '@/styles/pages/index.module.css'
import Head from 'next/head'

const Home = ({ blogs, user, totalBlogs, totalPages, currentPage, limit }) => {
	const [allBlogs, setAllBlogs] = useState(blogs)

	const [showSearchResults, setShowSearchResults] = useState(false)
	const [searchResult, setSearchResult] = useState([])

	const [pagingCurrentPage, setPagingCurrentPage] = useState(currentPage)

	const triggerBlogDeletion = _id => {
		setAllBlogs(allBlogs.filter(item => item._id !== _id))
		setSearchResult(searchResult.filter(item => item._id !== _id))
	}

	const clearSearchResults = () => {
		setShowSearchResults(false)
		setSearchResult([])
	}

	const handlePagingButton = e => {
		const page = e.currentTarget.dataset.page
		fetch(`/api/blog?page=${page}&limit=${limit}`)
			.then(response => {
				if (response.status !== 200) throw new Error('Got invalid response from server')
				else return response.json()
			})
			.then(data => {
				data = convertHtmlContentToText(data.blogs)
				setAllBlogs(data)
				setPagingCurrentPage(Number(page))
			})
			.catch(err => {
				console.log(err)
			})
	}

	// Paging logic
	const pageButtons = []
	for (let i = 0; i < totalPages; i++) {
		pageButtons.push(
			<button
				key={i + 1}
				data-page={i + 1}
				onClick={handlePagingButton}
				className={`${styles.pageButton} ${i + 1 === pagingCurrentPage ? styles.currentPageButton : ''}`}
			>
				{i + 1}
			</button>
		)
	}

	return (
		<>
			<Head>
				<title>Home</title>
			</Head>
			<SearchForm setShowSearchResults={setShowSearchResults} setSearchResult={setSearchResult} />
			{showSearchResults && (
				<div className={styles.sectionHeaderContainer}>
					<h3 className={styles.sectionHeader}>Search Results ({searchResult.length})</h3>
					<button className={styles['btn-search-clear']} onClick={clearSearchResults}>
						Clear Search Results
					</button>
				</div>
			)}
			{showSearchResults && searchResult.length <= 0 && (
				<>
					<div>No Matching Blogs Found</div>
				</>
			)}
			{!showSearchResults && <h3 className={styles.sectionHeader}>All Blogs ({totalBlogs})</h3>}
			{!showSearchResults && blogs.length <= 0 && <p>No blogs available</p>}
			{!showSearchResults && pageButtons.length > 1 && (
				<div className={styles.pageButtonsContainer}>{pageButtons}</div>
			)}
			<BlogList
				blogs={allBlogs}
				triggerBlogDeletion={triggerBlogDeletion}
				deleteBtn={user.role === 'admin'}
				editBtn={user.role === 'admin'}
				show={!showSearchResults}
				showPageButtons={true}
				totalPages={totalPages}
				currentPage={currentPage}
			/>
			<BlogList
				blogs={searchResult}
				triggerBlogDeletion={triggerBlogDeletion}
				deleteBtn={user.role === 'admin'}
				editBtn={user.role === 'admin'}
				show={showSearchResults}
				showPageButtons={false}
			/>
		</>
	)
}

export async function getServerSideProps({ req, res }) {
	let blogs = []
	let user = {}
	let result = {}
	const page = 1
	const limit = 5

	try {
		user = await getLoginSession(req)

		result = await findBlogsWithPaging(page, limit)
		blogs = convertHtmlContentToText(result.blogs)
	} catch (error) {
		console.log(error)
	}

	if (!user) user = {}

	return {
		props: {
			blogs: JSON.parse(JSON.stringify(blogs)),
			user: user || {},
			totalBlogs: result.totalBlogs || 0,
			totalPages: result.totalPages || 0,
			currentPage: page,
			limit: limit,
		},
	}
}

export default Home
