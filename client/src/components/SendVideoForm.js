import React, { Component } from 'react';
import { uploadFile } from 'react-s3';
import config from '../config';
import axios from 'axios';

const configS3 = {
    bucketName: config.s3Bucket,
    region: 'sa-east-1',
    accessKeyId: config.key,
    secretAccessKey: config.secretKey,
}
class SendVideoForm extends Component {
    constructor () {
        super();
        this.state = {
            file: '',
            loaded: 0
        };
    }
    handleFileUpload = (e) => {
        console.log(e.target.files[0]);
        uploadFile(e.target.files[0], configS3)
        .then((data)=>{
            var videoName = data.key;
            axios.post('/converter', { videoName }) 
            .then((result) => {
                //console.log(this.state.fileInput);
            });
        })
        .catch( (err) => {
            alert(err);
        })
    }
    render() {
        return(
        <div className="container">
            <input id="fileInput" className="form-control" type="file" onChange={this.handleFileUpload}/>
        </div>
        )
    }
}

export default SendVideoForm;