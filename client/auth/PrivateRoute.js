import React from 'react';
import { Route, Navigate, Outlet } from 'react-router-dom';
import auth from './auth-helper';

const PrivateRoute = () => {
	const jwt = auth.isAuthenticated();
	return !jwt? (<Navigate to="/" replace={true}/>) : (<Outlet/>)
}

export default PrivateRoute