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
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { getFromLocalStorage, STORAGE_KEYS } from '../utils/localStorage';

const Extracurriculars = () => {
  const [extracurriculars, setExtracurriculars] = useState([]);

  useEffect(() => {
    const data = getFromLocalStorage(STORAGE_KEYS.EXTRACURRICULARS);
    setExtracurriculars(data);
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
          <Typography variant="h3" component="h1" gutterBottom fontWeight="bold">
            Ekstrakurikuler
          </Typography>
          <Typography variant="h6">
            Berbagai kegiatan untuk mengembangkan bakat dan minat siswa
          </Typography>
        </Container>
      </Box>

      {/* Extracurriculars Grid */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={4}>
          {extracurriculars.map((extra) => (
            <Grid item xs={12} md={4} key={extra.id}>
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
                  height="200"
                  image={extra.image}
                  alt={extra.name}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h5" component="h3" gutterBottom fontWeight="bold">
                    {extra.name}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" paragraph>
                    {extra.description}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 2 }}>
                    <AccessTimeIcon color="primary" fontSize="small" />
                    <Typography variant="body2" color="primary" fontWeight="medium">
                      {extra.schedule}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {extracurriculars.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" color="text.secondary">
              Belum ada data ekstrakurikuler
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default Extracurriculars;
