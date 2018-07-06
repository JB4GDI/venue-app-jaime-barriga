import React from 'react';
import CategoryContainer from './CategoryContainer'

/*
  Parent: VenuesContainer
  Child: CategoryContainer

  At this point, we have a single venue, and the next thing we want to do is display all the categories that belong to it.  Extract them here.
*/
class SingleVenue extends React.Component {
  render () {

    const { 
      venue,
      adminId,
      venueId,
      increasePhotosSelected,
      decreasePhotosSelected,
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

          increasePhotosSelected={this.props.increasePhotosSelected}
          decreasePhotosSelected={this.props.decreasePhotosSelected}
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