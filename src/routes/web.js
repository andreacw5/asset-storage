const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/file.controller');
const upload = require('../middleware/upload');

const web = (app) => {
  router.get('/api/files', uploadController.index);
  router.get('/api/files/:slug', uploadController.get);
  router.post('/api/upload', upload.single('file'), uploadController.upload);
  return app.use('/', router);
};

module.exports = web;
