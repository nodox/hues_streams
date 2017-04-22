import React, { Component } from 'react';
import axios from 'axios';
import './Stream.css';

class Stream extends Component {
  constructor(props) {
    super(props);

    this.state = {
      videos: [],
      name: ''
    };
  }

  componentDidMount() {
    axios.get('/streams')
      .then(res => {
        // const posts = res.data.data.children.map(obj => obj.data);
        // this.setState({ posts });
        const videos = res.data[0]["videos"];
        const name = res.data[0]["name"];

        console.log(res.data[0]);

        this.setState({ videos });
        this.setState({ name });
      })
      .catch( err => {
        console.log(err);
      });


  }

  render() {

    return (



      <div className="Stream">

        {this.props.match.params.id}
        {this.state.videos.map(url =>

          <div className="fb-video" data-href={url} data-width="500" data-show-text="false">
            <div className="fb-xfbml-parse-ignore">
              <blockquote cite={url}>
                <a href={url}>How to Share With Just Friends</a>
                <p>How to share with just friends.</p>
                Posted by <a href="https://www.facebook.com/facebook/">Facebook</a> on Friday, December 5, 2014
              </blockquote>
            </div>
          </div> 
        )}
      </div>
    );
  }
}

export default Stream;