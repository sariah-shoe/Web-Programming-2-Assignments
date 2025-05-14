import { Link, useLoaderData } from 'react-router-dom';

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
    </tr>);
    return(<>
        <Link to={ '/' }>Return to Home</Link>
        <table>
            <thead>
            <tr>
                <th>Last Name</th>
                <th>First Name</th>
                <th>Middle Name</th>
                <th>Address Line 1</th>
                <th>Address Line 2</th>
                <th>City</th>
                <th>State</th>
                <th>Zip</th>
                <th>Age</th>
                <th></th>
            </tr>
            </thead>
            <tbody>
            { rows }
            </tbody>
        </table>
        </> )
    
}