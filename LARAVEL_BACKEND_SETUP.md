# Laravel Backend Setup untuk Website Sekolah

## Prerequisites
- PHP 8.1 atau lebih tinggi
- Composer
- MySQL atau PostgreSQL

## Instalasi

### 1. Install Laravel
```bash
composer create-project laravel/laravel sekolah-backend
cd sekolah-backend
```

### 2. Konfigurasi Database
Edit file `.env`:
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=sekolah_db
DB_USERNAME=root
DB_PASSWORD=your_password
```

### 3. Install Laravel Sanctum untuk API Authentication
```bash
composer require laravel/sanctum
php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"
php artisan migrate
```

### 4. Buat Models dan Migrations

#### Teacher Model
```bash
php artisan make:model Teacher -m
```

Edit migration file `database/migrations/xxxx_create_teachers_table.php`:
```php
public function up()
{
    Schema::create('teachers', function (Blueprint $table) {
        $table->id();
        $table->string('name');
        $table->string('subject');
        $table->string('email')->unique();
        $table->string('image')->nullable();
        $table->timestamps();
    });
}
```

#### Achievement Model
```bash
php artisan make:model Achievement -m
```

Edit migration:
```php
public function up()
{
    Schema::create('achievements', function (Blueprint $table) {
        $table->id();
        $table->string('title');
        $table->integer('year');
        $table->text('description');
        $table->string('image')->nullable();
        $table->timestamps();
    });
}
```

#### Extracurricular Model
```bash
php artisan make:model Extracurricular -m
```

Edit migration:
```php
public function up()
{
    Schema::create('extracurriculars', function (Blueprint $table) {
        $table->id();
        $table->string('name');
        $table->text('description');
        $table->string('schedule');
        $table->string('image')->nullable();
        $table->timestamps();
    });
}
```

#### Gallery Model
```bash
php artisan make:model Gallery -m
```

Edit migration:
```php
public function up()
{
    Schema::create('galleries', function (Blueprint $table) {
        $table->id();
        $table->string('title');
        $table->string('image');
        $table->string('category');
        $table->timestamps();
    });
}
```

#### Contact Model
```bash
php artisan make:model Contact -m
```

Edit migration:
```php
public function up()
{
    Schema::create('contacts', function (Blueprint $table) {
        $table->id();
        $table->string('name');
        $table->string('email');
        $table->string('subject');
        $table->text('message');
        $table->timestamps();
    });
}
```

#### About Model
```bash
php artisan make:model About -m
```

Edit migration:
```php
public function up()
{
    Schema::create('abouts', function (Blueprint $table) {
        $table->id();
        $table->text('vision');
        $table->json('mission'); // Store as JSON array
        $table->text('history');
        $table->timestamps();
    });
}
```

#### PrincipalMessage Model
```bash
php artisan make:model PrincipalMessage -m
```

Edit migration:
```php
public function up()
{
    Schema::create('principal_messages', function (Blueprint $table) {
        $table->id();
        $table->string('name');
        $table->text('message');
        $table->string('image')->nullable();
        $table->timestamps();
    });
}
```

### 5. Jalankan Migrations
```bash
php artisan migrate
```

### 6. Buat API Controllers

#### TeacherController
```bash
php artisan make:controller Api/TeacherController --api
```

Edit `app/Http/Controllers/Api/TeacherController.php`:
```php
<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Teacher;
use Illuminate\Http\Request;

class TeacherController extends Controller
{
    public function index()
    {
        return Teacher::all();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'subject' => 'required|string|max:255',
            'email' => 'required|email|unique:teachers',
            'image' => 'nullable|string',
        ]);

        $teacher = Teacher::create($validated);
        return response()->json($teacher, 201);
    }

    public function show(Teacher $teacher)
    {
        return $teacher;
    }

    public function update(Request $request, Teacher $teacher)
    {
        $validated = $request->validate([
            'name' => 'string|max:255',
            'subject' => 'string|max:255',
            'email' => 'email|unique:teachers,email,' . $teacher->id,
            'image' => 'nullable|string',
        ]);

        $teacher->update($validated);
        return response()->json($teacher);
    }

    public function destroy(Teacher $teacher)
    {
        $teacher->delete();
        return response()->json(null, 204);
    }
}
```

Buat controller yang serupa untuk:
- AchievementController
- ExtracurricularController
- GalleryController
- ContactController
- AboutController
- PrincipalMessageController

### 7. Setup Routes API

Edit `routes/api.php`:
```php
<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\TeacherController;
use App\Http\Controllers\Api\AchievementController;
use App\Http\Controllers\Api\ExtracurricularController;
use App\Http\Controllers\Api\GalleryController;
use App\Http\Controllers\Api\ContactController;
use App\Http\Controllers\Api\AboutController;
use App\Http\Controllers\Api\PrincipalMessageController;

