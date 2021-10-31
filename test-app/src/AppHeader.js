import React, { Component, Fragment } from 'react';

export default class AppHeader extends Component {

    constructor(props) {
        super(props);
        this.handlePostChange = this.handlePostChange.bind(this);
    }

    handlePostChange(posts) {
        this.props.handlePostChange(posts)
    }

    render() {
        return (
            <Fragment>
                <hr />
                <h1> {this.props.title}</h1>
                <h3> {this.props.subject}</h3>
                <h5> {this.props.favoriteColor}</h5>
                <h6>There are {this.props.posts.length} entries in posts.</h6>
                <hr />
            </Fragment>
        );
    }
}