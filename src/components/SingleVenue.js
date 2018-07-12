import React from 'react';
import axios from 'axios';

import CategoryContainer from './CategoryContainer'
import Toolbar from './Toolbar'

import venueApi from '../helpers/venueApi';

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
    this.changeSelectedPhotoRank = this.changeSelectedPhotoRank.bind(this);
    this.removePhotoFromSelectedList = this.removePhotoFromSelectedList.bind(this);

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

  /* TODO: At some point, this should be where we edit the rank of something in the state.listOfSelectedPhotos */
  changeSelectedPhotoRank = (photo) => {

  }

  /* 
    Given a photo as a parameter, remove it from the Selected Photo lists (state.listOfSelectedPhotos / state.selectedPhotoIds)

  */
  removePhotoFromSelectedList = (photo) => {

    console.log("Time to remove?");
    console.log(this.state.listOfSelectedPhotos);

    if (this.state.listOfSelectedPhotos.includes(photo)) {
      console.log("yes");

      this.state.listOfSelectedPhotos.splice(this.state.listOfSelectedPhotos.indexOf(photo), 1);

      console.log(this.state.listOfSelectedPhotos);

      this.state.totalPhotosSelected = this.state.totalPhotosSelected - 1;

    }

    if (this.state.selectedPhotoIds.includes(photo.id)) {
      // console.log("Ids?");
      // console.log(this.state.selectedPhotoIds);
      // console.log("ID to remove: " + photo.id);

      /* It is driving me crazy that this works but setState() doesn't */
      this.state.selectedPhotoIds.splice(this.state.selectedPhotoIds.indexOf(photo.id), 1);

      // console.log(newPhotoIdList);
      
      // this.setState({ selectedPhotoIds: newPhotoIdList });
      // console.log(this.state.selectedPhotoIds);
    }

    this.componentDidMount();

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
    // for (let key in this.refs) {
    //   this.refs[key].deselectAllPhotos();
    // }

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
    // for (let key in this.refs) {
    //   this.refs[key].deselectAllPhotos();
    // }

  }

  /* 
    This function takes a list of photos and forcibly arranges and re-ranks everything.

    It is a hack so that we can quickly deal with a move where selected photos are in
    different places in the array.
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

    /* Wipe out that rank and rerank starting with 1 */
    for (let i = 0; i < photos.length; i ++) {
      photos[i].rank = i + 1 ;
    }

    return photos;
  }

  /*
    Here is the big one.  If we want to move a batch of selected photos, we need to...

    1.  Find the list of photos at the destination
    2.  Get the highest rank at the destination
    3.  Loop through the list of selected photos
        A.  Remove these photos from the origin list
        B.  Add these photos to the destination list, while updating rank
        

    5.  Deselect everything

  */
  movePhotosToCategory = async (categoryDestinationId) => {

    console.log("Move these photos to " + categoryDestinationId);
    console.log("This should be it:");
    console.log(this.props.venue.categorys[categoryDestinationId - 1]);

    console.log("Move these photos from " + this.state.latestSelectedPhotoCategory);

    console.log("This should be the origin:");
    console.log(this.props.venue.categorys[this.state.latestSelectedPhotoCategory - 1]);

    /* CHEATING:  The index is always one lower than the category ID.*/
    var destinationPhotoList = this.props.venue.categorys[categoryDestinationId - 1].photos;
    var originPhotoList = this.props.venue.categorys[this.state.latestSelectedPhotoCategory - 1].photos;

    console.log("destination below:");
    console.log(destinationPhotoList);
    console.log(originPhotoList);
    console.log("origin above:");

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


    /* Remove from old category, then update the rank and move into the new category */
    photosToMove.forEach(async (currentPhoto) => {

      console.log("Currently looking at: id" + currentPhoto.id + "with rank " + currentPhoto.rank);      
      console.log("***************");
      console.log(currentPhoto);
      console.log(originPhotoList);
      console.log("***************");

      originPhotoList.forEach (async (originPhoto) => {

        console.log(originPhoto.id);

        if (originPhoto.id === currentPhoto.id) {
          console.log("READY TO DELETE PHOTO");
          const why = await(this.testDeletePhoto(this.props.adminId, this.props.venueId, this.state.latestSelectedPhotoCategory, currentPhoto));
        };

      });

      currentPhoto.rank = highestDestinationRank + 1;
      highestDestinationRank = highestDestinationRank + 1;      

      const please = await(this.testSubmitPhoto(this.props.adminId, this.props.venueId, categoryDestinationId, currentPhoto));

    });

    var emptyArray = [];

    this.setState({
      totalPhotosSelected: 0,
      listOfSelectedPhotos: [],
      selectedPhotoIds: []
    });


    // console.log(originPhotoList);
    console.log("Ready to reload");    

    console.log("SHOULD BE MOUNTED NOW HMMMMM");
  }

  /* 
    Is this overkill?  Yes.  But does it work?  Also yes. 

    The app gets unstable when you move a photo (delete in a location and create in another).
    This forces a refresh of everything, and prevents the API promises from messing with us.
  */
  refreshAppAndChildren = () => {

    /* Reset the whole app */
    this.props.getAdmins();

    console.log("refreshAllChildren");
    for (let key in this.refs) {
      console.log("refreshAllChildren: + " + key);
      this.refs[key].getPhotosFromAPI(this.props.adminId, this.props.venueId);
    }
  }

  /* We call a refresh on everything after this API call so the promises don't force us out of sync */
  testDeletePhoto = (adminId, venueId, categoryId, photo) => {

    console.log("APP Deleting photo: ");
    console.log(photo);

    axios.delete(venueApi(`venueadmins/${adminId}/venues/${venueId}/categorys/${categoryId}/photos/${photo.id}`), photo)
    .then((res) => this.refreshAppAndChildren() )
    .catch((err) => console.log(err.response.data) );
  }

  /* We call a refresh on everything after this API call so the promises don't force us out of sync */
  testSubmitPhoto = (adminId, venueId, categoryId, photo) => {

    console.log("APP Submitting photo: ");
    console.log(photo);

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
          
          updatePhoto={this.props.updatePhoto}
          deletePhoto={this.props.deletePhoto}
          
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

          submitPhoto={this.props.submitPhoto}

        />


      </div>
    );
  }
}

export default SingleVenue;