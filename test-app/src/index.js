import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import AppHeader from './AppHeader';
import AppContent from './AppContent';
import AppFooterFuncComp from './AppFooterFuncComp';
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
          handlePostChange={this.handlePostChange}
          />
        <AppFooterFuncComp companyName={"TrentTEK LLC"}/>
      </div>
    );

  }
}

ReactDOM.render(<App />, document.getElementById('root'));