# Website Sekolah

Website sekolah modern dengan fitur lengkap menggunakan React, Material-UI, dan Laravel.

## 🚀 Features

### Frontend (React + Material-UI)
- ✅ **Halaman Beranda** - Landing page dengan hero section dan fitur unggulan
- ✅ **Halaman Tentang** - Visi, misi, sejarah, dan sambutan kepala sekolah
- ✅ **Halaman Guru** - Daftar tenaga pengajar
- ✅ **Halaman Prestasi** - Pencapaian siswa
- ✅ **Halaman Ekstrakurikuler** - Kegiatan ekstrakurikuler
- ✅ **Halaman Galeri** - Dokumentasi kegiatan sekolah dengan filter kategori
- ✅ **Halaman Kontak** - Form kontak dan informasi kontak
- ✅ **Dashboard Admin** - Panel admin untuk mengelola semua konten
- ✅ **Responsive Design** - Tampilan mobile-friendly
- ✅ **Material-UI Components** - Komponen modern dan elegan
- ✅ **Tema Biru & Putih** - Sesuai dengan identitas sekolah

### Backend (Laravel - Optional)
- API RESTful untuk semua entitas
- CRUD operations lengkap
- Authentication dengan Laravel Sanctum
- CORS support untuk frontend
- Database migrations dan seeders

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI Library
- **Vite** - Build tool
- **Material-UI (MUI)** - Component library
- **React Router** - Routing
- **LocalStorage** - Temporary data storage

### Backend (Optional)
- **Laravel 10+** - PHP Framework
- **MySQL/PostgreSQL** - Database
- **Laravel Sanctum** - API Authentication

## 📦 Installation

### Prerequisites
- Node.js 16+ dan npm/yarn
- PHP 8.1+ (untuk backend)
- Composer (untuk backend)
- MySQL/PostgreSQL (untuk backend)

### Frontend Setup

1. **Clone repository**
   ```bash
   cd "Web Sekolah"
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

Aplikasi akan berjalan di `http://localhost:5173` atau `http://localhost:5174`

### Backend Setup (Optional)

Lihat panduan lengkap di [LARAVEL_BACKEND_SETUP.md](./LARAVEL_BACKEND_SETUP.md)

## 📁 Project Structure

```
Web Sekolah/
├── src/
│   ├── assets/          # Images dan static files
│   ├── components/      # React components
│   │   ├── admin/       # Admin dashboard components
│   │   ├── Navbar.jsx
│   │   └── Footer.jsx
│   ├── pages/           # Page components
│   │   ├── Home.jsx
│   │   ├── About.jsx
│   │   ├── Teachers.jsx
│   │   ├── Achievements.jsx
│   │   ├── Extracurriculars.jsx
│   │   ├── Gallery.jsx
│   │   ├── Contact.jsx
│   │   └── AdminDashboard.jsx
│   ├── services/        # API services
│   │   └── api.js
│   ├── theme/           # Material-UI theme
│   │   └── theme.js
│   ├── utils/           # Utility functions
│   │   └── localStorage.js
│   ├── App.jsx          # Main app component
│   └── main.jsx         # Entry point
├── public/              # Public assets
├── LARAVEL_BACKEND_SETUP.md  # Backend setup guide
└── README.md
```

## 🎨 Theme Customization

Tema warna dapat dikustomisasi di `src/theme/theme.js`:

```javascript
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Biru
    },
    secondary: {
      main: '#ffffff', // Putih
    },
  },
});
```

## 💾 Data Storage

### LocalStorage (Default)
Aplikasi menggunakan localStorage untuk menyimpan data sementara. Data akan tersimpan di browser dan tetap ada meskipun browser ditutup.

**Data yang disimpan:**
- Guru (teachers)
- Prestasi (achievements)
- Ekstrakurikuler (extracurriculars)
- Galeri (gallery)
- Pesan kontak (contacts)
- Tentang (about)
- Sambutan kepala sekolah (principal_message)

### Switching to Laravel Backend

Untuk beralih ke Laravel backend:

1. Setup Laravel backend (lihat LARAVEL_BACKEND_SETUP.md)
2. Update API calls di komponen admin management
3. Ganti fungsi localStorage dengan API calls dari `src/services/api.js`

Contoh:
```javascript
// Before (localStorage)
const teachers = getFromLocalStorage(STORAGE_KEYS.TEACHERS);

// After (Laravel API)
import { teachersApi } from '../services/api';
const response = await teachersApi.getAll();
const teachers = response.data;
```

## 🔐 Admin Dashboard

Dashboard admin dapat diakses di `/admin`

**Fitur Admin:**
- ✅ Kelola data Tentang (Visi, Misi, Sejarah)
- ✅ Kelola sambutan Kepala Sekolah
- ✅ CRUD Guru
- ✅ CRUD Prestasi
- ✅ CRUD Ekstrakurikuler
- ✅ CRUD Galeri
- ✅ Lihat pesan kontak

## 🌐 Pages Overview

### 1. Beranda (/)
Hero section dengan informasi sekolah dan fitur unggulan

### 2. Tentang (/tentang)
- Sambutan Kepala Sekolah
- Visi & Misi
- Sejarah Sekolah

### 3. Guru (/guru)
Daftar guru dengan foto, nama, mata pelajaran, dan email

### 4. Prestasi (/prestasi)
Pencapaian siswa dengan foto, judul, tahun, dan deskripsi

### 5. Ekstrakurikuler (/ekstrakurikuler)
Kegiatan ekstrakurikuler dengan foto, nama, deskripsi, dan jadwal

### 6. Galeri (/galeri)
Dokumentasi foto dengan filter kategori

### 7. Kontak (/kontak)
- Informasi kontak sekolah
- Form kontak untuk mengirim pesan

### 8. Admin Dashboard (/admin)
Panel admin dengan tabs untuk mengelola semua konten

## 📱 Responsive Design

Website fully responsive dengan breakpoints:
- Mobile: < 600px
- Tablet: 600px - 960px
- Desktop: > 960px

## 🎯 Development Roadmap

### Phase 1: Basic Website ✅
- [x] Setup project structure
- [x] Create all pages
- [x] Implement routing
- [x] Add Material-UI theme
- [x] LocalStorage integration

### Phase 2: Admin Dashboard ✅
- [x] Admin layout
- [x] CRUD operations for all entities
- [x] Form validation

### Phase 3: Laravel Backend (Optional)
- [ ] Setup Laravel project
- [ ] Create migrations
- [ ] Create API controllers
- [ ] Setup authentication
- [ ] File upload support
- [ ] Integrate with React frontend

### Phase 4: Enhancements
- [ ] Image upload & management
- [ ] Admin authentication
- [ ] Advanced search & filter
- [ ] Export data (PDF, Excel)
- [ ] Email notifications
- [ ] Analytics dashboard

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 📞 Support

Untuk pertanyaan dan dukungan, silakan hubungi:
- Email: info@sekolah.com
- Website: https://sekolah.com

---

**Happy Coding! 🎉**

