import { Link, useLoaderData } from 'react-router-dom';
import styles from './user-list.module.css';

export default function UserList(){
    const { users } = useLoaderData();
    let rows = users.map(user => <tr key={user._id}>
        <td>{user.name.lastName}</td>
        <td>{user.name.firstName}</td>
        <td>{user.name.middleName}</td>
        <td>{user.address.addressLine1}</td>
        <td>{user.address.addressLine2}</td>
        <td>{user.address.city}</td>
        <td>{user.address.state}</td>
        <td>{user.address.zip}</td>
        <td>{user.age}</td>
        <td><Link to={`/users/${user._id}`}>View User</Link></td>
        <td><Link to={`/users/update/${user._id}`}>Update User</Link></td>
    </tr>);
    return(<>
        <Link to={ '/' }>Return to Home</Link>
        <Link to={'/users/create'}>Create new user</Link>
        <table className = {styles.userTable}>
            <thead>
            <tr>
                <th className = {styles.headerCell}>Last Name</th>
                <th className = {styles.headerCell}>First Name</th>
                <th className = {styles.headerCell}>Middle Name</th>
                <th className = {styles.headerCell}>Address Line 1</th>
                <th className = {styles.headerCell}>Address Line 2</th>
                <th className = {styles.headerCell}>City</th>
                <th className = {styles.headerCell}>State</th>
                <th className = {styles.headerCell}>Zip</th>
                <th className = {styles.headerCell}>Age</th>
                <th className = {styles.headerCell}></th>
                <th className = {styles.headerCell}></th>
            </tr>
            </thead>
            <tbody>
            { rows }
            </tbody>
        </table>
        </> )
    
}