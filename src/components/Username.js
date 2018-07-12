import React from 'react';

/*
  Parent: Header

  This component displays the user's name.

  It is so simple it should probably be absorbed into the parent, but this at least
  keeps it extendable.
*/
class Username extends React.Component {

  render () {

    const { venueAdmin } = this.props

    return (
      <p className="username header_text fr">Hello {venueAdmin.name}!</p>
    );
  }
}

export default Username;