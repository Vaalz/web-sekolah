import { useState, useEffect } from 'react';
import { Box, Container, Typography, Button, Grid, Card, CardContent, CardMedia, Paper, Divider } from '@mui/material';
import { Link } from 'react-router-dom';
import SchoolIcon from '@mui/icons-material/School';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import PeopleIcon from '@mui/icons-material/People';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FlagIcon from '@mui/icons-material/Flag';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import UtamaImage from '../assets/Image/Utama.png';
import { getFromLocalStorage, STORAGE_KEYS } from '../utils/localStorage';

const    Home = () => {
  const [aboutData, setAboutData] = useState(null);

  useEffect(() => {
    const about = getFromLocalStorage(STORAGE_KEYS.ABOUT, null);
    setAboutData(about);
  }, []);

  return (
    <Box>
      {/* Hero Section */}
      <Box
          sx={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${UtamaImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            color: 'white',

            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',

            textAlign: 'center',
            width: '100%',
          }}
      >
        <Container maxWidth="lg">
          <SchoolIcon sx={{ fontSize: 80, mb: 2 }} />
          <Typography variant="h2" component="h1" gutterBottom fontWeight="bold">
            Selamat Datang di Sekolah
          </Typography>
          <Typography variant="h5" sx={{ mb: 4, opacity: 0.9 }}>
            Membentuk Generasi Unggul, Berakhlak Mulia, dan Berwawasan Global
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              component={Link}
              to="/tentang"
              variant="contained"
              size="large"
              sx={{
                bgcolor: 'white',
                color: 'primary.main',
                '&:hover': {
                  bgcolor: 'secondary.light',
                },
              }}
            >
              Tentang Kami
            </Button>
            <Button
              component={Link}
              to="/kontak"
              variant="outlined"
              size="large"
              sx={{
                borderColor: 'white',
                color: 'white',
                '&:hover': {
                  borderColor: 'white',
                  bgcolor: 'rgba(255,255,255,0.1)',
                },
              }}
            >
              Hubungi Kami
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h3" align="center" gutterBottom fontWeight="bold" color="primary">
          Mengapa Memilih Kami?
        </Typography>
        <Typography variant="h6" align="center" sx={{ mb: 6, color: 'text.secondary' }}>
          Kami berkomitmen memberikan pendidikan terbaik untuk masa depan cerah
        </Typography>

        <Box 
          sx={{ 
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: 3,
            alignItems: 'stretch',
          }}
        >
          {/* Card 1 */}
          <Card
            sx={{
              flex: 1,
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: 'center',
              p: 3,
              borderRadius: 3,
              boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              transition: 'all 0.3s ease-in-out',
              '&:hover': {
                transform: 'translateY(-8px)',
                boxShadow: '0 12px 32px rgba(102,126,234,0.3)',
              },
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minWidth: { xs: '100%', sm: 80 },
                mb: { xs: 2, sm: 0 },
                mr: { xs: 0, sm: 3 },
              }}
            >
              <PeopleIcon sx={{ fontSize: 60 }} />
            </Box>
            <Box sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
              <Typography variant="h5" component="h3" gutterBottom fontWeight="bold">
                Tenaga Pengajar Berkualitas
              </Typography>
              <Typography variant="body1" sx={{ opacity: 0.9 }}>
                Guru-guru berpengalaman dan berdedikasi tinggi dalam membimbing siswa mencapai prestasi terbaik.
              </Typography>
            </Box>
          </Card>

          {/* Card 2 */}
          <Card
            sx={{
              flex: 1,
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: 'center',
              p: 3,
              borderRadius: 3,
              boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
              background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
              color: 'white',
              transition: 'all 0.3s ease-in-out',
              '&:hover': {
                transform: 'translateY(-8px)',
                boxShadow: '0 12px 32px rgba(240,147,251,0.3)',
              },
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minWidth: { xs: '100%', sm: 80 },
                mb: { xs: 2, sm: 0 },
                mr: { xs: 0, sm: 3 },
              }}
            >
              <EmojiEventsIcon sx={{ fontSize: 60 }} />
            </Box>
            <Box sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
              <Typography variant="h5" component="h3" gutterBottom fontWeight="bold">
                Prestasi Membanggakan
              </Typography>
              <Typography variant="body1" sx={{ opacity: 0.9 }}>
                Berbagai prestasi di tingkat lokal, nasional, dan internasional di bidang akademik maupun non-akademik.
              </Typography>
            </Box>
          </Card>

          {/* Card 3 */}
          <Card
            sx={{
              flex: 1,
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: 'center',
              p: 3,
              borderRadius: 3,
              boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
              background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
              color: 'white',
              transition: 'all 0.3s ease-in-out',
              '&:hover': {
                transform: 'translateY(-8px)',
                boxShadow: '0 12px 32px rgba(79,172,254,0.3)',
              },
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minWidth: { xs: '100%', sm: 80 },
                mb: { xs: 2, sm: 0 },
                mr: { xs: 0, sm: 3 },
              }}
            >
              <PhotoLibraryIcon sx={{ fontSize: 60 }} />
            </Box>
            <Box sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
              <Typography variant="h5" component="h3" gutterBottom fontWeight="bold">
                Fasilitas Lengkap
              </Typography>
              <Typography variant="body1" sx={{ opacity: 0.9 }}>
                Fasilitas modern dan lengkap untuk mendukung proses pembelajaran yang efektif dan menyenangkan.
              </Typography>
            </Box>
          </Card>
        </Box>
      </Container>

      {/* About Section - Tentang Sekolah */}
      {aboutData && (
        <Box sx={{ bgcolor: '#f8f9fa', py: 10 }}>
          <Container maxWidth="lg">
            <Box sx={{ textAlign: 'center', mb: 8 }}>
              <Typography 
                variant="h3" 
                gutterBottom 
                fontWeight="bold" 
                color="primary"
                sx={{ mb: 2 }}
              >
                Tentang Sekolah Kami
              </Typography>
              <Typography 
                variant="h6" 
                sx={{ color: 'text.secondary', maxWidth: '700px', mx: 'auto' }}
              >
                Mengenal visi, misi, dan sejarah perjalanan sekolah kami
              </Typography>
            </Box>

            {/* Visi & Misi */}
            <Box 
              sx={{ 
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                gap: 3,
                alignItems: 'stretch',
                mb: 4,
              }}
            >
              {/* Visi */}
              <Card
                elevation={0}
                sx={{
                  flex: 1,
                  borderRadius: 4,
                  overflow: 'hidden',
                  border: '1px solid',
                  borderColor: 'divider',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    transform: 'translateY(-12px)',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                    borderColor: 'primary.main',
                  },
                }}
              >
                <Box
                  sx={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    p: 3,
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Box
                    sx={{
                      bgcolor: 'rgba(255,255,255,0.2)',
                      backdropFilter: 'blur(10px)',
                      borderRadius: '16px',
                      width: 64,
                      height: 64,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mr: 2.5,
                    }}
                  >
                    <VisibilityIcon sx={{ fontSize: 36, color: 'white' }} />
                  </Box>
                  <Typography variant="h4" fontWeight="700" color="white">
                    Visi
                  </Typography>
                </Box>
                <CardContent sx={{ p: 4 }}>
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      textAlign: 'justify', 
                      lineHeight: 2,
                      color: 'text.primary',
                      fontSize: '1rem'
                    }}
                  >
                    {aboutData.vision}
                  </Typography>
                </CardContent>
              </Card>

              {/* Misi */}
              <Card
                elevation={0}
                sx={{
                  flex: 1,
                  borderRadius: 4,
                  overflow: 'hidden',
                  border: '1px solid',
                  borderColor: 'divider',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    transform: 'translateY(-12px)',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                    borderColor: 'secondary.main',
                  },
                }}
              >
                <Box
                  sx={{
                    background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                    p: 3,
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Box
                    sx={{
                      bgcolor: 'rgba(255,255,255,0.2)',
                      backdropFilter: 'blur(10px)',
                      borderRadius: '16px',
                      width: 64,
                      height: 64,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mr: 2.5,
                    }}
                  >
                    <FlagIcon sx={{ fontSize: 36, color: 'white' }} />
                  </Box>
                  <Typography variant="h4" fontWeight="700" color="white">
                    Misi
                  </Typography>
                </Box>
                <CardContent sx={{ p: 4 }}>
                  <Box component="ul" sx={{ pl: 3, m: 0 }}>
                    {aboutData.mission.map((item, index) => (
                      <Typography
                        component="li"
                        key={index}
                        variant="body1"
                        sx={{ 
                          mb: 2, 
                          textAlign: 'justify', 
                          lineHeight: 2,
                          color: 'text.primary',
                          fontSize: '1rem',
                          '&::marker': {
                            color: 'secondary.main',
                            fontWeight: 'bold',
                          }
                        }}
                      >
                        {item}
                      </Typography>
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Box>

            {/* Sejarah */}
            <Card
              elevation={0}
              sx={{
                borderRadius: 4,
                overflow: 'hidden',
                border: '1px solid',
                borderColor: 'divider',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  transform: 'translateY(-12px)',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                  borderColor: 'success.main',
                },
              }}
            >
              <Box
                sx={{
                  background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                  p: 3,
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Box
                  sx={{
                    bgcolor: 'rgba(255,255,255,0.2)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: '16px',
                    width: 64,
                    height: 64,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mr: 2.5,
                  }}
                >
                  <HistoryEduIcon sx={{ fontSize: 36, color: 'white' }} />
                </Box>
                <Typography variant="h4" fontWeight="700" color="white">
                  Sejarah
                </Typography>
              </Box>
              <CardContent sx={{ p: 4 }}>
                <Typography 
                  variant="body1" 
                  sx={{ 
                    textAlign: 'justify', 
                    lineHeight: 2,
                    color: 'text.primary',
                    fontSize: '1rem'
                  }}
                >
                  {aboutData.history}
                </Typography>
              </CardContent>
            </Card>
          </Container>
        </Box>
      )}

      {/* CTA Section */}
      <Box
        sx={{
          bgcolor: 'primary.light',
          color: 'white',
          py: 8,
          textAlign: 'center',
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h4" gutterBottom fontWeight="bold">
            Bergabunglah Bersama Kami
          </Typography>
          <Typography variant="h6" sx={{ mb: 3 }}>
            Mari bersama-sama membangun masa depan yang lebih cerah
          </Typography>
          <Button
            component={Link}
            to="/kontak"
            variant="contained"
            size="large"
            sx={{
              bgcolor: 'white',
              color: 'primary.main',
              '&:hover': {
                bgcolor: 'secondary.light',
              },
            }}
          >
            Daftar Sekarang
          </Button>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;
