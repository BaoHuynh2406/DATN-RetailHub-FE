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
        path: '*',
        element: lazy(() => import('@/pages/PageNotFound')),
        layout: BlankLayout,
    },
];

export default publicRouter;
