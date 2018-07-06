import React from 'react';
import Username from './Username'

class Header extends React.Component {

  /* Before we are finished loading the header, we will use the header to populate the admins in App.state */
  componentWillMount() {
    this.props.getAdmins();
  }

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
        <h1 className="fl fancy_border_bottom">Arrange Photos</h1>
        {admin[0]}
      </div>
    );
  }
}

export default Header;