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

  render () {

    const { totalPhotosSelected, increasePhotosSelected, decreasePhotosSelected } = this.props;

    return (
      <div className="single_photo_container">
        <img className="photo_image" src="http://jaimebarriga.com/venues/small_CB2_3596.jpg" onClick={() => this.toggleSinglePhotoSelected()}/>
        <textarea className="photo_caption">A sample place setting</textarea>
      </div>
    );
  }
}

export default SinglePhotoContainer;