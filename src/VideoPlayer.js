import React, { Component } from 'react';
import videojs from 'video.js'
import random from 'random-js';


export default class VideoPlayer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentVideoIdx: 0,

    };

  }


  componentDidMount() {
    // instantiate video.js
    this.player = videojs(this.videoNode, this.props, function onPlayerReady() {
      console.log('onPlayerReady', this);

    });


    this.player.on('loadedmetadata', () => {
      // FIXME: Skip to the end of the first stock video. Loading straight from FB causes a media error.
      if (this.state.currentVideoIdx == 0) {
        this.player.currentTime(45);
      }

    })

    this.player.on('ended', () => {

      var nextVideoIdx = (this.state.currentVideoIdx + 1) % this.props.streams.length;
      console.log(nextVideoIdx);

      this.player.src({
        type: "video/mp4",
        src: this.props.streams[nextVideoIdx]
      });

      this.setState({ currentVideoIdx: nextVideoIdx });

    });
 
  }

  // destroy player on unmount
  componentWillUnmount() {
    if (this.player) {
      this.player.dispose()
    }
  }

  // wrap the player in a div with a `data-vjs-player` attribute
  // so videojs won't create additional wrapper in the DOM
  // see https://github.com/videojs/video.js/pull/3856
  render() {
    return (
      <div data-vjs-player>
        <video ref={ node => this.videoNode = node } className="video-js"></video>
      </div>
    )
  }
}