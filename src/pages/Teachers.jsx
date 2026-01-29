import { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Avatar,
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import { getFromLocalStorage, STORAGE_KEYS } from '../utils/localStorage';

const Teachers = () => {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    const data = getFromLocalStorage(STORAGE_KEYS.TEACHERS);
    setTeachers(data);
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
            Tenaga Pengajar
          </Typography>
          <Typography variant="h6">
            Guru-guru berpengalaman dan berdedikasi tinggi
          </Typography>
        </Container>
      </Box>

      {/* Teachers Grid */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={4}>
          {teachers.map((teacher) => (
            <Grid item xs={12} sm={6} md={4} key={teacher.id}>
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
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    py: 4,
                    bgcolor: 'background.default',
                  }}
                >
                  <Avatar
                    src={teacher.image}
                    alt={teacher.name}
                    sx={{ width: 150, height: 150 }}
                  />
                </Box>
                <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                  <Typography variant="h6" component="h3" gutterBottom fontWeight="bold">
                    {teacher.name}
                  </Typography>
                  <Typography variant="body1" color="primary" gutterBottom fontWeight="medium">
                    {teacher.subject}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mt: 2 }}>
                    <EmailIcon fontSize="small" color="action" />
                    <Typography variant="body2" color="text.secondary">
                      {teacher.email}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {teachers.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" color="text.secondary">
              Belum ada data guru
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default Teachers;
