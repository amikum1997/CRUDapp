import React, { Fragment } from 'react'
import { Navigate, Route } from 'react-router-dom'

const PrivateRoutes = ({ element, isLoggedIn, ...rest }: any) => {
    return (
        <Fragment>
            <Route
                {...rest}
                element={isLoggedIn ? element : <Navigate to="/login" />}
            />
        </Fragment>
    )
}

export default PrivateRoutes