import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HashRouter as Router, Route, Link} from "react-router-dom";
import './MovieList.css'

function MovieList() {

    const dispatch = useDispatch();
    const movies = useSelector(store => store.movies);

    useEffect(() => {
        dispatch({ type: 'FETCH_MOVIES' });
    }, []);


    return (
        <main>
            <h1>MovieList</h1>
            <section className="movies">
                {movies.map(movie => {
                    return (
                        <div key={movie.id} >
                            <h3>{movie.title}</h3>
                            {/* here is where i am calling my dispatch to send the movie id in the payload
                            to be used to get the details for a selected movie */}
                            <Router>
                             <Link to='/details'>  
                            <img onClick={() => dispatch({
                                type: 'GET_DETAILS',
                                payload: movie.id
                            })} src={movie.poster} alt={movie.title} />
                            </Link> 
                            </Router>
                        </div>
                    );
                })}
            </section>
        </main>

    );
}

export default MovieList;