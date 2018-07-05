import React from 'react';

class UncategorizedPhotoList extends React.Component {
  render () {
    return (
      <div className="unassigned_photo_container fl">

        <div className="unassigned_headline fancy_border_bottom fl">
          <h2>Photos that need a category</h2>
        </div>
        
        <div className="photo_list fancy_border_top full_width fl">

        </div>

      </div>
    );
  }

}

export default UncategorizedPhotoList;