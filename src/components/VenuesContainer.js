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
      getAdmins,
      adminId,

      submitPhoto,
      updatePhoto,
      deletePhoto
    } = this.props;

    const venues = venueAdmin.venues.map((venues, index) => {
      return (
        <SingleVenue
          key={index}
          index={index}
          venue={venues}

          getAdmins={this.props.getAdmins}

          adminId={this.props.adminId}
          venueId={venues.id}

          submitPhoto={this.props.submitPhoto}
          updatePhoto={this.props.updatePhoto}
          deletePhoto={this.props.deletePhoto}
        />
      );
    });


    return (
      <div className="venue_container full_width fl">
        {venues[0]}
      </div>
    );
  }
}

export default VenuesContainer;