import { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Box,
  Container,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SchoolIcon from '@mui/icons-material/School';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    { label: 'Beranda', path: '/beranda' },
    { label: 'Tentang', path: '/tentang' },
    { label: 'Guru', path: '/guru' },
    { label: 'Prestasi', path: '/prestasi' },
    { label: 'Ekstrakurikuler', path: '/ekstrakurikuler' },
    { label: 'Galeri', path: '/galeri' },
    { label: 'Kontak', path: '/kontak' },
  ];

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center', py: 2 }}>
      <Typography variant="h6" sx={{ my: 2, color: 'primary.main', fontWeight: 700 }}>
        <SchoolIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
        Sekolah
      </Typography>

      <List>
        {menuItems.map((item) => {
          const active = location.pathname === item.path;
          return (
            <ListItem key={item.path} disablePadding>
              <ListItemButton
                component={Link}
                to={item.path}
                sx={{
                textAlign: 'center',
                borderRadius: '10px',
                mx: 1,
                my: 0.5,
                fontWeight: 500,
                bgcolor: active ? 'primary.main' : 'transparent',
                color: active ? 'white' : 'text.primary',
                transform: active ? 'scale(1.08)' : 'scale(1)',
                transition: '0.25s ease',
                '&:hover': {
                  transform: 'scale(1.06)',
                },
              }}
              >
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          backgroundColor: 'rgba(255,255,255,0.88)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(0,0,0,0.05)',
          color: 'primary.main',
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/* Logo desktop */}
            <SchoolIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            <Typography
              variant="h6"
              component={Link}
              to="/"
              sx={{
                mr: 3,
                display: { xs: 'none', md: 'flex' },
                fontWeight: 800,
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              Sekolah
            </Typography>

            {/* Hamburger */}
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton onClick={handleDrawerToggle} color="inherit">
                <MenuIcon />
              </IconButton>
            </Box>

            {/* Logo mobile */}
            <SchoolIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
            <Typography
              variant="h6"
              component={Link}
              to="/"
              sx={{
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontWeight: 800,
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              Sekolah
            </Typography>

            {/* Menu desktop */}
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, gap: 1 }}>
              {menuItems.map((item) => {
                const active = location.pathname === item.path;
                return (
                  <Button
                    key={item.path}
                    component={Link}
                    to={item.path}
                    sx={{
                    px: 2.5,
                    py: 1,
                    borderRadius: '12px',
                    fontWeight: 500,
                    textTransform: 'none',
                    bgcolor: active ? 'primary.main' : 'transparent',
                    color: active ? 'white' : 'text.secondary',
                    transform: active ? 'scale(1.1)' : 'scale(1)',
                    transition: '0.25s ease',
                    '&:hover': {
                      transform: 'scale(1.08)',
                    },
                  }}
                  >
                    {item.label}
                  </Button>
                );
              })}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Drawer mobile */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { width: 260 },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Navbar;
