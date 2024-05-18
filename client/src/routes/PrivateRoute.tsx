import { Fragment } from 'react'
import { Outlet , Navigate } from 'react-router-dom'

const PrivateRoute = () => {
    let auth = {'token' : false}
  return (
    <Fragment>
        {
            auth.token ? <Outlet /> : <Navigate to="/"/>
        }
    </Fragment>
  )
}

export default PrivateRoute