import Dashboard from "../pages/AuthenticatedPages/Dashboard/Dashboard";
import AuthScreen from "../pages/UnAuthenticatedPages/AuthScreens/AuthScreen";

export const PageRoutes = [
    {
        component : AuthScreen,
        path : "/",
        securedRoute : false
    },
    {
        component : Dashboard,
        path : "/dashboard",
        securedRoute : true
    }
]