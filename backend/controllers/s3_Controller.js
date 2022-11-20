const {getBucketFromS3, uploadBucketToS3} = require('../services/s3_bucket')
const {getImageFromS3} = require('../services/s3_getImage')

module.exports.readImageFromBucket = async(req, res) => {
    try {
        console.log(req.body.frame_name)
        const image_url = await getImageFromS3(process.env.AWS_FETCH_BUCKET_NAME,req.body.frame_name);
        res.status(201).send({bucketData: image_url});
    } catch (error) {
        res.status(500).send([]);
    }
}
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