import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import UncategorizedPhotoList from './components/UncategorizedPhotoList';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <UncategorizedPhotoList />
      </div>
    );
  }
}

export default App;
