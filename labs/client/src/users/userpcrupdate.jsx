import { Link, useLoaderData, Form } from 'react-router-dom';
import styles from './usercrupdate.module.css';

export default function userCrupdate(){
    const user = useLoaderData();
    return(<>
    <Form 
    action={ user ? `/users/update/${ user._id }` : '/users/create' } 
    method={ user ? 'put' : 'post' }>
        <div>
            <label className = { styles.label }>First Name:<input name={ "firstName"} defaultValue={ user && user.name.firstName}/></label>
        </div>
        <div>
            <label className = { styles.label }>Middle Name:<input name={ "middleName"} defaultValue={ user && user.name.middleName}/></label>
        </div>
        <div>
            <label className = { styles.label }>Last Name:<input name={ "lastName"} defaultValue={ user && user.name.lastName}/></label>
        </div>
        <div>
            <label className = { styles.label }>Address Line 1:<input name={ "addressLine1"} defaultValue={ user && user.address.addressLine1}/></label>
        </div>
        <div>
            <label className = { styles.label }>Address Line 2:<input name={ "addressLine2"} defaultValue={ user && user.address.addressLine2}/></label>
        </div>
        <div>
            <label className = { styles.label }>City<input name={ "city"} defaultValue={ user && user.address.city}/></label>
        </div>
        <div>
            <label className = { styles.label }>State<input name={ "state"} defaultValue={ user && user.address.state}/></label>
        </div>
        <div>
            <label className = { styles.label }>Zip Code<input name={ "zip"} defaultValue={ user && user.address.zip}/></label>
        </div>
        <div>
            <label className = { styles.label }>Age<input name={ "age"} defaultValue={ user && user.age}/></label>
        </div>
        <input type="submit"/>
        <Link to={ "/users"}>Return to User List</Link>
    </Form>
    </>)
}