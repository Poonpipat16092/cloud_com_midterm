import express from 'express';
import multer from 'multer';
import uploadFileToS3 from  './uploadToS3';
import readFileS3 from './readFileS3';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const port = 3000;
const upload = multer();

app.get('/', (req, res) => {
  res.json({ message: 'hello wordl!' })
});
app.post('/aws/aws', function (req, res) {
  res.send('POST request to the homepage');
});
app.post('/aws/gcp', function (req, res) {
  res.send('POST request to the homepage');
});
app.post('/gcp/gcp', function (req, res) {
  res.send('POST request to the homepage');
});

app.get('/gcp/aws/read/:filename',async function (req, res, next) {
  await readFileS3(req.params.filename,res);
});

// arm  compute GCP and S3
app.post('/gcp/aws/upload', upload.single('filename'),async function (req, res, next) {
  await uploadFileToS3(req.file.originalname,req.file.buffer);
  res.send("Upload succesfully");
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});