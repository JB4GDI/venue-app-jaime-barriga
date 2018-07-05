import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import UncategorizedPhotoContainer from './components/UncategorizedPhotoContainer';
import CenterToolbar from './components/CenterToolbar';
import ScrollablePhotoContainer from './components/ScrollablePhotoContainer';

class App extends Component {
  render() {
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
