// SidebarItemCollapse.js
import React, { useEffect, useState } from 'react';
import { Collapse, List, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import ExpandLessOutlinedIcon from '@mui/icons-material/ExpandLessOutlined';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import SidebarItem from './SidebarItem';
import { useAppContext } from '@/store/AppContext.jsx';

const SidebarItemCollapse = ({ item, open, openStates, setOpenStates, setSidebarOpen }) => {
    const [isOpen, setIsOpen] = useState(false);
    const { menuSelected } = useAppContext();

    useEffect(() => {
        if (menuSelected?.state === item.state) {
            setIsOpen(true);
        }
    }, [menuSelected, item]);

    useEffect(() => {
        if (!open) {
            setIsOpen(false);
        }
    }, [open]);

    useEffect(() => {
        // Sync openStates with isOpen state
        setIsOpen(openStates[item.state] || false);
    }, [openStates, item.state]);

    const handleClick = () => {
        setIsOpen(!isOpen);
        setSidebarOpen();
    };

    return item.sidebarProps ? (
        <>
            <ListItemButton
                onClick={handleClick}
                sx={{
                    '&:hover': {
                        backgroundColor: '#556EE660',
                    },
                    color: 'white',
                }}
            >
                <ListItemIcon sx={{ color: 'white' }}>{item.sidebarProps.icon && item.sidebarProps.icon}</ListItemIcon>
                <ListItemText disableTypography primary={<Typography>{item.sidebarProps.displayText}</Typography>} />
                {isOpen ? <ExpandLessOutlinedIcon /> : <ExpandMoreOutlinedIcon />}
            </ListItemButton>
            <Collapse in={isOpen} timeout="auto">
                <List>
                    {item.child?.map((route, index) =>
                        route.sidebarProps ? (
                            route.child ? (
                                <SidebarItemCollapse
                                    item={route}
                                    key={index}
                                    open={open}
                                    openStates={openStates}
                                    setOpenStates={setOpenStates}
                                    setSidebarOpen={setSidebarOpen}
                                />
                            ) : (
                                <SidebarItem item={route} key={index} isSub={true} />
                            )
                        ) : null,
                    )}
                </List>
            </Collapse>
        </>
    ) : null;
};

export default SidebarItemCollapse;
