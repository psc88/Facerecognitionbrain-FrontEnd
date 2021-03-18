import React, { Component } from 'react';
import Navigation from './Components/Navigation/Navigation';
import Clarifai from 'clarifai';
import Logo from './Components/Logo/Logo';
import Rank from './Components/Rank/Rank';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Particles from 'react-particles-js';
import './App.css';

const app = new Clarifai.App({
  apiKey: 'ea059ed6721445938c7f137316717960'
});


const particleOptions = {
  particles: {
    number: {
      value: 70,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
    }
  }

  onInputChange = (event) => {
    // obtenemos el valor con target.value
    console.log(event.target.value);
  }

  onButtonSubmit = () => {
    console.log('click');
    app.models.predict("d02b4508df58432fbb84e800597b8959", "https://samples.clarifai.com/face-det.jpg").then(
      function(response) {
        console.log(response);
      },
      function(err) {
        console.log(err);
      }
    );
  }

 render() {
  return (
    <div className="App">
      <Particles className='particles' 
        params={particleOptions} 
      />
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm 
        onInputChange={this.onInputChange} 
        onButtonSubmit={this.onButtonSubmit}
      />
      {/*
      <FaceRecognition />*/}
    </div>
  );
 }
}

export default App;
