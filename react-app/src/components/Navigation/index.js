import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import cclogo from './images/2.png'
function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <nav className="navigation-nav">
      <NavLink
        activeClassName="navigation-active-link"
        className="navigation-link navigation-home-button"
        exact
        to="/"
      	>
        <img id='cclogo' alt="co create logo" src={cclogo}   />
      </NavLink>
      {isLoaded && sessionUser && (
        <>
          <ProfileButton user={sessionUser} />
        </>
      )}
      {isLoaded && !sessionUser && (
        <div className="nav-signIn-signUp-div">
          <OpenModalButton
            buttonText="Sign In"
            modalComponent={<LoginFormModal />}
            className="nav-sign-in-up-btn nav-sign-in-btn"
          />
          <OpenModalButton
            buttonText="Create account"
            modalComponent={<SignupFormModal />}
            className="nav-sign-in-up-btn nav-sign-up-btn"
          />
        </div>
      )}
    </nav>
  );
}

export default Navigation;