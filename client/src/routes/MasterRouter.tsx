import { Fragment } from 'react'
import { Routes, Route } from 'react-router-dom'
import { PageRoutes } from './PageRoutes'
import PrivateRoute from './PrivateRoute';

interface pageRouteTypes {
    component: any;
    path: string;
    securedRoute: boolean;
}

const MasterRouter = () => {
    return (
        <Fragment>
            <Routes>
                {
                    PageRoutes.map((routeItem: pageRouteTypes, index: number) => {
                        if (routeItem.securedRoute) {
                            return (
                                <Route element={<PrivateRoute />}>
                                    <Route element={<routeItem.component />} path={routeItem.path}/>
                                </Route>
                            )
                        } else {
                            return (
                                <Route element={<routeItem.component />} path={routeItem.path} />
                            )
                        }
                    })
                }
            </Routes>
        </Fragment>
    )
}

export default MasterRouter