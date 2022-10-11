const Image = require('../models/Image');
const zlib = require("zlib");
const { S3Client, GetObjectCommand, ListObjectsCommand } = require("@aws-sdk/client-s3");
// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Set the region
AWS.config.update({region: 'REGION'});

const bucket_instance = () =>{
    s3 = new S3Client({
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    },
    region: process.env.AWS_FETCH_BUCKET_REGION
  });
  return s3;
}

const getBucketFromS3 = async (bucketName) => {

const params = { Bucket: bucketName }
const s3 = bucket_instance();
const bucketData = await s3.send(new ListObjectsCommand(params));
const newFiles = await getNewFiles(bucketData.Contents)

  for (let j = 0; j < newFiles.length; j++)
    ImportJson(newFiles[j].pose_name, newFiles[j].file_id ,JSON.parse((await unzipFromS3(s3,newFiles[j].pose_name + "/" + newFiles[j].file_id, bucketName)).toString('utf-8')))
}

const getNewFiles = async (bucketData_Contents) => {
let newFiles = []
let filename = bucketData_Contents[0].Key.split('/')

  for (let j = 0; j < bucketData_Contents.length; j++){
    filename = bucketData_Contents[j].Key.split('/')
    if(filename[1].length > 0 && newFiles.includes(filename[1]) === false)
      newFiles.push({pose_name: filename[0], file_id: filename[1]})
  }
  return newFiles
}

const unzipFromS3 = (s3Client ,key, bucket) => {
  //console.log("Key ",key)
  return new Promise(async (resolve, reject) => {
      let options = {
          'Bucket': bucket,
          'Key': key
      };
      const command = new GetObjectCommand(options);
      const { Body } = await s3Client.send(command);
      const uploadedS3File = await streamToString(Body);
      resolve(zlib.unzipSync(uploadedS3File));
  });
};

const streamToString = (stream) => new Promise((resolve, reject) => {
  const chunks = [];
  stream.on('data', (chunk) => chunks.push(chunk));
  stream.on('error', reject);
  stream.on('end', () => {
      resolve(Buffer.concat(chunks));
  });
});

const ImportJson = (name,image_id,data) => {// console.log("Import ",name)
  //const keypoints = []
  /*data.records.map((item) => {
    keypoints.push(item.keypoints)
  })*/
  //addNewPosesToDb(name, image_id, keypoints, keypoints.length)
  addNewPosesToDb(name, image_id, data.records.length)
}

const addNewPosesToDb = async (pose_name,image_id/*,keypoints*/,frame_count) =>{
  await Image.create({
    pose_name: pose_name,
    image_id: image_id,
    //keypoints: keypoints,
    total_frame_count: frame_count,
    available_frame_count: frame_count
  });
}

const uploadBucketToS3 = async (bucketName) => {
  const s3 = bucket_instance();
  const params = {
    Bucket: bucketName,
    MaxKeys: 10
  }
  const bucketData = s3.listObjects(params).promise()
  return bucketData
}

module.exports = {getBucketFromS3}