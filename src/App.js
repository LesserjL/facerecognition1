import React, { Component } from 'react';
import './App.css';
import ParticlesBg from 'particles-bg'
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import Rank from './Components/Rank/Rank';
    // Your PAT (Personal Access Token) can be found in the portal under Authentification
const PAT = '86239ff544654fd29011ef22f96e5b16';
    // Specify the correct user_id/app_id pairings
    // Since you're making inferences outside your app's scope
const USER_ID = 'clarifai';       
const APP_ID = 'main';
    // Change these to whatever model and image URL you want to use
const MODEL_ID = 'color-recognition';   
const raw = JSON.stringify({
      "user_app_id": {
      "user_id": USER_ID,
      "app_id": APP_ID
        },
        "inputs": [
            {
                "data": {
                    "image": {
                        "url": "https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-after/Landscape-BW.jpg"
                    }
                }
            }
        ]
    });

    const requestOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Key ' + PAT
        },
        body: raw
    };


class App extends Component {
  constructor(){
    super();
    this.state = {
      input: '',
      imageUrl: '',

    }
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value})
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
    fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/outputs", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
  }
  render(){
  return (
    <div className="App">
      <ParticlesBg type="random" bg={true} />
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm 
      onInputChange={this.onInputChange} 
      onButtonSubmit={this.onButtonSubmit} 
      />
      <FaceRecognition imageUrl={this.state.imageUrl}/>
    </div>
    );
  }
}
export default App;
