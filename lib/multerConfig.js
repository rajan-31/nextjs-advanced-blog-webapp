import multer from 'multer'

const storage = multer.memoryStorage()

const limits = {
	fileSize: 1024 * 1024 * 5, // 5MB file size limit
}

const fileFilter = (req, file, cb) => {
	if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
		cb(null, true)
	} else {
		cb(new Error('Invalid file type'), false)
	}
}

const multerConfig = multer({ storage, limits, fileFilter })

export default multerConfig
