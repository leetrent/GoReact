import React, { Component, Fragment } from 'react';

export default class AppHeader extends Component {
    render() {
        return (
            <Fragment>
                <hr />
                <h1> {this.props.title}</h1>
                <h3> {this.props.subject}</h3>
                <h5> {this.props.favoriteColor}</h5>
                <hr />
            </Fragment>
        );
    }
}