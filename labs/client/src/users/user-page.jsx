import { Link, useLoaderData } from 'react-router-dom';
import styles from './user-page.module.css';

export default function UserPage(){
    const user = useLoaderData();
    return(
        <>
        <p className={ styles.descriptor }>Name:</p>
        <p>{user.name.firstName} {user.name.middleName} {user.name.lastName}</p>
        <p className={ styles.descriptor }>Address:</p>
        <p>{user.address.addressLine1}</p>
        <p>{user.address.addressLine2}</p>
        <p>{user.address.city}, {user.address.state} {user.address.zip}</p>
        <p className={ styles.descriptor }>Age:</p>
        <p>{user.age}</p>
        <Link to={ '/users' }>Return to User List</Link>
        </>
    )
}