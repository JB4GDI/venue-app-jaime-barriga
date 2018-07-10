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

  componentDidMount() {
    this.setState({ photos: this.sortPhotos(this.props.category.photos) });
  }

  /* The rank of the photos is super important.  We use this function to sort the photos by rank */
  sortPhotos(photos) {

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

  deselectAllPhotos() {

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
  movePhotoLeft(adminId, venueId, categoryId, photo, photoList) {

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
  movePhotoRight(adminId, venueId, categoryId, photo, photoList) {

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

          // selectPhoto = {this.selectPhoto}
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

      latestSelectedPhotoCategory,
      selectedPhotoIds,
      handleSinglePhotoSelect,

      updatePhoto
    } = this.props;

    return (
      <div>
        {this.renderCategory(category)}
      </div>

    );
  }
}

export default CategoryContainer;