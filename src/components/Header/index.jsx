import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import { Button, Typography, Skeleton } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import theme from '@/Theme';

import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserCurrent } from '@/redux/UserCurrent';

export default function Header() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [notiOpen, setNotiOpen] = React.useState(null);

    const isMenuOpen = Boolean(anchorEl);
    const isNotiOpen = Boolean(notiOpen);

    const navigate = useNavigate();
    //Lấy phần được chọn
    const menuSelected = useSelector((state) => state.menu.menuSelected);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleNotiMenuOpen = (event) => {
        setNotiOpen(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleNotiMenuClose = () => {
        setNotiOpen(null);
    };

    const handleSignOut = () => {
        // Implement sign out logic here
        navigate('/login');
    };

    const menuId = 'primary-search-account-menu';
    const notiMenuId = 'primary-search-noti-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>Thông tin cá nhân</MenuItem>
            <MenuItem onClick={handleMenuClose}>Hỗ trợ</MenuItem>
            <MenuItem onClick={handleSignOut}>
                <Typography display="flex" alignItems="center" color="red">
                    <LogoutRoundedIcon sx={{ mr: 1 }} />
                    Đăng xuất
                </Typography>
            </MenuItem>
        </Menu>
    );

    const renderNotifications = (
        <Menu
            anchorEl={notiOpen}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            id={notiMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isNotiOpen}
            onClose={handleNotiMenuClose}
        >
            <MenuItem onClick={handleNotiMenuClose} sx={{ my: 2 }}>
                <Typography display="flex" alignItems="center" color="black">
                    Không có thông báo!
                </Typography>
            </MenuItem>
        </Menu>
    );

    const dispatch = useDispatch();
    const { loading, data, error } = useSelector((state) => state.userCurrent);

    React.useEffect(() => {
        if (!loading && !data && !error) {
            dispatch(fetchUserCurrent());
        }
        console.log(data);
    }, [dispatch, loading, data, error]);

    return (
        <Box>
            <AppBar position="static" className="bg-slate-50">
                <Toolbar>
                    <p className="hidden md:block text-nowrap font-bold text-lg me-3 uppercase text-slate-800">
                        {menuSelected ? menuSelected.sidebarProps.displayText : 'Xin chào'}
                    </p>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { md: 'flex' } }}>
                        <IconButton
                            onClick={handleNotiMenuOpen}
                            aria-controls={notiMenuId}
                            aria-haspopup="true"
                            size="large"
                            color="inherit"
                        >
                            <Badge badgeContent={0} color="error">
                                <NotificationsIcon sx={{ color: theme.palette.primary.main }} />
                            </Badge>
                        </IconButton>
                        <Button
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                        >
                            <Typography variant="h7" color="black" sx={{ ml: 2, mr: 1 }}>
                                {data && !loading && data.fullName}
                                {loading && <Skeleton variant="rounded" width={60} height={30} />}
                                {error && (
                                    <Typography variant="h7" color="red" sx={{ fontWeight: 'bold' }}>
                                        Lỗi, vui lòng đăng nhập lại
                                    </Typography>
                                )}
                            </Typography>
                            <AccountCircle sx={{ color: theme.palette.primary.main }} />
                        </Button>
                    </Box>
                </Toolbar>
            </AppBar>
            {renderMenu}
            {renderNotifications}
        </Box>
    );
}
