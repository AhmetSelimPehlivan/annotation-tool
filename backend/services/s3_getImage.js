
var AWS = require("aws-sdk");
const constants = require("../constants")
const unzipper = require("unzipper");
var fs = require('fs');

const getTaskImageZip = (frame_id) => {
  const frame_number = frame_id.split("frame")[1].split(".jpg")[0]
  for (let index = 0; index < constants.length; index++)
    if(constants[index][0] <= frame_number && constants[index][1] >= frame_number)
      return index   
}

const getImageFromS3 = async(bucketName, frame_id) =>{
    AWS.config.setPromisesDependency();
    AWS.config.update({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: "eu-central-1"
    });
    const s3 = new AWS.S3();

    console.log("frame_id ",frame_id)
    console.log('images/'+getTaskImageZip(frame_id)+'.zip')
      response = s3.getObject({
        Bucket: bucketName,
        Key: 'images/'+getTaskImageZip(frame_id)+'.zip'
      }).createReadStream()
      .pipe(unzipper.ParseOne(frame_id, {
        forceStream: true,
      }));
      return new Promise(async (resolve, reject) => {
        const chunks = [];
        console.log("data get from zip")
        response.on('data', (chunk) => chunks.push(chunk))
        response.on('error', reject);
        response.on('end', () => {
            resolve(Buffer.concat(chunks).toString("base64"));
        });
    });
}

module.exports = {getImageFromS3}