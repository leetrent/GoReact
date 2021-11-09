import React, { Component, Fragment } from 'react';
import './EditMovie.css';

export default class EditMovie extends Component {
    state = {
        movie: {},
        isLoaded: false,
        error: null
    }

    componentDidMount() {
        this.setState({
            movie: {
                title: "The Godfather",
                mpaa_rating: "R"
            }
        });
    }

    render() {
        let {movie} = this.state;

        return (
            <Fragment>
                <h2>Add/Edit Movie</h2>
                <hr />
                <form method="POST">
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input
                            id="title"
                            name="title"
                            type="text"
                            value={movie.title}
                            className="form-control">
                        </input>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="release_date" className="form-label">Release Date</label>
                        <input
                            id="release_date"
                            name="release_date"
                            type="text"
                            value={movie.release_date}
                            className="form-control">
                        </input>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="runetime" className="form-label">Runetime</label>
                        <input
                            id="runetime"
                            name="runetime"
                            type="text"
                            value={movie.runetime}
                            className="form-control">
                        </input>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="mpaa_rating" className="form-label">MPAA Rating</label>
                        <select id="mpaa_rating" className="form-select" value={movie.mpaa_rating}>
                            <option className="form-select">Choose...</option>
                            <option className="form-select" value="G">G</option>
                            <option className="form-select" value="PG">PG</option>
                            <option className="form-select" value="PG13">PG13</option>
                            <option className="form-select" value="R">R</option>
                            <option className="form-select" value="NC17">NC17</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="rating" className="form-label">Rating</label>
                        <input
                            id="rating"
                            name="rating"
                            type="text"
                            value={movie.rating}
                            className="form-control">
                        </input>
                    </div>  
                    <div className="mb-3">
                        <label htmlFor="rating" className="form-label">Description</label>
                        <textarea 
                        id="description"
                        name="description"
                        rows="3"
                        className="form-control">{movie.description}</textarea>
                    </div>
                    <button className="btn btn-primary">Save</button>       
                </form>
                <div className="mt-3">
                    <pre>{JSON.stringify(this.state, null, 3)}</pre>
                </div>
            </Fragment>
        )

    }
}