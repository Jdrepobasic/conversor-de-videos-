import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router'
import { UploadFileAction, ConvertingFile, Finalized, ErrorUpload, Clean } from '../actions/actions'; 
import { uploadFile } from 'react-s3';
import config from '../config';
import axios from 'axios';

// configuração AWS para fazer upload do video, é preciso passar as keys corretas antes de publicar no Heroku
const configS3 = {
    bucketName: config.s3Bucket,
    region: 'us-east-1',
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
}

class SendVideoForm extends Component {
    //função de upload do video
    handleFileUpload = (file) => {
        //muda state para nome do arquivo e colaca status de enviando
        this.props.UploadFile(file.target.files[0].name);
        uploadFile(file.target.files[0], configS3)
            .then((data)=>{
                //atualiza status para convertendo
                this.props.ConvertFile(data.key);
                console.log(this.props.fileName);
                var videoName = data.key;
                axios.post('/converter', { videoName })
                .then(res => {
                    console.log(res);
                })
            })
            .catch( (err) => {
                this.props.Error();
            })
    }
    render() {
        // atualiza mensagem de error
        var errorMessage = () =>{
            if(this.props.status === "error"){
                return "Alguma coisa está errada tente novamente";
            }
        }
        return(
        <div className="container">
            <label className="label-send-file">Insira um arquivo de vídeo abaixo</label>
            <input id="fileInput" className="form-control input-send-file" type="file" accept="video/*" onChange={this.handleFileUpload}/>
            <p className="error-class">
                {errorMessage()}
            </p>
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