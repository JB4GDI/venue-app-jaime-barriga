import React from 'react';
import axios from 'axios';

import CategoryContainer from './CategoryContainer'
import Toolbar from './Toolbar'

import venueApi from '../helpers/venueApi';

/*
  Parent: VenuesContainer
  Children: CategoryContainer
            Toolbar

  At this point, we have a single venue, and the next thing we want to do is display all
  the categories that belong to it.  Extract them here.  

  There will normally be 4 categories - Uncategorized, Profile, Home Rental, Planning
*/
class SingleVenue extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      categories: {},
      totalPhotosSelected: 0,
      latestSelectedPhotoCategory: 0,
      listOfSelectedPhotos: [],
      selectedPhotoIds: [],
      moveButtonHighlighted: 0
    };

    /*
      Binding allows us to call these functions from other levels while providing
      access to this component's 'this'
    */
    this.handleSinglePhotoSelect = this.handleSinglePhotoSelect.bind(this);
    this.movePhotosToCategory = this.movePhotosToCategory.bind(this);
    this.removePhotoFromSelectedList = this.removePhotoFromSelectedList.bind(this);
    // this.updateMoveButtonHighlighted = this.updateMoveButtonHighlighted.bind(this);

  }

  /* IMPORTANT: Yes, "Categorys" isn't spelled right, but I did it in the API to follow Ruby/Rails conventions */
  componentWillMount() {
    this.setState({ categories: this.props.venue.categorys });
  }

  /* IMPORTANT: Yes, "Categorys" isn't spelled right, but I did it in the API to follow Ruby/Rails conventions */
  componentDidMount() {
    this.setState({ categories: this.props.venue.categorys });
  }

  /*
    Lets us know which move button on the toolbar is highlighted
  */
  updateMoveButtonHighlighted = (categoryId) => {
    this.setState({ moveButtonHighlighted: categoryId });
  }

  /* 
    Given a photo as a parameter, remove it from the Selected Photo lists (state.listOfSelectedPhotos / state.selectedPhotoIds)
  */
  removePhotoFromSelectedList = (photo) => {

    /* If the photo is in the listOfSelectedPhotos[], remove it. */
    if (this.state.listOfSelectedPhotos.includes(photo)) {
      this.state.listOfSelectedPhotos.splice(this.state.listOfSelectedPhotos.indexOf(photo), 1);
      this.state.totalPhotosSelected = this.state.totalPhotosSelected - 1;
    }

    /* Next, if the photo id is in selectedPhotoIds[], remove it. */
    if (this.state.selectedPhotoIds.includes(photo.id)) {

      /* It is driving me crazy that this works but setState() doesn't */
      this.state.selectedPhotoIds.splice(this.state.selectedPhotoIds.indexOf(photo.id), 1);
    }

    // Force a refresh
    this.componentDidMount();
  }

  /*
    When we deal with a single photo being selected, we need to

    1.  See if the photo selected is in a new category
        If it is...
            A.  Deselect all the other photos
            B.  Select this one and update the state
        If it isn't...
            A.  Add this photo to the state

    The app refuses to let photos be selected across categories.
  */
  handleSinglePhotoSelect = (currentPhotoClicked, categoryId) => {

    console.log(currentPhotoClicked);
    console.log(this.state.listOfSelectedPhotos)
    console.log("latest category selected: " + this.state.latestSelectedPhotoCategory + " and categoryClicked: " + categoryId);

    // If the photo we clicked is in a totally new category
    if (this.state.latestSelectedPhotoCategory !== categoryId) {

      // This is fine, but we need to deselect all the other photos, then select this one

      // Bulldoze the list of selected photos...
      var updatedSelectedPhotoList = [currentPhotoClicked];
      var updatedSelectedPhotoId = [currentPhotoClicked.id];

      // ... and put only this photo in it.  Update the state accordingly.
      this.setState({ 
        listOfSelectedPhotos: updatedSelectedPhotoList,
        selectedPhotoIds: updatedSelectedPhotoId,
        totalPhotosSelected: 1
      });

    } else {

      console.log("Is this photo here already? " + this.state.listOfSelectedPhotos.includes(currentPhotoClicked));

      // We are in the same category we were in before.

      // We need to loop through the selected photo list and see if we find a match.  If we do, remove it.
      var foundMatch = false;

      this.state.listOfSelectedPhotos.forEach( (selectedPhoto) => {

        // If the clicked photo is already in our list
        if (selectedPhoto.id === currentPhotoClicked.id) {
          foundMatch = true;

          // Remove it from the listOfSelectedPhotos[]
          const updatedSelectedPhotoList = this.state.listOfSelectedPhotos;
          updatedSelectedPhotoList.splice(updatedSelectedPhotoList.indexOf(currentPhotoClicked), 1);

          // Remove its id from selectedPhotoIds[]
          const updatedSelectedPhotoIds = this.state.selectedPhotoIds
          updatedSelectedPhotoIds.splice(updatedSelectedPhotoIds.indexOf(currentPhotoClicked.id), 1);

          this.setState({ 
            listOfSelectedPhotos: updatedSelectedPhotoList,
            selectedPhotoIds: updatedSelectedPhotoIds,
            totalPhotosSelected: this.state.totalPhotosSelected - 1
          });

        }

      });

      if (foundMatch === false) {
        
        // This is a new photo so push it onto the list of selected photos and update the state        

        const updatedSelectedPhotoList = this.state.listOfSelectedPhotos;
        updatedSelectedPhotoList.push(currentPhotoClicked);

        const updatedSelectedPhotoIds = this.state.selectedPhotoIds;
        updatedSelectedPhotoIds.push(currentPhotoClicked.id);

        this.setState({ 
          listOfSelectedPhotos: updatedSelectedPhotoList,
          selectedPhotoIds: updatedSelectedPhotoIds,
          totalPhotosSelected: this.state.totalPhotosSelected + 1
        });
      }
    }

    // Regardless of what happened above, store the category of the photo we just clicked.  It is the most recent
    this.setState({ 
      latestSelectedPhotoCategory: categoryId
    });
    
  }

  /*
    Deselecting all photos is basically re-initializing all these state elements
  */
  deselectPhotosGlobal = () => {

    var emptyArray = [];

    this.setState({ 
      totalPhotosSelected: 0,
      listOfSelectedPhotos: emptyArray,
      selectedPhotoIds: emptyArray
    });
  }

  /* 
    This function takes a list of photos and forcibly arranges and re-ranks everything.  The app
    refuses to have a list of photos that aren't sequentially ranked.

    It is totally inefficient, but it allows us to quickly deal with a move where selected photos are in
    different places in the array.

    Also, I'm not expecting a single person to be uploading and sorting through millions
    of photos, so this inefficiency shouldn't matter
  */
  sortPhotos = (photos) => {

    /* Sort by the existing rank */
    function comparePhotoRank(a,b) {
      if (a.rank < b.rank)
        return -1;
      if (a.rank > b.rank)
        return 1;
      return 0;
    };
    photos.sort(comparePhotoRank);

    /* Bulldoze all ranks and rerank sequentially starting with 1 */
    for (let i = 0; i < photos.length; i ++) {
      photos[i].rank = i + 1 ;
    }

    return photos;
  }

  /*
    Here is the big function.  If we want to move a batch of selected photos, we need to...

    1.  Find the list of photos at the destination
    2.  Get the highest rank at the destination
    3.  Loop through the list of selected photos
        A.  Remove these photos from the origin list
        B.  Add these photos to the destination list, while updating rank       

    4.  Deselect everything

    This function has async/awaits on the API calls because we need things to resolve in
    a specific order

  */
  movePhotosToCategory = async (categoryDestinationId) => {

    /* CHEATING:  The index is always one lower than the category ID.*/
    var destinationPhotoList = this.props.venue.categorys[categoryDestinationId - 1].photos;
    var originPhotoList = this.props.venue.categorys[this.state.latestSelectedPhotoCategory - 1].photos;

    var highestDestinationRank = 0;

    /*
      Ascend through the list, and find the highest rank on a photo.
    */
    destinationPhotoList.forEach(async (element) => {
      if (element.rank > highestDestinationRank) {
        await(highestDestinationRank = element.rank);
      }
    });

    var photosToMove = this.state.listOfSelectedPhotos;

    /* Remove each photo from the original category, update the rank, and move it into the new category */
    photosToMove.forEach(async (currentPhoto) => {

      // Find the photo to remove in the original list, and remove it
      originPhotoList.forEach (async (originPhoto) => {

        if (originPhoto.id === currentPhoto.id) {
          const removePhoto = await(this.deletePhotoAndRefresh(this.props.adminId, this.props.venueId, this.state.latestSelectedPhotoCategory, currentPhoto));
        };

      });

      // Change each photo's rank to be one higher than the 
      // destination's current highest rank. (And then one higher than the one before it of course)
      currentPhoto.rank = highestDestinationRank + 1;
      highestDestinationRank = highestDestinationRank + 1;      

      const please = await(this.submitPhotoAndRefresh(this.props.adminId, this.props.venueId, categoryDestinationId, currentPhoto));

    });

    var emptyArray = [];

    // Nothing should be selected anymore so clear out the state
    this.setState({
      totalPhotosSelected: 0,
      listOfSelectedPhotos: [],
      selectedPhotoIds: []
    });
  }

  /* 
    A function to forcibly refresh the entire app and all the children (categories).

    Is this overkill?  Yes.

    But does it work?  Also yes. 

    The app gets unstable when you move photos (delete in a location and create in another).
    This forced refresh prevents the API promises from messing with us.
  */
  refreshAppAndChildren = () => {

    /* Reset the whole app */
    this.props.getAdmins();

    /* Reset the children.  We've set up a "ref" below to allow us access */
    for (let key in this.refs) {
      this.refs[key].getPhotosFromAPI(this.props.adminId, this.props.venueId);
    }
  }

  /* 
    We call a refresh on everything after this API call so the promises don't force us out of sync 
  */
  deletePhotoAndRefresh = (adminId, venueId, categoryId, photo) => {
    axios.delete(venueApi(`venueadmins/${adminId}/venues/${venueId}/categorys/${categoryId}/photos/${photo.id}`), photo)
    .then((res) => this.refreshAppAndChildren() )
    .catch((err) => console.log(err.response.data) );
  }

  /* 
    We call a refresh on everything after this API call so the promises don't force us out of sync 
  */
  submitPhotoAndRefresh = (adminId, venueId, categoryId, photo) => {
    axios.post(venueApi(`venueadmins/${adminId}/venues/${venueId}/categorys/${categoryId}/photos/`), photo)
    .then((res) => this.refreshAppAndChildren() )
    .catch((err) => console.log(err.response.data) );
  }

  render () {

    const { 
      venue,

      getAdmins,

      adminId,
      venueId,

      submitPhoto,
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
          listOfSelectedPhotos={this.state.listOfSelectedPhotos}
          selectedPhotoIds={this.state.selectedPhotoIds}
          changeSelectedPhotoRank={this.changeSelectedPhotoRank}
          handleSinglePhotoSelect={this.handleSinglePhotoSelect}
          removePhotoFromSelectedList={this.removePhotoFromSelectedList}

          moveButtonHighlighted={this.state.moveButtonHighlighted}
          
          updatePhoto={this.props.updatePhoto}
          deletePhoto={this.props.deletePhoto}
          sortPhotos={this.sortPhotos}          
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
          
          updateMoveButtonHighlighted={this.updateMoveButtonHighlighted}

          submitPhoto={this.props.submitPhoto}
        />
      </div>
    );
  }
}

export default SingleVenue;