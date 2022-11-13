const fs = require('fs')
const {getBucketFromS3, uploadBucketToS3} = require('../services/s3_bucket')

module.exports.readFromBucket = async(req, res) => {
    try {
        const bucketData = await getBucketFromS3(process.env.AWS_FETCH_BUCKET_NAME);
        const {Contents=[]} = bucketData;
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
        await uploadBucketToS3(process.env.AWS_FETCH_BUCKET_NAME);
        res.status(201).send({message: " Ok "});
    } catch (error) {
        res.status(500).send({error: "error ",error});
    }
}