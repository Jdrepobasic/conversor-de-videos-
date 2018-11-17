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
    switch (action.type){
        case'UPLOAD_FILE':
            return uploadFile(action.file.target.files[0], configS3)
            .then((data)=>{
                state = Object.assign({}, state, { 
                    file: data.key
                });
                var node = document.createElement("LI");                 
                var textnode = document.createTextNode(data.key);        
                node.appendChild(textnode);                        
                document.getElementById("listVideos").appendChild(node);

                var videoName = state.file;
                axios.post('/converter', { videoName })
                .then(()=>{

                })
            })
            .catch( (err) => {
                alert(err);
            })
        default:
            return state;
    }
}

export default fileReducer
