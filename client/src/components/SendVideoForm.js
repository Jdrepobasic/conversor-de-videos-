import React, { Component } from 'react';
import { connect } from 'react-redux';
import { UploadFileAction } from '../actions/actions'; 

class SendVideoForm extends Component {
    handleFileUpload = (e) => {
        this.props.UploadFile(e);
    }

    render() {
        return(
        <div className="container">
            <input id="fileInput" className="form-control" type="file" onChange={this.handleFileUpload}/>
            <div id="listVideos">
            
            </div>
        </div>
        
        );
    }
}

const mapStateToProps = (state) => {
    return{
        file: state.file
    }
}
const mapDispatchToProps = (dispatch) =>{
    return{
        UploadFile: (file) => {dispatch(UploadFileAction(file))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SendVideoForm);