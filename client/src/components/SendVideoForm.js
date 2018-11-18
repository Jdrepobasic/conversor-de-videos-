import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router'
import { UploadFileAction, ConvertingFile, Finalized, ErrorUpload, Clean } from '../actions/actions'; 
import { uploadFile } from 'react-s3';
import config from '../config';
import axios from 'axios';


const configS3 = {
    bucketName: config.s3Bucket,
    region: 'us-east-1',
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
}

class SendVideoForm extends Component {
    handleFileUpload = (file) => {
        
        console.log(file.target.files[0]);
        console.log(file.target.files[0].name);
        this.props.UploadFile(file.target.files[0].name);
        console.log(this.props.fileName)
        uploadFile(file.target.files[0], configS3)
            .then((data)=>{
                this.props.ConvertFile(data.key);
                console.log(this.props.fileName);
                var videoName = data.key;
                axios.post('/converter', { videoName })
                .then(res => {
                    console.log(res.data);
                })
                .catch((err)=>{
                    console.log(err);
                })
            })
            .catch( (err) => {
                console.log(err);
            })
    }
    render() {
        return(
        <div className="container">
            <input id="fileInput" className="form-control input-send-file" type="file" onChange={this.handleFileUpload}/>
        </div>
        
        );
    }
}

const mapStateToProps = (state) => {
    return{
        fileName: state.fileName,
        status: state.status
    }
}
const mapDispatchToProps = (dispatch) =>{
    return{
        UploadFile: (file) => {dispatch(UploadFileAction(file))},
        ConvertFile: (file) => {dispatch(ConvertingFile(file))},
        Finalized: () => {dispatch(Finalized())},
        Error: () => {dispatch(ErrorUpload())},
        Clean: () => {dispatch(Clean())},
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SendVideoForm));