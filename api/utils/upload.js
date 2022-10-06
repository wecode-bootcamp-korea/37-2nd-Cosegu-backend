const AWS = require('aws-sdk');
const s3 = new AWS.S3({
  accessKeyId: process.env.ACCESSKEYID,
  secretAccessKey: process.env.SECRETACCESSKEY,
  region: process.env.REGION,
});
const multer = require('multer');
const multerS3 = require('multer-s3');
const moment = require('moment');

const storage = multerS3({
  s3: s3,
  acl: 'public-read-write',
  bucket: 'cosegu',
  key: (req, file, callback) => {
    let datetime = moment().format('YYYYMMDDHHmmss');
    callback(null, datetime + '_' + file.originalname);
  },
});
const upload = multer({ storage: storage });

module.exports = {
  upload,
};
