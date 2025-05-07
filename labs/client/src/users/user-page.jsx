import { Link } from 'react-router-dom';

export default function UserPage(){
    return(
        <>
        <p>Name:</p>
        <p>Bob Quincy Smith</p>
        <p>Address:</p>
        <p>1234 Elm Street</p>
        <p>Denver, Colorado 80202</p>
        <p>Age:</p>
        <p>21</p>
        <Link to={ '/users' }>Return to User List</Link>
        </>
    )
}