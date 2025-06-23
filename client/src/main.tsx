import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

/**
 * importing pages for the application
 */
import Welcome from './features/welcome/pages/Welcome';
import About from './features/welcome/pages/About';
import Services from './features/welcome/pages/Services';
import Contact from './features/welcome/pages/Contact';
import Login from './features/authentification/pages/Login';
import Register from './features/authentification/pages/Register';
import Inactive from './features/authentification/pages/Inactive';
import UserDashboard from './features/user/pages/UserDashboard';
import AdminDashboard from './features/admin/pages/AdminDashboard';
import Statistics from './features/admin/pages/Statistics';
import InactiveUsers from './features/admin/pages/InactiveUsers';
import Users from './features/admin/pages/Users';
import Agencies from './features/admin/pages/Agencies';
import Interventions from './features/admin/pages/Interventions';

import './index.css';

/**
 * Creating router for the application
 */
const router = createBrowserRouter([
    // Welcome pages
    {
        path: '/',
        element: <Welcome />,
    },
    {
        path: '/about',
        element: <About />,
    },
    {
        path: '/services',
        element: <Services />,
    },
    {
        path: '/contact',
        element: <Contact />,
    },

    // Authentication pages
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/register',
        element: <Register />,
    },
    {
        path: '/inactive',
        element: <Inactive />,
    },

    // user pages
    {
        path: '/user-dashboard',
        element: <UserDashboard />,
    },

    // Admin pages - Routes imbriquées
    {
        path: '/admin-dashboard',
        element: <AdminDashboard />,
        children: [
            {
                // Default route for admin dashboard
                index: true,
                element: <Statistics />,
            },
            {
                path: 'statistics',
                element: <Statistics />,
            },
            {
                path: 'inactive-users',
                element: <InactiveUsers />,
            },
            {
                path: 'users',
                element: <Users />,
            },
            {
                path: 'agencies',
                element: <Agencies />,
            },
            {
                path: 'interventions',
                element: <Interventions />,
            },
        ],
    },
]);

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>,
);

