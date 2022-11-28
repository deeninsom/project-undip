-- CreateTable
CREATE TABLE `Session` (
    `id` VARCHAR(191) NOT NULL,
    `sid` VARCHAR(191) NOT NULL,
    `data` VARCHAR(191) NOT NULL,
    `expiresAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Session_sid_key`(`sid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Mahasiswa` (
    `id_mhs` VARCHAR(191) NOT NULL,
    `nama` VARCHAR(191) NOT NULL,
    `noInduk` VARCHAR(191) NOT NULL,
    `angkatan` INTEGER NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `image` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `role` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Mahasiswa_noInduk_key`(`noInduk`),
    PRIMARY KEY (`id_mhs`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Verifikasi` (
    `id_verif` VARCHAR(191) NOT NULL,
    `verif` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_verif`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Bio_mahasiswa` (
    `id_bio` VARCHAR(191) NOT NULL,
    `no_telp` VARCHAR(191) NOT NULL,
    `provinsi` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `kota` VARCHAR(191) NOT NULL,
    `alamat` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_bio`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Irs` (
    `id_Irs` VARCHAR(191) NOT NULL,
    `semester` VARCHAR(191) NOT NULL,
    `jumlahSks` INTEGER NOT NULL,
    `berkas` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_Irs`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Pkl` (
    `id_pkl` VARCHAR(191) NOT NULL,
    `status_pkl` VARCHAR(191) NOT NULL,
    `dospem` VARCHAR(191) NOT NULL,
    `nama_instantsi` VARCHAR(191) NOT NULL,
    `berkas_pkl` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_pkl`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `nilaiPkl` (
    `id_nilai` VARCHAR(191) NOT NULL,
    `nilaiPkl` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_nilai`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Khs` (
    `id_khs` VARCHAR(191) NOT NULL,
    `semester` VARCHAR(191) NOT NULL,
    `ip_semester` VARCHAR(191) NOT NULL,
    `ip_kumulatif` VARCHAR(191) NOT NULL,
    `jumlah_sks` INTEGER NOT NULL,
    `berkas_khs` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_khs`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Skripsi` (
    `id_skripsi` VARCHAR(191) NOT NULL,
    `status_skripsi` VARCHAR(191) NOT NULL,
    `tgl_sidang` VARCHAR(191) NOT NULL,
    `dospem` VARCHAR(191) NOT NULL,
    `berkas_skripsi` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_skripsi`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Dosen` (
    `id_dsn` VARCHAR(191) NOT NULL,
    `nama` VARCHAR(191) NOT NULL,
    `noInduk` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `kode_departement` VARCHAR(191) NOT NULL,
    `role` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Dosen_noInduk_key`(`noInduk`),
    PRIMARY KEY (`id_dsn`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Admin` (
    `id_adm` VARCHAR(191) NOT NULL,
    `nama` VARCHAR(191) NOT NULL,
    `noInduk` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `kode_departement` VARCHAR(191) NOT NULL,
    `role` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Admin_noInduk_key`(`noInduk`),
    PRIMARY KEY (`id_adm`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Verifikasi` ADD CONSTRAINT `Verifikasi_id_verif_fkey` FOREIGN KEY (`id_verif`) REFERENCES `Mahasiswa`(`id_mhs`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Bio_mahasiswa` ADD CONSTRAINT `Bio_mahasiswa_id_bio_fkey` FOREIGN KEY (`id_bio`) REFERENCES `Mahasiswa`(`id_mhs`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Irs` ADD CONSTRAINT `Irs_id_Irs_fkey` FOREIGN KEY (`id_Irs`) REFERENCES `Mahasiswa`(`id_mhs`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pkl` ADD CONSTRAINT `Pkl_id_pkl_fkey` FOREIGN KEY (`id_pkl`) REFERENCES `Mahasiswa`(`id_mhs`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `nilaiPkl` ADD CONSTRAINT `nilaiPkl_id_nilai_fkey` FOREIGN KEY (`id_nilai`) REFERENCES `Pkl`(`id_pkl`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Khs` ADD CONSTRAINT `Khs_id_khs_fkey` FOREIGN KEY (`id_khs`) REFERENCES `Mahasiswa`(`id_mhs`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Skripsi` ADD CONSTRAINT `Skripsi_id_skripsi_fkey` FOREIGN KEY (`id_skripsi`) REFERENCES `Mahasiswa`(`id_mhs`) ON DELETE CASCADE ON UPDATE CASCADE;
