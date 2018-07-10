import React from 'react';
import SinglePhotoContainer from './SinglePhotoContainer';

class ScrollablePhotoContainer extends React.Component {

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

      selectPhoto,
      toggleSelectedPhoto,
      selectedPhotoIds,
      deselectPhoto,

      movePhotoLeft,
      movePhotoRight

     } = this.props;

    const allPhotos = photos.map((photo, index) => {
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
          selectPhoto = {this.props.selectPhoto}
          deselectPhoto = {this.props.deselectPhoto}
          selectedPhotoIds = {this.props.selectedPhotoIds}
          toggleSelectedPhoto = {this.props.toggleSelectedPhoto}

          movePhotoLeft = {this.props.movePhotoLeft}
          movePhotoRight = {this.props.movePhotoRight}
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

      </div>
    );
  }
}

export default ScrollablePhotoContainer;