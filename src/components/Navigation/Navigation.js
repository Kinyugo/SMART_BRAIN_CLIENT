import React from "react";
import "./Navigation.css";

const Navigation = ({ onRouteChange, isSignedIn }) => {
  if (isSignedIn) {
    return (
      <nav>
        <p
          className="logo-name f2"
          style={{ fontFamily: "Petit Formal Script" }}
        >
          Smart Brain
        </p>
        <p
          onClick={() => onRouteChange("signout")}
          className="sign-out f3 link dim black pa3 pointer"
        >
          Sign Out
        </p>
      </nav>
    );
  } else {
    return (
      <nav>
        <p
          className="logo-name f2"
          style={{ fontFamily: "Petit Formal Script" }}
        >
          Smart Brain
        </p>
        <p
          onClick={() => onRouteChange("signin")}
          className="sign-out f3 link dim black pa3 pointer"
        >
          Sign In
        </p>
        <p
          onClick={() => onRouteChange("register")}
          className="sign-out f3 link dim black pa3 pointer"
        >
          Register
        </p>
      </nav>
    );
  }
};

export default Navigation;
