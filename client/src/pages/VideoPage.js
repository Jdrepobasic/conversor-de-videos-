import React, { Component } from 'react';


class VideoPage extends Component {
    state ={
        id:null
    }
    componentDidMount(){
    let id = this.props.match.params.video_id;
    let link = "https://s3-sa-east-1.amazonaws.com/convertervideosdb/videos/" + id;
        this.setState({
            id:link
        })
    }
    render() {
    return (
        <div>
            <video widtth="800" height="600" controls controlsList="nodownload" >
                <source src={this.state.id} type="video/mp4"/>
            </video>
        </div>
    );
    }
}

export default VideoPage;