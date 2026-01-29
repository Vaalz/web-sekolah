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

const ExtracurricularsManagement = () => {
  const [extracurriculars, setExtracurriculars] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingExtra, setEditingExtra] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    schedule: '',
    image: '',
  });

  useEffect(() => {
    loadExtracurriculars();
  }, []);

  const loadExtracurriculars = () => {
    const data = getFromLocalStorage(STORAGE_KEYS.EXTRACURRICULARS);
    setExtracurriculars(data);
  };

  const handleOpenDialog = (extra = null) => {
    if (extra) {
      setEditingExtra(extra);
      setFormData(extra);
    } else {
      setEditingExtra(null);
      setFormData({ name: '', description: '', schedule: '', image: '' });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingExtra(null);
    setFormData({ name: '', description: '', schedule: '', image: '' });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    let updatedExtracurriculars;
    if (editingExtra) {
      updatedExtracurriculars = extracurriculars.map((e) =>
        e.id === editingExtra.id ? { ...formData, id: e.id } : e
      );
    } else {
      const newExtra = { ...formData, id: Date.now() };
      updatedExtracurriculars = [...extracurriculars, newExtra];
    }
    saveToLocalStorage(STORAGE_KEYS.EXTRACURRICULARS, updatedExtracurriculars);
    setExtracurriculars(updatedExtracurriculars);
    handleCloseDialog();
  };

  const handleDelete = (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus ekstrakurikuler ini?')) {
      const updatedExtracurriculars = extracurriculars.filter((e) => e.id !== id);
      saveToLocalStorage(STORAGE_KEYS.EXTRACURRICULARS, updatedExtracurriculars);
      setExtracurriculars(updatedExtracurriculars);
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6" fontWeight="bold" color="primary">
          Manajemen Ekstrakurikuler
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Tambah Ekstrakurikuler
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: 'primary.light' }}>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Nama</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Deskripsi</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Jadwal</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Aksi</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {extracurriculars.map((extra) => (
              <TableRow key={extra.id}>
                <TableCell>{extra.name}</TableCell>
                <TableCell>{extra.description}</TableCell>
                <TableCell>{extra.schedule}</TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => handleOpenDialog(extra)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleDelete(extra.id)}
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
          {editingExtra ? 'Edit Ekstrakurikuler' : 'Tambah Ekstrakurikuler'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Nama"
                name="name"
                value={formData.name}
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
                label="Jadwal"
                name="schedule"
                value={formData.schedule}
                onChange={handleChange}
                placeholder="Contoh: Setiap Jumat, 15:00 - 17:00"
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
                helperText="Masukkan URL gambar ekstrakurikuler"
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

export default ExtracurricularsManagement;
