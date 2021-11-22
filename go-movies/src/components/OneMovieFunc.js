import React, {useEffect, useState, Fragment} from 'react';

function OneMovieFunc(props) {
    const [movie, setMovie] = useState({});
    const [error, setError] = useState("");

    useEffect(() => {
        let url = `${process.env.REACT_APP_API_URL}/v1/movie/${props.match.params.id}`
        console.log("[OneMovie][componentDidMount] => (url):", url)

        fetch(url)
            .then((response) => {
                console.log("Status code:", response.status)
                if (response.status !== 200) {
                    setError(`Invalid response code: ${response.status}`)
               } else {
                   setError("");
               }
                return response.json();
            })
            .then((json) => {
                setMovie(json.movie);
            });

    }, [props.match.params.id]); // must set a default value, in this case [props.match.params.id]

    if (movie.genres) {
        movie.genres = Object.values(movie.genres);
    } else {
        movie.genres = [];
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
                <h2>Movie: {movie.title} ({movie.year})</h2>
                <div className="float-start">
                    <small>Rating: {movie.mpaa_rating}</small>
                </div>
                <div className="float-end">
                    {movie.genres.map( (m, index) =>(
                        <span className="badge bg-secondary me-1" key={index}>{m}</span>
                    ))}
                </div>
                <div className="clearfix"></div>
                <hr></hr>
                <table className="table table-compact table-striped">
                    <thead></thead>
                    <tbody>
                        <tr>
                            <td><strong>Title:</strong></td>
                            <td>{movie.title}</td>
                        </tr>
                        <tr>
                            <td><strong>Description:</strong></td>
                            <td>{movie.description}</td>
                        </tr>
                        <tr>
                            <td><strong>Runtime:</strong></td>
                            <td>{movie.runtime} minutes</td>
                        </tr>
                    </tbody>

                </table>
            </Fragment>
        );
    }
}
export default OneMovieFunc;