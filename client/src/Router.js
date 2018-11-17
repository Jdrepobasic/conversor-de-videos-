import React, { Component } from 'react';

import Home from './pages/Home';
import VideoPage from './pages/VideoPage';

import { BrowserRouter, Route } from 'react-router-dom';


class Router extends Component {
    render() {
        return (
        <BrowserRouter>
            <div className="app">
                <Route exact path="/" component={Home}/>
                <Route path="/videos/:video_id" component={VideoPage}/>
            </div>
        </BrowserRouter>
        );
    }
}

export default Router;