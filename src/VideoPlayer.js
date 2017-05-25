import React, { Component } from 'react';
import videojs from 'video.js';
import './VideoPlayer.css';


export default class VideoPlayer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentVideoIdx: this.props.currentVideoIndx,
    };



    this._skipToNextVideo = this._skipToNextVideo.bind(this);
    this._skipToPreviousVideo = this._skipToPreviousVideo.bind(this);

  }


  componentDidMount() {
    // instantiate video.js
    this.player = videojs(this.videoNode, this.props, function onPlayerReady() {
      console.log('onPlayerReady',);
    });


    this.player.on('loadedmetadata', () => {
      // FIXME: Skip to the end of the first stock video. Loading straight from FB causes a media error.
      // if (this.state.currentVideoIdx === 0) {
      //   this.player.currentTime(46);
      // }

    })

    this.player.on('ended', () => {
      // console.log('Ended state props', this.state.currentVideoIdx);

      var nextVideoIdx = (this.state.currentVideoIdx + 1) % this.props.streams.length;
      
      this.player.src({
        type: "video/mp4",
        src: this.props.streams[nextVideoIdx].videoSrcUrl
      });

      this.setState({ currentVideoIdx: nextVideoIdx });

    });
 
  }


  // _updateCurrentVideoSrc() {}

  componentWillReceiveProps(nextProps) {
    // console.log('Next props', nextProps.currentVideoIndx);


    this.player.src({
      type: "video/mp4",
      src: nextProps.streams[nextProps.currentVideoIndx].videoSrcUrl
    }); 
    this.setState({ currentVideoIdx: nextProps.currentVideoIndx });
  }

  // componentWillUpdate(){}
  // componentDidUpdate(){}


  // destroy player on unmount
  componentWillUnmount() {
    if (this.player) {
      this.player.dispose()
    }
  }




  _skipToPreviousVideo(e) {
    e.preventDefault();

    // console.log(this.state.currentVideoIdx);

    if (this.state.currentVideoIdx === 1) {
      return;
    }

    var nextVideoIdx = (this.state.currentVideoIdx - 1) % this.props.streams.length;
    this.player.src({
      type: "video/mp4",
      src: this.props.streams[nextVideoIdx].videoSrcUrl
    });
    this.setState({ currentVideoIdx: nextVideoIdx });

  }

  _skipToNextVideo(e) {
    e.preventDefault();

    var nextVideoIdx = (this.state.currentVideoIdx + 1) % this.props.streams.length;
    this.player.src({
      type: "video/mp4",
      src: this.props.streams[nextVideoIdx].videoSrcUrl
    });
    this.setState({ currentVideoIdx: nextVideoIdx });

  }

  // wrap the player in a div with a `data-vjs-player` attribute
  // so videojs won't create additional wrapper in the DOM
  // see https://github.com/videojs/video.js/pull/3856
  render() {
    return (
      <div data-vjs-player className="video-js vjs-big-play-centered">
        <a onClick={this._skipToNextVideo}><i className="fa fa-chevron-right fa-3x nextVideo"></i></a>
        <video ref={ node => this.videoNode = node } className=""></video>
        <a onClick={this._skipToPreviousVideo}><i className="fa fa-chevron-left fa-3x prevVideo"></i></a>
      </div>
    )
  }
}