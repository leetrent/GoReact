import React, {useEffect, useState, Fragment} from 'react';
import {Link} from "react-router-dom";

function GenresFunc(props) {

    const [genres, setGenres] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        let url = `${process.env.REACT_APP_API_URL}/v1/genres`;
        fetch(url)
            .then((response) => {
                if (response.status !== 200) {
                    setError(`Invalid response code: ${response.status}`)
               } else {
                   setError("");
               }
                return response.json();
            })
            .then((json) => {
                setGenres(json.genres);
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
            <h2>Genres</h2>
            <div className="list-group">
                {
                    genres.map((m) => (
                        <Link 
                            key={m.id}
                            to={{
                                pathname: `/genre/${m.id}`,
                                genreName: m.genre_name
                            }}
                            className="list-group-item list-group-item-action">{m.genre_name}</Link>
                    ))
                }
            </div>
        </Fragment>
        );
    }

}

export default GenresFunc;