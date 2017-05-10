// Useful when customizing video player
// https://github.com/videojs/video.js/blob/master/docs/guides/react.md
// http://docs.videojs.com/tutorial-react.html

import React, { Component } from 'react';
import axios from 'axios';
import VideoPlayer from './VideoPlayer';

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
      autoplay: true,
      controls: true,
      muted: false,
      fluid: true,

      // FIXME: Uses placeholder video as first source. Get straight from FB causes a media playback error.
      sources: [{
        src: 'https://vjs.zencdn.net/v/oceans.mp4',
        type: 'video/mp4'
      }],
      streams: this.state.videos


    };

    return (

      <div className="App Stream">
        <div className="App-header">
          <h2>Welcome to {this.state.name}</h2>
          <a className="homeBtn" href="/">Home</a>
        </div>

        <div>
          <p>{this.state.description}</p>
        </div>

        <div>
          <VideoPlayer { ...videoJsOptions } />
        </div>

      </div>
    );
  }
}

export default Stream;