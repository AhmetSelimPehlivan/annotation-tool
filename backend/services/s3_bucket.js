const Image = require('../models/Image');
const zlib = require("zlib");
const fs = require('fs');
const AWS = require("aws-sdk");
require('dotenv/config');


const { S3Client, GetObjectCommand, ListObjectsCommand } = require("@aws-sdk/client-s3");
AWS.config.update({
  "region": process.env.AWS_DB_REGION,
  "accessKeyId": process.env.AWS_ACCESS_KEY_ID, "secretAccessKey":  process.env.AWS_SECRET_ACCESS_KEY
});
let dynamoClient = new AWS.DynamoDB.DocumentClient();
// Set the region

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
  ImportJson("navasana", newFiles[j].file_id ,JSON.parse((await unzipFromS3(s3,"json/"+newFiles[j].file_id, bucketName)).toString('utf-8')))

}

const getNewFiles = async (bucketData_Contents) => {
  let newFiles = []
  let filename = bucketData_Contents[0].Key.split('/')
  
    for (let j = 0; j < bucketData_Contents.length; j++){
      filename = bucketData_Contents[j].Key.split('/')
      if(filename[0] === 'json' && filename[1].length > 0 && newFiles.includes(filename[1]) === false)
        newFiles.push({pose_name: filename[0], file_id: filename[1]})
    }
    return newFiles
  }
  
const unzipFromS3 = async(s3Client ,key, bucket) => {

  return new Promise(async (resolve, reject) => {
      let options = {
          'Bucket': bucket,
          'Key': key
      };
      const command = new GetObjectCommand(options);
      const { Body } = await s3Client.send(command);
      console.log(Body)
      const uploadedS3File = await streamToString(Body);
      if(key.includes(".zip") === false)
        resolve(uploadedS3File)
      else
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

const ImportJson = (name,image_id,data) => {
  let frames = []
  let counter = 0
  for (let index = 0; index < data.length; index++) {
    let points = []
    points.push({xAxis: data[index].keypoints.nose.x, yAxis: data[index].keypoints.nose.y, bodyPart: "nose"})
    points.push({xAxis: data[index].keypoints.left_shoulder.x, yAxis: data[index].keypoints.left_shoulder.y, bodyPart: "left_shoulder"})
    points.push({xAxis: data[index].keypoints.right_shoulder.x, yAxis: data[index].keypoints.right_shoulder.y, bodyPart: "right_shoulder"})
    points.push({xAxis: data[index].keypoints.left_elbow.x, yAxis: data[index].keypoints.left_elbow.y, bodyPart: "left_elbow"})
    points.push({xAxis: data[index].keypoints.right_elbow.x, yAxis: data[index].keypoints.right_elbow.y, bodyPart: "right_elbow"})
    points.push({xAxis: data[index].keypoints.left_wrist.x, yAxis: data[index].keypoints.left_wrist.y, bodyPart: "left_wrist"})
    points.push({xAxis: data[index].keypoints.right_wrist.x, yAxis: data[index].keypoints.right_wrist.y, bodyPart: "right_wrist"})    
    points.push({xAxis: data[index].keypoints.left_hip.x, yAxis: data[index].keypoints.left_hip.y, bodyPart: "left_hip"})
    points.push({xAxis: data[index].keypoints.right_hip.x, yAxis: data[index].keypoints.right_hip.y, bodyPart: "right_hip"})
    points.push({xAxis: data[index].keypoints.left_knee.x, yAxis: data[index].keypoints.left_knee.y, bodyPart: "left_knee"})
    points.push({xAxis: data[index].keypoints.right_knee.x, yAxis: data[index].keypoints.right_knee.y, bodyPart: "right_knee"})
    points.push({xAxis: data[index].keypoints.left_ankle.x, yAxis: data[index].keypoints.left_ankle.y, bodyPart: "left_ankle"})
    points.push({xAxis: data[index].keypoints.right_ankle.x, yAxis: data[index].keypoints.right_ankle.y, bodyPart: "right_ankle"})
    frames.push({frame: data[index].frame, keypoints: points})
    if(index%401 === 400){
      addNewKeypointsToDb(name,(image_id+"-"+(counter+1)),frames,400)
      frames=[]
      counter +=1
    }
  }
  if(frames.length > 0)
    addNewKeypointsToDb(name,(counter === 0 ? image_id : (image_id+"-"+(counter+1))),frames,frames.length)
}

const uploadBucketToS3 = async (bucketName,pose_name) => {
  const finishedImages = await Image.find({available_frame_count: 398})  
  console.log(finishedImages)  
  var params = {
      TableName: "CompletedTask",
      Key: {
        "pose_name": finishedImages[0].pose_name,
        "image_id": finishedImages[0].image_id
      }
    };
    try {
      dynamoClient.get(params, function (err, data) {
          if (err) {
              console.log("users::fetchOneByKey::error - " + JSON.stringify(err, null, 2));
          }
          else {
              console.log("users::fetchOneByKey::success - " + JSON.stringify(data, null, 2));
          }
      })
  } catch (error) {
  }
}

const addNewPosesToDb = async (pose_name,image_id,frame_count) =>{

  await Image.create({
    pose_name: pose_name,
    image_id: image_id,
    total_frame: [[0,frame_count]],
    available_frame_count: frame_count
  });
}

const addNewKeypointsToDb = async (name,image_id,points,frame_count) =>{
  try{
     dynamoClient.put({
        TableName: 'Keypoints',
        Item:{
            pose_name: name,
            image_id: image_id,
            points: points,
            frame_count: frame_count
        }
      }, function (err, data) {
        if (err) {
            console.log("addNewKeypointsToDb::save::error - " + JSON.stringify(err, null, 2));
            const length = points.length
            const obj = {image_id,length}
            fs.appendFile("log.txt", JSON.stringify(obj), function(err) {
          });  
        } else {
            addNewPosesToDb(name, image_id, frame_count)
            console.log("addNewKeypointsToDb::save::success" );                      
        }
    });
  }catch (e) {
      console.log('cannot insert score parameters!');
  }
}

module.exports = {getBucketFromS3, uploadBucketToS3}