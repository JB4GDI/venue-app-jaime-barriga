import React from 'react';

class SinglePhotoContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      caption: '',
      singlePhotoSelected: false, // Is the photo selected (clicked on) or not?
      showCaptionSaveButton: false,
      mouseIsHovering: false // Is the container being hovered over?
    }
  }

  componentDidMount() {
    this.setState({ caption: this.props.photo.caption });
  }


  showLeftRightMoveButtons() {
    this.setState({ mouseIsHovering: true });
  }  

  hideLeftRightMoveButtons() {
    this.setState({ mouseIsHovering: false });
  }

  showCaptionSaveButton() {
    this.setState({ showCaptionSaveButton: true });
  }

  handleTextareaChange(e, photo) {
    this.showCaptionSaveButton();

    /* 
      Holy crap, is this a nightmare.  There are all sorts of problems with the textarea.
      The best solution I've found is to
      1.  Literally take in the photo as a parameter and update the caption by force.
      2.  Adjust the state.caption so that if we want to save, we can pull the value.
    */
    photo.caption = e.target.value;
    this.setState({ caption: e.target.value });
  }

  hideCaptionSaveButton() {
    this.setState({ showCaptionSaveButton: false });
  }

  moveButtonLeftClicked() {
    this.props.movePhotoLeft(this.props.photo, this.props.photoList);
  }

  moveButtonRightClicked() {
    console.log("RIGHT");
    console.log(this.props.photo);
  }

  /*
    This function is a little busy, but essentiall it renders the "move left/right" buttons on a photo.  
    If it's the leftmost photo, there's no "move left."  And if it is the rightmost (highest rank) it has no "move right."

    When you click them, it calls a function to move them one over.
  */
  renderLeftRightMoveButtons() {    
    if (this.state.mouseIsHovering === true && this.props.photo.rank === 1) {

      return (
        <div className="leftrightbuttoncontainer">
          <i className="material-icons moveButtonOnlyRight" onClick={() => this.moveButtonRightClicked()}>chevron_right</i>
        </div>        
      );

    } else if (this.state.mouseIsHovering === true && this.props.photo.rank === this.props.currentHighestPhotoRank) {

      return (
        <div className="leftrightbuttoncontainer">
          <i className="material-icons moveButtonOnlyLeft" onClick={() => this.moveButtonLeftClicked()}>chevron_left</i>
        </div>        
      );

    } else if (this.state.mouseIsHovering === true && this.props.photo.rank > 1 && this.props.photo.rank < this.props.currentHighestPhotoRank) {

      return (
        <div className="leftrightbuttoncontainer">
          <i className="material-icons moveButtonLeft" onClick={() => this.moveButtonLeftClicked()}>chevron_left</i>
          <i className="material-icons moveButtonRight" onClick={() => this.moveButtonRightClicked()}>chevron_right</i>
        </div>
        
        );
    } else {
      return (
        <div className="leftrightbuttoncontainer hidden">
          <i className="material-icons moveButtonLeft" onClick={() => this.moveButtonLeftClicked()}>chevron_left</i>
          <i className="material-icons moveButtonRight" onClick={() => this.moveButtonRightClicked()}>chevron_right</i>
        </div>
      );
    }
  }

  renderSaveButton() {
    if (this.state.showCaptionSaveButton === true) {
      return (<input className="savebutton" type="submit" value="SAVE" />);
    } else {
      return (<input className="savebutton hidden" type="submit" value="SAVE" />);
    }
  }

  onSubmit(e, photo) {
    e.preventDefault();

    // An onChange has updated the photo caption, so it is there in the photo object
    this.props.updatePhoto(this.props.adminId, this.props.venueId, this.props.categoryId, photo);
    
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
      <img 
        className="photo_image" 
        src={"http://jaimebarriga.com/venues/" + photo.filename} 
        onClick={() => this.toggleSinglePhotoSelected()} 
      />
    );
  }

  renderSinglePhotoCaption(photo) {

    if (photo.caption === '') {
      return (
        <form
          className="photo-caption-textbox"
          onSubmit={(e) => this.onSubmit(e, photo)}
        >
          <textarea
            id={photo.id}
            className="photo_caption"
            onChange={(e) => this.handleTextareaChange(e, photo)}
            value={photo.caption}
          >
          </textarea>
          {this.renderSaveButton()}
        </form>
       
      );
    } else {
      return (
        <form
          className="photo-caption-textbox"
          onSubmit={(e) => this.onSubmit(e, photo)}
        >
          <textarea
            id={photo.id}
            className="photo_caption"
            onChange={(e) => this.handleTextareaChange(e, photo)}
            value={photo.caption}
          >
          </textarea>
          {this.renderSaveButton()}
        </form>
        
      );
    }
  }

  render () {

    const { 
      photo,
      photoList,
      currentHighestPhotoRank,

      adminId,
      venueId,
      categoryId,

      increasePhotosSelected,
      decreasePhotosSelected,
      updatePhoto,
      movePhotoLeft,
      photoOnLeft,
      photoOnRight

     } = this.props;

    return (
      <div 
        className={ this.renderBackgroundColor() }
      >
        <div
          className="full_width"
          onMouseEnter={() => this.showLeftRightMoveButtons()} 
          onMouseLeave={() => this.hideLeftRightMoveButtons()}
        >
          <span>{this.renderLeftRightMoveButtons()}</span>
          <span>{this.renderSinglePhotoImage(photo)}</span>
        </div>
        
        {this.renderSinglePhotoCaption(photo)}

      </div>
    );
  }
}

export default SinglePhotoContainer;