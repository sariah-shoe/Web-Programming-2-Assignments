import { createBrowserRouter } from "react-router-dom";
import Root from "./root/root";
import UserList from "./users/user-list";
import UserPage from "./users/user-page";
import * as users from "./users/user-loaders.js"

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
    }
]);

export default router;