import { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  Paper,
} from '@mui/material';
import { getFromLocalStorage, STORAGE_KEYS } from '../utils/localStorage';

const About = () => {
  const [aboutData, setAboutData] = useState(null);
  const [principalMessage, setPrincipalMessage] = useState(null);

  useEffect(() => {
    const about = getFromLocalStorage(STORAGE_KEYS.ABOUT, null);
    const principal = getFromLocalStorage(STORAGE_KEYS.PRINCIPAL_MESSAGE, null);
    setAboutData(about);
    setPrincipalMessage(principal);
  }, []);

  if (!aboutData || !principalMessage) {
    return (
      <Container sx={{ py: 4 }}>
        <Typography>Loading...</Typography>
      </Container>
    );
  }

  return (
    <Box>
      {/* Header */}
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          py: 6,
          textAlign: 'center',
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="h3" component="h1" gutterBottom fontWeight="bold">
            Tentang Kami
          </Typography>
          <Typography variant="h6">
            Mengenal lebih dekat visi, misi, dan sejarah sekolah kami
          </Typography>
        </Container>
      </Box>

      {/* Principal Message */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h4" gutterBottom fontWeight="bold" color="primary" align="center">
          Sambutan Kepala Sekolah
        </Typography>
        <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={4} sx={{ textAlign: 'center' }}>
              <Avatar
                src={principalMessage.image}
                alt={principalMessage.name}
                sx={{ width: 200, height: 200, mx: 'auto', mb: 2 }}
              />
              <Typography variant="h6" fontWeight="bold">
                {principalMessage.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Kepala Sekolah
              </Typography>
            </Grid>
            <Grid item xs={12} md={8}>
              <Typography variant="body1" paragraph sx={{ textAlign: 'justify', fontSize: '1.1rem' }}>
                {principalMessage.message}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Container>

      {/* Vision & Mission */}
      <Box sx={{ bgcolor: 'background.default', py: 8 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Card sx={{ height: '100%' }}>
                <CardContent sx={{ p: 4 }}>
                  <Typography variant="h5" gutterBottom fontWeight="bold" color="primary">
                    Visi
                  </Typography>
                  <Typography variant="body1" sx={{ textAlign: 'justify', mt: 2 }}>
                    {aboutData.vision}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card sx={{ height: '100%' }}>
                <CardContent sx={{ p: 4 }}>
                  <Typography variant="h5" gutterBottom fontWeight="bold" color="primary">
                    Misi
                  </Typography>
                  <Box component="ul" sx={{ mt: 2, pl: 2 }}>
                    {aboutData.mission.map((item, index) => (
                      <Typography
                        component="li"
                        key={index}
                        variant="body1"
                        sx={{ mb: 1, textAlign: 'justify' }}
                      >
                        {item}
                      </Typography>
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* History */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h4" gutterBottom fontWeight="bold" color="primary" align="center">
          Sejarah
        </Typography>
        <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
          <Typography variant="body1" sx={{ textAlign: 'justify', fontSize: '1.1rem' }}>
            {aboutData.history}
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default About;
