import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import AppHeader from './AppHeader';
import AppContent from './AppContent';
import AppFooter from './AppFooter';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.handlePostChange = this.handlePostChange.bind(this);
    this.state = { posts: [] };

  }

  handlePostChange(p_posts) {
    this.setState( {posts: p_posts});
  }

  render() {
    const appProps = {
      title : "Application Title",
      subject : "Application Subject",
      favoriteColor : "blue"
    }
    return (
      <div className="app">
        <AppHeader 
          {...appProps} 
          posts={this.state.posts}
          handlePostChange={this.handlePostChange}         
          />
        <AppContent 
          posts={this.state.posts}
          handlePostChange={this.handlePostChange}
          />
        <AppFooter />
      </div>
    );

  }
}

ReactDOM.render(<App />, document.getElementById('root'));