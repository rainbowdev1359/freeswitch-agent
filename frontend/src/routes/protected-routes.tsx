import React, { ReactNode } from 'react';
import { Navigate, useLocation } from "react-router-dom";
import { createSearchParams } from 'react-router-dom';


type ProtectedRouteProps = {
    children: ReactNode;
};

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const location = useLocation();
    const accessToken = localStorage.getItem('accessToken')
    const isAuthenticated =  accessToken !== null && accessToken !== undefined;
    if (!isAuthenticated) {
        const searchParams = createSearchParams({ next: location.pathname + location.search });
        return <Navigate to={`/login?${searchParams}`} replace />;
        // return <Navigate to="/login" state={{ from: location }} replace />;
    }
    return <>{children}</>;
};

export default ProtectedRoute;
