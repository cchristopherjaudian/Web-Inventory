import { AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Avatar, Button, Tooltip, MenuItem } from '@mui/material';
import { UnorderedListOutlined, AndroidOutlined } from '@ant-design/icons';
import Logo from 'components/Logo';
import avatar from 'assets/images/users/user.png';
import { useState, useEffect } from 'react';
import customerNavigation from 'menu-items/customer';
import { useNavigate } from 'react-router-dom';
import Notification from './Notification';
import { useDispatch } from 'react-redux';
import { setToken, setAuth } from 'store/reducers/token';
const Navbar = () => {


    const settings = ['Profile', 'Logout'];
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = (path) => {
        setAnchorElNav(null);
        navigate(path);
    };

    const handleCloseUserMenu = (index) => {
        setAnchorElUser(null);
        switch (index) {
            case 0:
                break;
            case 1:
                dispatch(setToken(''));
                dispatch(setAuth(false));
                navigate('/', { replace: true });
                break;
        }
    };
    return (<AppBar position="static" color='default'>
        <Container maxWidth={false}>
            <Toolbar disableGutters>
                <Logo sx={{ display: { xs: 'none', md: 'flex', mr: 2 } }} />
                <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleOpenNavMenu}
                        color="inherit"
                    >
                        <UnorderedListOutlined />
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorElNav}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        open={Boolean(anchorElNav)}
                        onClose={handleCloseNavMenu}
                        sx={{
                            display: { xs: 'block', md: 'none' },
                        }}
                    >
                        {customerNavigation.map((page) => (
                            <MenuItem key={page.id} onClick={() => handleCloseNavMenu(page.url)}>
                                <Typography textAlign="center" sx={{ color: '#2c3e50' }}>{page.title}</Typography>
                            </MenuItem>
                        ))}
                    </Menu>
                </Box>
                <Logo sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />

                <Box sx={{ ml: 2, flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                    {customerNavigation.map((page) => (
                        <Button
                            key={page.id}
                            onClick={() => handleCloseNavMenu(page.url)}
                            sx={{ my: 2, color: '#2c3e50', display: 'block' }}
                        >
                            {page.title}
                        </Button>
                    ))}
                </Box>
                <Box sx={{ flexGrow: 0, mr: 2 }}>
                    <Notification />
                </Box>

                <Box sx={{ flexGrow: 0 }}>

                    <Tooltip title="Open settings">
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                            <Avatar alt="Test User" src={avatar} sx={{ width: 50, height: 50 }} />
                        </IconButton>
                    </Tooltip>
                    <Menu
                        sx={{ mt: '45px' }}
                        id="menu-appbar"
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                    >
                        {settings.map((setting, index) => (
                            <MenuItem key={setting} onClick={() => handleCloseUserMenu(index)}>
                                <Typography textAlign="center">{setting}</Typography>
                            </MenuItem>
                        ))}
                    </Menu>
                </Box>
            </Toolbar>
        </Container>
    </AppBar>);
}

export default Navbar;