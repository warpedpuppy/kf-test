import React from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './login-view/login';
import { getEvents, checkToken } from './api';

// nneds to change to class or use this under useEffect?
function App() {
  async componentDidMount() {
    const accessToken = localStorage.getItem("access_token");
    const vaalidToken = accesssToken !== null ? await checkToken(accessToken) : false;
    this.setState({ tokenCheck: validToken });
    if(validToken === true) this.updateEvents();
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get("code");

    this.mounted = true;
    if (code && this.mounted === true && validToken === false) {
      this.setState({tokenCheck: true});
      this.updateEvents();
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
          Testing to see if code will change
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
