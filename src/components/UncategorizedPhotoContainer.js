import React from 'react';
import SinglePhotoContainer from './SinglePhotoContainer';

/*
  An Uncategorized Photo Container contains all the photos that haven't been organized yet,
  as well as a Center Gap, to push all the other venues to the right.
*/
class UncategorizedPhotoContainer extends React.Component {

  render () {

    const { 
      photos,

      adminId,
      venueId,
      categoryId,

      latestSelectedPhotoCategory,
      handleSinglePhotoSelect,

      updatePhoto,
      updateSinglePhoto,
      handlePhotoDelete,

      selectPhoto,
      toggleSelectedPhoto,
      selectedPhotoIds,
      deselectPhoto

     } = this.props;

    const allPhotos = this.props.photos.map((photo, index) => {
      return (
        <SinglePhotoContainer
          key={photo.rank - 1}
          index={photo.rank - 1}
          photo={photo}
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

          selectPhoto = {this.props.selectPhoto}
          deselectPhoto = {this.props.deselectPhoto}
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

        <div className="center_gap fl">
        </div>
      </div>

    );
  }
}

export default UncategorizedPhotoContainer;