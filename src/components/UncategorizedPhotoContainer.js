import React from 'react';
import SinglePhotoContainer from './SinglePhotoContainer';
import CenterToolbar from './CenterToolbar';

/*
  An Uncategorized Photo Container contains all the photos that haven't been organized yet,
  as well as a Center Toolbar (which we may or may not even need).
*/
class UncategorizedPhotoContainer extends React.Component {

  render () {

    const { 
      photos,

      adminId,
      venueId,
      categoryId,

      increasePhotosSelected,
      decreasePhotosSelected,

      updatePhoto,

      selectPhoto,
      toggleSelectedPhoto,
      selectedPhotoIds,
      deselectPhoto

     } = this.props;

    const allPhotos = photos.map((photo, index) => {
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

          selectPhoto = {this.props.selectPhoto}
          deselectPhoto = {this.props.deselectPhoto}
          selectedPhotoIds = {this.props.selectedPhotoIds}
          toggleSelectedPhoto = {this.props.toggleSelectedPhoto}
        />
      );
    });

    return (
      <div className="leftNav">
        <div className="unassigned_photo_container fl">

          <div className="unassigned_headline fancy_border_bottom fl">
            <h2 className="full_width">Photos that need a category</h2>
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