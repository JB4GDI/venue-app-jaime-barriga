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
      totalPhotosSelected: 0
    };
  }

  increasePhotosSelected = () => {
    this.setState({
      totalPhotosSelected: this.state.totalPhotosSelected + 1
    });
  }

  decreasePhotosSelected = () => {
    this.setState({
      totalPhotosSelected: this.state.totalPhotosSelected - 1
    });
  }

  render() {
    const { totalPhotosSelected } = this.state;


    return (
      <div className="App">
        <Header />
        <UncategorizedPhotoContainer 
          totalPhotosSelected={this.totalPhotosSelected}
          increasePhotosSelected={this.increasePhotosSelected}
          decreasePhotosSelected={this.decreasePhotosSelected}
        />
        <CenterToolbar />
      </div>
    );
  }
}

export default App;
