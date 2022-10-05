// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Set the region
AWS.config.update({region: 'REGION'});

const bucket_instance = () =>{
    s3 = new AWS.S3({
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    },
    region: AWS_FETCH_BUCKET_REGION
  });
  return s3;
}

const getBucketFromS3 = async (bucketName) => {
  const s3 = bucket_instance();
  const params = {
    Bucket: bucketName,
    MaxKeys: 10
  }
  const bucketData = s3.listObjects(params).promise()
  //console.log(bucketName,"-",bucketData)
  return bucketData
}

const uploadBucketToS3 = async (bucketName) => {
  const s3 = bucket_instance();
  const params = {
    Bucket: bucketName,
    MaxKeys: 10
  }
  const bucketData = s3.listObjects(params).promise()
  //console.log(bucketName,"-",bucketData)
  return bucketData
}

module.exports = {getBucketFromS3}