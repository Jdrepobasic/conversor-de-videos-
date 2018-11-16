import { uploadFile } from 'react-s3';
import config from '../config';
import axios from 'axios';

const initState={
    file: ''
}
const configS3 = {
    bucketName: config.s3Bucket,
    region: 'sa-east-1',
    accessKeyId: config.key,
    secretAccessKey: config.secretKey,
}
const fileReducer = (state = initState, action) =>{
    if(action.type ==='UPLOAD_FILE'){
        console.log(action.file.target.files[0]);
        uploadFile(action.file.target.files[0], configS3)
        .then((data)=>{
            state = Object.assign({}, state, { file: data.key });
            var videoName = state.file;
            axios.post('/converter', { videoName }) 
            .then((result) => {
            });
        })
        .catch( (err) => {
            alert(err);
        })
    }
    return state;
}

export default fileReducer;