// import config from '@/config';

// Layouts
// import { HeaderOnly } from '@/layouts';
import { PrivateLayout } from '@/Layout';

// Pages
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import ThongKe from '@/pages/ThongKe';
// import Following from '@/pages/Following';
// import Profile from '@/pages/Profile';
// import Upload from '@/pages/Upload';
// import Search from '@/pages/Search';
// import Live from '@/pages/Live';

// Public routes
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/thongke', component: ThongKe },
    { path: '/login', component: Login, layout: PrivateLayout },
    // { path: config.routes.following, component: Following },
    // { path: config.routes.live, component: Live },
    // { path: config.routes.profile, component: Profile },
    // { path: config.routes.upload, component: Upload, layout: HeaderOnly },
    // { path: config.routes.search, component: Search, layout: null },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
