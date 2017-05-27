// Useful when customizing video player
// https://github.com/videojs/video.js/blob/master/docs/guides/react.md
// http://docs.videojs.com/tutorial-react.html

import React, { Component } from 'react';
import axios from 'axios';
import VideoPlayer from './VideoPlayer';
// import shuffle from 'shuffle-array';
import logo from './logo.svg';

import './Stream.css';

class Stream extends Component {
  constructor(props) {
    super(props);

    this.state = {
      videos: [],
      name: null,
      description: null,
      currentVideoIndx: 0
    };

    this._open = this._open.bind(this);
    this._close = this._close.bind(this);
    this._updateVideoSrc = this._updateVideoSrc.bind(this);
  }

  componentDidMount() {
    axios.get('/api/stream/' + this.props.match.params.id.toString())
      .then(res => {
        const videos = res.data["videos"];
        const name = res.data["name"];
        const description = res.data["description"];

        // console.log(res.data);

        this.setState({ videos });
        this.setState({ name });
        this.setState({ description });
      })
      .catch( err => {
        console.log(err);
      });

  }


  _open() {
    this.sidenav.style.width = "300px";
  }

  _close() {
    this.sidenav.style.width = "0";
  }


  _updateVideoSrc(e, videoIndex) {
    e.preventDefault();
    this.setState({ currentVideoIndx: videoIndex });
  }


  render() {
    const videoJsOptions = {
      autoplay: true,
      controls: true,
      muted: false,
      fluid: false,

      // FIXME: Uses placeholder video as first source. Get straight from FB causes a media playback error.
      sources: [{
        src: 'https://vjs.zencdn.net/v/oceans.mp4',
        // src: this.state.videos[0],  // FIXME: This line causes a media playback error. Maybe the resource is not ready
        type: 'video/mp4'
      }],
      streams: this.state.videos,
      currentVideoIndx: this.state.currentVideoIndx,

    };


    return (

      <div className="video-app">
        <div className="header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to {this.state.name}</h2>
          <p>{this.state.description}</p>
          <a className="homeBtn" href="/">Home</a>
        </div>

        <nav ref={node => this.sidenav = node} id="mySidenav" className="sidenav nav flex-column">
          <h2 className="">Up next</h2>
          <a className="closebtn" onClick={this._close}>&times;</a>
          <div className="menuContainer">
            {this.state.videos.map((obj, index) => {
              return (
                <a className="" href="#" onClick={(e) => this._updateVideoSrc(e, index)}>
                  <img className="scaledImageFitWidth" src={obj.poster} alt={obj.title}></img>
                  <p>{obj.title} | {obj.videoLength}</p>
                </a>
              )
            })}
          </div>
        </nav>

         <div className="view-main">
          <div className="container-player-chat">
            <div className="video-player">
              <a onClick={this._open} className="playlist-schedule">Playlist</a>
              <VideoPlayer {...videoJsOptions} />
            </div>         
          </div>        

         </div>

      </div>
    );
  }
}

export default Stream;