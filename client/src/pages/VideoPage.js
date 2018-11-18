import React, { Component } from 'react';
import Header from '../components/Header';

class VideoPage extends Component {
    state ={
        id:null
    }
    componentDidMount(){
    let id = this.props.match.params.video_id;
    let link = "https://s3.amazonaws.com/videosconverterdb/videos/" + id;
        this.setState({
            id:link
        })
    }
    render() {
    return (
        <section>
            <div className="container">
                <div className="row">
                    <Header title="assista"/>
                    <video className="video-display" controls controlsList="nodownload" >
                        <source src={this.state.id} type="video/mp4"/>
                    </video>
                </div>
            </div>
        </section>
    );
    }
}

export default VideoPage;