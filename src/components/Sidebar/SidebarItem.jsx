// SidebarItem.js
import React from 'react';
import { ListItemButton, ListItemIcon } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAppContext } from '@/store/AppContext.jsx'; // Import context

const SidebarItem = ({ item, isSub }) => {
    const { menuSelected, setMenuSelected } = useAppContext();
    const handleClick = () => {
        setMenuSelected(item);
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
                fontSize: isSub ? '14px' : '16px'
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
