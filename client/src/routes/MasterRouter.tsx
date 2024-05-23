import { Fragment, useEffect, useLayoutEffect, useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { PageRoutes } from './PageRoutes'

interface pageRouteTypes {
    component: any;
    path: string;
    securedRoute: boolean;
}

const MasterRouter = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    useLayoutEffect(() => {
        const token = localStorage.getItem('token');
        if(token === null){
            setIsAuthenticated(false); 
        }else{
            setIsAuthenticated(true); 
        }
    }, [])

    return (
        <Fragment>
            <Routes>
                {
                    PageRoutes.map((routeItem: pageRouteTypes, index: number) => {
                        if (routeItem.securedRoute && isAuthenticated) {
                            return (
                                <Route key={routeItem.path} path={routeItem.path} element={<routeItem.component />} />
                            )
                        } else {
                            if (!isAuthenticated) {
                                return (
                                    <Route key={routeItem.path} path={routeItem.path} element={<routeItem.component />} />
                                )
                            } else {
                                <Navigate to={"/dashboard"} />
                            }
                        }
                    })
                }
                {/* Default route */}
                <Route
                    path="*"
                    element={isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/" />}
                />
            </Routes>
        </Fragment>
    )
}


export default MasterRouter
