import React from 'react';

class Username extends React.Component {



  render () {

    const { venueAdmin } = this.props

    return (
      <p className="username fr">Hello {venueAdmin.name}!</p>
    );
  }
}

export default Username;