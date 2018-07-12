import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

import allPhotos from './helpers/allPhotos';
import venueApi from './helpers/venueApi';

import Header from './components/Header';
import AdminsContainer from './components/AdminsContainer';

/*
  This app lets us interact directly with the venue-API containing all a venue's photos.

  The API is arranged in a way that is mimicked by the app:

  Admin
    Venue
      Category (uncategorized/profile/home rental/planning)
        Photos

  Some of the global functions that interact with the API (through axios) live here.
*/
class App extends Component {
  constructor() {
    super();
    this.state = {  
      venueAdmins: [], // This stores the state of the app from the API
      debugMode: false // Right now, all this does is turn on a button to regenerate all photos
    };
  }

  /* 
    Before we are finished loading the application, we will populate everything into App.state 
  */
  componentDidMount() {
    this.getAdmins();
  }

  /* 
    This will call the API and set the state to whatever comes back.  It basically
    refreshes the app.
  */
  getAdmins = () => {
    axios.get(venueApi('venueadmins'))
    .then((res) => this.setState({ venueAdmins: res.data }) )
    .catch((err) => console.log(err.response.data) );
  }

  submitPhoto = (adminId, venueId, categoryId, photo) => {
    axios.post(venueApi(`venueadmins/${adminId}/venues/${venueId}/categorys/${categoryId}/photos/`), photo)
    .then((res) => console.log("Photo successfully submitted!"))
    .catch((err) => console.log(err.response.data))
  }

  updatePhoto = (adminId, venueId, categoryId, photo) => {
    axios.patch(venueApi(`venueadmins/${adminId}/venues/${venueId}/categorys/${categoryId}/photos/${photo.id}`), photo)
    .then((res) => console.log("Photo successfully updated!"))
    .catch((err) => console.log(err.response.data))
  }

  deletePhoto = (adminId, venueId, categoryId, photo) => {
    axios.delete(venueApi(`venueadmins/${adminId}/venues/${venueId}/categorys/${categoryId}/photos/${photo.id}`), photo)
    .then((res) => console.log("Photo successfully deleted!") )
    .catch((err) => console.log(err.response.data) );
  }

  /* 
    A secret debug function.  If you're in debug mode, it will takes all the photos I have online 
    and put them into the API.

    Refresh the app when this is done.
  */
  generateAllPhotos = () => {

    var thePhotos = allPhotos();

    thePhotos.forEach( (photo) => {
      this.submitPhoto(1, 1, 1, photo);
    });
  }


  /* 
    There are two main blocks to this application

    1.  The Header
    2.  Everything else.  We start the chain with the admin (AdminsContainer)
  */
  render() {

    const { venueAdmins } = this.state;

    return (
      <div className="App">
        <Header
          venueAdmins={venueAdmins}
          getAdmins={this.getAdmins}
        />
        {
          this.state.debugMode
          ?
          <span onClick={ () => this.generateAllPhotos() }>Recreate Photos</span>
          :
          <span className="hidden"></span>
        }
        
        <AdminsContainer 
          venueAdmins={venueAdmins}
          getAdmins={this.getAdmins}

          submitPhoto={this.submitPhoto}
          updatePhoto={this.updatePhoto}
          deletePhoto={this.deletePhoto}
        />
      </div>
    );
  }
}

export default App;
