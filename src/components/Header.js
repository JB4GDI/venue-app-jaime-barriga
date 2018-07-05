import React from 'react';

class Header extends React.Component {

  componentWillMount() {
    this.props.getAdmins();
  }

  render() {
    return (
      <div className="header fl">
        <h1 className="fl fancy_border_bottom">Arrange Photos</h1>
        <p  className="username fr">Hello Jaime!</p>
      </div>
    );
  }

}

export default Header;