import React, { Component } from 'react';
import axios from 'axios';
import VideoListItem from './VideosListItem';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router'
import { UploadFileAction, ConvertingFile, Finalized, ErrorUpload, Clean } from '../actions/actions'; 


class VideoList extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            fileItems: []
        };
    }
    componentDidMount(){
        axios.get('/list')
        .then(res => {
                this.setState({
                fileItems: res.data
            })
        })
        
    }
    componentWillUnmount(){
        clearTimeout(this.handleList());
    }
    handleClick = () => {
        this.props.Clean();
    }
    handleData = (e) => {
        var getCleanName = e.replace('videos/','');
        return getCleanName;
    }
    removeFirstObject = (e) =>{
        var removeFirst = e.shift();
        return removeFirst;
    }
    handleList = () => {
        console.log("aqui");
        axios.get('/list')
            .then(res => {
                    this.setState({
                    fileItems: res.data
                })
            })
            setTimeout(this.handleList, 5000);
    }

    render() {
        const { fileItems } = this.state;
            this.removeFirstObject(fileItems);
            var videoListArray = fileItems.length ? (
                fileItems.map((item, i) => {
                if(this.handleData(item.Key) === this.props.fileName && this.props.status === 'convertendo'){
                    this.props.Finalized()
                }
                return(
                    <Link onClick={this.props.Clean} to={'videos/' + this.handleData(item.Key)} key={i}>
                        <VideoListItem
                            name = {this.handleData(item.Key)}       
                        />
                    </Link>
                )
            })
        ) : (
            <div
            />
        )
        if(this.props.status ==='convertendo' ){
            setTimeout(this.handleList, 5000);
        } 
        return (
        <ul className="video-list">
            <li className="video-list__pre-item">{this.props.fileName}</li>
            <span className="notifications">{this.props.status}</span>
            {videoListArray}
        </ul>
    );
    }
}

const mapStateToProps = (state) => {
    return{
        status: state.status,
        fileName:state.fileName
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(VideoList)); 