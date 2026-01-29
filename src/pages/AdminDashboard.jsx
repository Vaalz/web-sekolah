import { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Tabs,
  Tab,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import TeachersManagement from '../components/admin/TeachersManagement';
import AchievementsManagement from '../components/admin/AchievementsManagement';
import ExtracurricularsManagement from '../components/admin/ExtracurricularsManagement';
import GalleryManagement from '../components/admin/GalleryManagement';
import AboutManagement from '../components/admin/AboutManagement';
import ContactsManagement from '../components/admin/ContactsManagement';

const AdminDashboard = () => {
  const [currentTab, setCurrentTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const tabs = [
    { label: 'Tentang', component: <AboutManagement /> },
    { label: 'Guru', component: <TeachersManagement /> },
    { label: 'Prestasi', component: <AchievementsManagement /> },
    { label: 'Ekstrakurikuler', component: <ExtracurricularsManagement /> },
    { label: 'Galeri', component: <GalleryManagement /> },
    { label: 'Pesan Kontak', component: <ContactsManagement /> },
  ];

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="xl">
        {/* Header */}
        <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <DashboardIcon sx={{ fontSize: 40, color: 'primary.main' }} />
            <Box>
              <Typography variant="h4" fontWeight="bold" color="primary">
                Dashboard Admin
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Kelola konten website sekolah
              </Typography>
            </Box>
          </Box>
        </Paper>

        {/* Tabs */}
        <Paper elevation={3}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              value={currentTab}
              onChange={handleTabChange}
              variant="scrollable"
              scrollButtons="auto"
              sx={{
                '& .MuiTab-root': {
                  textTransform: 'none',
                  fontWeight: 'medium',
                  fontSize: '1rem',
                },
              }}
            >
              {tabs.map((tab, index) => (
                <Tab key={index} label={tab.label} />
              ))}
            </Tabs>
          </Box>

          <Box sx={{ p: 3 }}>
            {tabs[currentTab].component}
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default AdminDashboard;
