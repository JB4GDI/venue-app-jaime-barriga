import React from 'react';
import axios from 'axios';

import UncategorizedPhotoContainer from './UncategorizedPhotoContainer';
import ScrollablePhotoContainer from './ScrollablePhotoContainer';

import venueApi from '../helpers/venueApi';

/*
  Parent: SingleVenue
  Children:  
    UncategorizedPhotoContainer
    ScrollablePhotoContainer

  Here we have a single category.  A single category contains photos, but if the category is 
  'unassigned' (UncategorizedPhotoContainer), it's part of the left nav, and behaves differently
  from all the rest.  All other categories become a ScrollablePhotoContainer.

  We do a lot of the heavy lifting for photos here.
*/
class CategoryContainer extends React.Component {

  /*
    Note, the photos are entirely state driven, and they always need to be pulled directly from the API

    Doing anything else will only lead to heartache.
  */

  constructor(props) {
    super(props);
    this.state = {
      photos: []
    };

    /*
      Binding allows us to call these functions from other levels while providing
      access to this component's 'this'
    */
    this.getPhotosFromAPI = this.getPhotosFromAPI.bind(this);
    this.movePhotoLeft = this.movePhotoLeft.bind(this);
    this.movePhotoRight = this.movePhotoRight.bind(this);
    this.updateSinglePhoto = this.updateSinglePhoto.bind(this);
    this.deleteSinglePhoto = this.deleteSinglePhoto.bind(this);
  }

  /*
    Pull in the Photos from the API when this component mounts.
  */
  componentDidMount() {
    this.getPhotosFromAPI(this.props.adminId, this.props.venueId);
  }

  /*
    This will allow us to pull all the photos from the API for the current category.

    Also, it will forcibly sort and rerank the photos if anything is fishy.
  */
  getPhotosFromAPI = (adminId, venueId) => {

    var categoryId = this.props.category.id;

    axios.get(venueApi(`venueadmins/${adminId}/venues/${venueId}/categorys/${categoryId}/photos`))
    .then((res) => this.setState({ photos: this.props.sortPhotos(res.data)}) )
    .catch((err) => console.log(err.response.data) );
  }


  /* 
    After updating a single photo, we want to call the API to update the state.  We make
    that call as the update is returning so the app stays in sync.
  */
  updateSinglePhoto = (adminId, venueId, categoryId, photo) => {
    axios.patch(venueApi(`venueadmins/${adminId}/venues/${venueId}/categorys/${categoryId}/photos/${photo.id}`), photo)
    .then((res) => this.getPhotosFromAPI(adminId, venueId, categoryId))
    .catch((err) => console.log(err.response.data))
  }

  /* 
    If we have multiple photos to update in the same category, we have a small problem:

    We can't call the API to get photos after only one photo has updated, because it will
    have 2 photos with the same rank, and that is a bad state so it will forcibly reindex 
    everything, messing up the order a tiny bit.  

    We only call getPhotosFromAPI() after the FINAL update is made.
  */
  updateMultiplePhotos = (adminId, venueId, categoryId, photoArray) => {

    for (let i = 0; i < photoArray.length - 1; i++) {
      axios.patch(venueApi(`venueadmins/${adminId}/venues/${venueId}/categorys/${categoryId}/photos/${photoArray[i].id}`), photoArray[i])
      .then((res) => console.log("photo with id " + photoArray[i].id + " updated."))
      .catch((err) => console.log(err.response.data))
    }

    /* For the last photo in the array, have it return a call to getPhotosFromAPI() */
    if (photoArray.length > 1) {
      axios.patch(venueApi(`venueadmins/${adminId}/venues/${venueId}/categorys/${categoryId}/photos/${photoArray[photoArray.length - 1].id}`), photoArray[photoArray.length - 1])
      .then((res) => this.getPhotosFromAPI(adminId, venueId, categoryId))
      .catch((err) => console.log(err.response.data))
    }
  }

  /*
    After we delete a single photo, we want to call the API to update the state.  We make
    that call as the update is returning so the app stays in sync.
  */
  deleteSinglePhoto = (adminId, venueId, categoryId, photo) => {
    axios.delete(venueApi(`venueadmins/${adminId}/venues/${venueId}/categorys/${categoryId}/photos/${photo.id}`), photo)
    .then((res) => this.getPhotosFromAPI(adminId, venueId, categoryId))
    .catch((err) => console.log(err.response.data))
  }

  /* 
    Take a photo and have it swap places with the photo on its left.  This is done
    by swapping the rank, updating the API, and refreshing the state.
    
  */
  movePhotoLeft = async (adminId, venueId, categoryId, photo) => {

    var originalRightPhoto = photo;
    var originalLeftPhoto = this.state.photos[photo.rank - 2];

    var newRightPhotoRank = originalRightPhoto.rank - 1;
    var newLeftPhotoRank = originalLeftPhoto.rank + 1;

    // Update the listOfSelectedPhotos, so that the selected status updates as well

    if (this.props.listOfSelectedPhotos.includes(originalRightPhoto)) {
      var photoLoc = this.props.listOfSelectedPhotos.indexOf(originalRightPhoto);
      this.props.listOfSelectedPhotos[photoLoc].rank = newRightPhotoRank;
    } 

    if (this.props.listOfSelectedPhotos.includes(originalLeftPhoto)) {
      var photoLoc = this.props.listOfSelectedPhotos.indexOf(originalLeftPhoto);
      this.props.listOfSelectedPhotos[photoLoc].rank = newLeftPhotoRank;
    }

    // Swap ranks
    originalRightPhoto.rank = newRightPhotoRank;
    originalLeftPhoto.rank = newLeftPhotoRank;

    // Update the API with the new photos
    await(this.updateMultiplePhotos(adminId, venueId, categoryId, [originalLeftPhoto, originalRightPhoto]));
  }

