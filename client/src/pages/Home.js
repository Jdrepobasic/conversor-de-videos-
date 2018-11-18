import React, { Component } from 'react';

import Header from '../components/Header';
import SendVideoForm from '../components/SendVideoForm';
import VideoList from '../components/VideosList';

class Home extends Component {
    render() {
        return (
            <section className="container">
                <div className="home">
                    <div className="row justify-content-center">
                    <Header title="converta e assista"/>
                    </div>
                    <div className="row justify-content-center">
                        <SendVideoForm/>
                    </div>
                    <div className="row justify-content-center">
                        <VideoList/>
                    </div>
                </div>
            </section>           
        );
    }
}


export default Home;