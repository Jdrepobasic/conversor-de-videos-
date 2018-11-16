const express = require('express');
const app = express();
const AWS = require('aws-sdk');
const bluebird = require('bluebird');
const bodyParser = require('body-parser');
const path = require('path');
const config = require('./config');

//dotenv
require('dotenv').config();

const port = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, 'client/build')));

// AWS configurações
AWS.config.region = 'sa-east-1';
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});
AWS.config.setPromisesDependency(bluebird);

// create S3 instance
const s3 = new AWS.S3();

//Zencoder
var Zencoder = require('zencoder');
var client = new Zencoder(config.zencoder);

//body parser para arquivos json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((request, response, next) => {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "Content-Type");
    next();
});

// //conversão do video
app.route('/converter').post((req,res) =>{
    const { body } = req;
    var videoFileName = body.videoName;
    console.log(config.baseURL + videoFileName);
    client.Job.create({
        input:config.baseURL + videoFileName,
        outputs: [
            {   
                format: 'mp4',
                label: videoFileName,
                url: config.outputDb + videoFileName,
                public: true,
                thumbnails: {
                    number: 1,
                    base_url: config.outputDb + '/thumbs' + videoFileName,
                    filename: videoFileName,
                    public: true
                }
            }
        ]
        }, function(err, data) {
            if (err) {
                console.log(err);
                return;
            }
        });
        res.status(200).send({message: 'Success!'});
});

app.listen(port, ()=> {
    console.log(`Running on port ${port}`);
});
