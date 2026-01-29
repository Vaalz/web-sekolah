import { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Chip,
  Tabs,
  Tab,
} from '@mui/material';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import { getFromLocalStorage, STORAGE_KEYS } from '../utils/localStorage';

const Gallery = () => {
  const [gallery, setGallery] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [categories, setCategories] = useState(['Semua']);

  useEffect(() => {
    const data = getFromLocalStorage(STORAGE_KEYS.GALLERY);
    setGallery(data);

    // Extract unique categories
    const uniqueCategories = ['Semua', ...new Set(data.map((item) => item.category))];
    setCategories(uniqueCategories);
  }, []);

  const handleCategoryChange = (event, newValue) => {
    setSelectedCategory(newValue);
  };

  const filteredGallery =
    selectedCategory === 'Semua'
      ? gallery
      : gallery.filter((item) => item.category === selectedCategory);

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
          <PhotoLibraryIcon sx={{ fontSize: 60, mb: 2 }} />
          <Typography variant="h3" component="h1" gutterBottom fontWeight="bold">
            Galeri
          </Typography>
          <Typography variant="h6">
            Dokumentasi kegiatan dan momen berharga di sekolah
          </Typography>
        </Container>
      </Box>

      {/* Gallery Grid */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        {/* Category Filter */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
          <Tabs
            value={selectedCategory}
            onChange={handleCategoryChange}
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
            {categories.map((category) => (
              <Tab key={category} label={category} value={category} />
            ))}
          </Tabs>
        </Box>

        <Grid container spacing={3}>
          {filteredGallery.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <Card
                sx={{
                  height: '100%',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="250"
                  image={item.image}
                  alt={item.title}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent>
                  <Typography variant="h6" component="h3" gutterBottom fontWeight="bold">
                    {item.title}
                  </Typography>
                  <Chip label={item.category} color="primary" size="small" />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {filteredGallery.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" color="text.secondary">
              Belum ada data galeri
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default Gallery;
