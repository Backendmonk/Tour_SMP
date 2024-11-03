-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 03 Nov 2024 pada 06.58
-- Versi server: 10.4.32-MariaDB
-- Versi PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tour_sekolah`
--
CREATE DATABASE IF NOT EXISTS `tour_sekolah` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `tour_sekolah`;

-- --------------------------------------------------------

--
-- Struktur dari tabel `db_hasil_soal`
--

DROP TABLE IF EXISTS `db_hasil_soal`;
CREATE TABLE `db_hasil_soal` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `id_user` bigint(20) NOT NULL,
  `email` varchar(255) NOT NULL,
  `nama_user` varchar(255) NOT NULL,
  `score` varchar(255) NOT NULL,
  `tgl_main` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `db_hasil_soal`
--

INSERT INTO `db_hasil_soal` (`id`, `id_user`, `email`, `nama_user`, `score`, `tgl_main`) VALUES
(1, 3, 'arya@email.com', 'Arya', '50', '2024-10-31 10:39:55'),
(2, 3, 'arya@email.com', 'Arya', '30', '2024-10-31 10:40:52');

-- --------------------------------------------------------

--
-- Struktur dari tabel `db_soal`
--

DROP TABLE IF EXISTS `db_soal`;
CREATE TABLE `db_soal` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `soal` varchar(255) NOT NULL,
  `jenis_soal` enum('listening','reading') NOT NULL DEFAULT 'reading',
  `file` varchar(255) DEFAULT NULL,
  `Jawaban_A` varchar(255) NOT NULL,
  `Jawaban_B` varchar(255) NOT NULL,
  `Jawaban_C` varchar(255) NOT NULL,
  `Jawaban_D` varchar(255) NOT NULL,
  `JawabanBenar` varchar(255) NOT NULL,
  `path` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `db_soal`
--

INSERT INTO `db_soal` (`id`, `soal`, `jenis_soal`, `file`, `Jawaban_A`, `Jawaban_B`, `Jawaban_C`, `Jawaban_D`, `JawabanBenar`, `path`) VALUES
(1, 'Berapa menit siswa harus berada di sekolah..?', 'listening', '1730368469_Pertanyaan no 1.mp3', '20 menit', '15 menit', '5 menit', '25 menit', 'b', 'uploads/audio/1730368469_Pertanyaan no 1.mp3'),
(2, 'kamu perlu memeriksa ...... sebelum berangkat ke sekolah', 'listening', '1730369000_Pertanyaan no 2.mp3', 'Jadwal permainan pada hari tersebut', 'Jadwal pemaparan pada hari tersebut', 'Jadwal pelajaran pada hari tersebut', 'Jadwal Pengingat pada hari tersebut', 'c', 'uploads/audio/1730369000_Pertanyaan no 2.mp3'),
(3, 'Bawaan yang perlu diperhatikan dan diperiksa saat akan berangkat ke sekolah adalah ?', 'listening', '1730369332_Pertanyaan no 3.mp3', 'Alat tulis, buku cacatan, dan buku pelajaran', 'Alat guris, buku catatan, dan buku pelajaran', 'Alat tulis, buku catat, dan buku pelajaran', 'Alat tulis, buku catatan, dan buku binder', 'a', 'uploads/audio/1730369332_Pertanyaan no 3.mp3'),
(4, 'Apa yang dilakukan setelah pulang sekolah agar bisa menyiapkan diri di hari esok?', 'listening', '1730369403_Pertanyaan no 4.mp3', 'Tidur', 'Mandi', 'Simpan seragam dan perlengkapan sekolah dengan baik dan rapi', 'Tidur dan mandi dengan baik dan rapi', 'c', 'uploads/audio/1730369403_Pertanyaan no 4.mp3'),
(5, 'Apa yang harus kalian lakukan di rumah agar proses pembelajaran bisa dilakukan dengan baik di sekolah ?', 'listening', '1730369878_Pertanyaan no 5.mp3', 'Sediakan waktu untuk mempersiapkan alat-alat', 'Sediakan waktu untuk belajar dan tidur', 'Sediakan waktu untuk belajar dan mengerjakan pr atau tugas', 'Sediakan waktu untuk mengerjakan pr dan mempersiapkan alat-alat', 'c', 'uploads/audio/1730369878_Pertanyaan no 5.mp3'),
(6, 'Petunjuk apa yang harus di ikuti dari guru ?', 'listening', '1730370007_Pertanyaan no 5.mp3', 'Tentang cara dan waktu makan', 'Tentang cara dan waktu mengumpul tugas pr', 'Tentang cara dan waktu belajar', 'Tentang cara dan waktu mengumpul Karya', 'b', 'uploads/audio/1730370007_Pertanyaan no 5.mp3'),
(7, 'pada hari apa dan kegiatan apa yang dilakukan yang mana siswa harus menggukanan pakaian yang sesuai', 'listening', '1730370200_Pertanyaan no 7.mp3', 'Senin kegiatan upacara bendera', 'Senin kegiatan sembahyang', 'Senin kegiatan upacara agama', 'Senin kegiatan upacara yadnya', 'a', 'uploads/audio/1730370200_Pertanyaan no 7.mp3'),
(8, 'Apa ayng harus kalian pastikan saat mengikuti kegiatan ekstra ?', 'listening', '1730370303_Pertanyaan no 8.mp3', 'Pastikan siap', 'Pastikan Ekstra jelas', 'Pastikan sudah terdaftar dan siap mengikuti kegiatan ekstrakulikuler', 'Pastikan sudah mengikuti', 'a', 'uploads/audio/1730370303_Pertanyaan no 8.mp3'),
(9, 'Apa yang harus kalian periksa untuk mengetahui perubahan jadwal dan kegiatan kegiatan sekolah ?', 'listening', '1730370386_Pertanyaan no 9.mp3', 'Memeriksa Catatan', 'Memeriksa ringkasan sekolah', 'Memeriksa papan pengumuman dan sistus WEB', 'Memeriksa aturan sekolah', 'c', 'uploads/audio/1730370386_Pertanyaan no 9.mp3'),
(10, 'Apa yang harus disiapkan saat kerja kelompok ?', 'listening', '1730370490_Pertanyaan no 10.mp3', 'Dokumen dan Handphone untuk menentukan pekerjaan', 'Dokumen dan Materi yang sudah ditentukan sebelumnya', 'Dokumen dan Materi yang belum ditentukan', 'Dokumen dan materai', 'b', 'uploads/audio/1730370490_Pertanyaan no 10.mp3');

-- --------------------------------------------------------

--
-- Struktur dari tabel `failed_jobs`
--

DROP TABLE IF EXISTS `failed_jobs`;
CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `migrations`
--

DROP TABLE IF EXISTS `migrations`;
CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_resets_table', 1),
(3, '2019_08_19_000000_create_failed_jobs_table', 1),
(4, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(5, '2024_09_03_003145_hasil_soal', 2),
(6, '2024_09_03_004012_soal', 2),
(7, '2024_09_20_045317_add_field_to_table_name', 3),
(8, '2024_10_06_094342_add_path_to_db_soal', 4),
(9, '2024_10_09_014127_changefield_in__hasil_soal', 4);

-- --------------------------------------------------------

--
-- Struktur dari tabel `password_resets`
--

DROP TABLE IF EXISTS `password_resets`;
CREATE TABLE `password_resets` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `personal_access_tokens`
--

DROP TABLE IF EXISTS `personal_access_tokens`;
CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `role` enum('Admin','Umum') NOT NULL DEFAULT 'Admin',
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `role`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Admin', 'Admin@email.com', NULL, 'Admin', '$2y$10$FRpF2yYRdCIfdKLYgOJeEOSQisT/aOdZN2ckOwQvaI2./EpobEc6G', NULL, '2024-10-31 01:10:27', '2024-10-31 01:10:27'),
(2, 'User', 'user@email.com', NULL, 'Umum', '$2y$10$V0PM7wan7piJrqSJijmV9OwYt91r7Ih5aO42hMubawZkaJIXnppNC', NULL, '2024-10-31 01:55:35', '2024-10-31 01:55:35'),
(3, 'Arya', 'arya@email.com', NULL, 'Umum', '$2y$10$B.LjTg2ft7XnMbmJZ7GAvOV.mpk/yQ6vJtUBx8H58jdPjjeSv3EOy', NULL, '2024-10-31 02:37:44', '2024-10-31 02:37:44');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `db_hasil_soal`
--
ALTER TABLE `db_hasil_soal`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `db_soal`
--
ALTER TABLE `db_soal`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indeks untuk tabel `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `password_resets`
--
ALTER TABLE `password_resets`
  ADD KEY `password_resets_email_index` (`email`);

--
-- Indeks untuk tabel `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `db_hasil_soal`
--
ALTER TABLE `db_hasil_soal`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT untuk tabel `db_soal`
--
ALTER TABLE `db_soal`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT untuk tabel `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT untuk tabel `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
