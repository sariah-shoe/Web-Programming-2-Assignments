import { Link } from 'react-router-dom';

export default function UserList(){
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
            <tr>
                <td>Smith</td>
                <td>Bob</td>
                <td>Quincy</td>
                <td>1234 Elm Street</td>
                <td></td>
                <td>Denver</td>
                <td>Colorado</td>
                <td>80202</td>
                <td>21</td>
                <td><Link to={ '/users/1' }>View User</Link></td>
            </tr>
            </tbody>
        </table>
        </> )
    
}