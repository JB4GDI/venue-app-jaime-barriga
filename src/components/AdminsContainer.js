import React from 'react';
import VenuesContainer from './VenuesContainer'

/*
  Parent: App
  Child: VenuesContainer

  In a perfect world, maybe this might allow you to log in and log out. 

  But for now, it simply pulls out the top level of stuff from the API (admin[0])
*/
class AdminsContainer extends React.Component {
  render () {

    const { 
      venueAdmins,
      getAdmins,
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

          updatePhoto = {this.props.updatePhoto}
          deletePhoto = {this.props.deletePhoto}

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