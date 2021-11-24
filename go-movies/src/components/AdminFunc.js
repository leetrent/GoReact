import React, {useEffect, useState, Fragment} from 'react';
import {Link} from "react-router-dom";

function AdminFunc(props) {
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {  
        if (props.jwt === "") {
            props.history.push({
                pathname: "/login"
            });
            return;
        }

        let url = `${process.env.REACT_APP_API_URL}/v1/movies`
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
                setMovies(json.movies);
             });
    }, [props.jwt, props.history], []);

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
            <h2 className="h3">Manage Movie Catalog</h2>
            <div className="list-group">
                {movies.map( (m) => (
                    <Link 
                        key={m.id}
                        to={`/admin/movie/${m.id}`}
                        className="list-group-item list-group-item-action">{m.title}</Link>                         
                ))}
            </div>
        </Fragment>
        );
    }
}

export default AdminFunc;