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
  Avatar,
  CircularProgress,
  Alert,
  Snackbar,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { supabase } from '../../services/supabase';

const TeachersManagement = () => {
  const [teachers, setTeachers] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    mapel: '',
    image: '',
  });

  useEffect(() => {
    loadTeachers();
  }, []);

  const loadTeachers = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('guru')
        .select('*')
        .order('id', { ascending: true });

      if (error) throw error;
      setTeachers(data || []);
    } catch (error) {
      console.error('Error loading teachers:', error.message);
      setSnackbar({ open: true, message: 'Gagal memuat data guru', severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (teacher = null) => {
    if (teacher) {
      setEditingTeacher(teacher);
      setFormData({
        name: teacher.name || '',
        mapel: teacher.mapel || '',
        image: teacher.image || '',
      });
      setImagePreview(teacher.image || null);
    } else {
      setEditingTeacher(null);
      setFormData({ name: '', mapel: '', image: '' });
      setImagePreview(null);
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingTeacher(null);
    setFormData({ name: '', mapel: '', image: '' });
    setImagePreview(null);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setSnackbar({ open: true, message: 'File harus berupa gambar', severity: 'error' });
      return;
    }

    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      setSnackbar({ open: true, message: 'Ukuran file maksimal 2MB', severity: 'error' });
      return;
    }

    // Show preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);

    // Upload to Supabase Storage
    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;
      const filePath = `teachers/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('GURU')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('GURU')
        .getPublicUrl(filePath);

      setFormData({ ...formData, image: publicUrl });
      setSnackbar({ open: true, message: 'Gambar berhasil diupload', severity: 'success' });
    } catch (error) {
      console.error('Error uploading image:', error);
      setSnackbar({ open: true, message: 'Gagal upload gambar: ' + error.message, severity: 'error' });
      setImagePreview(null);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.mapel) {
      setSnackbar({ open: true, message: 'Harap isi semua field yang wajib', severity: 'warning' });
      return;
    }

    setLoading(true);
    try {
      if (editingTeacher) {
        // Update existing teacher
        const { error } = await supabase
          .from('guru')
          .update({
            name: formData.name,
            mapel: formData.mapel,
            image: formData.image,
          })
          .eq('id', editingTeacher.id);

        if (error) throw error;
        setSnackbar({ open: true, message: 'Guru berhasil diperbarui', severity: 'success' });
      } else {
        // Insert new teacher
        const { error } = await supabase
          .from('guru')
          .insert([{
            name: formData.name,
            mapel: formData.mapel,
            image: formData.image,
          }]);

        if (error) throw error;
        setSnackbar({ open: true, message: 'Guru berhasil ditambahkan', severity: 'success' });
      }

      loadTeachers();
      handleCloseDialog();
    } catch (error) {
      console.error('Error saving teacher:', error.message);
      setSnackbar({ open: true, message: 'Gagal menyimpan data guru: ' + error.message, severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus guru ini?')) {
      setLoading(true);
      try {
        const { error } = await supabase
          .from('guru')
          .delete()
          .eq('id', id);

        if (error) throw error;
        setSnackbar({ open: true, message: 'Guru berhasil dihapus', severity: 'success' });
        loadTeachers();
      } catch (error) {
        console.error('Error deleting teacher:', error.message);
        setSnackbar({ open: true, message: 'Gagal menghapus guru: ' + error.message, severity: 'error' });
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6" fontWeight="bold" color="primary">
          Manajemen Guru
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Tambah Guru
        </Button>
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: 'primary.light' }}>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Foto</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Nama</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Mata Pelajaran</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Aksi</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {teachers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    Belum ada data guru
                  </TableCell>
                </TableRow>
              ) : (
                teachers.map((teacher) => (
                  <TableRow key={teacher.id}>
                    <TableCell>
                      <Avatar src={teacher.image} alt={teacher.name} />
                    </TableCell>
                    <TableCell>{teacher.name}</TableCell>
                    <TableCell>{teacher.mapel}</TableCell>
                    <TableCell>
                      <IconButton
                        color="primary"
                        onClick={() => handleOpenDialog(teacher)}
                        disabled={loading}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => handleDelete(teacher.id)}
                        disabled={loading}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Dialog Form */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingTeacher ? 'Edit Guru' : 'Tambah Guru'}
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
                label="Mata Pelajaran"
                name="mapel"
                value={formData.mapel}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Button
                  variant="outlined"
                  component="label"
                  disabled={uploading}
                  fullWidth
                >
                  {uploading ? 'Mengupload...' : 'Pilih Gambar dari Komputer'}
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </Button>
                
                {imagePreview && (
                  <Box sx={{ textAlign: 'center' }}>
                    <Avatar
                      src={imagePreview}
                      alt="Preview"
                      sx={{ width: 120, height: 120, mx: 'auto', mb: 1 }}
                    />
                    <Typography variant="caption" color="text.secondary">
                      Preview Foto
                    </Typography>
                  </Box>
                )}

                <Typography variant="body2" color="text.secondary" align="center">
                  atau
                </Typography>

                <TextField
                  fullWidth
                  label="URL Foto"
                  name="image"
                  value={formData.image}
                  onChange={(e) => {
                    handleChange(e);
                    setImagePreview(e.target.value);
                  }}
                  helperText="Masukkan URL foto guru (alternatif)"
                  size="small"
                />
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} disabled={uploading || loading}>
            Batal
          </Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={loading || uploading}
          >
            {loading ? 'Menyimpan...' : 'Simpan'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default TeachersManagement;
