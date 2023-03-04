import React, { useState } from "react";
import "../styles/App.css";
import User from "../models/user";

const App = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [allUsers, setAllUsers] = useState([]);

  const handleSignUp = (event) => {
    event.preventDefault();
    const name = event.target.signupName.value;
    const email = event.target.signupEmail.value;
    const password = event.target.signupPassword.value;
    const confirmPassword = event.target.signupConfirmPassword.value;

    if (password !== confirmPassword) {
      return;
    }
    const newUser = new User(email, password, name);
    setAllUsers([...allUsers, newUser]);
    event.target.reset();
  };
  const handleLogin = (event) => {
    event.preventDefault();
    const email = event.target.loginEmail.value;
    const password = event.target.loginPassword.value;
    const user = allUsers.find((user) => user.email === email);

    if (!user) {
      alert("Email is incorrect");
    } else if (user.password !== password) {
      alert("Password is incorrect");
      // event.target.reset();
    } else {
      setLoggedInUser(user);
      event.target.reset();
    }
  };
  const handleLogout = () => {
    setLoggedInUser(null);
  };

  return (
    <div id="main">
      <table id="all-users">
        <tbody>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Password</th>
          </tr>
          {allUsers.map((user, index) => (
            <tr key={index}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.password}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {loggedInUser ? (
        <div>
          <h1 id="username">{loggedInUser.name}</h1>
          <h1 id="email">{loggedInUser.email}</h1>
          <button id="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      ) : (
        <div>
          <form className="signup-form" onSubmit={handleSignUp}>
            <label htmlFor="name">Name</label>
            <input type="text" name="signupName" id="signupName" />
            <label htmlFor="email">Email</label>
            <input type="email" name="signupEmail" id="signupEmail" />
            <label htmlFor="password">Password</label>
            <input type="password" name="signupPassword" id="signupPassword" />
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              name="signupConfirmPassword"
              id="signupConfirmPassword"
            />
            <button id="signup-button">Signup</button>
          </form>
          <form className="login-styles" onSubmit={handleLogin}>
            <label htmlFor="loginEmail">Email</label>
            <input id="loginEmail" name="loginEmail" type="email" />
            <label htmlFor="loginPassword">Password</label>
            <input id="loginPassword" name="loginPassword" type="password" />
            <button id="login-button">Login</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default App;