Route::apiResource('teachers', TeacherController::class);
Route::apiResource('achievements', AchievementController::class);
Route::apiResource('extracurriculars', ExtracurricularController::class);
Route::apiResource('galleries', GalleryController::class);
Route::apiResource('contacts', ContactController::class);
Route::apiResource('about', AboutController::class);
Route::apiResource('principal-message', PrincipalMessageController::class);
```

### 8. Enable CORS

Install Laravel CORS package:
```bash
composer require fruitcake/laravel-cors
```

Edit `config/cors.php`:
```php
return [
    'paths' => ['api/*'],
    'allowed_methods' => ['*'],
    'allowed_origins' => ['http://localhost:5173', 'http://localhost:5174'],
    'allowed_origins_patterns' => [],
    'allowed_headers' => ['*'],
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => false,
];
```

### 9. Jalankan Laravel Server
```bash
php artisan serve
```

Laravel akan berjalan di `http://localhost:8000`

## API Endpoints

### Teachers
- GET    `/api/teachers` - Get all teachers
- POST   `/api/teachers` - Create new teacher
- GET    `/api/teachers/{id}` - Get specific teacher
- PUT    `/api/teachers/{id}` - Update teacher
- DELETE `/api/teachers/{id}` - Delete teacher

### Achievements
- GET    `/api/achievements`
- POST   `/api/achievements`
- GET    `/api/achievements/{id}`
- PUT    `/api/achievements/{id}`
- DELETE `/api/achievements/{id}`

### Extracurriculars
- GET    `/api/extracurriculars`
- POST   `/api/extracurriculars`
- GET    `/api/extracurriculars/{id}`
- PUT    `/api/extracurriculars/{id}`
- DELETE `/api/extracurriculars/{id}`

### Gallery
- GET    `/api/galleries`
- POST   `/api/galleries`
- GET    `/api/galleries/{id}`
- PUT    `/api/galleries/{id}`
- DELETE `/api/galleries/{id}`

### Contacts
- GET    `/api/contacts`
- POST   `/api/contacts`
- GET    `/api/contacts/{id}`
- DELETE `/api/contacts/{id}`

### About
- GET    `/api/about`
- PUT    `/api/about/{id}`

### Principal Message
- GET    `/api/principal-message`
- PUT    `/api/principal-message/{id}`

## Integrasi dengan React Frontend

Buat service file di React (`src/services/api.js`):
```javascript
import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const teachersApi = {
  getAll: () => api.get('/teachers'),
  create: (data) => api.post('/teachers', data),
  update: (id, data) => api.put(`/teachers/${id}`, data),
  delete: (id) => api.delete(`/teachers/${id}`),
};

// Buat serupa untuk achievements, extracurriculars, galleries, contacts, about, principal-message

export default api;
```

## Seeding Data (Optional)

Buat seeder untuk data awal:
```bash
php artisan make:seeder DatabaseSeeder
```

Edit `database/seeders/DatabaseSeeder.php`:
```php
public function run()
{
    Teacher::create([
        'name' => 'Siti Nurhaliza, S.Pd',
        'subject' => 'Matematika',
        'email' => 'siti@sekolah.com',
        'image' => 'https://via.placeholder.com/200',
    ]);
    
    // Add more seed data...
}
```

Jalankan seeder:
```bash
php artisan db:seed
```

## File Upload (Optional)

Untuk upload gambar:
1. Setup storage link:
```bash
php artisan storage:link
```

2. Update controller untuk handle file upload:
```php
if ($request->hasFile('image')) {
    $path = $request->file('image')->store('public/images');
    $validated['image'] = Storage::url($path);
}
```

## Authentication (Optional)

Untuk menambahkan autentikasi admin:
```bash
php artisan make:controller Api/AuthController
```

Tambahkan login/register endpoint dan gunakan Laravel Sanctum untuk token-based authentication.
