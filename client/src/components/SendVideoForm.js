import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router'
import { UploadFileAction, ConvertingFile, Finalized, ErrorUpload, Clean } from '../actions/actions'; 
import { uploadFile } from 'react-s3';
import config from './config';
import axios from 'axios';


const configS3 = {
    bucketName: config.s3Bucket,
    region: 'sa-east-1',
    accessKeyId: config.key,
    secretAccessKey: config.secretKey,
}

class SendVideoForm extends Component {

    handleFileUpload = (file) => {
        console.log(file.target.files[0])
        this.props.UploadFile();
        uploadFile(file.target.files[0], configS3)
            .then((data)=>{
                console.log(data.key)
                this.props.Finalized();
                console.log(this.props.status);
                var videoName = data.key;
                axios.post('/converter', { videoName })
                .then((data)=>{
                    console.log(data);
                })
                .catch((err)=>{
                    console.log(err);
                })
            })
            .catch( (err) => {
                console.log(err);
            })
    }
    componentWillUpdate(nextProps, nextState){

    }

    render() {
        return(
        <div className="container">
            <input id="fileInput" className="form-control" type="file" onChange={this.handleFileUpload}/>
            <div>
                <li id="status">{this.props.status}</li>

            </div>
        </div>
        
        );
    }
}

const mapStateToProps = (state) => {
    return{
        file: state.file,
        status: state.status
    }
}
const mapDispatchToProps = (dispatch) =>{
    return{
        UploadFile: () => {dispatch(UploadFileAction())},
        ConvertFile: () => {dispatch(ConvertingFile())},
        Finalized: () => {dispatch(Finalized())},
        Error: () => {dispatch(ErrorUpload())},
        Clean: () => {dispatch(Clean())},
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SendVideoForm));