import Blog from '@/models/Blog'
import mongoose from 'mongoose'
import dbConnect from './dbConnect'

export async function createBlog(blogData) {
	await dbConnect()

	try {
		const blog = await new Blog(blogData).save()
		return blog
	} catch (error) {
		console.error(error)
		throw error
	}
}

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
