import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

import allPhotos from './helpers/allPhotos';
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

  /* Before we are finished loading the application, we will populate everything into App.state */
  componentWillMount() {
    this.getAdmins();
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

  submitPhoto = (adminId, venueId, categoryId, photo) => {

    console.log("APP Submitting photo: ");
    console.log(photo);

    axios.post(venueApi(`venueadmins/${adminId}/venues/${venueId}/categorys/${categoryId}/photos/`), photo)
    .then((res) => console.log("Photo successfully submitted!"))
    .catch((err) => console.log(err.response.data))
  }

  updatePhoto = (adminId, venueId, categoryId, photo) => {

    console.log("APP Updating photo: ");
    console.log(photo);

    axios.patch(venueApi(`venueadmins/${adminId}/venues/${venueId}/categorys/${categoryId}/photos/${photo.id}`), photo)
    .then((res) => console.log("Photo successfully updated!"))
    .catch((err) => console.log(err.response.data))
  }

  /* Because we are altering the state, we need to reload the whole state when done. */
  deletePhoto = (adminId, venueId, categoryId, photo) => {

    console.log("APP Deleting photo: ");
    console.log(photo);


    axios.delete(venueApi(`venueadmins/${adminId}/venues/${venueId}/categorys/${categoryId}/photos/${photo.id}`), photo)
    .then((res) => console.log("Photo successfully deleted!") )
    .catch((err) => console.log(err.response.data) );
  }

  /* For testing.  Takes all the photos I have online and puts them into the API */
  // generateAllPhotos = () => {

  //   var thePhotos = allPhotos();

  //   thePhotos.forEach( (photo) => {
  //     this.submitPhoto(1, 1, 1, photo);
  //   });
  // }


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
        <p onClick={ () => this.generateAllPhotos() }>Recreate Photos</p>
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
