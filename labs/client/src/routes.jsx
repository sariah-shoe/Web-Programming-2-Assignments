import { createBrowserRouter } from "react-router-dom";
import Root from "./root/root";
import UserList from "./users/user-list";
import UserPage from "./users/user-page";
import * as users from "./users/user-loaders.js"
import * as userActions from "./users/user-actions.js"
import UserCrupdate from "./users/userpcrupdate.jsx"
import UserError from "./users/user-error.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />
    },
    {
        path: "/users",
        element: <UserList />,
        loader: users.load_all
    },
    {
        path: "/users/:id",
        element: <UserPage />,
        loader: users.load_one
    },
    {
        path: "/users/create",
        element: <UserCrupdate />,
        errorElement: <UserError />,
        action: userActions.create
    },
    {
        path: "/users/update/:id",
        element: <UserCrupdate />,
        errorElement: <UserError />,
        loader: users.load_one,
        action: userActions.update
    }
]);

export default router;