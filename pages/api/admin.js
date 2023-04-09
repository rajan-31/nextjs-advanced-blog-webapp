import { createAdmin } from '@/lib/admin'

export default async function signupAdmin(req, res) {
	try {
		const admin = await createAdmin(req.body)
		if (admin.message) res.status(200).json(admin)
		else res.status(200).send({ done: true })
	} catch (error) {
		console.error(error)
		res.status(500).end(error.message)
	}
}
