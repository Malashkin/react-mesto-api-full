import React from "react";
import mainLogo from "./../images/Vector.svg";
import NavBar from "./NavBar";

const Header = ({ user, signOut }) => {
  return (
    <div className="header">
      <img className="header__logo" src={mainLogo} alt="Логотип" />
      <NavBar signOut={signOut} user={user} />
    </div>
  );
};

export default Header;
