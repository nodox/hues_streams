// Useful when customizing video player
// https://github.com/videojs/video.js/blob/master/docs/guides/react.md
// http://docs.videojs.com/tutorial-react.html

import React, { Component } from 'react';
import axios from 'axios';
import VideoPlayer from './VideoPlayer';
import shuffle from 'shuffle-array';
import logo from './logo.svg';


import './Stream.css';

class Stream extends Component {
  constructor(props) {
    super(props);

    this.state = {
      videos: [],
      name: null,
      description: null
    };
  }

  componentDidMount() {
    axios.get('/api/stream/' + this.props.match.params.id.toString())
      .then(res => {
        const videos = res.data["videos"];
        const name = res.data["name"];
        const description = res.data["description"];
        shuffle(videos);

        console.log(res.data);

        this.setState({ videos });
        this.setState({ name });
        this.setState({ description });
      })
      .catch( err => {
        console.log(err);
      });


  }

  render() {
    const videoJsOptions = {
      autoplay: false,
      controls: true,
      muted: true,
      fluid: true,

      // FIXME: Uses placeholder video as first source. Get straight from FB causes a media playback error.
      sources: [{
        src: 'https://vjs.zencdn.net/v/oceans.mp4',
        // src: this.state.videos[0],  // FIXME: This line causes a media playback error. Maybe the resource is not ready
        type: 'video/mp4'
      }],
      streams: this.state.videos


    };

    return (

      <div className="App">
        <div className="header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to {this.state.name}</h2>
          <p>{this.state.description}</p>
          <a className="homeBtn" href="/">Home</a>
        </div>

        <div className="viewbox">
          <div className="dashboard-stream">
            <div className="container-player-chat">
              <div className="video-player">
                <VideoPlayer { ...videoJsOptions } />
              </div>
              <div className="video-chatbox">
                Chatbox
              </div>            
            </div>        
            <div className="video-playlist">
              Playlist
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default Stream;