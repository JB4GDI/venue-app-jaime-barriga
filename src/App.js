import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

import venueApi from './helpers/venueApi';

import Header from './components/Header';
import AdminsContainer from './components/AdminsContainer';

class App extends Component {
  constructor() {
    super();
    this.state = {
      totalPhotosSelected: 0,
      venueAdmins: [],
      latestSelectedPhotoLocation: '',
      listOfSelectedPhotos: []
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

  getAdminById = (admin_id) => {
    axios.get(venueApi(`venueadmins/${admin_id}`))
    .then((res) => this.setState({ venueAdmin: res.data }) )
    .catch((err) => console.log(err.response.data) );
  }

  photoSelected = (photoLocation) => {
    /* If the states are different */
    if (this.state.latestSelectedPhotoLocation !== photoLocation) {

    } else {
      //Do nothing.
    }
  }

  // getVenues = () => {

  // }

  // getVenueById = (id) => {

  // }

  // getCategories = () => {

  // }

  // getCategoryById = (id) => {

  // }

  // getPhotos = () => {

  // }

  // getPhotoById = (id) => {

  // }


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

  /* 

    There are two main blocks to this, application

    1.  The Header
    2.  Everything else.  We start the chain with the admin (AdminsContainer)

  */
  render() {

    const { venueAdmins, totalPhotosSelected } = this.state;

    return (
      <div className="App">
        <Header
          venueAdmins={venueAdmins}
          getAdmins={this.getAdmins}
          getAdminById={this.getAdminById}
        />
        <AdminsContainer 
          venueAdmins={venueAdmins}

          increasePhotosSelected={this.increasePhotosSelected}
          decreasePhotosSelected={this.decreasePhotosSelected}
        />
      </div>
    );
  }
}

export default App;
