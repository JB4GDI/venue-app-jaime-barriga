import React from 'react';

class SinglePhotoContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      singlePhotoSelected: false, // Is the photo selected (clicked on) or not?
      showCaptionSaveButton: false
    };
  }

  showCaptionSaveButton() {
    this.setState({ showCaptionSaveButton: true });
  }

  hideCaptionSaveButton() {
    this.setState({ showCaptionSaveButton: false });
  }

  renderSaveButton() {
    if (this.state.showCaptionSaveButton === true) {
      return (<input className="savebutton" type="submit" value="SAVE" />);
    } else {
      return (<input className="savebutton hidden" type="submit" value="SAVE" />);
    }
  }

  onSubmit(e) {
    e.preventDefault();

    this.props.photo.caption = this.content.value;  // We are saving, so take the value we entered and make that the new caption

    this.props.updatePhoto(this.props.adminId, this.props.venueId, this.props.categoryId, this.props.photo);
    
    this.hideCaptionSaveButton();
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
      <form
        className="photo-caption-textbox"
        onSubmit={(e) => this.onSubmit(e)}
      >
        <textarea 
          className="photo_caption"
          onChange={() => this.showCaptionSaveButton()}
          ref={(input) => this.content = input}
          defaultValue={photo.caption}
        >          
        </textarea>
        {this.renderSaveButton()}
      </form>
      
    );
  }

  render () {

    const { 
      photo,

      adminId,
      venueId,
      categoryId,

      increasePhotosSelected,
      decreasePhotosSelected,
      updatePhoto

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