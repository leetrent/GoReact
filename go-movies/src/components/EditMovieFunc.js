import React, { useEffect, useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css'; 
import './EditMovie.css';
import Input from './form-components/Input';
import Textarea from './form-components/Textarea';
import Select from './form-components/Select';
import Alert from './ui-components/Alert'

function EditMovieFunc(props) {
    const [movie, setMovie] = useState({});
    const [error, setError] = useState("");
    const [errors, setErrors] = useState({
        "title"         : {errorCss: "", errorDiv: "d-none", errorMsg: ""},
        "release_date"  : {errorCss: "", errorDiv: "d-none", errorMsg: ""},
        "runtime"       : {errorCss: "", errorDiv: "d-none", errorMsg: ""},
        //"mpaa_rating"   : {errorCss: "", errorDiv: "d-none", errorMsg: ""},
        "rating"        : {errorCss: "", errorDiv: "d-none", errorMsg: ""},
        //"description"   : {errorCss: "", errorDiv: "d-none", errorMsg: ""}
    });
    let [alert, setAlert] = useState( {type:"d-none", message: "" });

    const mpaaOptions = [
        {id: "G", value: "G" },
        {id: "PG", value: "PG" },
        {id: "PG13", value: "PG13" },
        {id: "R", value: "R" },
        {id: "NC17", value: "NC17" }
    ];

    useEffect( () => {
        if (props.jwt === "") {
            props.history.push({
                pathname: "/login"
            });
            return;
        }

        const id = props.match.params.id;
        if (id > 0) {
            fetch(`${process.env.REACT_APP_API_URL}/v1/movie/${id}`)
            .then( (response) => {
                if (response.status !== 200) {
                    setError(`Error HTTP Status Code: ${response.status}`);
                } else {
                    setError("");
                }
                return response.json();
            })
            .then( (json) => {
                const releaseDate = new Date(json.movie.release_date);
                json.movie.release_date = releaseDate.toISOString().split("T")[0];
                setMovie(json.movie);
            })
        } else {
            setMovie( {"id": "0"});
        }
    }, [props.history, props.jwt, props.match.params.id]);

    const handleChange = (evt) => {
        let value = evt.target.value;
        let name = evt.target.name;

        // BEGIN: CLIENT SIDE VALIDATION
        let localErrors = errors;
        switch(evt.target.name) {
            case 'title':
                if (evt.target.value === "") {
                    localErrors["title"] = {errorCss: "is-invalid", errorDiv: "text-danger", errorMsg: "Please provide a movie title."};
                 } else {
                    localErrors["title"] = {errorCss: "is-valid", errorDiv: "", errorMsg: ""};
                }
                break;
            case 'release_date':
                if (evt.target.value === "") {
                    localErrors["release_date"] = {errorCss: "is-invalid", errorDiv: "text-danger", errorMsg: "Please provide a release date for this movie."};
                } else {
                    localErrors["release_date"] = {errorCss: "is-valid", errorDiv: "", errorMsg: ""};
                }
                break;
            case 'runtime':
                if (evt.target.value === "") {
                    localErrors["runtime"] = {errorCss: "is-invalid", errorDiv: "text-danger", errorMsg: "Please provide a runtime (in minutes) for this movie."};
                } else {
                    localErrors["runtime"] = {errorCss: "is-valid", errorDiv: "", errorMsg: ""};
                }
                break;
            case 'rating':
                if (evt.target.value === "") {
                    localErrors["rating"] = {errorCss: "is-invalid", errorDiv: "text-danger", errorMsg: "Please provide a viewer rating (1-5) for this movie."};
                } else {
                    localErrors["rating"] = {errorCss: "is-valid", errorDiv: "", errorMsg: ""};
                }
                break;
                default:
        }
        // END: CLIENT SIDE VALIDATION
        setErrors(errors);
        setMovie({
            ...movie,
            [name]: value
        });
    };

    const handleSubmit = (evt) => {
        evt.preventDefault();
        const data = new FormData(evt.target);
        const payload = Object.fromEntries(data.entries());

        // BEGIN: CLIENT SIDE VALIDATION
        let errorCount = 0;
        let errors = {};
        if (payload.title === "") {
            errors["title"] = {errorCss: "is-invalid", errorDiv: "text-danger", errorMsg: "Please provide a movie title."};
            errorCount++;
        } else {
            errors["title"] = {errorCss: "is-valid", errorDiv: "", errorMsg: ""};
        }
        if (payload.release_date === "") {
            errors["release_date"] = {errorCss: "is-invalid", errorDiv: "text-danger", errorMsg: "Please provide a release date for this movie."};
            errorCount++;
        } else {
            errors["release_date"] = {errorCss: "is-valid", errorDiv: "", errorMsg: ""};
        }
        if (payload.runtime === "") {
            errors["runtime"] = {errorCss: "is-invalid", errorDiv: "text-danger", errorMsg: "Please provide a runtime (in minutes) for this movie."};
            errorCount++;
        } else {
            errors["runtime"] = {errorCss: "is-valid", errorDiv: "", errorMsg: ""};
        }
        if (payload.rating === "") {
            errors["rating"] = {errorCss: "is-invalid", errorDiv: "text-danger", errorMsg: "Please provide a viewer rating (1-5) for this movie."};
            errorCount++;
        } else {
            errors["rating"] = {errorCss: "is-valid", errorDiv: "", errorMsg: ""};
        }
 
        setErrors(errors);
        if ( errorCount > 0) {
            return false;
        }
        // END: CLIENT SIDE VALIDATION
        
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer " + props.jwt);
    
        const requestOptions = {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: myHeaders
        };

        let url = `${process.env.REACT_APP_API_URL}/v1/admin/editmovie`;
        fetch(url, requestOptions)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                setAlert({ type: "alert-danger", message: data.error.message});
              } else { 
                props.history.push({pathname: "/admin"});
            }
        }, [props.jwt, props.history]);
    };

    const confirmDelete = (evt) => {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer " + props.jwt);
        
        const requestOptions = {
            method: 'GET',
            headers: myHeaders
        };

        confirmAlert({
            title: 'Delete Movie',
            message: 'Are you sure you want to delete this movie?',
            buttons: [
              {
                label: 'Yes',
                onClick: () => {
                    fetch(`${process.env.REACT_APP_API_URL}/v1/admin/deletemovie/${movie.id}`, requestOptions)
                    .then(response => response.json)
                    .then(data => {
                        if (data.error) {
                            setAlert({ type: "alert-danger", message: data.error.message});
                        } else {
                            setAlert({ type: "alert-success", message: "Movie successfully deleted."});
                            props.history.push({
                                pathname: "/admin"
                            });

                        }
                    })
                }
              },
              {
                label: 'No',
                onClick: () => alert('Click No')
              }
            ]
          });
    };

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
            <h2>Add/Edit Movie</h2>
            <Alert 
                alertType={alert.type}
                alertMessage={alert.message}
            />
            <hr />
            <form onSubmit={handleSubmit}>
                <input
                    type="hidden"
                    name="id"
                    id="id"
                    value={movie.id}
                    onChange={handleChange}
                />
    
                <Input 
                    type={"text"}
                    title={"Title"}
                    name={"title"}
                    value={movie.title}
                    handleChange={handleChange}
                    className={errors["title"].errorCss}
                    errorDiv={errors["title"].errorDiv}
                    errorMsg={errors["title"].errorMsg}
                />
                <Input 
                    type={"date"}
                    title={"Release Date"}
                    name={"release_date"}
                    value={movie.release_date}
                    handleChange={handleChange}
                    className={errors["release_date"].errorCss}
                    errorDiv={errors["release_date"].errorDiv}
                    errorMsg={errors["release_date"].errorMsg}
                />

                <Input 
                    type={"number"}
                    title={"Runetime (in minutes)"}
                    name={"runtime"}
                    value={movie.runtime}
                    handleChange={handleChange}
                    className={errors["runtime"].errorCss}
                    errorDiv={errors["runtime"].errorDiv}
                    errorMsg={errors["runtime"].errorMsg}
                />

                <Select 
                    title={"MPAA Rating"}
                    name={"mpaa_rating"}
                    options={mpaaOptions}
                    value={movie.mpaa_rating}
                    handleChange={handleChange} 
                    placeholder={"Choose..."}
                />

                <Input 
                    type={"number"}
                    title={"Rating (1-5)"}
                    name={"rating"}
                    value={movie.rating}
                    handleChange={handleChange}
                    className={errors["rating"].errorCss}
                    errorDiv={errors["rating"].errorDiv}
                    errorMsg={errors["rating"].errorMsg}
                />

                <Textarea 
                    title={"Description"}
                    name={"description"}
                    value={movie.description}
                    rows={"3"}
                    handleChange={handleChange}/>

                <button className="btn btn-primary">Save</button>    
                <Link to="/admin" className="btn btn-secondary ms-2">Cancel</Link>  
                {movie.id > 0 && (
                    <a  href="#!" 
                        onClick={ () => confirmDelete()}
                        className="btn btn-danger ms-2">Delete</a>
                )}
            </form>
            {/* <div className="mt-3">
                <pre>{JSON.stringify(this.state, null, 3)}</pre>
            </div> */}
        </Fragment>
        );
    }
}
export default EditMovieFunc;