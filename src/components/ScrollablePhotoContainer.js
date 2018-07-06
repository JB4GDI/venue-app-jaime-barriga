import React from 'react';
import SinglePhotoContainer from './SinglePhotoContainer';

class ScrollablePhotoContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      photos: []
    };

    // Binding this allows us to call this function from a lower level and still have access to where we're at now
    this.movePhotoLeft = this.movePhotoLeft.bind(this);
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

  /*
    Given a photo "photo", find the photo to its left, and have them swap places.
  */
  movePhotoLeft(adminId, venueId, categoryId, photo, photoList) {

    var originalRightPhoto = photo;
    var originalLeftPhoto = photoList[photo.rank - 2];
    const newPhotoList = photoList;

    originalRightPhoto.rank = originalRightPhoto.rank - 1;
    originalLeftPhoto.rank = originalLeftPhoto.rank + 1;

    // The information is swapped, so let's swap them in the photoList

    newPhotoList[photo.rank - 1] = originalRightPhoto
    newPhotoList[photo.rank] = originalLeftPhoto    

    // Update the API with the new information

    this.props.updatePhoto(adminId, venueId, categoryId, originalLeftPhoto);
    this.props.updatePhoto(adminId, venueId, categoryId, originalRightPhoto);

    // Update the application state with the new information

    this.setState({ photos: newPhotoList });

  }

  // swapPhotos(adminId, venueId, categoryId) {

  //   var allPhotos = this.state.photos;

  //   const photo1 = this.state.photos[0];
  //   const photo2 = this.state.photos[1];

  //   console.log(photo1);
  //   console.log(photo2);

  //   photo1.rank=2;
  //   photo2.rank=1;

  //   allPhotos[0] = photo2;
  //   allPhotos[1] = photo1;

  //   this.props.updatePhoto(adminId, venueId, categoryId, photo1);
  //   this.props.updatePhoto(adminId, venueId, categoryId, photo2);

  //   this.setState({ photos: allPhotos });

  // }

  render () {

    const { 
      photos,
      categoryName,

      adminId,
      venueId,
      categoryId,

      increasePhotosSelected,
      decreasePhotosSelected,
      updatePhoto

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
          movePhotoLeft = {this.movePhotoLeft}
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