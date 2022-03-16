import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = (props,{ element: Component, ...rest }) => {
    return props.isAuthenticated ? <Outlet />:<Navigate to = '/login' />
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.isAuthenticated
    }
}

export default connect(mapStateToProps)(PrivateRoute)