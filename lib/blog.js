import Blog from '@/models/Blog'
import mongoose from 'mongoose'
import dbConnect from './dbConnect'
import { convertHtmlContentToText } from '@/lib/utility'

/**
 * Database operation functions
 */

export async function createBlog(blogData) {
	await dbConnect()

	try {
		const newBlog = new Blog(blogData)
		const blog = await newBlog.save()
		return blog
	} catch (error) {
		console.error(error)
		throw error
	}
}

// not used
export async function findAllBlogs() {
	await dbConnect()

	try {
		const blogs = await Blog.find().lean()
		return blogs
	} catch (error) {
		console.error(error)
		throw error
	}
}

export async function findBlogsWithPaging(page, limit) {
	await dbConnect()
	let result = {}

	try {
		result.totalBlogs = await Blog.estimatedDocumentCount()
		result.totalPages = Math.ceil(result.totalBlogs / limit)
		result.blogs = await Blog.find({}, null, { skip: (page - 1) * limit, limit: limit, lean: true })

		return result
	} catch (error) {
		console.error(error)
		throw error
	}
}

export async function findBlogByID(_id) {
	await dbConnect()

	try {
		const id = new mongoose.Types.ObjectId(_id)
		const blog = await Blog.findById(id, null, { lean: true })
		return blog
	} catch (error) {
		console.error(error)
		throw error
	}
}

export async function findBlogsByOwner(_id) {
	await dbConnect()

	try {
		const id = new mongoose.Types.ObjectId(_id)
		const blogs = await Blog.find({ owner: id }).lean()
		return blogs
	} catch (error) {
		console.error(error)
		throw error
	}
}

export async function deleteBlogById(_id) {
	await dbConnect()

	try {
		const id = new mongoose.Types.ObjectId(_id)
		const blog = await Blog.findOneAndDelete({ _id: id }).lean()
		return blog
	} catch (error) {
		console.error(error)
		throw error
	}
}

export async function updateBlogById(_id, updatedBlog) {
	await dbConnect()

	try {
		const id = new mongoose.Types.ObjectId(_id)
		const blog = await Blog.findByIdAndUpdate(id, updatedBlog)
		return blog
	} catch (error) {
		console.error(error)
		throw error
	}
}

export async function addCommentById(_id, comment) {
	await dbConnect()

	try {
		const id = new mongoose.Types.ObjectId(_id)
		const blog = await Blog.findByIdAndUpdate(id, { $push: { comments: comment } }, { new: true, lean: true })
		return blog
	} catch (error) {
		console.error(error)
		throw error
	}
}

export async function searchBlogs(searchString) {
	await dbConnect()

	try {
		/* const results = await Blog.find(
			{ $text: { $search: searchString } },
			{ score: { $meta: 'textScore' } },
			{ sort: { score: 1 } }
		) */

		const results = await Blog.find({
			$or: [
				{ title: { $regex: new RegExp(searchString, 'i') } },
				{ content: { $regex: new RegExp(searchString, 'i') } },
			],
		}).hint({ title: 1, content: 1 })

		return convertHtmlContentToText(results)
	} catch (error) {
		console.error(error)
		throw error
	}
}
