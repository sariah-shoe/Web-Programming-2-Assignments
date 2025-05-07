import { createBrowserRouter } from "react-router-dom";
import Root from "./root/root";
import UserList from "./users/user-list";
import UserPage from "./users/user-page";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />
    },
    {
        path: "/users",
        element: <UserList />
    },
    {
        path: "/users/:id",
        element: <UserPage />
    }
]);

export default router;