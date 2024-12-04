import SpaceDashboardRoundedIcon from '@mui/icons-material/SpaceDashboardRounded';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import TableChartRoundedIcon from '@mui/icons-material/TableChartRounded';
import DomainVerificationRoundedIcon from '@mui/icons-material/DomainVerificationRounded';
import Inventory2RoundedIcon from '@mui/icons-material/Inventory2Rounded';
import BallotRoundedIcon from '@mui/icons-material/BallotRounded';
import ContactsRoundedIcon from '@mui/icons-material/ContactsRounded';
import LocalShippingRoundedIcon from '@mui/icons-material/LocalShippingRounded';
import InputRoundedIcon from '@mui/icons-material/InputRounded';
import ReplyAllRoundedIcon from '@mui/icons-material/ReplyAllRounded';
import DoneAllRoundedIcon from '@mui/icons-material/DoneAllRounded';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import ReceiptLongRoundedIcon from '@mui/icons-material/ReceiptLongRounded';
import CardGiftcardRoundedIcon from '@mui/icons-material/CardGiftcardRounded';
import BugReportRoundedIcon from '@mui/icons-material/BugReportRounded';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import HistoryEduRoundedIcon from '@mui/icons-material/HistoryEduRounded';

export const sidebarItems = [
    {
        sidebarProps: { displayText: 'Trang tổng quan', icon: <SpaceDashboardRoundedIcon /> },
        path: '/dashboard',
        state: 'dashboard',
    },
    {
        sidebarProps: { displayText: 'Nhân viên', icon: <PeopleRoundedIcon /> },
        path: '/employee',
        state: 'employee',
        child: [
            {
                sidebarProps: { displayText: 'Danh sách nhân viên', icon: <TableChartRoundedIcon /> },
                path: '/employee/EmployeeList',
                state: 'employee/EmployeeList',
            },
            {
                sidebarProps: { displayText: 'Chấm công', icon: <DomainVerificationRoundedIcon /> },
                path: '/u/employee',
                state: 'employee/check',
            },
        ],
    },
    {
        sidebarProps: { displayText: 'Khách hàng', icon: <ContactsRoundedIcon /> },
        path: '/customer',
        state: 'customer',
        child: [
            {
                sidebarProps: { displayText: 'Danh sách', icon: <BallotRoundedIcon /> },
                path: '/customer/CustomerList',
                state: '/customer/CustomerList',
            },
            {
                sidebarProps: { displayText: 'Lịch sữ điểm', icon: <HistoryEduRoundedIcon /> },
                path: '/customer/HistoryPointList',
                state: '/customer/HistoryPointList',
            },
        ],
    },
    {
        sidebarProps: { displayText: 'Nhà cung cấp đại lý', icon: <LocalShippingRoundedIcon /> },
        path: '/u/supplier',
        state: 'supplier',
    },
    {
        sidebarProps: { displayText: 'Quản lý kho', icon: <Inventory2RoundedIcon /> },
        path: '/product',
        state: 'product',
        child: [
            {
                sidebarProps: { displayText: 'Danh sách hàng hóa', icon: <BallotRoundedIcon /> },
                path: '/product/ProductList',
                state: '/product/ProductList',
            },
            {
                sidebarProps: { displayText: 'Chi tiết hàng hóa', icon: <ManageAccountsIcon /> },
                path: '/product/ProductDetail/create',
                state: 'product/ProductDetail',
            },
            {
                sidebarProps: { displayText: 'QL Nhập hàng', icon: <InputRoundedIcon /> },
                path: '/u/inventory',
                state: 'inventory/import',
            },
            {
                sidebarProps: { displayText: 'QL Xuất hàng', icon: <ReplyAllRoundedIcon /> },
                path: '/u/inventory',
                state: 'inventory/out',
            },
            {
                sidebarProps: { displayText: 'QL Kiểm kê', icon: <DoneAllRoundedIcon /> },
                path: '/u/inventory',
                state: 'inventory/check',
            },
        ],
    },
    {
        sidebarProps: { displayText: 'Bán hàng', icon: <ShoppingCartRoundedIcon /> },
        path: '/sales',
        state: 'sales',
        child: [
            {
                sidebarProps: { displayText: 'Đơn hàng', icon: <ReceiptLongRoundedIcon /> },
                path: '/sales/invoice',
                state: 'sales/invoice',
            },
            {
                sidebarProps: { displayText: 'Tạo mã voucher', icon: <CardGiftcardRoundedIcon /> },
                path: '/u/inventory',
                state: 'sell/voucher',
            },
        ],
    },
    {
        sidebarProps: { displayText: 'Test', icon: <BugReportRoundedIcon /> },
        path: '/test',
        state: 'test',
    },
];
