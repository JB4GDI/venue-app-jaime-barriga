import React from 'react';
import CategoryContainer from './CategoryContainer'

/*
  Parent: VenuesContainer
  Child: CategoryContainer

  At this point, we have a single venue, and the next thing we want to do is display all
  the categories that belong to it.  Extract them here.  There will normally be 4 categories.
*/
class SingleVenue extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      totalPhotosSelected: 0,
      latestSelectedPhotoLocation: 0,
      listOfSelectedPhotos: []
    };

    // Binding this allows us to call this function from a lower level and still have access to where we're at now
    this.increasePhotosSelected = this.increasePhotosSelected.bind(this);
    this.decreasePhotosSelected = this.decreasePhotosSelected.bind(this);

  }

  photoSelected = (photoLocation) => {
    /* If the states are different */
    if (this.state.latestSelectedPhotoLocation !== photoLocation) {

    } else {
      //Do nothing.
    }
  }

  increasePhotosSelected = (categoryId) => {

    console.log(categoryId);

    this.setState({
      totalPhotosSelected: this.state.totalPhotosSelected + 1,
      latestSelectedPhotoLocation: categoryId
    });
  }

  decreasePhotosSelected = (categoryId) => {

    console.log(categoryId);

    this.setState({
      totalPhotosSelected: this.state.totalPhotosSelected - 1,
      latestSelectedPhotoLocation: categoryId
    });
  }

  render () {

    const { 
      venue,
      adminId,
      venueId,
      updatePhoto
    } = this.props;

    /* Yes, "Categorys" isn't spelled right, but I did it in the API to follow Ruby/Rails conventions */
    const categories = venue.categorys.map((categories, index) => {
      return (
        <CategoryContainer
          key={index}
          index={index}
          category={categories}

          adminId={this.props.adminId}
          venueId={this.props.venueId}

          increasePhotosSelected={this.increasePhotosSelected}
          decreasePhotosSelected={this.decreasePhotosSelected}
          updatePhoto = {this.props.updatePhoto}
        />
      );
    });

    return (
      <div>
        {categories}
      </div>
    );
  }
}

export default SingleVenue;