<?php

use App\Http\Controllers\Admin\DashboardController as AdminDashboardController;
use App\Http\Controllers\Admin\MessageController as AdminMessageController;
use App\Http\Controllers\Admin\TeacherController as AdminTeacherController;
use App\Http\Controllers\Admin\NewsController as AdminNewsController;
use App\Http\Controllers\Admin\AchievementController as AdminAchievementController;
use App\Http\Controllers\Admin\GalleryController as AdminGalleryController;
use App\Http\Controllers\Admin\FacilityController as AdminFacilityController;
use App\Http\Controllers\Admin\ProfileController as AdminProfileController;
use App\Http\Controllers\Admin\AdminController as AdminAdminController;
use App\Http\Controllers\Public\HomeController;
use App\Http\Controllers\Public\NewsController as PublicNewsController;
use App\Http\Controllers\Public\TeacherController as PublicTeacherController;
use App\Http\Controllers\Public\AchievementController as PublicAchievementController;
use App\Http\Controllers\Public\GalleryController as PublicGalleryController;
use App\Http\Controllers\Public\FacilityController as PublicFacilityController;
use App\Http\Controllers\Public\ContactController;
use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/

Route::name('public.')->group(function () {
    Route::get('/', [HomeController::class, 'index'])->name('home');
    
    // School profile & teachers
    Route::get('/profil', [HomeController::class, 'profile'])->name('profile');
    Route::get('/guru', [PublicTeacherController::class, 'index'])->name('teachers');
    Route::get('/guru/{id}', [PublicTeacherController::class, 'show'])->name('teachers.show');
    
    // News
    Route::get('/berita', [PublicNewsController::class, 'index'])->name('news');
    Route::get('/berita/{slug}', [PublicNewsController::class, 'show'])->name('news.show');
    
    // Achievements
    Route::get('/prestasi', [PublicAchievementController::class, 'index'])->name('achievements');
    Route::get('/prestasi/{id}', [PublicAchievementController::class, 'show'])->name('achievements.show');
    
    // Gallery
    Route::get('/galeri', [PublicGalleryController::class, 'index'])->name('gallery');
    
    // Facilities
    Route::get('/fasilitas/{slug}', [PublicFacilityController::class, 'show'])->name('facilities.show');
    
    // Academic pages
    Route::get('/akademik', [HomeController::class, 'academic'])->name('academic');
    Route::get('/siswa', [HomeController::class, 'students'])->name('students');
    Route::get('/ruang-kelas', [HomeController::class, 'classrooms'])->name('classrooms');
    
    // PPDB (static)
    Route::get('/ppdb', [HomeController::class, 'ppdb'])->name('ppdb');
    
    // Contact
    Route::get('/kontak', [ContactController::class, 'index'])->name('contact');
    Route::post('/kontak', [ContactController::class, 'store'])->name('contact.store');
});

/*
|--------------------------------------------------------------------------
| Admin Routes (Protected)
|--------------------------------------------------------------------------
*/

