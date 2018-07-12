import React from 'react';
import Username from './Username'

/*
  Parent: App
  Child: Username

  Very simple.  This generates the header on the page, and has a child that displays
  the username
*/
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
        <img className="pretzel fl" src="http://jaimebarriga.com/img/pretzel.png" /><p className="header_text fl">Arrange Photos</p>
        {admin[0]}
      </div>
    );
  }
}

export default Header;