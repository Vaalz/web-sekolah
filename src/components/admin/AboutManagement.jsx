import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Grid,
  Avatar,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { getFromLocalStorage, saveToLocalStorage, STORAGE_KEYS } from '../../utils/localStorage';

const AboutManagement = () => {
  const [aboutData, setAboutData] = useState({
    vision: '',
    mission: ['', '', '', ''],
    history: '',
  });

  const [principalData, setPrincipalData] = useState({
    name: '',
    message: '',
    image: '',
  });

  useEffect(() => {
    const about = getFromLocalStorage(STORAGE_KEYS.ABOUT, {
      vision: '',
      mission: ['', '', '', ''],
      history: '',
    });
    const principal = getFromLocalStorage(STORAGE_KEYS.PRINCIPAL_MESSAGE, {
      name: '',
      message: '',
      image: '',
    });
    setAboutData(about);
    setPrincipalData(principal);
  }, []);

  const handleAboutChange = (field, value) => {
    setAboutData({ ...aboutData, [field]: value });
  };

  const handleMissionChange = (index, value) => {
    const newMission = [...aboutData.mission];
    newMission[index] = value;
    setAboutData({ ...aboutData, mission: newMission });
  };

  const handlePrincipalChange = (field, value) => {
    setPrincipalData({ ...principalData, [field]: value });
  };

  const handleSaveAbout = () => {
    saveToLocalStorage(STORAGE_KEYS.ABOUT, aboutData);
    alert('Data Tentang berhasil disimpan!');
  };

  const handleSavePrincipal = () => {
    saveToLocalStorage(STORAGE_KEYS.PRINCIPAL_MESSAGE, principalData);
    alert('Data Kepala Sekolah berhasil disimpan!');
  };

  return (
    <Box>
      {/* Principal Message Section */}
      <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom fontWeight="bold" color="primary">
          Sambutan Kepala Sekolah
        </Typography>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Nama Kepala Sekolah"
              value={principalData.name}
              onChange={(e) => handlePrincipalChange('name', e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="URL Foto"
              value={principalData.image}
              onChange={(e) => handlePrincipalChange('image', e.target.value)}
              helperText="Masukkan URL foto kepala sekolah"
            />
          </Grid>
          {principalData.image && (
            <Grid item xs={12}>
              <Avatar
                src={principalData.image}
                alt={principalData.name}
                sx={{ width: 100, height: 100 }}
              />
            </Grid>
          )}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Pesan Sambutan"
              multiline
              rows={4}
              value={principalData.message}
              onChange={(e) => handlePrincipalChange('message', e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              startIcon={<SaveIcon />}
              onClick={handleSavePrincipal}
            >
              Simpan Sambutan Kepala Sekolah
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Vision Section */}
      <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom fontWeight="bold" color="primary">
          Visi
        </Typography>
        <TextField
          fullWidth
          multiline
          rows={3}
          value={aboutData.vision}
          onChange={(e) => handleAboutChange('vision', e.target.value)}
          sx={{ mt: 2 }}
        />
      </Paper>

      {/* Mission Section */}
      <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom fontWeight="bold" color="primary">
          Misi
        </Typography>
        {aboutData.mission.map((item, index) => (
          <TextField
            key={index}
            fullWidth
            label={`Misi ${index + 1}`}
            value={item}
            onChange={(e) => handleMissionChange(index, e.target.value)}
            sx={{ mt: 2 }}
          />
        ))}
      </Paper>

      {/* History Section */}
      <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom fontWeight="bold" color="primary">
          Sejarah
        </Typography>
        <TextField
          fullWidth
          multiline
          rows={4}
          value={aboutData.history}
          onChange={(e) => handleAboutChange('history', e.target.value)}
          sx={{ mt: 2 }}
        />
      </Paper>

      <Button
        variant="contained"
        size="large"
        startIcon={<SaveIcon />}
        onClick={handleSaveAbout}
      >
        Simpan Data Tentang
      </Button>
    </Box>
  );
};

export default AboutManagement;
