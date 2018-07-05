import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

import venueApi from './helpers/venueApi';

import Header from './components/Header';
import UncategorizedPhotoContainer from './components/UncategorizedPhotoContainer';
import CenterToolbar from './components/CenterToolbar';
import ScrollablePhotoContainer from './components/ScrollablePhotoContainer';

class App extends Component {
  constructor() {
    super();
    this.state = {
      totalPhotosSelected: 0
    };
  }

  test = () => {
    console.log("test");
  }

  getAdmins = () => {
    axios.get(venueApi('venueadmins'))
    .then((res) => console.log(res.data) )
    .catch((err) => console.log(err.response.data) );
  }

  increasePhotosSelected = () => {
    this.setState({
      totalPhotosSelected: this.state.totalPhotosSelected + 1
    });
  }

  decreasePhotosSelected = () => {
    this.setState({
      totalPhotosSelected: this.state.totalPhotosSelected - 1
    });
  }

  render() {
    const { totalPhotosSelected } = this.state;


    return (
      <div className="App">
        <p onClick={ () => this.getAdmins() }>CLICK ME</p>
        <Header getAdmins={this.getAdmins}/>
        <UncategorizedPhotoContainer 
          totalPhotosSelected={this.totalPhotosSelected}
          increasePhotosSelected={this.increasePhotosSelected}
          decreasePhotosSelected={this.decreasePhotosSelected}
        />
        <CenterToolbar />
      </div>
    );
  }
}

export default App;
