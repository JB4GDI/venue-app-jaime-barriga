import React from 'react';
import SinglePhotoContainer from './SinglePhotoContainer';

/*
  Parent: CategoryContainer
  Child: SinglePhotoContainer

  An ScrollablePhotoContainer contains all the photos that are in a category with a purpose.
  It is also scrollable.  
*/
class ScrollablePhotoContainer extends React.Component {

  render () {

    const { 
      photos,
      categoryName,

      adminId,
      venueId,
      categoryId,

      latestSelectedPhotoCategory,
      handleSinglePhotoSelect,

      moveButtonHighlighted,

      updatePhoto,
      updateSinglePhoto,
      handlePhotoDelete,

      selectPhoto,
      toggleSelectedPhoto,
      selectedPhotoIds,

      movePhotoLeft,
      movePhotoRight

     } = this.props;

    const allPhotos = photos.map((photo, index) => {
      return (
        <SinglePhotoContainer
          key={photo.id}
          index={photo.rank - 1}
          photo={photo}
          photoOnLeft={photos[photo.rank - 2]}
          photoOnRight={photos[photo.rank + 2]}
          photoList={this.props.photos}
          currentHighestPhotoRank = {photos[photos.length-1].rank}

          adminId={this.props.adminId}
          venueId={this.props.venueId}
          categoryId={this.props.categoryId}

          latestSelectedPhotoCategory={this.props.latestSelectedPhotoCategory}
          selectedPhotoIds={this.props.selectedPhotoIds}
          handleSinglePhotoSelect={this.props.handleSinglePhotoSelect}

          updatePhoto = {this.props.updatePhoto}
          updateSinglePhoto = {this.props.updateSinglePhoto}
          handlePhotoDelete = {this.props.handlePhotoDelete}

          toggleSelectedPhoto = {this.props.toggleSelectedPhoto}

          movePhotoLeft = {this.props.movePhotoLeft}
          movePhotoRight = {this.props.movePhotoRight}
        />
      );
    });

    return (
      <div className="scrollable_photo_container right_panel_width fl">

        <div className="fancy_border_bottom full_width fl">
          <h2 className="full_width">{categoryName} photos</h2>
        </div>
        
        <div className={ this.props.moveButtonHighlighted === this.props.categoryId ? "scrollable_photo_list make_background_color_softgold fancy_border_top fl" : "scrollable_photo_list make_background_color_white fancy_border_top fl" }>
          {allPhotos}
        </div>

      </div>
    );
  }
}

export default ScrollablePhotoContainer;