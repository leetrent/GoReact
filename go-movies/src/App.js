import React from 'react';
//import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import {HashRouter as Router, Switch, Route, Link} from 'react-router-dom';
import Movies from './components/Movies';

export default function App() {
  return (
    <Router>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="mt-3">Go Watch a Movie!</h1>
            <hr className="mb-3"></hr>
          </div>
        </div>
        <div className="row">
          <div className="col-md-2">
            <nav>
              <ul className="list-group">
                <li className="list-group-item">
                  <Link to="/">Home</Link>
                </li>
                <li className="list-group-item">
                  <Link to="/movies">Movies</Link>
                </li>
                <li className="list-group-item">
                  <Link to="/admin">Manage Catalog</Link>
                </li>
              </ul>
            </nav>
          </div>
          <div className="col-md-10">
            <Switch>
              <Router path="/movies">
                <Movies />
              </Router>
              <Router path="/admin">
                <Admin />
              </Router>
              <Router path="/">
                <Home />
              </Router>
            </Switch>
          </div>
        </div>
      </div>
    </Router>
  );
}

function Home() {
  return <h2>Home</h2>
}

function Admin() {
  return <h2>Manage Catalogue</h2>
}
