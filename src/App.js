import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

import venueApi from './helpers/venueApi';

import Header from './components/Header';
import UncategorizedPhotoContainer from './components/UncategorizedPhotoContainer';
import CenterToolbar from './components/CenterToolbar';
// import ScrollablePhotoContainer from './components/ScrollablePhotoContainer';

class App extends Component {
  constructor() {
    super();
    this.state = {
      totalPhotosSelected: 0,
      venueAdmins: []
    };
  }

  test = () => {
    console.log("test");
  }

  getAdmins = () => {
    axios.get(venueApi('venueadmins'))
    .then((res) => this.setState({ venueAdmins: res.data }) )
    .catch((err) => console.log(err.response.data) );
  }

  getAdmin = (id) => {
    axios.get(venueApi(`venueadmins/${id}`))
    .then((res) => this.setState({ venueAdmin: res.data }) )
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
    const { venueAdmins, totalPhotosSelected } = this.state;


    return (
      <div className="App">
        <Header
          venueAdmins={venueAdmins}
          getAdmins={this.getAdmins}
          getAdmin={this.getAdmin}
        />
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
