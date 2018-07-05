import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import UncategorizedPhotoContainer from './components/UncategorizedPhotoContainer';
import CenterToolbar from './components/CenterToolbar';
import ScrollablePhotoContainer from './components/ScrollablePhotoContainer';

class App extends Component {
  constructor() {
    super();
    this.state = {
      photosSelected: 0
    };
  }

  photoSelected = () => {
    this.setState({
      photosSelected: this.state.photosSelected + 1
    });
  }

  photoDeselected = () => {
    this.setState({
      photosSelected: this.state.photosSelected - 1
    });
  }

  render() {
    const { photosSelected } = this.state;


    return (
      <div className="App">
        <Header />
        <UncategorizedPhotoContainer />
        <CenterToolbar />
        <ScrollablePhotoContainer />
        <ScrollablePhotoContainer />
        <ScrollablePhotoContainer />
      </div>
    );
  }
}

export default App;
