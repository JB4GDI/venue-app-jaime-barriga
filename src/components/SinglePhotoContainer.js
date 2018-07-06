import React from 'react';

class SinglePhotoContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      singlePhotoSelected: false // Is the photo selected (clicked on) or not?
    };
  }

  /* 
    This function does 2 things: 

    1.  It toggles the 'selected' state of each photo
    2.  It properly updates the grandparent's state to the correct number of photos selected

  */
  toggleSinglePhotoSelected() {

    if (this.state.singlePhotoSelected === false) {      
      this.setState({ singlePhotoSelected: true });
      this.props.increasePhotosSelected();
    } else {
      this.setState({ singlePhotoSelected: false });
      this.props.decreasePhotosSelected();
    }
  }

  forcePhotoDeselect() {
    this.setState({ singlePhotoSelected: false });
  }

  /* If selected, turn the background color to gold */
  renderBackgroundColor() {
    if (this.state.singlePhotoSelected === true) {
      return "single_photo_container fl background_color_gold";
    } else {
      return "single_photo_container fl";
    }
  }

  renderSinglePhotoImage(photo) {
    return (
      <img className="photo_image" src={"http://jaimebarriga.com/venues/" + photo.filename} onClick={() => this.toggleSinglePhotoSelected()} />
    );
  }

  renderSinglePhotoCaption(photo) {
    return (
      <textarea className="photo_caption">{photo.caption}</textarea>
    );
  }

  render () {

    const { 
      photo,

      adminId,
      venueId,
      categoryId,

      increasePhotosSelected,
      decreasePhotosSelected

     } = this.props;

    return (
      <div className={ this.renderBackgroundColor() }>
        {this.renderSinglePhotoImage(photo)}
        {this.renderSinglePhotoCaption(photo)}
      </div>
    );
  }
}

export default SinglePhotoContainer;