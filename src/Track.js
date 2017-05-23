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

    this._setPoster = this._setPoster.bind(this);
  }

  componentDidMount() { 
    this._setPoster();
  }

  componentWillMount() {

  }


  _setPoster() {


    // this.trackPoster.style.backgroundImage = `url(${this.props.poster})`;
    // console.log(this.trackPoster.style.backgroundImage);
  }

  render() {


    return (
      <a className="track">
        <span className="">

          <img src={this.props.poster} className="img-responsive"></img>
        </span>
      </a>
    );
  }
}

export default Track;