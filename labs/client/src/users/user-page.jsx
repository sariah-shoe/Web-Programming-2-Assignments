import { Link, useLoaderData } from 'react-router-dom';

export default function UserPage(){
    const user = useLoaderData();
    return(
        <>
        <p>Name:</p>
        <p>{user.name.firstName} {user.name.middleName} {user.name.lastName}</p>
        <p>Address:</p>
        <p>{user.address.addressLine1}</p>
        <p>{user.address.addressLine2}</p>
        <p>{user.address.city}, {user.address.state} {user.address.zip}</p>
        <p>Age:</p>
        <p>{user.age}</p>
        <Link to={ '/users' }>Return to User List</Link>
        </>
    )
}