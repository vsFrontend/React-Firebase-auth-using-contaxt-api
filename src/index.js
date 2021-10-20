import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import reportWebVitals from './reportWebVitals';
import {ContextProvider} from './context';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from './components/Home';


ReactDOM.render(

  <ContextProvider>
  <React.StrictMode>
  <Router>
      {/* <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
          </ul>
        </nav> */}

        <Switch>

          <Route exact path="/">
            <App />
          </Route>
          <Route exact path="/home">
            <Home />
          </Route>
        </Switch>
      {/* </div> */}
    </Router>
  </React.StrictMode>    
  </ContextProvider>

,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
