import React, {useEffect, useState, Fragment} from 'react';
import { Link } from 'react-router-dom';

function OneGenreFunc(props) {

    let [genreName, setGenreName] = useState("");
    let [movies, setMovies] = useState([]);
    let [error, setError] = useState("");
   
    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/v1/movies/${props.match.params.id}`)
         .then((response) => {
            if (response.status !== 200) {
                setError(`Invalid response code: ${response.status}`)
           } else {
               setError("");
           }
            return response.json();
        })
        .then((json) => {
            setGenreName(props.location.genreName);
            setMovies(json.movies);
            
        });

    }, [props.match.params.id, props.location.genreName]); // must set a default value, in this case [props.match.params.id]

    if (!movies) {
        movies = [];
    }
 
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
                    <h2>Genre: {genreName} </h2>
                    <div className="list-group">
                        {movies.map( (m) => (
                            <Link to={`/movies/${m.id}`} className="list-group-item list-group-item-action">{m.title}</Link>                         
                        ))}
                    </div>
            </Fragment>
        );
    }
}

export default OneGenreFunc;