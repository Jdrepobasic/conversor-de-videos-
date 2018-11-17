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
            fileItems: [],
            videoName:[]
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
    handleClick = () => {
        axios.get('/list')
        .then(res => {
                this.setState({
                fileItems: res.data
            })
        })
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
                return(
                    <Link to={'videos/' + this.handleData(item.Key)} key={i}>
                        <VideoListItem
                            name = {this.handleData(item.Key)}       
                        />
                    </Link>
                )
            })
        ) : (
            <VideoListItem
            name = "nenhum item na lista"
            />
        )
        
        if(this.props.status ==='convertendo' ){
            setTimeout(this.handleList, 5000);
        }
        return (
        <ul>
            <li><h2>{this.props.fileName}</h2> <span>{this.props.status}</span></li>
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