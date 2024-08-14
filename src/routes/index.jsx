import { Suspense } from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
import publicRoutes from './PublicRoutes';
import privateRoutes from './PrivateRoutes';
import PendingLoad from '@/pages/PendingLoad';
import { BlankLayout } from '@/Layout';

const createElement = (Element, Layout, isSecure) => (
    isSecure ? (
        <ProtectedRoute>
            <Layout>
                <Suspense fallback={<PendingLoad />}>
                    <Element />
                </Suspense>
            </Layout>
        </ProtectedRoute>
    ) : (
        <Layout>
            <Suspense fallback={<PendingLoad />}>
                <Element />
            </Suspense>
        </Layout>
    )
);

const createRoute = (routes, isSecure = false) => {
    return routes.map((route) => {
        const { element, layout, children, ...rest } = route;
        const Element = element || BlankLayout;
        const Layout = layout || BlankLayout;
        return {
            ...rest,
            element: createElement(Element, Layout, isSecure),
            children: children ? createRoute(children, isSecure) : undefined,
        };
    });
};

const combinedRoutes = [...createRoute(publicRoutes), ...createRoute(privateRoutes, true)];

export default combinedRoutes;
