import React from "react";
import "./SignIn.css";

class SignIn extends React.Component {
  constructor() {
    super();
    this.state = {
      signInEmail: "",
      signInPassword: ""
    };
  }

  onEmailChange = event => {
    this.setState({ signInEmail: event.target.value });
  };
  onPasswordChange = event => {
    this.setState({ signInPassword: event.target.value });
  };

  onSubmit = () => {
    fetch("http://localhost:3000/signin", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: this.state.signInEmail,
        password: this.state.signInPassword
      })
    })
      .then(res => res.json())
      .then(user => {
        if (user.hasOwnProperty("id")) {
          this.props.loadUser(user);
          this.props.onRouteChange("home");
        }
      })
      .catch(err => console.log(err));
  };

  render() {
    const { onRouteChange } = this.props;

    return (
      <div className="signin-form sans-serif w-90 white mw6 center relative cover bg-top mt2">
        <div
          id="overlay"
          className="absolute absolute--fill bg-navy o-70 z-unset"
        ></div>

        <div className="relative pa4 pa5-m">
          <h1 className="serif tracked ma0 mb4 pv3">Sign In</h1>
          <div action="" id="login" className="">
            <div className="mb3">
              <label htmlFor="email" className="db f6 white-80 ttu ph2 mb2">
                Email
              </label>
              <input
                onChange={this.onEmailChange}
                type="email"
                name="email"
                className="input-reset db w-100 mw-100 white b pv2 ph3 bg-white-30 hover-bg-white-70 hover-gray outline-0 bn br-pill"
              />
            </div>
            <div className="mb4">
              <label htmlFor="password" className="db f6 white-80 ttu ph2 mb2">
                Password
              </label>
              <input
                onChange={this.onPasswordChange}
                type="password"
                name="password"
                className="input-reset db w-100 mw-100 white b pv2 ph3 bg-white-30 hover-bg-white-70 hover-gray outline-0 bn br-pill"
              />
            </div>
            <div>
              <button
                onClick={this.onSubmit}
                className="input-reset db w-100 light-gray f6 b ttu tracked pv3 ph3 pointer bg-dark-blue hover-bg-blue bn br-pill"
              >
                Sign In
              </button>
            </div>
          </div>

          <div
            className="tc b f6 mt4 o-70 glow pa2 i link pointer"
            onClick={() => onRouteChange("register")}
          >
            New Member? <span className="white">Register</span>
          </div>
        </div>
      </div>
    );
  }
}

export default SignIn;