  /* 
    Take a photo and have it swap places with the photo on its right.  This is done
    by swapping the rank, updating the API, and refreshing the state.
  */
  movePhotoRight = async (adminId, venueId, categoryId, photo) => {

    var originalLeftPhoto = photo;     
    var originalRightPhoto = this.state.photos[photo.rank];

    var newRightPhotoRank = originalRightPhoto.rank - 1;
    var newLeftPhotoRank = originalLeftPhoto.rank + 1;

    // Update the listOfSelectedPhotos, so that the selected status updates as well

    if (this.props.listOfSelectedPhotos.includes(originalRightPhoto)) {
      var photoLoc = this.props.listOfSelectedPhotos.indexOf(originalRightPhoto);
      this.props.listOfSelectedPhotos[photoLoc].rank = newRightPhotoRank;
    } 

    if (this.props.listOfSelectedPhotos.includes(originalLeftPhoto)) {
      var photoLoc = this.props.listOfSelectedPhotos.indexOf(originalLeftPhoto);
      this.props.listOfSelectedPhotos[photoLoc].rank = newLeftPhotoRank;
    }

    // Swap ranks
    originalRightPhoto.rank = newRightPhotoRank;  
    originalLeftPhoto.rank = newLeftPhotoRank;

    // Update the API with the new photos
    await(this.updateMultiplePhotos(adminId, venueId, categoryId, [originalLeftPhoto, originalRightPhoto]));
  }

  /*
    Given a photo (and all the other params needed to update) this will lower the 
    rank on the photo by 1 and update it in the API.
  */
  lowerRankAndUpdate = (adminId, venueId, categoryId, photo) => {
    photo.rank = photo.rank - 1;
    this.updateSinglePhoto(adminId, venueId, categoryId, photo);
  }


  /* 
    Delete photo is tricky.  We need to 
      1.  If the photo is selected, remove it from the selected list
      2.  Loop through all the photos, starting with the highest rank
          A.  If the photo is above the deleted one in rank, lower rank by 1
          B.  If the photo is the one to delete, delete it.

    This needs to be done in order, hence the async/awaits.
  */
  handlePhotoDelete = async (adminId, venueId, categoryId, photo) => {

    var originalPhotoList = this.state.photos;

    //1.  TODO: Handle removing this photo from the  "select" list by SETSTATE.
    if (this.props.listOfSelectedPhotos.includes(photo)) {
      await(this.props.removePhotoFromSelectedList(photo));
    }

    var deletedPhotoRank = photo.rank;

    /* 
      Again, it's very important that we start with the highest ranked photos FIRST,
      because we don't want to delete a low one and mess up the order.  Once that's
      done, the photo to delete will be the last one we deal with.
    */
    await(originalPhotoList.reverse().forEach(async (element) => {

      if (element.rank === deletedPhotoRank) {
        await(this.deleteSinglePhoto(adminId, venueId, categoryId, element));
      } else if (element.rank > deletedPhotoRank) {
        await(this.lowerRankAndUpdate(adminId, venueId, categoryId, element));
      }
      
    }));
  }

  /* 
    UncategorizedPhotoContainer doesn't have access to the moveLeft/moveRight functions.
  */
  renderCategory = (category) => {
    if (category.name === 'Unassigned') {
      return (
        <UncategorizedPhotoContainer 
          key={category.id}
          index={category.id}
          categoryName={category.name}

          photos={this.state.photos}

          adminId={this.props.adminId}
          venueId={this.props.venueId}
          categoryId={category.id}

          latestSelectedPhotoCategory={this.props.latestSelectedPhotoCategory}
          selectedPhotoIds={this.props.selectedPhotoIds}
          handleSinglePhotoSelect={this.props.handleSinglePhotoSelect}

          moveButtonHighlighted={this.props.moveButtonHighlighted}

          updatePhoto = {this.props.updatePhoto}
          updateSinglePhoto = {this.updateSinglePhoto}
          handlePhotoDelete = {this.handlePhotoDelete}

          toggleSelectedPhoto = {this.toggleSelectedPhoto}
        />
      );
    } else {
      return (
        <ScrollablePhotoContainer 
          key={category.id}
          index={category.id}
          categoryName={category.name}

          photos={this.state.photos}

          adminId={this.props.adminId}
          venueId={this.props.venueId}
          categoryId={category.id}

          latestSelectedPhotoCategory={this.props.latestSelectedPhotoCategory}
          selectedPhotoIds={this.props.selectedPhotoIds}
          handleSinglePhotoSelect={this.props.handleSinglePhotoSelect}

          moveButtonHighlighted={this.props.moveButtonHighlighted}

          updatePhoto = {this.props.updatePhoto}
          updateSinglePhoto = {this.updateSinglePhoto}
          handlePhotoDelete = {this.handlePhotoDelete}

          toggleSelectedPhoto = {this.toggleSelectedPhoto}

          movePhotoLeft = {this.movePhotoLeft}
          movePhotoRight = {this.movePhotoRight}
        />
      );
    };
  }

  render () {

    const { 
      category,
      adminId,
      venueId,

      getAdmins,

      latestSelectedPhotoCategory,
      selectedPhotoIds,
      listOfSelectedPhotos,
      handleSinglePhotoSelect,
      removePhotoFromSelectedList,

      moveButtonHighlighted,

      updatePhoto,
      deletePhoto,
      sortPhotos

    } = this.props;

    return (
      <div>
        {this.renderCategory(category)}
      </div>

    );
  }
}

export default CategoryContainer;