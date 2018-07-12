import React from 'react';
import VenuesContainer from './VenuesContainer'

/*
  Parent: App
  Child: VenuesContainer

  In a perfect world, this might allow you to log in and log out.

  But for now, it simply pulls out and renders the first admin's stuff (admin[0])
  from the API
*/
class AdminsContainer extends React.Component {
  render () {

    const { 
      venueAdmins,
      getAdmins,
      
      submitPhoto,
      updatePhoto,
      deletePhoto 
    } = this.props;

    const admins = venueAdmins.map((venueAdmin, index) => {
      return (
        <VenuesContainer
          key={index}
          index={index}
          venueAdmin={venueAdmin}
          getAdmins={this.props.getAdmins}
          adminId={venueAdmin.id}

          submitPhoto={this.props.submitPhoto}
          updatePhoto={this.props.updatePhoto}
          deletePhoto={this.props.deletePhoto}

        />
      );
    });

    return (
      <div>
        {admins[0]}
      </div>
    );
  }
}

export default AdminsContainer;