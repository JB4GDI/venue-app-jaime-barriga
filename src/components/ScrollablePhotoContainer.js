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
      decreasePhotosSelected

     } = this.props;

    const allPhotos = photos.map((photo, index) => {
      return (
        <SinglePhotoContainer
          key={index}
          index={index}          
          photo={photo}

          adminId={this.props.adminId}
          venueId={this.props.venueId}
          categoryId={this.props.categoryid}
          
          increasePhotosSelected={this.props.increasePhotosSelected}
          decreasePhotosSelected={this.props.decreasePhotosSelected}
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