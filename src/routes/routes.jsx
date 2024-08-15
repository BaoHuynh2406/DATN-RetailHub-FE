import { Suspense, lazy, Fragment } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { DefaultLayout, BlankLayout } from '@/Layout';
import PageNotFound from '@/pages/PageNotFound';
import ProtectedRoute from '@/components/ProtectedRoute';

// Public routes
const publicRoutes = [
    {
        path: '/',
        component: () => <Navigate to="/login" replace />,
        layout: BlankLayout
    },
    {
        path: '/login',
        component: lazy(() => import('@/pages/Login')),
        layout: BlankLayout,
    },
];

// Private routes
const privateRoutes = [
    {
        path: '/dashboard',
        component: lazy(() => import('@/pages/Dashboard')),
    },

    {
        path: '/details',
        component: lazy(() => import('@/pages/ProductDetail')),
        children: [
            { path: 'details', component: lazy(() => import('@/pages/ProductDetail')) },
        ],
    },

    {
        path: '/inventory',
        component: lazy(() => import('@/pages/Inventory')),
        children: [
            { path: 'list', component: lazy(() => import('@/pages/Inventory')) },
            // { path: 'category', component: lazy(() => import('@/pages/Inventory/Category')) },
            // { path: 'unit', component: lazy(() => import('@/pages/Inventory/Unit')) },
        ],
    },
    //test
    {
        path: '/u',
        component: lazy(() => import('@/pages/Home')),
        children: [
            { path: 'home', component: lazy(() => import('@/pages/Home')) },
            { path: 'settings', component: lazy(() => import('@/pages/Home')) },
        ],
    },
];

const renderRoutes = (routes, isPrivate) => {
    return routes.map((route, index) => {
        const Page = route.component;
        const Layout = route.layout || DefaultLayout;
        const RouteComponent = isPrivate ? ProtectedRoute : Fragment;

        return (
            <Route
                key={index}
                path={route.path}
                element={
                    isPrivate ? (
                        <RouteComponent
                            element={
                                <Layout>
                                    <Page />
                                </Layout>
                            }
                        />
                    ) : (
                        <Layout>
                            <Page />
                        </Layout>
                    )
                }
            >
                {/* Render các route con nếu có */}
                {route.children && renderRoutes(route.children, isPrivate)}
            </Route>
        );
    });
};

const Router = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Routes>
                {renderRoutes(publicRoutes, false)}
                {renderRoutes(privateRoutes, true)}

                {/* Route cho trang PageNotFound */}
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </Suspense>
    );
};

export default Router;
