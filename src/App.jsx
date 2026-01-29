import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box } from '@mui/material';
import theme from './theme/theme';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Teachers from './pages/Teachers';
import Achievements from './pages/Achievements';
import Extracurriculars from './pages/Extracurriculars';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import AdminDashboard from './pages/AdminDashboard';
import { initializeDefaultData } from './utils/localStorage';
import { useEffect } from 'react';
import './App.css';

function App() {
  useEffect(() => {
    // Initialize default data on first load
    initializeDefaultData();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Navbar />
          <Box component="main" sx={{ flexGrow: 1 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/tentang" element={<About />} />
              <Route path="/guru" element={<Teachers />} />
              <Route path="/prestasi" element={<Achievements />} />
              <Route path="/ekstrakurikuler" element={<Extracurriculars />} />
              <Route path="/galeri" element={<Gallery />} />
              <Route path="/kontak" element={<Contact />} />
              <Route path="/admin" element={<AdminDashboard />} />
            </Routes>
          </Box>
          <Footer />
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
