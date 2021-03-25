import React, { Component } from 'react';
import Navigation from './Components/Navigation/Navigation';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
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
      imageUrl: '',
      //agregado de caja que contendra los valores que recibimnos
      box: {}
    }
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    //vamos a hacer un poco de manipulacion DOM, id creado en FaceRegognition.js
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    //queremos volver un objeto
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFacebox = (box) => {
    console.log(box);
    this.setState({box: box})
  }

  onInputChange = (event) => {
    // obtenemos el valor con target.value
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    // de esta manera podemos pasar la imagenUrl
    this.setState({imageUrl: this.state.input});
    app.models.predict(
      Clarifai.FACE_DETECT_MODEL, 
      this.state.input)
      //calculatefacelocation toma una respuesta, devuelve un objeto y este objeto devuelve un displayfacebox
      .then(response => this.displayFacebox(this.calculateFaceLocation(response)))
      //usamos promesa para el error
      .catch(err => console.log(err));
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
      <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl}/>
    </div>
  );
 }
}

export default App;
