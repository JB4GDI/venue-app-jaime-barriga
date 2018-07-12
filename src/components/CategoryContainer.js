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

  constructor(props) {
    super(props);
    this.state = {
      photos: []
    };

    // Binding this allows us to call this function from a lower level and still have access to where we're at now    
    // this.selectPhoto = this.selectPhoto.bind(this);
    // this.deselectPhoto = this.deselectPhoto.bind(this);
    // this.deselectAllPhotos = this.deselectAllPhotos.bind(this);
    // this.toggleSelectedPhoto = this.toggleSelectedPhoto.bind(this);

    this.movePhotoLeft = this.movePhotoLeft.bind(this);
    this.movePhotoRight = this.movePhotoRight.bind(this);
    this.updateSinglePhoto = this.updateSinglePhoto.bind(this);
  }

  componentDidMount() {
    this.getPhotosFromAPI(this.props.adminId, this.props.venueId, this.props.category.id);
  }


  getPhotosFromAPI = (adminId, venueId, categoryId) => {

    console.log("getPhotosFromAPI: " + adminId + ":" + venueId + ":" + categoryId);

    axios.get(venueApi(`venueadmins/${adminId}/venues/${venueId}/categorys/${categoryId}/photos`))
    .then((res) => this.setState({ photos: this.sortPhotos(res.data)}) )
    .catch((err) => console.log(err.response.data) );

    console.log(this.state.photos);

  }



  /* The rank of the photos is super important.  We use this function to sort the photos by rank */
  // sortPhotos = (photos) => {

  //   function comparePhotoRank(a,b) {
  //     if (a.rank < b.rank)
  //       return -1;
  //     if (a.rank > b.rank)
  //       return 1;
  //     return 0;
  //   };

  //   return photos.sort(comparePhotoRank);
  // }

  /* This is a hack, but maybe it's a hack that's genius */
  sortPhotos = (photos) => {

    console.log("SORTFING PHOTOS");

    console.log(photos);

    function comparePhotoRank(a,b) {
      if (a.rank < b.rank)
        return -1;
      if (a.rank > b.rank)
        return 1;
      return 0;
    };

    photos.sort(comparePhotoRank);

    for (let i = 0; i < photos.length; i ++) {
      photos[i].rank = i + 1 ;
    }

    console.log(photos);

    return photos;
    
  }

  updateSinglePhoto = (adminId, venueId, categoryId, photo) => {

    console.log("CATEGORY Updating photo: ");
    console.log(photo);

    axios.patch(venueApi(`venueadmins/${adminId}/venues/${venueId}/categorys/${categoryId}/photos/${photo.id}`), photo)
    .then((res) => this.getPhotosFromAPI(adminId, venueId, categoryId))
    .catch((err) => console.log(err.response.data))
  }

  /* 
    Take a photo and have it swap places with the photo on its left.
    This function needs to also update the state.listOfSelectedPhotos
      TODO:  This should reall be handled with a function call to state
  */
  movePhotoLeft = async (adminId, venueId, categoryId, photo, photoList) => {

    var originalRightPhoto = photo;
    var originalLeftPhoto = this.state.photos[photo.rank - 2];

    console.log("Left/Right:");
    console.log(originalLeftPhoto);
    console.log(originalRightPhoto);

    var newRightPhotoRank = originalRightPhoto.rank - 1;
    var newLeftPhotoRank = originalLeftPhoto.rank + 1;

    console.log("New ranks (left/right): " + newLeftPhotoRank + "/" + newRightPhotoRank);

    if (this.props.listOfSelectedPhotos.includes(originalRightPhoto)) {
      var photoLoc = this.props.listOfSelectedPhotos.indexOf(originalRightPhoto);
      // console.log("Photo on the right looks like:");
      // console.log(this.props.listOfSelectedPhotos[photoLoc]);
      // console.log("currently rank " + this.props.listOfSelectedPhotos[photoLoc].rank + " should be " + newRightPhotoRank)

      this.props.listOfSelectedPhotos[photoLoc].rank = newRightPhotoRank;

    } 

    if (this.props.listOfSelectedPhotos.includes(originalLeftPhoto)) {
      var photoLoc = this.props.listOfSelectedPhotos.indexOf(originalLeftPhoto);
      // console.log("Photo on the left looks like:");
      // console.log(this.props.listOfSelectedPhotos[photoLoc]);
      // console.log("currently rank " + this.props.listOfSelectedPhotos[photoLoc].rank + " should be " + newLeftPhotoRank)

      this.props.listOfSelectedPhotos[photoLoc].rank = newLeftPhotoRank;
    }

    originalRightPhoto.rank = newRightPhotoRank;
    originalLeftPhoto.rank = newLeftPhotoRank;

    await(this.updateSinglePhoto(adminId, venueId, categoryId, originalLeftPhoto));
    console.log("UPDATE 1 BETTER BE DONE");
    await(this.updateSinglePhoto(adminId, venueId, categoryId, originalRightPhoto));

    console.log("UPDATE 2 BETTER BE DONE");

    // Update the application state with the new information
    // this.setState({ photos: this.sortPhotos(photoList) });
    // await(this.getPhotosFromAPI(adminId, venueId, categoryId));
  }

  /* 
    Take a photo and have it swap places with the photo on its right.
    This function needs to also update the state.listOfSelectedPhotos
      TODO:  This should reall be handled with a function call to state
  */
  movePhotoRight = async (adminId, venueId, categoryId, photo, photoList) => {

    var originalLeftPhoto = photo;     
    var originalRightPhoto = photoList[photo.rank];

    var newRightPhotoRank = originalRightPhoto.rank - 1;
    var newLeftPhotoRank = originalLeftPhoto.rank + 1;

    /* If either of these photos were selected */
    if (this.props.listOfSelectedPhotos.includes(originalRightPhoto)) {
      var photoLoc = this.props.listOfSelectedPhotos.indexOf(originalRightPhoto);
      // console.log("Photo on the right looks like:");
      // console.log(this.props.listOfSelectedPhotos[photoLoc]);
      // console.log("currently rank " + this.props.listOfSelectedPhotos[photoLoc].rank + " should be " + newRightPhotoRank)

      this.props.listOfSelectedPhotos[photoLoc].rank = newRightPhotoRank;

    } 

    if (this.props.listOfSelectedPhotos.includes(originalLeftPhoto)) {
      var photoLoc = this.props.listOfSelectedPhotos.indexOf(originalLeftPhoto);
      // console.log("Photo on the left looks like:");
      // console.log(this.props.listOfSelectedPhotos[photoLoc]);
      // console.log("currently rank " + this.props.listOfSelectedPhotos[photoLoc].rank + " should be " + newLeftPhotoRank)

      this.props.listOfSelectedPhotos[photoLoc].rank = newLeftPhotoRank;
    }

    originalRightPhoto.rank = newRightPhotoRank;  
    originalLeftPhoto.rank = newLeftPhotoRank;

    // Update the API with the new information

    await(this.updateSinglePhoto(adminId, venueId, categoryId, originalLeftPhoto));
    await(this.updateSinglePhoto(adminId, venueId, categoryId, originalRightPhoto));

    // Update the application state with the new information
    // this.setState({ photos: this.sortPhotos(photoList) });

    //this.getPhotosFromAPI(adminId, venueId, categoryId);
  }

  /*
    Given a photo (and all the other params needed to update) this will lower the 
    rank on the photo by 1 and update it.
  */
  lowerRankAndUpdate = (adminId, venueId, categoryId, photo) => {

    // console.log("CURRENT ELEMENT RANK: " + photo.rank);

    // var originalPhotoList = this.state.photos;
    // console.log(originalPhotoList);
    // var photoIndex = originalPhotoList.indexOf(photo);
    // console.log(photoIndex);

    photo.rank = photo.rank -1;

    // originalPhotoList[photoIndex] = photo;

    // this.setState({ photos: originalPhotoList });

    this.props.updatePhoto(adminId, venueId, categoryId, photo);
  }


  /* 
    Delete photo is tricky.  We need to 
      1.  If the photo is selected, remove it from the selected list
      2.  Loop through all the photos, starting with the highest rank
          A.  If the photo is above the deleted one in rank, lower rank by 1
          B.  If the photo is the one to delete, delete it.

    We have to set this up so it fires in order.
  */
  handlePhotoDelete = async (adminId, venueId, categoryId, photo) => {

    console.log("BEGIN PHOTO DELETE");
    console.log(photo);
    console.log(this.props.listOfSelectedPhotos);

    var originalPhotoList = this.state.photos;
    // var originalSelectedPhotoList = this.state.selectedPhotos;

    //1.  TODO: Handle removing this photo from the  "select" list
    if (this.props.listOfSelectedPhotos.includes(photo)) {
      await(this.props.removePhotoFromSelectedList(photo));
    }

    var deletedPhotoRank = photo.rank;

    console.log("Deleting the photo with rank " + deletedPhotoRank);

    /* 
      Again, it's very important that we find the photo to delete FIRST, then update the rest
      in order.
    */
    await(originalPhotoList.reverse().forEach(async (element) => {

      console.log("Looking at photo: " + element.rank + ":" + element.filename);

      if (element.rank === deletedPhotoRank) {
        await(this.props.deletePhoto(adminId, venueId, categoryId, element));
        await(originalPhotoList.splice(originalPhotoList.indexOf(element), 1));
      } else if (element.rank > deletedPhotoRank) {
        await(this.lowerRankAndUpdate(adminId, venueId, categoryId, element));
      }
      
    }));

    console.log(this.props.category.photos);
    console.log("done");

    // Forcibly update the state
    await(this.componentDidMount());


  }

  /* There is a big difference between the Unassigned Category and all the rest.  Render them differently here. */
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

          updatePhoto = {this.props.updatePhoto}
          updateSinglePhoto = {this.updateSinglePhoto}
          handlePhotoDelete = {this.handlePhotoDelete}

          deselectPhoto = {this.deselectPhoto}
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
          changeSelectedPhotoRank={this.props.changeSelectedPhotoRank}
          handleSinglePhotoSelect={this.props.handleSinglePhotoSelect}
          removePhotoFromSelectedList={this.props.removePhotoFromSelectedList}

          updatePhoto = {this.props.updatePhoto}
          updateSinglePhoto = {this.updateSinglePhoto}
          handlePhotoDelete = {this.handlePhotoDelete}

          selectPhoto = {this.selectPhoto}
          deselectPhoto = {this.deselectPhoto}
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
      changeSelectedPhotoRank,
      handleSinglePhotoSelect,
      removePhotoFromSelectedList,

      updatePhoto,
      deletePhoto

    } = this.props;

    return (
      <div>
        {this.renderCategory(category)}
      </div>

    );
  }
}

export default CategoryContainer;