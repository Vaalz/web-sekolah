import { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Snackbar,
  Alert,
  CardActions,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { supabase } from '../services/supabase';

const Teachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [formData, setFormData] = useState({
    name: '',
    mapel: '',
    image: '',
  });
  const [isAdmin, setIsAdmin] = useState(true); // Always show buttons for development

  useEffect(() => {
    fetchTeachers();
    // checkAdminStatus(); // Commented out for development
  }, []);

  const checkAdminStatus = () => {
    const authToken = localStorage.getItem('auth_token');
    setIsAdmin(!!authToken);
  };

  const fetchTeachers = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('guru')
      .select('*')
      .order('id', { ascending: true });

    if (error) {
      console.error('Error fetch guru:', error.message);
      setSnackbar({ open: true, message: 'Gagal memuat data guru', severity: 'error' });
    } else {
      setTeachers(data || []);
    }
    setLoading(false);
  };

  const handleOpenDialog = (teacher = null) => {
    if (teacher) {
      setEditingTeacher(teacher);
      setFormData({
        name: teacher.name,
        mapel: teacher.mapel,
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
        const { error } = await supabase
          .from('guru')
          .update({
            name: formData.name,
            mapel: formData.mapel,
            image: formData.image,
          })
          .eq('id', editingTeacher.id);

        if (error) throw error;
        setSnackbar({ open: true, message: 'Guru berhasil diperbarui!', severity: 'success' });
      } else {
        const { error } = await supabase
          .from('guru')
          .insert([{
            name: formData.name,
            mapel: formData.mapel,
            image: formData.image,
          }]);

        if (error) throw error;
        setSnackbar({ open: true, message: 'Guru berhasil ditambahkan!', severity: 'success' });
      }

      fetchTeachers();
      handleCloseDialog();
    } catch (error) {
      console.error('Error saving teacher:', error.message);
      setSnackbar({ open: true, message: 'Gagal menyimpan: ' + error.message, severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Apakah Anda yakin ingin menghapus guru "${name}"?`)) {
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase
        .from('guru')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setSnackbar({ open: true, message: 'Guru berhasil dihapus!', severity: 'success' });
      fetchTeachers();
    } catch (error) {
      console.error('Error deleting teacher:', error.message);
      setSnackbar({ open: true, message: 'Gagal menghapus: ' + error.message, severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ mt: 8 }}>
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
          <Typography variant="h3" fontWeight="bold">
            Tenaga Pengajar
          </Typography>
          <Typography variant="h6">
            Guru-guru berpengalaman dan berdedikasi tinggi
          </Typography>
          {isAdmin && (
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => handleOpenDialog()}
              sx={{
                mt: 3,
                bgcolor: 'white',
                color: 'primary.main',
                '&:hover': {
                  bgcolor: 'grey.100',
                },
              }}
            >
              Tambah Guru
            </Button>
          )}
        </Container>
      </Box>

      {/* Content */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        {loading && (
          <Typography align="center">Memuat data...</Typography>
        )}

        <Grid container spacing={4}>
          {teachers.map((teacher) => (
            <Grid item xs={12} sm={6} md={4} key={teacher.id}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: '0.3s',
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
                    py: 4,
                  }}
                >
                  <Avatar
                    src={teacher.image}
                    alt={teacher.name}
                    sx={{ width: 150, height: 150 }}
                  />
                </Box>

                <CardContent sx={{ textAlign: 'center', flexGrow: 1 }}>
                  <Typography variant="h6" fontWeight="bold">
                    {teacher.name}
                  </Typography>
                  <Typography color="primary" fontWeight="medium">
                    {teacher.mapel}
                  </Typography>
                </CardContent>

                {isAdmin && (
                  <CardActions sx={{ justifyContent: 'center', pb: 2 }}>
                    <IconButton
                      color="primary"
                      onClick={() => handleOpenDialog(teacher)}
                      disabled={loading}
                      size="small"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(teacher.id, teacher.name)}
                      disabled={loading}
                      size="small"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </CardActions>
                )}
              </Card>
            </Grid>
          ))}
        </Grid>

        {!loading && teachers.length === 0 && (
          <Typography align="center" sx={{ mt: 6 }}>
            Belum ada data guru
          </Typography>
        )}
      </Container>

      {/* Dialog Form */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingTeacher ? 'Edit Guru' : 'Tambah Guru Baru'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <TextField
              fullWidth
              label="Nama Lengkap"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              autoFocus
            />
            <TextField
              fullWidth
              label="Mata Pelajaran"
              name="mapel"
              value={formData.mapel}
              onChange={handleChange}
              required
            />
            
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
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} disabled={loading || uploading}>
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

      {/* Snackbar Notification */}
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

export default Teachers;
