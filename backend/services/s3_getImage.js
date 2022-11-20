const AWS = require("aws-sdk");
require('dotenv/config');

const getImageFromS3 = async(bucketName, frame_id) =>{
  AWS.config.setPromisesDependency();
  AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_FETCH_BUCKET_REGION,
    signatureVersion: 'v4'
  });
  const s3 = new AWS.S3();
  
  return new Promise(async (resolve) => {
    resolve(s3.getSignedUrl('getObject', {
      Bucket: bucketName,
      Key: process.env.AWS_NAVASANA_FOLDER_NAME+frame_id,
      Expires: 60 * 5
    }));
  });
}
module.exports = {getImageFromS3}