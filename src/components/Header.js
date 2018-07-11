import React from 'react';
import Username from './Username'

class Header extends React.Component {

  render() {

    const { venueAdmins } = this.props;

    const admin = venueAdmins.map((venueAdmin, index) => {
      return (
        <Username
          key={index}
          index={index}
          venueAdmin={venueAdmin}
        />
      );
    });

    return (
      <div className="header fl">
        <p className="header_text fl">Arrange Photos</p>
        {admin[0]}
      </div>
    );
  }
}

export default Header;