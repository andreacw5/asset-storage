const maxSize = 2 * 1024 * 1024;
const multer = require('multer');

const imageFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb('Please upload only images.', false);
  }
};

const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    // Save file to destination
    cb(null, __basedir + '/tmp/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const uploadFile = multer({
  storage,
  limits: { fileSize: maxSize },
  fileFilter: imageFilter,
});
module.exports = uploadFile;
