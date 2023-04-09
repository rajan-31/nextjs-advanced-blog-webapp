import BlogList from '@/components/blog/BlogList'
import { findAllBlogs } from '@/lib/blog'
import { getLoginSession } from '@/lib/auth'
import SearchForm from '@/components/SearchForm'
import { useState } from 'react'
import { compile } from 'html-to-text'

const compiledConvert = compile({ wordwrap: 130 })

const Home = ({ blogs, user }) => {
	const [allBlogs, setAllBlogs] = useState(blogs)

	const [showSearchResults, setShowSearchResults] = useState(false)
	const [searchResult, setSearchResult] = useState([])

	const triggerBlogDeletion = _id => {
		setAllBlogs(allBlogs.filter(item => item._id !== _id))
		setSearchResult(searchResult.filter(item => item._id !== _id))
	}

	const clearSearchResults = () => {
		setShowSearchResults(false)
		setSearchResult([])
	}

	return (
		<>
			<SearchForm setShowSearchResults={setShowSearchResults} setSearchResult={setSearchResult} />
			{showSearchResults && (
				<h3>
					Search Results{' '}
					<button className='btn btn-search-clear' onClick={clearSearchResults}>
						Clear Search Results
					</button>
				</h3>
			)}
			{showSearchResults && searchResult.length <= 0 && (
				<>
					<div>No Matching Blogs Found</div>
				</>
			)}
			{!showSearchResults && <h3>All Blogs</h3>}
			{!showSearchResults && blogs.length <= 0 && <p>No blogs available</p>}
			<BlogList
				blogs={allBlogs}
				triggerBlogDeletion={triggerBlogDeletion}
				deleteBtn={user.role === 'admin'}
				editBtn={user.role === 'admin'}
				show={!showSearchResults}
			/>
			<BlogList
				blogs={searchResult}
				triggerBlogDeletion={triggerBlogDeletion}
				deleteBtn={user.role === 'admin'}
				editBtn={user.role === 'admin'}
				show={showSearchResults}
			/>
		</>
	)
}

export async function getServerSideProps({ req, res }) {
	let blogs = []
	let user = {}

	try {
		user = await getLoginSession(req)
		blogs = await findAllBlogs()

		blogs = blogs.map(item => {
			item.content = compiledConvert(item.content).slice(0, 200)
			return item
		})
		console.log(blogs)
	} catch (error) {
		console.log(error)
	}

	if (!user) user = {}

	return {
		props: { blogs: JSON.parse(JSON.stringify(blogs)), user: user },
	}
}

export default Home
