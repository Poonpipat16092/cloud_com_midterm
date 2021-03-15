import fs from 'fs';
import AWS from 'aws-sdk';
// Enter copied or downloaded access ID and secret key here


const uploadFileToS3 =  async(fileName, fileContent): Promise<void> => {
    return new Promise((resolve, reject) => {
        // Read content from the file
        // Setting up S3 upload parameters
        const ID = process.env.AWS_KEY;
        const SECRET = process.env.AWS_PRIVATE_KEY;
        // The name of the bucket that you have created
        const BUCKET_NAME = process.env.AWS_BUCKET_NAME;

        const s3 = new AWS.S3({
            accessKeyId: ID,
            secretAccessKey: SECRET
        });
        const params = {
            Bucket: BUCKET_NAME,
            Key: fileName, // File name you want to save as in S3
            Body: fileContent
        };
        // Uploading files to the bucket
        s3.upload(params, (err, data) => {
            if (err) {
                reject(err);
            }
            resolve();
        });
    });
};
export default uploadFileToS3;
