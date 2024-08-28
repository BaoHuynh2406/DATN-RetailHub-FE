// SidebarItem.js
import { useEffect } from 'react';
import { ListItemButton, ListItemIcon } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setMenuSelected } from '@/redux/Menu/MenuSlice.js';

const SidebarItem = ({ item, isSub }) => {
    const dispatch = useDispatch();
    const menuSelected = useSelector((state) => state.menu.menuSelected);

    const location = useLocation();

    // useEffect để tự động chọn mục khi URL khớp với path của item
    useEffect(() => {
        if (location.pathname === item.path) {
            const selected = prepareSelectedItem(item);
            dispatch(setMenuSelected(selected));
        }
    }, [location.pathname, item, dispatch]);

    // Xử lý sự kiện khi nhấp vào mục sidebar
    const handleClick = () => {
        const selected = prepareSelectedItem(item);
        dispatch(setMenuSelected(selected));
    };

    const prepareSelectedItem = (item) => {
        const { sidebarProps, ...rest } = item;
        return {
            ...rest,
            sidebarProps: {
                ...sidebarProps,
                icon: undefined,
            },
        };
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
