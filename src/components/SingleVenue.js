import React from 'react';
import CategoryContainer from './CategoryContainer'
import Toolbar from './Toolbar'

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
      categories: {},
      totalPhotosSelected: 0,
      latestSelectedPhotoCategory: 0,
      listOfSelectedPhotos: [],
      selectedPhotoIds: []
    };

    // Binding this allows us to call this function from a lower level and still have access to where we're at now
    this.handleSinglePhotoSelect = this.handleSinglePhotoSelect.bind(this);
    this.movePhotosToCategory = this.movePhotosToCategory.bind(this);

  }

  /* Yes, "Categorys" isn't spelled right, but I did it in the API to follow Ruby/Rails conventions */
  componentWillMount() {
    this.setState({ categories: this.props.venue.categorys });
  }

  /* Yes, "Categorys" isn't spelled right, but I did it in the API to follow Ruby/Rails conventions */
  componentDidMount() {
    this.setState({ categories: this.props.venue.categorys });
  }

  selectme = (photoLocation) => {
    /* If the states are different */
    if (this.state.latestSelectedPhotoCategory !== photoLocation) {

    } else {
      //Do nothing.
    }
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
        selectedPhotoIds: updatedSelectedPhotoId,
        totalPhotosSelected: 1
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
          selectedPhotoIds: updatedSelectedPhotoIds,
          totalPhotosSelected: this.state.totalPhotosSelected - 1
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
          selectedPhotoIds: updatedSelectedPhotoIds,
          totalPhotosSelected: this.state.totalPhotosSelected + 1
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

  /*
    Here is the big one.  If we want to move a batch of photos, we need to...

    1.  Find the list of photos at the destination
    2.  Get the highest rank at the destination
    3.  Loop through the list of selected photos
        A.  Add these photos to the destination list, while updating rank
    4.  Loop through the list of selected photos again
        A.  Remove them from the old list

    5.  Deselect everything

  */
  movePhotosToCategory = (categoryDestinationId) => {

    console.log("Move these photos to " + categoryDestinationId);

    /* CHEATING:  The index is always one lower than the category ID.*/
    var destinationPhotoList = this.props.venue.categorys[categoryDestinationId - 1].photos;
    var originPhotoList = this.props.venue.categorys[this.state.latestSelectedPhotoCategory - 1].photos;

    console.log(destinationPhotoList);
    console.log(originPhotoList);

    var highestDestinationRank = 0;

    /* Ascend up the list */
    destinationPhotoList.forEach(async (element) => {

      console.log(element);

      console.log("current:new::" + highestDestinationRank + ":" + element.rank);

      if (element.rank > highestDestinationRank) {
        await(highestDestinationRank = element.rank);
      }
    });

    console.log("highest destination rank: " + highestDestinationRank);


    var photosToMove = this.state.listOfSelectedPhotos;

    console.log(photosToMove);


    /* Update the rank and move into the new category */
    photosToMove.forEach(async (currentPhoto) => {
      currentPhoto.rank = highestDestinationRank + 1;
      highestDestinationRank = highestDestinationRank + 1;
      destinationPhotoList.push(currentPhoto);
    });

    console.log(destinationPhotoList);



  }

  render () {

    const { 
      venue,

      getAdmins,

      adminId,
      venueId,

      updatePhoto,
      deletePhoto
    } = this.props;

    
    const categories = this.state.categories.map((categories, index) => {
      return (
        <CategoryContainer

          ref={"childCategoryReference" + index}

          key={index}
          index={index}
          category={categories}

          getAdmins={this.props.getAdmins}

          adminId={this.props.adminId}
          venueId={this.props.venueId}

          latestSelectedPhotoCategory={this.state.latestSelectedPhotoCategory}
          selectedPhotoIds={this.state.selectedPhotoIds}
          handleSinglePhotoSelect={this.handleSinglePhotoSelect}
          updatePhoto = {this.props.updatePhoto}
          deletePhoto = {this.props.deletePhoto}
          
        />
      );
    });

    return (
      <div>
        {categories}
        <Toolbar 
          totalPhotosSelected={this.state.totalPhotosSelected}
          latestSelectedPhotoCategory={this.state.latestSelectedPhotoCategory}
          selectedPhotoIds={this.state.selectedPhotoIds}
          movePhotosToCategory={this.movePhotosToCategory}


        />


      </div>
    );
  }
}

export default SingleVenue;