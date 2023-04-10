import { useState } from 'react'
import Router from 'next/router'
import { useUser } from '../lib/hooks'
import Form from '../components/form'
import Head from 'next/head'

const Signup = () => {
	useUser({ redirectTo: '/', redirectIfFound: true })

	const [errorMsg, setErrorMsg] = useState('')

	async function handleSubmit(e) {
		e.preventDefault()

		if (errorMsg) setErrorMsg('')

		const body = {
			username: e.currentTarget.username.value,
			password: e.currentTarget.password.value,
			fullName: e.currentTarget.fullName.value,
		}

		if (body.password !== e.currentTarget.rpassword.value) {
			setErrorMsg(`The passwords don't match`)
			return
		}

		try {
			const res = await fetch('/api/signup', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(body),
			})
			if (res.status === 200) {
				Router.push('/login')
			} else {
				throw new Error(await res.text())
			}
		} catch (error) {
			console.error('An unexpected error happened occurred:', error)
			setErrorMsg(error.message)
		}
	}

	return (
		<>
			<Head>
				<title>SignUp</title>
			</Head>
			<div className='login'>
				<Form isLogin={false} errorMessage={errorMsg} onSubmit={handleSubmit} />
			</div>
			<style jsx>{`
				.login {
					max-width: 21rem;
					margin: 0 auto;
					padding: 1rem;
					border: 1px solid #ccc;
					border-radius: 4px;
				}
			`}</style>
		</>
	)
}

export default Signup
