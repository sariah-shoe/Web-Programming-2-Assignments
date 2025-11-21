import { Link } from 'react-router-dom';

export default function Root(){
    return(
        <>
            <h1>Welcome to the handy dandy recipe catalogue!!</h1>
            <Link to={ '/recipes' }>View All Recipes</Link>
        </>
    );
}