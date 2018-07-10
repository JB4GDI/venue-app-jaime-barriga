import React from 'react';
import SinglePhotoContainer from './SinglePhotoContainer';
import CenterToolbar from './CenterToolbar';

/*
  An Uncategorized Photo Container contains all the photos that haven't been organized yet,
  as well as a Center Toolbar (which we may or may not even need).
*/
class UncategorizedPhotoContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      photos: [],
      selectedPhotos: []
    };

    // Binding this allows us to call this function from a lower level and still have access to where we're at now
    this.selectPhoto = this.selectPhoto.bind(this);
    this.deselectPhoto = this.deselectPhoto.bind(this);
    this.toggleSelectedPhoto = this.toggleSelectedPhoto.bind(this);
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

  deselectAllPhotos(photos) {
    for (var i = 0; i < photos.length; i++) {
      photos[i].toggleSinglePhotoSelected();
    }
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





  render () {

    const { 
      photos,

      adminId,
      venueId,
      categoryId,

      increasePhotosSelected,
      decreasePhotosSelected,
      updatePhoto

     } = this.props;

    const allPhotos = this.sortPhotos(photos).map((photo, index) => {
      return (
        <SinglePhotoContainer
          key={photo.rank - 1}
          index={photo.rank - 1}
          photo={photo}
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
        />
      );
    });

    return (
      <div className="leftNav">
        <div className="unassigned_photo_container fl">

          <div className="unassigned_headline fancy_border_bottom fl">
            <h2 className="full_width">Photos that need a category</h2>
            <p onClick={() => this.deselectAllPhotos(this.props.photos)}>CLICK ME</p>
          </div>
          
          <div className="photo_list fancy_border_top full_width fl">
            {allPhotos}
          </div>

        </div>

        <CenterToolbar />
      </div>

    );
  }
}

export default UncategorizedPhotoContainer;