import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import List from '@mui/material/List';
import SidebarItemCollapse from './SidebarItemCollapse';
import SidebarItem from './SidebarItem';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';

import { sidebarItems } from './ListMenu.jsx';

const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
    backgroundColor: theme.palette.primary.main,
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
    [theme.breakpoints.down('sm')]: {
        width: 0,
    },
    backgroundColor: theme.palette.primary.main,
});

const DrawerControl = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
        ...openedMixin(theme),
        '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
        ...closedMixin(theme),
        '& .MuiDrawer-paper': closedMixin(theme),
    }),
}));

const Sidebar = () => {
    const [open, setOpen] = React.useState(() => {
        const savedOpen = localStorage.getItem('sidebarOpen');
        return savedOpen !== null ? JSON.parse(savedOpen) : true;
    });
    const [openStates, setOpenStates] = React.useState({});

    const handleSidebarToggle = () => {
        setOpen(!open);
        if (!open) {
            setOpenStates({});
        }
    };
    const handleSidebarOpen = () => {
        if (!open) {
            setOpen(true);
        }
    };
    React.useEffect(() => {
        localStorage.setItem('sidebarOpen', JSON.stringify(open));
    }, [open]);

    return (
        <Box sx={{ display: 'flex' }}>
            <IconButton
                onClick={handleSidebarToggle}
                sx={{
                    display: { xs: 'inline-flex', sm: 'none' },
                    position: 'fixed',
                    top: '8px',
                    left: { xs: open ? `${drawerWidth - 10}px` : '8px' },
                    backgroundColor: 'var(--secondary-color)',
                    color: 'white',
                    zIndex: 1300,
                    transition: 'left 0.3s ease',
                    '&:hover': {
                        backgroundColor: '#556EE660',
                    },
                }}
            >
                {open ? <MenuOpenIcon /> : <MenuRoundedIcon />}
            </IconButton>

            <Drawer
                sx={{
                    position: { xs: 'absolute', sm: 'relative' },
                }}
                variant="permanent"
                open={open}
            >
                <DrawerControl style={{ height: '56px' }}>
                    <span
                        className="font-bold text-2xl me-6 text-slate-50"
                        style={{ display: !open ? 'none' : 'block' }}
                    >
                        Retail Hub
                    </span>
                    <IconButton
                        onClick={handleSidebarToggle}
                        sx={{
                            backgroundColor: 'var(--secondary-color)',
                            color: 'white',
                            '&:hover': {
                                backgroundColor: '#556EE660',
                            },
                            display: { xs: 'none', sm: 'inline-flex' },
                        }}
                    >
                        {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </DrawerControl>

                <Divider sx={{ backgroundColor: 'gray' }} />
                <List>
                    {sidebarItems.map((item) =>
                        item.child ? (
                            <SidebarItemCollapse
                                item={item}
                                key={item.state}
                                open={open}
                                openStates={openStates}
                                setOpenStates={setOpenStates}
                                setSidebarOpen={handleSidebarOpen}
                            />
                        ) : (
                            <SidebarItem item={item} key={item.state} />
                        ),
                    )}
                </List>
                <Divider sx={{ backgroundColor: 'gray' }} />
                <List>
                    <SidebarItem
                        item={{
                            sidebarProps: { displayText: 'Thiết lập', icon: <SettingsRoundedIcon /> },
                            path: '/settings',
                            state: 'settings',
                        }}
                    />
                </List>
            </Drawer>
        </Box>
    );
};

export default Sidebar;
