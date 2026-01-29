import { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Chip,
} from '@mui/material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { getFromLocalStorage, STORAGE_KEYS } from '../utils/localStorage';

const Achievements = () => {
  const [achievements, setAchievements] = useState([]);

  useEffect(() => {
    const data = getFromLocalStorage(STORAGE_KEYS.ACHIEVEMENTS);
    setAchievements(data);
  }, []);

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
          <EmojiEventsIcon sx={{ fontSize: 60, mb: 2 }} />
          <Typography variant="h3" component="h1" gutterBottom fontWeight="bold">
            Prestasi
          </Typography>
          <Typography variant="h6">
            Berbagai pencapaian membanggakan siswa-siswi kami
          </Typography>
        </Container>
      </Box>

      {/* Achievements Grid */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={4}>
          {achievements.map((achievement) => (
            <Grid item xs={12} md={6} key={achievement.id}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="250"
                  image={achievement.image}
                  alt={achievement.title}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2 }}>
                    <Typography variant="h5" component="h3" gutterBottom fontWeight="bold">
                      {achievement.title}
                    </Typography>
                    <Chip
                      label={achievement.year}
                      color="primary"
                      size="small"
                      sx={{ fontWeight: 'bold' }}
                    />
                  </Box>
                  <Typography variant="body1" color="text.secondary">
                    {achievement.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {achievements.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" color="text.secondary">
              Belum ada data prestasi
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default Achievements;
