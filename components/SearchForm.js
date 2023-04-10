import { useState } from 'react'
import styles from '@/styles/components/SearchForm.module.css'

export default function SearchForm({ setShowSearchResults, setSearchResult }) {
	const [searchText, setSearchText] = useState('')

	const handleSearchSubmit = e => {
		e.preventDefault()

		if (!searchText) {
			alert("Can't search for empty string")
			return
		}

		setShowSearchResults(true)

		fetch(`/api/blog/search?q=${searchText}`)
			.then(response => {
				if (response.status === 200) return response.json()
				else {
					throw new Error('Request status not 200')
				}
			})
			.then(data => {
				setSearchResult(data)
			})
			.catch(err => {
				console.log(err)
				alert('Something went wrong, try again!')
			})
	}

	return (
		<div>
			<form className={styles['search-form']} onSubmit={handleSearchSubmit}>
				<input
					type='text'
					placeholder='Search blogs...'
					required
					onChange={e => setSearchText(e.target.value)}
				/>
				<button type='submit' className={styles['btn-search']}>
					Search
				</button>
			</form>
		</div>
	)
}
