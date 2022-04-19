import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
// import { Route } from 'react-router-dom';
// import LoadingToRedirect from './LoadingToRedirect';

const UserRoute = () => {

    const {currentUser} = useSelector((state) => state.user);

    return currentUser ? <Outlet /> : <Navigate to="/login" />;
    // return currentUser ? <Outlet /> : <Navigate to="/login" />;
}

export default UserRoute;