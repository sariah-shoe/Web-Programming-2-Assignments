import { Link } from 'react-router-dom';

export default function Root(){
    return(
        <>
        <div>
            <h1>Web Development 2 Client</h1>
            <Link to={ '/users' }>Users</Link>
        </div>
        </>
    );
}