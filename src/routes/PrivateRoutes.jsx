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
                loader: () => redirect('/employee/list'),
            },
            {
                path: 'list',
                element: lazy(() => import('@/pages/Employee/List')),
                layout: DefaultLayout,
            },
            {
                path: 'detail',
                element: lazy(() => import('@/pages/Employee/Detail')),
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
    //Tương tự vậy, đây là children trong children cứ thế làm tới
    //Test children trong children
    {
        path: '/test',
        children: [
            {
                // /test sẽ vào chỗ này
                path: '',
                element: lazy(() => import('@/pages/PageNotFound')),
                layout: DefaultLayout,
            },
            {
                path: 'danhsach',
                children: [
                    // /test/danhsach sẽ vào chỗ này
                    {
                        path: '',
                        element: lazy(() => import('@/pages/Test/DanhSach')),
                        layout: DefaultLayout,
                    },
                    //chỗ này sẽ là /test/danhsach/chitiet
                    {
                        path: 'chitiet',
                        element: lazy(() => import('@/pages/Test/ChiTiet')),
                        layout: DefaultLayout,
                    },
                ],
            },
        ],
    },
];

export default privateRouter;
