import React from 'react';
import SingleVenue from './SingleVenue'

/*
  Parent: AdminsContainer
  Child: SingleVenue

  At this point, we have all the venues attached to the admin that came in.  Extract the top venue - venue[0].
*/
class VenuesContainer extends React.Component {

  render () {

    const { 
      venueAdmin,
      adminId,
      updatePhoto
    } = this.props;

    const venues = venueAdmin.venues.map((venues, index) => {
      return (
        <SingleVenue
          key={index}
          index={index}
          venue={venues}

          adminId={this.props.adminId}
          venueId={venues.id}

          updatePhoto = {this.props.updatePhoto}
        />
      );
    });


    return (
      <div>
        {venues[0]}
      </div>
    );
  }
}

export default VenuesContainer;