const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const aws = require('aws-sdk');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const config = require('./config');
const app = express();
const port = process.env.PORT || 5000;


//Zencoder
var Zencoder = require('zencoder');
var client = new Zencoder(config.zencoder);

// AWS set region São Paulo
aws.config.region = 'sa-east-1';

//body parser para arquivos json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// para upload do arquivo
app.use(cors());
app.use(fileUpload());

app.engine('html', require('ejs').renderFile);
app.use(express.static(path.join(__dirname, 'client/build')));
app.get('*', function(req, res) {
res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

// server zencoder para converter video
app.post('/upload-video', function(req, res) {
    client.Job.create({
    test: true,
    input: '',
    outputs: [
        {
        label: 'mp4',
        url: config.outputDb + 'output.mp4',
        public: true,
        thumbnails: {
            number: 1,
            base_url: config.outputDb,
            filename: 'webm_{{number}}',
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
    res.send(200, {message: 'Success!'});
});


app.listen(port, ()=> {
    console.log(`Running on port ${port}`);
});
