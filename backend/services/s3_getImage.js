const AWS = require("aws-sdk");
require('dotenv/config');

const getImageFromS3 = async(bucketName, frame_id) =>{
    AWS.config.setPromisesDependency();
    AWS.config.update({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_FETCH_BUCKET_REGION
    });
    
    const s3 = new AWS.S3();
      response = s3.getObject({
        Bucket: bucketName,
        Key: process.env.AWS_NAVASANA_FOLDER_NAME+frame_id
      }).createReadStream()

      return new Promise(async (resolve, reject) => {
        const chunks = [];
        response.on('data', (chunk) => chunks.push(chunk))
        response.on('error', reject);
        response.on('end', () => {
            resolve(Buffer.concat(chunks).toString("base64"));
        });
    });
}

module.exports = {getImageFromS3}