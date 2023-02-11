const sharp = require('sharp');
const diskService = require('../services/disk.service');
const databaseService = require('../services/database.service');
const ShortUniqueId = require('short-unique-id');

const CURRENT_YEAR = new Date().getFullYear();
const CURRENT_MONTH = new Date().getMonth() + 1;

const index = async (req, res) => {
  const uploads = await databaseService.getAllAssets(
    req.query.offset,
    req.query.limit,
  );
  // Remove content from response
  uploads.forEach((upload) => {
    delete upload.content;
  });
  res.status(200).send({
    data: uploads,
  });
};

const get = async (req, res) => {
  const slug = req.params.slug;
  console.log('Get file: ' + slug);
  const upload = await databaseService.getAsset(slug);
  if (upload) {
    // Return content of file
    console.debug('Upload found: ' + slug);
    res.set({ 'Content-Type': upload.type });
    res.send(upload.content);
  } else {
    console.error('Upload not found: ' + slug);
    res.status(404).send('Upload not found');
  }
};

const upload = async (req, res) => {
  const UPLOAD_PATH = __basedir + '/uploads/';
  const TEMP_PATH = __basedir + '/tmp/';
  try {
    if (req.file === undefined) {
      return res.status(422).send(`You must select a file.`);
    }
    console.log('File upload requested: ' + req.file.filename);
    const image = await diskService.readFileOnDisk(
      TEMP_PATH + req.file.filename,
    );

    // Optimize image with sharp
    let optimizedImage;
    if (req.file.mimetype === 'image/gif') {
      console.debug('Image is animated gif');
      // Convert to optimized webp
      optimizedImage = await sharp(image, { animated: true })
        .webp({
          effort: 6,
          quality: 70,
          lossless: true,
        })
        .toBuffer();
    } else {
      console.debug('Image is not animated gif');
      // Convert to optimized webp
      optimizedImage = await sharp(image)
        .webp({ quality: 70, lossless: true })
        .toBuffer();
    }
    // New filename for optimized image with webp extension
    const uid = new ShortUniqueId();
    const filename = uid.stamp(16) + '.webp';
    console.log('New file optimized and ready to upload: ' + filename);
    // Check and create current year directory
    await diskService.checkAndCreateDirectory(UPLOAD_PATH + CURRENT_YEAR);
    // Check and create current month directory
    await diskService.checkAndCreateDirectory(
      UPLOAD_PATH + CURRENT_YEAR + '/' + CURRENT_MONTH,
    );
    // Save optimized image on disk
    await diskService.writeFileOnDisk(
      UPLOAD_PATH + CURRENT_YEAR + '/' + CURRENT_MONTH + '/' + filename,
      optimizedImage,
    );
    // Delete temp image from disk
    await diskService.deleteFileOnDisk(TEMP_PATH + req.file.filename);
    // Save optimized image on database
    await databaseService.createAsset({
      name: req.file.originalname,
      slug: filename,
      type: 'image/webp',
      content: optimizedImage,
      size: String(req.file.size),
      owner: 'web',
      path: '/uploads/' + CURRENT_YEAR + '/' + CURRENT_MONTH + '/',
    });
    console.log('File uploaded: ' + filename);

    res.status(200).send({
      message: 'Uploaded the file successfully: ' + req.file,
    });
  } catch (err) {
    console.log(err);
    return res.send(`Error when trying upload images: ${err}`);
  }
};

module.exports = {
  upload,
  get,
  index,
};
