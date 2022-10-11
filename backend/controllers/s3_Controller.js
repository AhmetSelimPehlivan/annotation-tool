const fs = require('fs')
const {getBucketFromS3} = require('../services/s3_bucket')

module.exports.readFromBucket = async(req, res) => {
    try {
        const bucketData = await getBucketFromS3(process.env.AWS_FETCH_BUCKET_NAME);
        const {Contents=[]} = bucketData;
        //console.log("*** Contents ",Contents)
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
    } catch (error) {
        res.status(500).send([]);
    }
}

  const processS3File = () => {
    return new Promise((resolve, reject) => {
      console.log("File read from S3.");
      let records = [];
      try {
        let readStream = S3.getObject(s3Config).createReadStream();
        let lineReader = readLine.createInterface({ input: readStream });
        lineReader.on("line", line => {
           records.push(line);
        }).on("close", () => {
           console.log("Finished processing S3 file.");
            resolve(records);
       });
      } catch (err) {
      console.log("Error: ", err);
      reject(err);
        }
    })
 }