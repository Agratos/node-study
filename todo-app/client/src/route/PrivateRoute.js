import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { useGetUserQuery } from '../hooks/apis/user/useGetUser';

const PrivateRoute = () => {
	const { data: user, isLoading, isSuccess } = useGetUserQuery({ token: sessionStorage.getItem('token') });

	if (isLoading) return <>loading...</>;
	if (!user) return <Navigate to='/login' />;

	return isSuccess ? <Outlet /> : <Navigate to='/login' />;
};

export default PrivateRoute;
