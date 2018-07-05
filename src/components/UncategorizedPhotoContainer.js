import React from 'react';
import SinglePhotoContainer from './SinglePhotoContainer';

class UncategorizedPhotoContainer extends React.Component {

  render () {

    const { totalPhotosSelected, increasePhotosSelected, decreasePhotosSelected } = this.props;

    return (
      <div className="unassigned_photo_container fl">

        <div className="unassigned_headline fancy_border_bottom fl">
          <h2 className="full_width">Photos that need a category</h2>
        </div>
        
        <div className="photo_list fancy_border_top full_width fl">
          <SinglePhotoContainer 
            totalPhotosSelected={this.props.totalPhotosSelected}
            increasePhotosSelected={this.props.increasePhotosSelected}
            decreasePhotosSelected={this.props.decreasePhotosSelected}
          />
        </div>

      </div>
    );
  }

}

export default UncategorizedPhotoContainer;