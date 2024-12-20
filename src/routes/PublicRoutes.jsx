import { redirect } from 'react-router-dom';
import { lazy } from 'react';
import { BlankLayout, DefaultLayout } from '@/Layout';

const publicRouter = [
    {
        path: '/',
        loader: () => redirect('/login'),
    },
    {
        path: '/login',
        element: lazy(() => import('@/pages/Login')),
        layout: BlankLayout,
    },
    {
        path: '/forgotpassword',
        element: lazy(() => import('@/pages/ForgotPassword')),
        layout: BlankLayout,
    },
    {
        path: '/error-code-500',
        element: lazy(() => import('@/pages/ErrorCode500')),
        layout: BlankLayout,
    },
    {
        path: '/403',
        element: lazy(() => import('@/pages/ErrorCode500/ErrorCode403.jsx')),
        layout: BlankLayout,
    },
    {
        path: '*',
        element: lazy(() => import('@/pages/PageNotFound')),
        layout: BlankLayout,
    },
];

export default publicRouter;
