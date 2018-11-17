import React, { Component } from 'react';
import axios from 'axios';
import VideoListItem from './VideosListItem';
import { Link } from 'react-router-dom';

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
    render() {
        const { fileItems } = this.state;
            var videoListArray =  fileItems.length ? (
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
        return (
        <ul>
            {videoListArray}
        </ul>
    );
    }
}

export default VideoList;