import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import MoreIcon from '@mui/icons-material/MoreVert';
import { useProSidebar } from "react-pro-sidebar";
import ListingFilters from './ListingFilters';
import { ColorModeContext } from '../context/ColorModeContext';
import { useTheme } from '@emotion/react';
import { useContext } from 'react';
import { useLogout } from '../hooks/useLogout';
import { useLocation } from "react-router-dom"
import SearchBar from './Searchbar';
import { useNavigate } from 'react-router-dom';
import NotificationsMenu from './NotificationsMenu';
import ChipDropdown from './ChipDropdown';
import { ChipDropdownData } from '../lib/chipData';
import FeedTypeDropdown from './FeedTypeDropdown';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import Brightness5Icon from '@mui/icons-material/Brightness5';
import axios from 'axios';

export default function SearchAppBar() {
    const { logout } = useLogout();
    const theme = useTheme();
    const colorMode = useContext(ColorModeContext);
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const loggedUser = JSON.parse(localStorage.getItem('user'));
    
    // console.log(colorMode);

    const RenderFilters = () => {
        if (pathname == "/find") return <><SearchBar /><ListingFilters /></>;
        if (pathname == "/" && loggedUser) return <FeedTypeDropdown />;
    };

    const { collapseSidebar } = useProSidebar();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
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
            {
                !loggedUser ? 
                [
                    <MenuItem key="login" onClick={() => {
                        handleMenuClose();
                        navigate('/login');
                    }}>Вписване</MenuItem>,
                    <MenuItem key="signup" onClick={() => {
                        handleMenuClose();
                        logout();
                        navigate('/signup');
                    }}>Регистрация</MenuItem>
                ]
                :
                [<MenuItem key="profile" onClick={() => {
                    handleMenuClose();
                    navigate('/profile/');
                }}>Профил</MenuItem>,
                <MenuItem key="logout" onClick={() => {
                    handleMenuClose();
                    logout();
                    navigate('/login');
                }}>Излизане</MenuItem>]
            }
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>
            <IconButton size="large" color="inherit">
                    {
                        theme.palette.mode === "dark"
                        ?
                        <Brightness5Icon/>
                        :
                        <DarkModeIcon/>
                    }
                </IconButton>
                <p>Съобщения</p>
            </MenuItem>
            <MenuItem>
                <NotificationsMenu />
                <p>Известия</p>
            </MenuItem>
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
                <p>Профил</p>
            </MenuItem>
        </Menu>
    );

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" color='secondary'>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        sx={{ mr: 2 }}
                        onClick={() => (
                            collapseSidebar()
                        )}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ display: { xs: 'none', sm: 'block' } }}
                    >
                        Петолиние
                    </Typography>
                    {RenderFilters()}
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <IconButton size="large" aria-label="show 4 new mails" color="inherit" onClick={colorMode.toggleColorMode}>
                            {
                                theme.palette.mode === "dark"
                                ?
                                <Brightness5Icon/>
                                :
                                <DarkModeIcon/>
                            }
                        </IconButton>
                        <NotificationsMenu />
                        <IconButton
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                    </Box>
                    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
        </Box>
    );
}