var jsonFile = require('./new_json.json');
const Image = require('../models/Image');
const zlib = require("zlib");
var fs = require('fs');
var AWS = require("aws-sdk");
const { S3Client, GetObjectCommand, ListObjectsCommand } = require("@aws-sdk/client-s3");
AWS.config.update({
  "region": "eu-west-3",
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
/*
const params = { Bucket: bucketName }
const s3 = bucket_instance();
const bucketData = await s3.send(new ListObjectsCommand(params));
const newFiles = await getNewFiles(bucketData.Contents)
*/
/*
  for (let j = 0; j < newFiles.length; j++)
    ImportJson(newFiles[j].pose_name, newFiles[j].file_id ,JSON.parse((await unzipFromS3(s3,newFiles[j].pose_name + "/" + newFiles[j].file_id, bucketName)).toString('utf-8')))
*/
  //for (let index = 0; index < jsonFile.length; index++) {
    ImportJson("chaturanga", "new_json" ,[jsonFile])
// }
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

const ImportJson = (name,image_id,datas) => {
  const keypoints = []
  const data = datas[0]
  console.log("data", data.length)
  console.log("data1", data[0].keypoints)
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
    
    /*
      if(data[index].keypoints[i].xAxis === undefined)
        points.push({xAxis: data[index].keypoints[i].x, yAxis: data[index].keypoints[i].y, bodyPart: data[index].keypoints[i].bodyPart})
       else
        points.push({xAxis: data[index].keypoints[i].xAxis, yAxis: data[index].keypoints[i].yAxis, bodyPart: data[index].keypoints[i].bodyPart})
    keypoints.push(points)*/
    keypoints.push(points)
  }
  addNewKeypointsToDb(name,image_id,keypoints,keypoints.length)
  /*
    addNewPosesToDb(name, image_id, data.records.length)
    console.log("Success")
    
  if(keypoints.length>400){
    for (let i = 0; i < Math.ceil(keypoints.length/400); i++)
      if( Math.floor(keypoints.length/400) > i)
        addNewKeypointsToDb(name,(image_id+"-"+(i+1)),keypoints.splice(i*400, (i+1)*400),400)
      else
        addNewKeypointsToDb(name,(image_id+"-"+(i+1)),keypoints.splice(i*400, keypoints.length-(i*400)),keypoints.length-(i*400))
  }
  else{
    addNewKeypointsToDb(name,image_id,keypoints,keypoints.length)
  }*/
}

/*
const ImportJson = (name,image_id,data) => {
  
  const keypoints = []
  for (let index = 0; index < data.records.length; index++) {
    let points = []
    for (let i = 0; i < data.records[index].keypoints.length; i++)
      if(data.records[index].keypoints[i].xAxis === undefined)
        points.push({xAxis: data.records[index].keypoints[i].x, yAxis: data.records[index].keypoints[i].y, bodyPart: data.records[index].keypoints[i].bodyPart})
       else
        points.push({xAxis: data.records[index].keypoints[i].xAxis, yAxis: data.records[index].keypoints[i].yAxis, bodyPart: data.records[index].keypoints[i].bodyPart})
    keypoints.push(points)
  }
    addNewPosesToDb(name, image_id, data.records.length)
    console.log("Success")
    
  if(keypoints.length>400){
    for (let i = 0; i < Math.ceil(keypoints.length/400); i++)
      if( Math.floor(keypoints.length/400) > i)
        addNewKeypointsToDb(name,(image_id+"-"+(i+1)),keypoints.splice(i*400, (i+1)*400),400)
      else
        addNewKeypointsToDb(name,(image_id+"-"+(i+1)),keypoints.splice(i*400, keypoints.length-(i*400)),keypoints.length-(i*400))
  }
  else{
    addNewKeypointsToDb(name,image_id,keypoints,keypoints.length)
  }
}
*/

const uploadBucketToS3 = async (bucketName) => {
  const s3 = bucket_instance();
  const params = {
    Bucket: bucketName,
    MaxKeys: 10 
  }
  const bucketData = s3.listObjects(params).promise()
  return bucketData
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

module.exports = {getBucketFromS3}