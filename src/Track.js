// Useful when customizing video player
// https://github.com/videojs/video.js/blob/master/docs/guides/react.md
// http://docs.videojs.com/tutorial-react.html

import React, { Component } from 'react';
import logo from './logo.svg';


import './Track.css';

class Track extends Component {
  constructor(props) {
    super(props);

    // this.state = {
    //   videos: [],
    //   name: null,
    //   description: null,
    //   playlist: ['aaa', 'bbb', 'ccc', 'ddd', 'eee']
    // };
  }

  componentDidMount() {  }

  render() {


    return (
      <a className="track" href="">
        <span className="">
          <div className="track-img"></div>
        </span>
      </a>
    );
  }
}

export default Track;