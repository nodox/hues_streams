// Useful when customizing video player
// https://github.com/videojs/video.js/blob/master/docs/guides/react.md
// http://docs.videojs.com/tutorial-react.html

import React, { Component } from 'react';
import { Link } from 'react-router-dom';


import './Tile.css';

class Tile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: null,
    };
  }

  componentDidMount() {  }

  render() {

    //  Get from google new tab
    return (
      <Link to={this.props.url} className="category-tile">
        <div className="category-title">
          <span>{this.props.title}</span>
        </div>
      </Link>
    );
  }
}

export default Tile;