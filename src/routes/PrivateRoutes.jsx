import { lazy } from 'react';
import { BlankLayout, DefaultLayout } from '@/Layout';
import { redirect } from 'react-router-dom';

const privateRouter = [
    {
        path: '/dashboard',
        element: lazy(() => import('@/pages/Dashboard')),
        layout: DefaultLayout,
    },
    {
        path: '/settings',
        element: lazy(() => import('@/pages/Home')),
        layout: DefaultLayout,
    },
    {
        path: '/employee',
        children: [
            {
                path: '',
                loader: () => redirect('/employee/EmployeeList'),
            },
            {
                path: 'EmployeeList',
                element: lazy(() => import('@/pages/Employee/EmployeeList')),
                layout: DefaultLayout,
            },
            {
                path: 'EmployeeDetail/:userId',
                element: lazy(() => import('@/pages/Employee/EmployeeDetail')),
                layout: DefaultLayout,
            },
        ],
    },
    {
        //Lưu ý nếu có children thì chỉ khai báo path không khai báo gì thêm, khai báo thêm sẽ khai báo bên trong
        path: '/inventory', //Nếu có children thì /inventory sẽ được khai báo bên trong
        children: [
            {
                // "/inventory" sẽ chạy ở đây
                path: '',
                //Chuyển hướng qua cái path khác
                loader: () => redirect('/inventory/list'),
            },
            {
                path: 'list',
                element: lazy(() => import('@/pages/Inventory')),
                layout: DefaultLayout,
            },
        ],
    },
    {
        path: '/product',
        children: [
            {
                path: '',
                loader: () => redirect('/product/ListProduct'), // Chuyển hướng đến trang danh sách sản phẩm
            },
            {
                path: 'ListProduct',
                element: lazy(() => import('@/pages/Product/ListProduct')), // Lazy load trang danh sách sản phẩm
                layout: DefaultLayout,
            },
            {
                path: 'detail/:productId',
                element: lazy(() => import('@/pages/Product/Detail')), // Lazy load trang chi tiết sản phẩm
                layout: DefaultLayout,
            },
        ],
    },

    //Tương tự vậy, đây là children trong children cứ thế làm tới
    //Test children trong children
    {
        path: '/test',
        children: [
            {
                // /test sẽ vào chỗ này
                path: '',
                loader: () => redirect('/test/list'),
            },
            {
                path: 'list',
                element: lazy(() => import('@/pages/Test/DanhSach')),
                layout: DefaultLayout,
            },
            {
                path: 'detail/:id',
                element: lazy(() => import('@/pages/Test/ChiTiet')),
                layout: DefaultLayout,
            },
        ],
    },
];

export default privateRouter;
