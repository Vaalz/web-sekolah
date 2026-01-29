import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { getFromLocalStorage, saveToLocalStorage, STORAGE_KEYS } from '../../utils/localStorage';

const AchievementsManagement = () => {
  const [achievements, setAchievements] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingAchievement, setEditingAchievement] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    year: new Date().getFullYear(),
    description: '',
    image: '',
  });

  useEffect(() => {
    loadAchievements();
  }, []);

  const loadAchievements = () => {
    const data = getFromLocalStorage(STORAGE_KEYS.ACHIEVEMENTS);
    setAchievements(data);
  };

  const handleOpenDialog = (achievement = null) => {
    if (achievement) {
      setEditingAchievement(achievement);
      setFormData(achievement);
    } else {
      setEditingAchievement(null);
      setFormData({ title: '', year: new Date().getFullYear(), description: '', image: '' });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingAchievement(null);
    setFormData({ title: '', year: new Date().getFullYear(), description: '', image: '' });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    let updatedAchievements;
    if (editingAchievement) {
      updatedAchievements = achievements.map((a) =>
        a.id === editingAchievement.id ? { ...formData, id: a.id } : a
      );
    } else {
      const newAchievement = { ...formData, id: Date.now() };
      updatedAchievements = [...achievements, newAchievement];
    }
    saveToLocalStorage(STORAGE_KEYS.ACHIEVEMENTS, updatedAchievements);
    setAchievements(updatedAchievements);
    handleCloseDialog();
  };

  const handleDelete = (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus prestasi ini?')) {
      const updatedAchievements = achievements.filter((a) => a.id !== id);
      saveToLocalStorage(STORAGE_KEYS.ACHIEVEMENTS, updatedAchievements);
      setAchievements(updatedAchievements);
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6" fontWeight="bold" color="primary">
          Manajemen Prestasi
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Tambah Prestasi
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: 'primary.light' }}>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Judul</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Tahun</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Deskripsi</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Aksi</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {achievements.map((achievement) => (
              <TableRow key={achievement.id}>
                <TableCell>{achievement.title}</TableCell>
                <TableCell>{achievement.year}</TableCell>
                <TableCell>{achievement.description}</TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => handleOpenDialog(achievement)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleDelete(achievement.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog Form */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingAchievement ? 'Edit Prestasi' : 'Tambah Prestasi'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Judul"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Tahun"
                name="year"
                type="number"
                value={formData.year}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Deskripsi"
                name="description"
                multiline
                rows={3}
                value={formData.description}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="URL Gambar"
                name="image"
                value={formData.image}
                onChange={handleChange}
                helperText="Masukkan URL gambar prestasi"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Batal</Button>
          <Button variant="contained" onClick={handleSubmit}>
            Simpan
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AchievementsManagement;
