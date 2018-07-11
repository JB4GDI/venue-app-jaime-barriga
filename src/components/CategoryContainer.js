import React from 'react';
import UncategorizedPhotoContainer from './UncategorizedPhotoContainer';
import ScrollablePhotoContainer from './ScrollablePhotoContainer';

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
      photos: [],
      selectedPhotos: []
    };

    // Binding this allows us to call this function from a lower level and still have access to where we're at now    
    // this.selectPhoto = this.selectPhoto.bind(this);
    // this.deselectPhoto = this.deselectPhoto.bind(this);
    // this.deselectAllPhotos = this.deselectAllPhotos.bind(this);
    // this.toggleSelectedPhoto = this.toggleSelectedPhoto.bind(this);

    this.movePhotoLeft = this.movePhotoLeft.bind(this);
    this.movePhotoRight = this.movePhotoRight.bind(this);
  }

  componentWillMount() {
    this.setState({ photos: this.sortPhotos(this.props.category.photos) });
  }

  componentDidMount() {
    this.setState({ photos: this.sortPhotos(this.props.category.photos) });
  }

  /* The rank of the photos is super important.  We use this function to sort the photos by rank */
  sortPhotos = (photos) => {

    function comparePhotoRank(a,b) {
      if (a.rank < b.rank)
        return -1;
      if (a.rank > b.rank)
        return 1;
      return 0;
    };

    return photos.sort(comparePhotoRank);
  }


  // deselectAllPhotos(photos) {
  //   for (var i = 0; i < photos.length; i++) {
  //     // console.log("Photo Deselected: " + photos[i].id);
  //   }
  // }

  // selectPhoto(currentPhoto) {

  //   var selectedPhotosArray = this.state.selectedPhotos;
  //   selectedPhotosArray.push(currentPhoto);    
    

  //   this.setState({ 
  //     selectedPhotos: selectedPhotosArray
  //   });
  // }

  // deselectPhoto(currentPhoto) {

  //   var selectedPhotosArray = this.state.selectedPhotos;
  //   selectedPhotosArray.splice(selectedPhotosArray.indexOf(currentPhoto), 1);   

  //   this.setState({ 
  //     selectedPhotos: selectedPhotosArray
  //   });
  // }

  deselectAllPhotos = () => {

    // console.log("Deselecting category: " + this.props.category.id);

    this.setState({
      selectedPhotos: [] 
    });
  }

  // toggleSelectedPhoto(currentPhoto) {    
  //   if (this.state.selectedPhotoIds.includes(currentPhoto.id)) {
  //     this.deselectPhoto(currentPhoto);
  //   } else {
  //     this.selectPhoto(currentPhoto);
  //   }
  // }

  /*
    Given a photo, find the photo to its left, and have them swap places.
  */
  movePhotoLeft = (adminId, venueId, categoryId, photo, photoList) => {

    var originalRightPhoto = photo;
    var originalLeftPhoto = photoList[photo.rank - 2];

    originalRightPhoto.rank = originalRightPhoto.rank - 1;
    originalLeftPhoto.rank = originalLeftPhoto.rank + 1;

    this.props.updatePhoto(adminId, venueId, categoryId, originalLeftPhoto);
    this.props.updatePhoto(adminId, venueId, categoryId, originalRightPhoto);

    // Update the application state with the new information
    this.setState({ photos: this.sortPhotos(photoList) });
  }

  /* Really, the only thing we're doing here is swapping the rank of a photo with the one on its right */
  movePhotoRight = (adminId, venueId, categoryId, photo, photoList) => {

    var originalLeftPhoto = photo;     
    var originalRightPhoto = photoList[photo.rank];

    originalRightPhoto.rank = originalRightPhoto.rank - 1;  
    originalLeftPhoto.rank = originalLeftPhoto.rank + 1;

    // Update the API with the new information

    this.props.updatePhoto(adminId, venueId, categoryId, originalLeftPhoto);
    this.props.updatePhoto(adminId, venueId, categoryId, originalRightPhoto);

    // Update the application state with the new information
    this.setState({ photos: this.sortPhotos(photoList) });
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

  handlePhotoDelete = (adminId, venueId, categoryId, photo) => {

    var originalPhotoList = this.state.photos;
    var originalSelectedPhotoList = this.state.selectedPhotos;

    // 1.  Handle removing this photo from the  "select" list
    if (originalSelectedPhotoList.includes(photo)) {
      this.setState({ selectedPhotos: originalSelectedPhotoList.splice(originalSelectedPhotoList.indexOf(photo), 1)});
    }

    var deletedPhotoRank = photo.rank;

    console.log("Deleting the photo with rank " + deletedPhotoRank);

    /* 
      Again, it's very important that we find the photo to delete FIRST, then update the rest
      in order.
    */
    originalPhotoList.reverse().forEach(async (element) => {

      console.log("Okay: " + element.rank + ":" + element.filename);

      if (element.rank === deletedPhotoRank) {
        await(this.props.deletePhoto(adminId, venueId, categoryId, element));
        await(originalPhotoList.splice(originalPhotoList.indexOf(element), 1));
      } else if (element.rank > deletedPhotoRank) {
        await(this.lowerRankAndUpdate(adminId, venueId, categoryId, element));
      }

      // Forcibly update the state
      this.componentDidMount();
      
    });
  }

  /* There is a big difference between the Unassigned Category and all the rest.  Render them differently here. */
  renderCategory = (category) => {
    if (category.name === 'Unassigned') {
      return (
        <UncategorizedPhotoContainer 
          key={category.id}
          index={category.id}
          categoryName={category.name}
          photos={category.photos}

          adminId={this.props.adminId}
          venueId={this.props.venueId}
          categoryId={category.id}

          latestSelectedPhotoCategory={this.props.latestSelectedPhotoCategory}
          selectedPhotoIds={this.props.selectedPhotoIds}
          handleSinglePhotoSelect={this.props.handleSinglePhotoSelect}

          updatePhoto = {this.props.updatePhoto}
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
          photos={category.photos}

          adminId={this.props.adminId}
          venueId={this.props.venueId}
          categoryId={category.id}

          latestSelectedPhotoCategory={this.props.latestSelectedPhotoCategory}
          selectedPhotoIds={this.props.selectedPhotoIds}
          handleSinglePhotoSelect={this.props.handleSinglePhotoSelect}

          updatePhoto = {this.props.updatePhoto}
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
      handleSinglePhotoSelect,

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