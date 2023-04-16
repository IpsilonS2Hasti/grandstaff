import MenuIcon from '@mui/icons-material/Menu';
import { Sidebar, Menu, MenuItem, useProSidebar } from "react-pro-sidebar";
import { Link, useLocation } from "react-router-dom";
import { navData } from '../lib/navData';
import { Drawer, Stack, Typography, alpha, useMediaQuery } from '@mui/material';
import { useState } from 'react';

const SideNav = () => {
    const { collapsed, collapseSidebar } = useProSidebar();
    const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));
    const { pathname } = useLocation();
    const mainPath = '/' + pathname.split('/')[1];

    const renderMenu = () => {
        return <Sidebar
            style={{ position: 'sticky', top: 0, borderRadius: "15px", marginTop: "15px", marginBottom: "15px", height: "90vh" }} rootStyles={{
                border: "none",
                [`.ps-sidebar-container`]: {
                    backgroundColor: '#00000000',
                },
            }}>
            <Menu
                menuItemStyles={{
                    button: ({ active }) => {
                        let style = {
                            [`:hover`]: {
                                backgroundColor: '#ffffff22',
                            },
                            borderRadius: '15px',
                            margin: "3px 5px 3px 5px"
                        }
                        if (active) return {
                            ...style,
                            backgroundColor: '#FCAE1ACC',
                            [`:hover`]: {
                                backgroundColor: '#FCAE1AEE',
                            },
                        };
                        return style;
                    },
                }}
            >
                {navData.map(cur => (
                    <MenuItem
                        key={cur.name} //Doesn't seem to work?
                        active={mainPath === cur.path ? true : false}
                        routerLink={<Link to={cur.path} />}
                        icon={cur.icon}
                        onClick={() => isMobile ? collapseSidebar(true) : null}
                    >
                        {cur.name}
                    </MenuItem>
                ))}
            </Menu>
        </Sidebar>
    }

    const renderMobileDrawer = () => {
        return <Drawer
            PaperProps={{
                sx: {
                    backdropFilter: 'blur(10px)',
                    backgroundColor: theme => alpha(theme.palette.background.paper, 0.57),
                    borderRadius: "0 16px 16px 0"
                },
            }}
            open={!collapsed}
            onClose={() => collapseSidebar(true)}
        >
            <Stack alignItems="center" justifyContent="center" width="100%" height="65px" style={{ borderBottom: '2px solid rgba(255, 255, 255, 0.2)' }}>
                <Typography variant="p" component="div" fontSize="20px">
                    <b>Петолиние</b>
                </Typography>
            </Stack>
            {renderMenu()}
        </Drawer>
    }



    return (
        isMobile ?
            renderMobileDrawer()
            :
            renderMenu()
    );
}

export default SideNav;