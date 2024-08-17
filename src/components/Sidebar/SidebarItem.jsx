// SidebarItem.js
import { useEffect } from 'react';
import { ListItemButton, ListItemIcon } from '@mui/material';
import { Link, useLocation  } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setMenuSelected } from '@/redux/menu/menuSelected.js';

const SidebarItem = ({ item, isSub }) => {
    const dispatch = useDispatch();
    const menuSelected = useSelector((state) => state.menu.menuSelected);

    const location = useLocation();

    // Tự động chọn mục khi URL khớp với path của item
    useEffect(() => {
        if (location.pathname === item.path) {
            dispatch(setMenuSelected(item));
        }
    }, [location.pathname, item, dispatch]);

    const handleClick = () => {
        dispatch(setMenuSelected(item));
    };

    return item.sidebarProps && item.path ? (
        <ListItemButton
            component={Link}
            to={item.path}
            onClick={handleClick}
            sx={{
                '&:hover': {
                    backgroundColor: '#556EE660',
                },
                backgroundColor: menuSelected?.state === item.state ? '#556EE6 !important' : 'unset',
                color: 'white',
                paddingLeft: isSub ? '30px' : 'auto',
                fontSize: isSub ? '14px' : '16px',
            }}
        >
            <ListItemIcon
                sx={{
                    color: 'white',
                }}
            >
                {item.sidebarProps.icon && item.sidebarProps.icon}
            </ListItemIcon>
            {item.sidebarProps.displayText}
        </ListItemButton>
    ) : null;
};

export default SidebarItem;
