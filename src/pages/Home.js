import React, { Component } from 'react';
import axios from 'axios';
import Tile from '../partials/Tile';

class Home extends Component {

  constructor(props) {
    super(props);

    this.state = {
      channels: [],
    };
  }

  componentDidMount() {
    axios.get('/api/stream')
      .then(res => {
        const channels = res.data;
        // console.log(res.data);
        this.setState({ channels });
      })
      .catch( err => {
        console.log(err);
      });
  }

  render() {
    return (
      <div className="App">

        <div className="header">
          <h2>Welcome to Project Stream</h2>
          <p>Select a video stream to watch your favorite videos on the internet.</p>
          <p>Contact us at hello@huesstartup.com</p>
        </div>


        <div className="category-tiles">
          {Object.keys(this.state.channels).map( (key) => {
              var channel = this.state.channels[key];
              return <Tile key={channel.id.toString()} url={"/channel/"+key.toString()} title={channel.name.toString()} />
            }
          )}
        </div>

      </div>
    );
  }
}

export default Home;
