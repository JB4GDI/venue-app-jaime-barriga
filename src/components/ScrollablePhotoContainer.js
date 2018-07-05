import React from 'react';

class ScrollablePhotoContainer extends React.Component {
  render () {
    return (
      <div className="scrollable_photo_container right_panel_width fl">

        <div className="fancy_border_bottom fl">
          <h2>Profile photos</h2>
        </div>
        
        <div className="scrollable_photo_list fancy_border_top fl">
        </div>

      </div>
    );
  }
}

export default ScrollablePhotoContainer;