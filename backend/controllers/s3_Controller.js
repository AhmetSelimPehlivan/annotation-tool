const zlib = require('zlib');
const fs = require('fs')
const {getBucketFromS3} = require('../services/s3_bucket')

module.exports.readFromBucket = async(req, res) => {
    try {
        const bucketData = await getBucketFromS3(process.env.AWS_FETCH_BUCKET_NAME);
        const {Contents=[]} = bucketData;
        //console.log("*** Contents ",)
        unzip(Contents[2].Key)
        res.status(201).send(Contents.map( content => {
            return {
                key: content.Key,
                size: (content.Size/1024).toFixed(1),
                lastModified: content.lastModified
            }
        }));
    } catch (error) {
        res.status(500).send([]);
    }
}

module.exports.uploadToBucket = async(req, res) => {
    
    try {
        const bucketData = await getBucketFromS3(process.env.AWS_UPLOAD_BUCKET_NAME);
        const fileStream = fs.createReadStream(file.path)

        const uploadParams = {
            Bucket: bucketName,
            Body: fileStream,
            Key: file.filename
          }
        
        return s3.upload(uploadParams).promise()

        const {Contents=[]} = bucketData;
        //console.log("*** Contents ",)
        unzip(Contents[2].Key)
        res.status(201).send(Contents.map( content => {
            return {
                key: content.Key,
                size: (content.Size/1024).toFixed(1),
                lastModified: content.lastModified
            }
        }));
    } catch (error) {
        res.status(500).send([]);
    }
}
const unzip = (data) => zlib.gunzip(data,function(error, buff){
    //console.log("*** ",data)
    if(error != null){
        console.log("err ",error)                             
       //An error occured while unzipping the .gz file.
    }
    else{                                     
        console.log(buff)               
     //Use the buff which contains the unzipped JSON.
    }
  });