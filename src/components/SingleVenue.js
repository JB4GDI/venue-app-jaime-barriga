import React from 'react';
import CategoryContainer from './CategoryContainer'

/*
  Parent: VenuesContainer
  Child: CategoryContainer

  At this point, we have a single venue, and the next thing we want to do is display all
  the categories that belong to it.  Extract them here.  

  There will normally be 4 categories.
*/
class SingleVenue extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      totalPhotosSelected: 0,
      latestSelectedPhotoCategory: 0,
      listOfSelectedPhotos: [],
      selectedPhotoIds: []
    };

    // Binding this allows us to call this function from a lower level and still have access to where we're at now
    this.increasePhotosSelected = this.increasePhotosSelected.bind(this);
    this.decreasePhotosSelected = this.decreasePhotosSelected.bind(this);
    this.handleSinglePhotoSelect = this.handleSinglePhotoSelect.bind(this);

  }

  selectme = (photoLocation) => {
    /* If the states are different */
    if (this.state.latestSelectedPhotoCategory !== photoLocation) {

    } else {
      //Do nothing.
    }
  }

  increasePhotosSelected = (categoryId) => {

    // console.log(categoryId);

    this.setState({
      totalPhotosSelected: this.state.totalPhotosSelected + 1,
      latestSelectedPhotoCategory: categoryId
    });
  }

  decreasePhotosSelected = (categoryId) => {

    // console.log(categoryId);

    this.setState({
      totalPhotosSelected: this.state.totalPhotosSelected - 1,
      latestSelectedPhotoCategory: categoryId
    });
  }

  handleSinglePhotoSelect = (currentPhotoClicked, categoryId) => {

    console.log("PHOTO CLICKED: " + currentPhotoClicked.id);
    console.log(currentPhotoClicked);
    console.log(this.state.listOfSelectedPhotos);

    // If the photo we clicked is in a totally new category
    if (this.state.latestSelectedPhotoCategory !== categoryId) {

      // This is fine, but we need to deselect all the other photos, then select this one
      this.deselectPhotosGlobalNoSetState();
      // console.log("GLOBAL DESELECTION");

      // Bulldoze the list of selected photos, and put only this photo in it
      var updatedSelectedPhotoList = [currentPhotoClicked];
      var updatedSelectedPhotoId = [currentPhotoClicked.id];

      this.setState({ 
        listOfSelectedPhotos: updatedSelectedPhotoList,
        selectedPhotoIds: updatedSelectedPhotoId
      });

      // console.log(updatedSelectedPhotoList);
      // console.log(updatedSelectedPhotoId);

      // console.log("PHOTO CLICKED END");


    } else {

      // We are in the same category we were in before.

      // The clicked photo is already in our list
      if (this.state.listOfSelectedPhotos.includes(currentPhotoClicked)) {

        // console.log("PHOTO IS ALREADY HERE");

        // Remove this photo from the list of selected photos and update the state

        // console.log("*******START*******");
        // console.log(this.state.listOfSelectedPhotos);



        const updatedSelectedPhotoList = this.state.listOfSelectedPhotos;

        // console.log(updatedSelectedPhotoList);
        // console.log("PHOTO_ID CLICKED: " + currentPhotoClicked.id);
        // console.log("NEW LOCATION TO SPLIT: " + updatedSelectedPhotoList.indexOf(currentPhotoClicked));

        updatedSelectedPhotoList.splice(updatedSelectedPhotoList.indexOf(currentPhotoClicked), 1);

        // console.log(updatedSelectedPhotoList);
        // // console.log("**************");
        // // console.log("*******START*******");
        // console.log(this.state.selectedPhotoIds);

        const updatedSelectedPhotoIds = this.state.selectedPhotoIds
        updatedSelectedPhotoIds.splice(updatedSelectedPhotoIds.indexOf(currentPhotoClicked.id), 1);

        // console.log(updatedSelectedPhotoIds);
        // console.log("*******END*******");

        this.setState({ 
          listOfSelectedPhotos: updatedSelectedPhotoList,
          selectedPhotoIds: updatedSelectedPhotoIds
        });

      } else {

        console.log("NEW PHOTO");

        // This is a new photo so push it onto the list of selected photos and update the state

        console.log("*******START*******");
        

        const updatedSelectedPhotoList = this.state.listOfSelectedPhotos;
        console.log(updatedSelectedPhotoList);
        updatedSelectedPhotoList.push(currentPhotoClicked);
        console.log(updatedSelectedPhotoList);

        const updatedSelectedPhotoIds = this.state.selectedPhotoIds;
        console.log(updatedSelectedPhotoIds);
        updatedSelectedPhotoIds.push(currentPhotoClicked.id);
        console.log(updatedSelectedPhotoIds);

        console.log("*******END*******");

        this.setState({ 
          listOfSelectedPhotos: updatedSelectedPhotoList,
          selectedPhotoIds: updatedSelectedPhotoIds
        });
      }      

    }

    // console.log(this.state.listOfSelectedPhotos);
    // console.log(this.state.selectedPhotoIds);


    // Regardless of what happened above, store the category of the photo we just clicked.  It is the most recent
    this.setState({ 
      latestSelectedPhotoCategory: categoryId
    });
    
  }

  deselectPhotosGlobalNoSetState = () => {
    // console.log("DESELECT ALL FIRED!");

    // console.log(this.state.listOfSelectedPhotos);

    // console.log(this.state.listOfSelectedPhotos);

    // console.log(this.refs);

    // Access the "deselectAllPhotos" function in the CategoryContainer children (using childCategoryReference)
    for (let key in this.refs) {
      this.refs[key].deselectAllPhotos();
    }

  }

  deselectPhotosGlobal = () => {
    // console.log("DESELECT ALL FIRED!");

    // console.log(this.state.listOfSelectedPhotos);

    var emptyArray = [];

    this.setState({ 
      listOfSelectedPhotos: emptyArray,
      selectedPhotoIds: emptyArray
    });

    // console.log(this.state.listOfSelectedPhotos);

    // console.log(this.refs);

    // Access the "deselectAllPhotos" function in the CategoryContainer children (using childCategoryReference)
    for (let key in this.refs) {
      this.refs[key].deselectAllPhotos();
    }

  }

  render () {

    const { 
      venue,
      adminId,
      venueId,
      updatePhoto
    } = this.props;

    /* Yes, "Categorys" isn't spelled right, but I did it in the API to follow Ruby/Rails conventions */
    const categories = venue.categorys.map((categories, index) => {
      return (
        <CategoryContainer

          ref={"childCategoryReference" + index}

          key={index}
          index={index}
          category={categories}

          adminId={this.props.adminId}
          venueId={this.props.venueId}

          latestSelectedPhotoCategory={this.state.latestSelectedPhotoCategory}
          selectedPhotoIds={this.state.selectedPhotoIds}
          handleSinglePhotoSelect={this.handleSinglePhotoSelect}
          increasePhotosSelected={this.increasePhotosSelected}
          decreasePhotosSelected={this.decreasePhotosSelected}
          updatePhoto = {this.props.updatePhoto}
        />
      );
    });

    return (
      <div>
        <p onClick={() => this.deselectPhotosGlobal() }>DESELECT ALL</p>
        {categories}
      </div>
    );
  }
}

export default SingleVenue;