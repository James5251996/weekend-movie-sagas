import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App/App.js';
import { createStore, combineReducers, applyMiddleware } from 'redux';
// Provider allows us to use redux within our react app
import { Provider } from 'react-redux';
import logger from 'redux-logger';
// Import saga middleware
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';

// Create the rootSaga generator function
function* rootSaga() {
    yield takeEvery('FETCH_MOVIES', fetchAllMovies);
    yield takeEvery('GET_DETAILS', getMovieDetails)
}

function* fetchAllMovies() {
    // get all movies from the DB
    try {
        const movies = yield axios.get('/api/movie');
        console.log('get all:', movies.data);
        yield put({ type: 'SET_MOVIES', payload: movies.data });

    } catch {
        console.log('get all error');
    }
        
}

// here is where the details for a given movie is stored 
const detailsReducer = (state = {}, action) => {
    switch(action.type) {
        case 'SHOW_DETAILS':
            console.log('inside my detail reducer, payload is:', action.payload)
            return action.payload
        default:
            return state;
    }
}

// here is the saga to link up with the dispatch request in MovieList
// This will send the data from the selectred movie to the detailsReducer
function* getMovieDetails (action) {
    console.log('inside my get movies details', action.payload)
    const genreArray = []
    try {
    const movieDetails = yield axios.get(`/api/movie/${action.payload}`)
    for (let genre of movieDetails.data){
        genreArray.push(genre.name)
    }
    console.log(genreArray);
    yield put({type: 'SHOW_DETAILS', payload: movieDetails.data})
    yield put({type: 'SET_GENRES', payload: genreArray})
    } catch (error) {
        console.log('error in getMovieDetails:', error)
    }
}

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// Used to store movies returned from the server
const movies = (state = [], action) => {
    switch (action.type) {
        case 'SET_MOVIES':
            return action.payload;
        default:
            return state;
    }
}

// Used to store the movie genres
const genres = (state = [], action) => {
    switch (action.type) {
        case 'SET_GENRES':
            return action.payload;
        default:
            return state;
    }
}

// Create one store that all components can use
const storeInstance = createStore(
    combineReducers({
        movies,
        genres,
        detailsReducer,
    }),
    // Add sagaMiddleware to our store
    applyMiddleware(sagaMiddleware, logger),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={storeInstance}>
            <App />
        </Provider>
    </React.StrictMode>
);
