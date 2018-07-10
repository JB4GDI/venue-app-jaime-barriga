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

  getAdminById = (admin_id) => {
    axios.get(venueApi(`venueadmins/${admin_id}`))
    .then((res) => this.setState({ venueAdmin: res.data }) )
    .catch((err) => console.log(err.response.data) );
  }

  updatePhoto = (adminId, venueId, categoryId, photo) => {
    axios.patch(venueApi(`venueadmins/${adminId}/venues/${venueId}/categorys/${categoryId}/photos/${photo.id}`), photo)
    .then((res) => console.log("PhotoUpdated!"))
    .catch((err) => console.log(err.response.data))
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

          updatePhoto={this.updatePhoto}
        />
      </div>
    );
  }
}

export default App;
