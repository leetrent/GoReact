import React, { Component, Fragment } from 'react';
import './EditMovie.css';

export default class EditMovie extends Component {
    state = {
        movie: {},
        isLoaded: false,
        error: null
    }

    constructor(props) {
        super(props);
        this.state = {
            movie: {
                id: 0,
                title: "",
                release_date: "",
                runtime: "",
                mpaa_rating: "",
                rating: "",
                description: ""
            },
            isLoaded: false,
            error: null
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = (evt) => {
        console.log("[EditMovie][handleSubmit] => (form was submitted)");
        evt.preventDefault();
    }

    handleChange = (evt) => {
        let value = evt.target.value;
        let name = evt.target.name;

        console.log("[EditMovie][handleChange] => (evt.target.value):", evt.target.value);
        console.log("[EditMovie][handleChange] => (evt.target.name).:", evt.target.name);

        this.setState( (prevState) => ({
            movie: {
                ...prevState.movie,
                [name]: value
            }
        }));

    }

    componentDidMount() {

    }

    render() {
        let {movie} = this.state;

        return (
            <Fragment>
                <h2>Add/Edit Movie</h2>
                <hr />
                <form onSubmit={this.handleSubmit}>
                    <input
                        type="hidden"
                        name="id"
                        id="id"
                        value={movie.id}
                        onChange={this.handleChange}>
                    </input>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input
                            id="title"
                            name="title"
                            type="text"
                            value={movie.title}
                            className="form-control"
                            onChange={this.handleChange}>
                        </input>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="release_date" className="form-label">Release Date</label>
                        <input
                            id="release_date"
                            name="release_date"
                            type="text"
                            value={movie.release_date}
                            className="form-control"
                            onChange={this.handleChange}>
                        </input>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="runtime" className="form-label">Runetime</label>
                        <input
                            id="runtime"
                            name="runtime"
                            type="text"
                            value={movie.runtime}
                            className="form-control"
                            onChange={this.handleChange}>
                        </input>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="mpaa_rating" className="form-label">MPAA Rating</label>
                        <select id="mpaa_rating" name="mpaa_rating" className="form-select" value={movie.mpaa_rating} onChange={this.handleChange}>
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
                            className="form-control"
                            onChange={this.handleChange}>
                        </input>
                    </div>  
                    <div className="mb-3">
                        <label htmlFor="rating" className="form-label">Description</label>
                        <textarea 
                            id="description"
                            name="description"
                            rows="3"
                            className="form-control"
                            onChange={this.handleChange}
                            value={movie.value}
                        />
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