import React, { Component } from 'react';
import './App.css';
import Header from './components/Header/Header';
import SendVideoForm from './components/SendVideoForm/SendVideoForm';
import VideoComponent from './components/VideoComponent/VideoComponent';


class App extends Component {
  state = {
    response: '',
    post: '',
    responseToPost: '',
  };

  render() {
    return (
      <div className="App">
        <section className="container">
          <div className="row justify-content-center">
            <Header title="Conversor Jonathan Para Samba"/>
          </div>
        </section>
        <section className="container">
          <div className="row justify-content-center">
            <SendVideoForm/>
          </div>
        </section>
      </div>
    );
  }
}

export default App;