Route::middleware(['auth', 'verified'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/dashboard', [AdminDashboardController::class, 'index'])->name('dashboard');
    
    // Messages
    Route::get('/pesan', [AdminMessageController::class, 'index'])->name('messages.index');
    Route::get('/pesan/{id}', [AdminMessageController::class, 'show'])->name('messages.show');
    Route::put('/pesan/{id}/read', [AdminMessageController::class, 'markAsRead'])->name('messages.mark-read');
    
    // Teachers
    Route::get('/guru', [AdminTeacherController::class, 'index'])->name('teachers.index');
    Route::post('/guru', [AdminTeacherController::class, 'store'])->name('teachers.store');
    Route::put('/guru/{teacher}', [AdminTeacherController::class, 'update'])->name('teachers.update');
    Route::delete('/guru/{teacher}', [AdminTeacherController::class, 'destroy'])->name('teachers.destroy');
    
    // News
    Route::get('/berita', [AdminNewsController::class, 'index'])->name('news.index');
    Route::post('/berita', [AdminNewsController::class, 'store'])->name('news.store');
    Route::put('/berita/{news}', [AdminNewsController::class, 'update'])->name('news.update');
    Route::delete('/berita/{news}', [AdminNewsController::class, 'destroy'])->name('news.destroy');
    
    // Achievements
    Route::get('/prestasi', [AdminAchievementController::class, 'index'])->name('achievements.index');
    Route::post('/prestasi', [AdminAchievementController::class, 'store'])->name('achievements.store');
    Route::put('/prestasi/{achievement}', [AdminAchievementController::class, 'update'])->name('achievements.update');
    Route::delete('/prestasi/{achievement}', [AdminAchievementController::class, 'destroy'])->name('achievements.destroy');
    
    // Galleries
    Route::get('/galeri', [AdminGalleryController::class, 'index'])->name('galleries.index');
    Route::post('/galeri', [AdminGalleryController::class, 'store'])->name('galleries.store');
    Route::put('/galeri/{gallery}', [AdminGalleryController::class, 'update'])->name('galleries.update');
    Route::delete('/galeri/{gallery}', [AdminGalleryController::class, 'destroy'])->name('galleries.destroy');
    
    // Facilities
    Route::get('/fasilitas', [AdminFacilityController::class, 'index'])->name('facilities.index');
    Route::post('/fasilitas', [AdminFacilityController::class, 'store'])->name('facilities.store');
    Route::put('/fasilitas/{facility}', [AdminFacilityController::class, 'update'])->name('facilities.update');
    Route::delete('/fasilitas/{facility}', [AdminFacilityController::class, 'destroy'])->name('facilities.destroy');

    // Room Facilities (nested under facilities)
    Route::post('/fasilitas/ruangan', [AdminFacilityController::class, 'storeRoom'])->name('facilities.room.store');
    Route::put('/fasilitas/ruangan/{roomFacility}', [AdminFacilityController::class, 'updateRoom'])->name('facilities.room.update');
    Route::delete('/fasilitas/ruangan/{roomFacility}', [AdminFacilityController::class, 'destroyRoom'])->name('facilities.room.destroy');
    
    // School Profile
    Route::get('/profil', [AdminProfileController::class, 'edit'])->name('profile.edit');
    Route::put('/profil', [AdminProfileController::class, 'update'])->name('profile.update');
    Route::put('/profil/vision-mission', [AdminProfileController::class, 'updateVisionMission'])->name('profile.vision-mission.update');

    // School Timeline
    Route::get('/timeline', [\App\Http\Controllers\Admin\TimelineController::class, 'index'])->name('timelines.index');
    Route::post('/timeline', [\App\Http\Controllers\Admin\TimelineController::class, 'store'])->name('timelines.store');
    Route::put('/timeline/{timeline}', [\App\Http\Controllers\Admin\TimelineController::class, 'update'])->name('timelines.update');
    Route::delete('/timeline/{timeline}', [\App\Http\Controllers\Admin\TimelineController::class, 'destroy'])->name('timelines.destroy');

    // Admin Management
    Route::get('/admins', [AdminAdminController::class, 'index'])->name('admins.index');
    Route::post('/admins', [AdminAdminController::class, 'store'])->name('admins.store');
    Route::delete('/admins/{admin}', [AdminAdminController::class, 'destroy'])->name('admins.destroy');

    // Email Notification
    Route::post('/admins/email', [\App\Http\Controllers\Admin\EmailController::class, 'send'])->name('admins.email');

    // Akademik Management
    Route::get('/akademik/contents', [\App\Http\Controllers\Admin\AcademicContentController::class, 'index'])->name('academic-contents.index');
    Route::post('/akademik/contents', [\App\Http\Controllers\Admin\AcademicContentController::class, 'store'])->name('academic-contents.store');
    Route::put('/akademik/contents/{content}', [\App\Http\Controllers\Admin\AcademicContentController::class, 'update'])->name('academic-contents.update');
    Route::delete('/akademik/contents/{content}', [\App\Http\Controllers\Admin\AcademicContentController::class, 'destroy'])->name('academic-contents.destroy');

    Route::get('/akademik/programs', [\App\Http\Controllers\Admin\ProgramController::class, 'index'])->name('programs.index');
    Route::post('/akademik/programs', [\App\Http\Controllers\Admin\ProgramController::class, 'store'])->name('programs.store');
    Route::put('/akademik/programs/{program}', [\App\Http\Controllers\Admin\ProgramController::class, 'update'])->name('programs.update');
    Route::delete('/akademik/programs/{program}', [\App\Http\Controllers\Admin\ProgramController::class, 'destroy'])->name('programs.destroy');

    Route::get('/akademik/extracurriculars', [\App\Http\Controllers\Admin\ExtracurricularController::class, 'index'])->name('extracurriculars.index');
    Route::post('/akademik/extracurriculars', [\App\Http\Controllers\Admin\ExtracurricularController::class, 'store'])->name('extracurriculars.store');
    Route::put('/akademik/extracurriculars/{extracurricular}', [\App\Http\Controllers\Admin\ExtracurricularController::class, 'update'])->name('extracurriculars.update');
    Route::delete('/akademik/extracurriculars/{extracurricular}', [\App\Http\Controllers\Admin\ExtracurricularController::class, 'destroy'])->name('extracurriculars.destroy');
});

/*
|--------------------------------------------------------------------------
| Fortify & Settings Routes
|--------------------------------------------------------------------------
*/

Route::inertia('welcome', 'welcome', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('welcome');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

require __DIR__.'/settings.php';
