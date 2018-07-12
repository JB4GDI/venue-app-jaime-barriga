import React from 'react';

/*
  Parent: SingleVenue

  This is the toolbar for moving photos around
*/
class Toolbar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      categoryIdClicked: 0
    };
  }

  /* 
    This is hardcoded which is normally terrible, but for the sake of moving quickly,
    here are all the buttons to render in a giant if statement
  */
  renderToolbarButtons = () => {

    if (this.props.latestSelectedPhotoCategory === 1) {
      return (
        <div className="toolbarButtonContainer fancy_border_top">
          <div className="movePhotosButton" onClick={ () => this.props.movePhotosToCategory(2)} onMouseEnter={ () => this.props.updateMoveButtonHighlighted(2)} onMouseLeave={ () => this.props.updateMoveButtonHighlighted(0)} >
            Profile
          </div>
          <div className="movePhotosButton" onClick={ () => this.props.movePhotosToCategory(3)} onMouseEnter={ () => this.props.updateMoveButtonHighlighted(3)} onMouseLeave={ () => this.props.updateMoveButtonHighlighted(0)} >
            Home Rental
          </div>
          <div className="movePhotosButton" onClick={ () => this.props.movePhotosToCategory(4)} onMouseEnter={ () => this.props.updateMoveButtonHighlighted(4)} onMouseLeave={ () => this.props.updateMoveButtonHighlighted(0)} >
            Planning
          </div>
        </div>        
      );
    } else if (this.props.latestSelectedPhotoCategory === 2) {
      return (
        <div className="toolbarButtonContainer fancy_border_top">
          <div className="movePhotosButton" onClick={ () => this.props.movePhotosToCategory(1)} onMouseEnter={ () => this.props.updateMoveButtonHighlighted(1)} onMouseLeave={ () => this.props.updateMoveButtonHighlighted(0)} >
            Unassigned
          </div>
          <div className="movePhotosButton" onClick={ () => this.props.movePhotosToCategory(3)} onMouseEnter={ () => this.props.updateMoveButtonHighlighted(3)} onMouseLeave={ () => this.props.updateMoveButtonHighlighted(0)} >
            Home Rental
          </div>
          <div className="movePhotosButton" onClick={ () => this.props.movePhotosToCategory(4)} onMouseEnter={ () => this.props.updateMoveButtonHighlighted(4)} onMouseLeave={ () => this.props.updateMoveButtonHighlighted(0)} >
            Planning
          </div>
        </div>        
      );
    } else if (this.props.latestSelectedPhotoCategory === 3) {
      return (
        <div className="toolbarButtonContainer fancy_border_top">
          <div className="movePhotosButton" onClick={ () => this.props.movePhotosToCategory(1)} onMouseEnter={ () => this.props.updateMoveButtonHighlighted(1)} onMouseLeave={ () => this.props.updateMoveButtonHighlighted(0)} >
            Unassigned
          </div>
          <div className="movePhotosButton" onClick={ () => this.props.movePhotosToCategory(2)} onMouseEnter={ () => this.props.updateMoveButtonHighlighted(2)} onMouseLeave={ () => this.props.updateMoveButtonHighlighted(0)} >
            Profile
          </div>
          <div className="movePhotosButton" onClick={ () => this.props.movePhotosToCategory(4)} onMouseEnter={ () => this.props.updateMoveButtonHighlighted(4)} onMouseLeave={ () => this.props.updateMoveButtonHighlighted(0)} >
            Planning
          </div>
        </div>        
      );
    } else if (this.props.latestSelectedPhotoCategory === 4) {
      return (
        <div className="toolbarButtonContainer fancy_border_top">
          <div className="movePhotosButton" onClick={ () => this.props.movePhotosToCategory(1)} onMouseEnter={ () => this.props.updateMoveButtonHighlighted(1)} onMouseLeave={ () => this.props.updateMoveButtonHighlighted(0)} >
            Unassigned
          </div>
          <div className="movePhotosButton" onClick={ () => this.props.movePhotosToCategory(2)} onMouseEnter={ () => this.props.updateMoveButtonHighlighted(2)} onMouseLeave={ () => this.props.updateMoveButtonHighlighted(0)} >
            Profile
          </div>
          <div className="movePhotosButton" onClick={ () => this.props.movePhotosToCategory(3)} onMouseEnter={ () => this.props.updateMoveButtonHighlighted(3)} onMouseLeave={ () => this.props.updateMoveButtonHighlighted(0)} >
            Home Rental
          </div>
        </div>        
      );
    }
  }

  render () {
    const {
      totalPhotosSelected,
      latestSelectedPhotoCategory,
      selectedPhotoIds,

      updateMoveButtonHighlighted,

      movePhotosToCategory
    } = this.props;

    return (
      <div className={ this.props.totalPhotosSelected > 0 ? "toolbar slide_to_left" : "toolbar hidden" } >
        <h2 className="center_text fancy_border_bottom">Move to:</h2>

        {this.renderToolbarButtons()}

      </div>
    );
  }
}

export default Toolbar;