// Utility functions untuk localStorage

export const getFromLocalStorage = (key, defaultValue = []) => {
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error reading ${key} from localStorage:`, error);
    return defaultValue;
  }
};

export const saveToLocalStorage = (key, value) => {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(`Error saving ${key} to localStorage:`, error);
    return false;
  }
};

export const removeFromLocalStorage = (key) => {
  try {
    window.localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`Error removing ${key} from localStorage:`, error);
    return false;
  }
};

// Keys untuk localStorage
export const STORAGE_KEYS = {
  TEACHERS: 'school_teachers',
  ACHIEVEMENTS: 'school_achievements',
  EXTRACURRICULARS: 'school_extracurriculars',
  GALLERY: 'school_gallery',
  CONTACTS: 'school_contacts',
  ABOUT: 'school_about',
  PRINCIPAL_MESSAGE: 'school_principal_message',
};

// Initialize default data jika belum ada
export const initializeDefaultData = () => {
  // Principal Message
  if (!getFromLocalStorage(STORAGE_KEYS.PRINCIPAL_MESSAGE, null)) {
    saveToLocalStorage(STORAGE_KEYS.PRINCIPAL_MESSAGE, {
      name: 'Dr. Ahmad Santoso, M.Pd',
      message: 'Assalamualaikum Wr. Wb. Selamat datang di website resmi Sekolah kami. Kami berkomitmen untuk memberikan pendidikan terbaik bagi generasi penerus bangsa.',
      image: 'https://via.placeholder.com/300x400',
    });
  }

  // About
  if (!getFromLocalStorage(STORAGE_KEYS.ABOUT, null)) {
    saveToLocalStorage(STORAGE_KEYS.ABOUT, {
      vision: 'Menjadi lembaga pendidikan terdepan yang menghasilkan generasi unggul, berakhlak mulia, dan berwawasan global.',
      mission: [
        'Menyelenggarakan pendidikan berkualitas dengan kurikulum yang inovatif',
        'Membentuk karakter peserta didik yang berakhlak mulia',
        'Mengembangkan potensi akademik dan non-akademik siswa',
        'Menciptakan lingkungan belajar yang kondusif dan menyenangkan',
      ],
      history: 'Sekolah didirikan pada tahun 2000 dengan visi memberikan pendidikan berkualitas. Selama lebih dari 20 tahun, kami telah menghasilkan ribuan alumni yang sukses di berbagai bidang.',
    });
  }

  // Teachers
  if (getFromLocalStorage(STORAGE_KEYS.TEACHERS).length === 0) {
    saveToLocalStorage(STORAGE_KEYS.TEACHERS, [
      {
        id: 1,
        name: 'Siti Nurhaliza, S.Pd',
        subject: 'Matematika',
        image: 'https://via.placeholder.com/200',
        email: 'siti@sekolah.com',
      },
      {
        id: 2,
        name: 'Budi Santoso, S.Pd',
        subject: 'Bahasa Indonesia',
        image: 'https://via.placeholder.com/200',
        email: 'budi@sekolah.com',
      },
      {
        id: 3,
        name: 'Rina Wati, S.Pd',
        subject: 'Bahasa Inggris',
        image: 'https://via.placeholder.com/200',
        email: 'rina@sekolah.com',
      },
    ]);
  }

  // Achievements
  if (getFromLocalStorage(STORAGE_KEYS.ACHIEVEMENTS).length === 0) {
    saveToLocalStorage(STORAGE_KEYS.ACHIEVEMENTS, [
      {
        id: 1,
        title: 'Juara 1 Olimpiade Matematika Nasional',
        year: 2025,
        description: 'Prestasi gemilang di bidang matematika tingkat nasional',
        image: 'https://via.placeholder.com/300x200',
      },
      {
        id: 2,
        title: 'Juara 2 Lomba Karya Ilmiah Remaja',
        year: 2025,
        description: 'Inovasi dalam bidang sains dan teknologi',
        image: 'https://via.placeholder.com/300x200',
      },
    ]);
  }

  // Extracurriculars
  if (getFromLocalStorage(STORAGE_KEYS.EXTRACURRICULARS).length === 0) {
    saveToLocalStorage(STORAGE_KEYS.EXTRACURRICULARS, [
      {
        id: 1,
        name: 'Pramuka',
        description: 'Kegiatan kepramukaan untuk membentuk karakter dan jiwa kepemimpinan',
        image: 'https://via.placeholder.com/300x200',
        schedule: 'Setiap Jumat, 15:00 - 17:00',
      },
      {
        id: 2,
        name: 'Basket',
        description: 'Olahraga basket untuk melatih kerjasama tim dan kebugaran',
        image: 'https://via.placeholder.com/300x200',
        schedule: 'Setiap Rabu, 15:00 - 17:00',
      },
      {
        id: 3,
        name: 'Seni Tari',
        description: 'Seni tari tradisional dan modern',
        image: 'https://via.placeholder.com/300x200',
        schedule: 'Setiap Selasa, 15:00 - 17:00',
      },
    ]);
  }

  // Gallery
  if (getFromLocalStorage(STORAGE_KEYS.GALLERY).length === 0) {
    saveToLocalStorage(STORAGE_KEYS.GALLERY, [
      {
        id: 1,
        title: 'Kegiatan Belajar Mengajar',
        image: 'https://via.placeholder.com/400x300',
        category: 'Akademik',
      },
      {
        id: 2,
        title: 'Lomba Olahraga',
        image: 'https://via.placeholder.com/400x300',
        category: 'Olahraga',
      },
      {
        id: 3,
        title: 'Pentas Seni',
        image: 'https://via.placeholder.com/400x300',
        category: 'Seni',
      },
    ]);
  }
};
