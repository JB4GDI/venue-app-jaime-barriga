import React from 'react';

class SinglePhotoContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      photoSelected: false // Is the photo selected (clicked on) or not?
    };
  }

  togglePhotoSelected() {
    this.setState({
      photoSelected: ! this.state.photoSelected
    });
  }

  render () {
    return (
      <div className="single_photo_container">
        <img className="photo_image" src="http://jaimebarriga.com/venues/small_CB2_3596.jpg" onClick={() => this.togglePhotoSelected()}/>
        <textarea className="photo_caption" >A sample place setting</textarea>
      </div>
    );
  }
}

export default SinglePhotoContainer;