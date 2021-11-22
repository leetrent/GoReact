import React, {useEffect, useState, Fragment} from 'react';
import {Link} from "react-router-dom";

function MoviesFunc(props) {

    const [movies, setMovies] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {     
        fetch(`${process.env.REACT_APP_API_URL}/v1/movies`)
        .then((response) => {
            if (response.status !== 200) {
                 setError(`Invalid response code: ${response.status}`)
            } else {
                setError("");
            }
            return response.json();
        })
        .then((json) => {
            setMovies(json.movies);
        });
    }, []); // must set a default value, in this case []


    if (error !== "") {
        return(
            <Fragment>
                <h2>Error</h2>
                <p>{error}</p>
            </Fragment>
        );
    } else {
        return (
            <Fragment>
                <h2>Choose a movie</h2>
                <div className="list-group">
                    {movies.map( (m) => (
                    <Link 
                        key={m.id}
                        to={`/movies/${m.id}`}
                        className="list-group-item list-group-item-action">{m.title}</Link>                         
                    ))}
                </div>
            </Fragment>
        );
    }
}

export default MoviesFunc;
