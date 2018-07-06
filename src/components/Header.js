import React from 'react';
import Username from './Username'

class Header extends React.Component {

  componentWillMount() {
    this.props.getAdmins();
  }

  test() {
    console.log(this.props.venueAdmins);
  }

  test(input) {
    console.log(input);
  }

  render() {

    const { venueAdmins } = this.props;

    // const admin = venueAdmins.map((venueAdmin, index) => {
    //   return (
    //     <Username
    //       key={index}
    //       index={index}
    //     />
    //   );
    // });

    return (
      <div className="header fl">
        <h1 className="fl fancy_border_bottom">Arrange Photos</h1>
        <p onClick={() => this.test(this.props.venueAdmins)}>CLICK ME</p>
        
      </div>
    );
  }
}

export default Header;