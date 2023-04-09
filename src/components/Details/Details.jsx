import { HashRouter as Router, Route, Link } from "react-router-dom";
import { useSelector } from "react-redux";


function DetailsPage() {
    // here are my store calls to get the data that is stored in the reducers in the index file
    const detailStore = useSelector(store => store.detailsReducer)
    const genreInfo = useSelector(store => store.genres)

    return (<>
        {/* The title and Image are called here */}
        <h1>{detailStore[0].title}</h1>
        <img src={detailStore[0].poster}/>
        {/* the genre array is called here and i map through them to list them individually */}
        {genreInfo.map((genre, i) => 
            <p key={i}>{genre}</p>
        )}
        {/* The description is shown here */}
        <p>{detailStore[0].description}</p>
        {/* a button linked to bring a user back to the movie list page. */}
        <Router>
            <Link to='/'>
                <button>Back to Movies</button>
            </Link>
        </Router>
    </>)
}

export default DetailsPage;