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

import { useAppContext } from '@/store/AppContext.jsx';
import { sidebarItems } from './ListMenu.jsx';
import { useNavigate } from 'react-router-dom';

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
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const { menuSelected, setMenuSelected } = useAppContext();
    const [openStates, setOpenStates] = React.useState({});
    const nagative = useNavigate();
    //Tự động chọn mục đầu tiên
    React.useEffect(() => {
        if (sidebarItems.length > 0 && !menuSelected) {
            const defaultMenuItem = sidebarItems[0];
            setMenuSelected(defaultMenuItem);
            nagative(defaultMenuItem.path);
        }
    }, [setMenuSelected]);

    const handleSidebarToggle = () => {
        setOpen(!open);
        if (!open) {
            // Collapse all child items when closing sidebar
            setOpenStates({});
        }
    };
    const handleSidebarOpen = () => {
        if (!open) {
            setOpen(true);
        }
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <Drawer variant="permanent" open={open}>
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
                            path: '/u/settings',
                            state: 'settings',
                        }}
                    />
                </List>
            </Drawer>
        </Box>
    );
};

export default Sidebar;
