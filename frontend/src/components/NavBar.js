import React from "react";
import { Switch, Route } from "react-router";
import { Link } from "react-router-dom";

const NavBar = ({ user, signOut }) => {
  return (
    <div className="navbar">
      <div className="navbar navbar_type_desktop">
        <p className="navbar__user">{user}</p>
        {user ? (
          <Switch>
            <Route path="/">
              <button className="navbar__link" onClick={signOut}>
                Выйти
              </button>
            </Route>
          </Switch>
        ) : (
          <Switch>
            <Route path="/sign-in">
              <Link className="navbar__link" to="/sign-up">
                Регистрация
              </Link>
            <Route path="/sign-up">
              <Link className="navbar__link" to="/sign-in">
                Войти
              </Link>
            </Route>
            </Route>
          </Switch>
        )}
      </div>
    </div>
  );
};

export default NavBar;
