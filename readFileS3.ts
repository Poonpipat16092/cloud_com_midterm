import AWS from 'aws-sdk';

const readFileS3 = async(fileName,res) => {
    const BUCKET_NAME = process.env.AWS_BUCKET_NAME;
    const ID = process.env.AWS_KEY;
    const SECRET = process.env.AWS_PRIVATE_KEY;

    const s3 = new AWS.S3({
        accessKeyId: ID,
        secretAccessKey: SECRET
    });
    const params = {
        Bucket: BUCKET_NAME,
        Key: fileName, // File name you want to save as in S3
    };
    try{
        const data = await s3.getObject(params);
        const bytedata = data.createReadStream();
        var  buf = '';
        bytedata.on('data', function(d) {
            buf += d;
        }).on('end', function() {
            //console.log(buf);
            console.log("End");
            return res.status(200).send(buf);
            //return res.status(200).send("read successfully");
        });
    }
    catch(err){
        throw err;
    }
}
export default readFileS3;