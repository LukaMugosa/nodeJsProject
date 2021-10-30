const multer = require('multer');
const path = require("path");

module.exports = {
	// createStorage(filePath = 'public', fileName = null) {
	// 	return
	// },
	createFileUpload(name, mimes, fileName = null, filePath = 'public') {
		const storage = multer.diskStorage({
			destination: function (req, file, cb) {
				cb(null, filePath)
			},
			filename: function (req, file, cb) {
				if(!fileName) {
					fileName = `${file.originalname}`
				}
				cb(null, fileName);
			}
		});
		return multer({
			storage: storage,
			fileFilter: (req, file, cb) => {
				if(mimes.includes(file.mimetype)) {
					cb(null, true);
				}
				else {
					cb(null, false);
					const mimesText = mimes.join(', ')
					return cb(new Error(`Invalid mime type. Supported mimes are: ${mimesText}`));
				}
			}
		});
	}
}