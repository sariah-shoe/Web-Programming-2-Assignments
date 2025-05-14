import { Link, useRouteError } from 'react-router-dom';

export default function UserError(){
    const error = useRouteError();

    return(<>
    <h1>Oh no! Something went wrong!</h1>
    <p>{error?.message || "An unknown error occurred."}</p>
    <Link to={"/users"}>Return to user list</Link>
    </>)
}