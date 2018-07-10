import React from 'react';
import SinglePhotoContainer from './SinglePhotoContainer';

class ScrollablePhotoContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      photos: [],
      selectedPhotos: []
    };

    // Binding this allows us to call this function from a lower level and still have access to where we're at now
    this.movePhotoLeft = this.movePhotoLeft.bind(this);
    this.movePhotoRight = this.movePhotoRight.bind(this);
    this.selectPhoto = this.selectPhoto.bind(this);
    this.deselectPhoto = this.deselectPhoto.bind(this);
    this.toggleSelectedPhoto = this.toggleSelectedPhoto.bind(this);
  }

  componentDidMount() {
    this.setState({ photos: this.props.photos });
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

  /* The Photo is now selected, so simply add the photoId to the list of selectedPhotos in the state */
  selectPhoto(photoId) {

    var newArray = this.state.selectedPhotos;
    newArray.push(photoId);

    this.setState({ selectedPhotos: newArray })
  }

  /* The Photo is now DEselected, so simply remove the photoId to the list of selectedPhotos in the state */
  deselectPhoto(photoId) {

    var newArray = this.state.selectedPhotos;
    newArray.splice(newArray.indexOf(photoId), 1);

    this.setState({ selectedPhotos: newArray })
  }

  toggleSelectedPhoto(photoId) {

    // var selectedPhotos = this.state.selectedPhotos;

    // console.log(selectedPhotos);

    if (this.state.selectedPhotos.includes(photoId)) {
      this.deselectPhoto(photoId);
    } else {
      this.selectPhoto(photoId);
    }

  }

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
    this.setState({ photos: photoList });

  }

  /* Really, the only thing we're doing here is swapping the rank of a photo with the one on its right */
  movePhotoRight(adminId, venueId, categoryId, photo, photoList) {

    var originalLeftPhoto = photo;     
    var originalRightPhoto = photoList[photo.rank];

    originalRightPhoto.rank = originalRightPhoto.rank - 1;  
    originalLeftPhoto.rank = originalLeftPhoto.rank + 1;

    // The information is swapped, so let's swap them in the photoList

    // Update the API with the new information

    this.props.updatePhoto(adminId, venueId, categoryId, originalLeftPhoto);
    this.props.updatePhoto(adminId, venueId, categoryId, originalRightPhoto);

    // Update the application state with the new information
    this.setState({ photos: photoList });

  }

  render () {

    const { 
      photos,
      categoryName,

      adminId,
      venueId,
      categoryId,

      increasePhotosSelected,
      decreasePhotosSelected,

      updatePhoto,

     } = this.props;

    const allPhotos = this.sortPhotos(this.state.photos).map((photo, index) => {
      return (
        <SinglePhotoContainer
          key={photo.rank - 1}
          index={photo.rank - 1}
          photo={photo}
          photoOnLeft={photos[photo.rank - 2]}
          photoOnRight={photos[photo.rank + 2]}
          photoList={this.props.photos}
          currentHighestPhotoRank = {photos[photos.length-1].rank}

          adminId={this.props.adminId}
          venueId={this.props.venueId}
          categoryId={this.props.categoryId}

          increasePhotosSelected={this.props.increasePhotosSelected}
          decreasePhotosSelected={this.props.decreasePhotosSelected}

          updatePhoto = {this.props.updatePhoto}
          selectPhoto = {this.selectPhoto}
          deselectPhoto = {this.deselectPhoto}
          selectedPhotos = {this.state.selectedPhotos}

          toggleSelectedPhoto = {this.toggleSelectedPhoto}
          movePhotoLeft = {this.movePhotoLeft}
          movePhotoRight = {this.movePhotoRight}
        />
      );
    });

    return (
      <div className="scrollable_photo_container right_panel_width fl">

        <div className="fancy_border_bottom fl">
          <h2>{categoryName} photos</h2>
        </div>
        
        <div className="scrollable_photo_list fancy_border_top fl">
          {allPhotos}
        </div>

        <div onClick={() => this.swapPhotos(adminId, venueId, categoryId)}>Hello</div>

      </div>
    );
  }
}

export default ScrollablePhotoContainer;