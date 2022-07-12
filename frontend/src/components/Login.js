import React, { useState } from "react";

const Login = ({ titleText = "Вход", buttonText = "Войти", onSubmit }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handelChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handelChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const buttonClassName = `signform__submit ${
    email !== "" && password !== "" ? "" : "signform__submit_disabled"
  }`;

  const handelSubmit = (e) => {
    e.preventDefault();
    onSubmit(email, password);
  };

  return (
    <form className="singform" onSubmit={handelSubmit}>
      <h2 className="singform__title">{titleText}</h2>
      <input
        className="singform__input"
        placeholder="Email"
        type="email"
        name="email"
        onChange={handelChangeEmail}
        required
      />
      <input
        className="singform__input"
        placeholder="Пароль"
        type="password"
        name="password"
        onChange={handelChangePassword}
        required
      />
      <button className={buttonClassName} type="submit">
        {buttonText}
      </button>
    </form>
  );
};

export default Login;
