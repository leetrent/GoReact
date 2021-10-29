import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import AppHeader from './AppHeader';
import AppContent from './AppContent';
import AppFooter from './AppFooter';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

class App extends Component {
  render() {

    const appProps = {
      title : "Application Title",
      subject : "Application Subject",
      favoriteColor : "blue"
    }

    return (
      <div className="app">
        <AppHeader {...appProps}/>
        <AppContent />
        <AppFooter />
      </div>
    );

  }
}

ReactDOM.render(<App />, document.getElementById('root'));