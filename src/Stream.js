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
    axios.get('/api/stream/' + this.props.match.params.id.toString())
      .then(res => {
        // const posts = res.data.data.children.map(obj => obj.data);
        // this.setState({ posts });
        const videos = res.data["videos"];
        const name = res.data["name"];


        console.log(res.data);

        this.setState({ videos });
        this.setState({ name });
      })
      .catch( err => {
        console.log(err);
      });


  }

  render() {

    return (



      <div className="App Stream">
        <div className="App-header">
          <h2>Welcome to {this.state.name}</h2>
          <a href="/">Home</a>
        </div>

          {this.state.videos.map(url =>

            <div className="fb-video" data-href={url} data-width="500" data-show-text="false">
              <div className="fb-xfbml-parse-ignore">
                <blockquote cite={url}>
                  <p>Videos are loading. Please refresh after 60 secs if nothing shows</p>
                </blockquote>
              </div>
            </div> 
          )}

      </div>
    );
  }
}

export default Stream;