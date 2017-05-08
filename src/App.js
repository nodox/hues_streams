import React, { Component } from 'react';
// import Link from 'react-router-dom';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';



class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      channels: [],
    };
  }

  componentDidMount() {
    axios.get('/api/stream')
      .then(res => {
        // const posts = res.data.data.children.map(obj => obj.data);
        // this.setState({ posts });
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
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to Project Stream</h2>
          <p>Select a video stream to watch your favorite videos on the internet.</p>
        </div>
        <div>
          <ul className="nav">
            {this.state.channels.map(obj => {
                console.log(obj);
              return <li key={obj.id.toString()}><a href={"/channel/"+obj.id.toString()}>{obj.name}</a></li>
            })}
          </ul>
        </div>
      </div>
    );
  }
}

export default App;
