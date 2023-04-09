import { HashRouter as Router, Route, Link } from "react-router-dom";
import { useSelector } from "react-redux";


function DetailsPage() {
    const detailStore = useSelector(store => store.detailsReducer)
    const genreInfo = useSelector(store => store.genres)

    return (<>
        <div>TEST</div>
        <h1>{detailStore[0].title}</h1>
        <img src={detailStore[0].poster} alt="" />
        {genreInfo.map((genre, i) => 
            <p>{genre}</p>
        )}
        <p>{detailStore[0].description}</p>
        <Router>
            <Link to='/'>
                <button>Back to Movies</button>
            </Link>
        </Router>
    </>)
}

export default DetailsPage;