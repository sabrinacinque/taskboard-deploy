// src/MainComponent/PrivateRoute.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export default function PrivateRoute() {
  const isLoggedIn = !!localStorage.getItem('token');
  return isLoggedIn
    ? <Outlet />                       // renderizza le Route “figlie”
    : <Navigate to="/login" replace />; // oppure redirect al login
}
