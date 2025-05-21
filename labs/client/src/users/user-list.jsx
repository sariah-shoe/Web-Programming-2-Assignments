import { Link, useLoaderData } from 'react-router-dom';
import styles from './user-list.module.scss';

export default function UserList(){
    const { users } = useLoaderData();
    let rows = users.map(user => <tr key={user._id}>
        <td className = {styles.bodyCell}>{user.name.lastName}</td>
        <td className = {styles.bodyCell}>{user.name.firstName}</td>
        <td className = {styles.bodyCell}>{user.name.middleName}</td>
        <td className = {styles.bodyCell}>{user.address.addressLine1}</td>
        <td className = {styles.bodyCell}>{user.address.addressLine2}</td>
        <td className = {styles.bodyCell}>{user.address.city}</td>
        <td className = {styles.bodyCell}>{user.address.state}</td>
        <td className = {styles.bodyCell}>{user.address.zip}</td>
        <td className = {styles.bodyCell}>{user.age}</td>
        <td className = {styles.bodyCell}><Link to={`/users/${user._id}`}>View User</Link></td>
        <td className = {styles.bodyCell}><Link to={`/users/update/${user._id}`}>Update User</Link></td>
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