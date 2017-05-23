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
      description: null,
      playlist: ['aaa', 'bbb', 'ccc', 'ddd', 'eee'],
      sample: {
        poster: 'https://scontent-ord1-1.xx.fbcdn.net/v/t15.0-10/cp0/e15/q65/c88.0.224.224/p75x225/18619259_10154663022924205_3527330651634139136_n.jpg?efg=eyJpIjoidCJ9&oh=024af54f75501908af856d51f91d35ac&oe=59AEB0C1',
        src: "https://scontent-ord1-1.xx.fbcdn.net/v/t15.0-10/p75x225/18619259_10154663022924205_3527330651634139136_n.jpg?oh=659fa547ae8113ce66140b23a014db82&oe=59AD9E93",
        title: 'Seth Rich "Investigator" Rod Wheeler Exposed As A Fraud'
      }
    };

    this._open = this._open.bind(this);
    this._close = this._close.bind(this);
  }

  componentDidMount() {
    axios.get('/api/stream/' + this.props.match.params.id.toString())
      .then(res => {
        const videos = res.data["videos"];
        const name = res.data["name"];
        const description = res.data["description"];
        shuffle(videos);

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

    console.log(this.sidenav);
    this.sidenav.style.width = "300px";

  }

  _close() {
    this.sidenav.style.width = "0";
  }

  render() {
    const videoJsOptions = {
      autoplay: true,
      controls: true,
      muted: true,
      fluid: false,

      // FIXME: Uses placeholder video as first source. Get straight from FB causes a media playback error.
      sources: [{
        src: 'https://vjs.zencdn.net/v/oceans.mp4',
        // src: this.state.videos[0],  // FIXME: This line causes a media playback error. Maybe the resource is not ready
        type: 'video/mp4'
      }],
      streams: this.state.videos,

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
            {this.state.playlist.map(obj => {
              return (
                <a className="" href="#">
                  <img className="scaledImageFitWidth" src={this.state.sample.poster}></img>
                  <p>{this.state.sample.title}</p>
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
            <div className="video-chatbox">
              Chatbox
            </div>            
          </div>        

         </div>

      </div>
    );
  }
}

export default Stream;