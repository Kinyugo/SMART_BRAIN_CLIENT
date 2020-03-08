import React from "react";
import "./App.css";
import Navigation from "./components/Navigation/Navigation";
import SignIn from "./components/SignIn/SignIn";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import Register from "./components/Register/Register";
import Particles from "react-particles-js";
import params from "./particleConfig";
import Clarifai from "clarifai";
import API_KEY from "./clarifai-apikey";

const app = new Clarifai.App({
  apiKey: API_KEY
});
const initialState = {
  imageUrlInput: "",
  imageUrl: "",
  box: {},
  route: "signin",
  isSignedIn: false,
  user: {
    id: "",
    name: "",
    email: "",
    entries: 0,
    joined: ""
  }
};
class App extends React.Component {
  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = user => {
    this.setState({ user: user });
  };

  calculateFaceLocation = data => {
    const clarifaiFace =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputImage");
    const width = Number(image.width);
    const height = Number(image.height);
    console.log(width, height, clarifaiFace);

    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height
    };
  };

  displayFaceBox = box => {
    this.setState({ box });
  };

  onRouteChange = route => {
    if (route === "signout") {
      this.setState(initialState);
    } else if (route === "home") {
      this.setState({ isSignedIn: true });
    }
    this.setState({ route: route });
  };
  onInputChange = event => {
    this.setState({ imageUrlInput: event.target.value });
  };

  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.imageUrlInput });
    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, this.state.imageUrlInput)
      .then(response => {
        if (response) {
          fetch("http://localhost:3000/image", {
            method: "put",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(res => res.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count }));
            });

          this.displayFaceBox(this.calculateFaceLocation(response));
        }
      })
      .catch(err => console.log(err));
  };

  render() {
    const { isSignedIn, box, imageUrl, route } = this.state;
    const { onButtonSubmit, onInputChange, onRouteChange, loadUser } = this;
    return (
      <div className="App">
        <Particles className="particles" params={params} />

        <Navigation onRouteChange={onRouteChange} isSignedIn={isSignedIn} />
        {route === "home" ? (
          <>
            <Logo />
            <Rank name={this.state.user.name} rank={this.state.user.entries} />
            <ImageLinkForm
              onInputChange={onInputChange}
              onButtonSubmit={onButtonSubmit}
            />
            <FaceRecognition box={box} imgUrl={imageUrl} />
          </>
        ) : route === "signin" ? (
          <SignIn onRouteChange={onRouteChange} loadUser={loadUser} />
        ) : (
          <Register onRouteChange={onRouteChange} loadUser={loadUser} />
        )}
      </div>
    );
  }
}

export default App;
