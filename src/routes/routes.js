import { lazy } from 'react';

import { PrivateLayout } from '@/Layout';


// Public routes
const publicRoutes = [
    { path: '/', component: lazy(() => import('@/pages/Home')) },
    { path: '/thongke', component: lazy(() => import('@/pages/ThongKe')) },
    { path: '/login', component: lazy(() => import('@/pages/Login')), layout: PrivateLayout }
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
