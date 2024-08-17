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

export const sidebarItems = [
    {
        sidebarProps: { displayText: 'Trang tổng quan', icon: <SpaceDashboardRoundedIcon /> },
        path: '/dashboard',
        state: 'dashboard',
    },
    {
        sidebarProps: { displayText: 'Nhân viên', icon: <PeopleRoundedIcon /> },
        path: '/u',
        state: 'employee',
        child: [
            {
                sidebarProps: { displayText: 'Danh sách nhân viên', icon: <TableChartRoundedIcon /> },
                path: '/u/employee',
                state: 'employee/list',
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
        path: '/u/customer',
        state: 'customer',
    },
    {
        sidebarProps: { displayText: 'Nhà cung cấp đại lý', icon: <LocalShippingRoundedIcon /> },
        path: '/u/supplier',
        state: 'supplier',
    },
    {
        sidebarProps: { displayText: 'Quản lý kho', icon: <Inventory2RoundedIcon /> },
        path: '/inventory',
        state: 'inventory',
        child: [
            {
                sidebarProps: { displayText: 'Danh sách hàng hóa', icon: <BallotRoundedIcon /> },
                path: '/inventory/list',
                state: 'inventory/list',
            },
            {
                sidebarProps: { displayText: 'Chi tiết hàng hóa', icon: <ManageAccountsIcon /> },
                path: '/goods/detail',
                state: 'goods/detail',
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
        path: '/u',
        state: 'sell',
        child: [
            {
                sidebarProps: { displayText: 'Đơn hàng', icon: <ReceiptLongRoundedIcon /> },
                path: '/u/invoice',
                state: 'sell/invoice',
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
        state:'test',
    }
];
