import { findBlogByID } from '@/lib/blog'
import Image from 'next/image'

export default function Blog({ blog }) {
	const imageSrc = rawImage =>
		rawImage.data ? 'data:' + rawImage.mimetype + ';base64,' + rawImage.data.toString('base64') : ''

	return (
		<>
			{blog.image && <Image src={imageSrc(blog.image)} width={300} height={300} alt='Blog Image'></Image>}
			<h1>{blog.title}</h1>
			<div dangerouslySetInnerHTML={{ __html: blog.content }} />
		</>
	)
}

export async function getServerSideProps({ req, res, params }) {
	let blog = {}

	try {
		blog = await findBlogByID(params.id)
	} catch (error) {
		console.log(error)
	}
	return {
		props: { blog: JSON.parse(JSON.stringify(blog)) },
	}
}
