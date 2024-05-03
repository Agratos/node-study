import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { useAuthenticationQuery } from '../hooks/apis/user/useAuthentication';

const PrivateRoute = () => {
	const { data } = useAuthenticationQuery();
	const isAuthenticated = data;

	return isAuthenticated ? <Outlet /> : <Navigate to='/login' />;
};

export default PrivateRoute;
