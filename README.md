# 🌟 Permainan Revan Utomo – Dunia Bermain Anak

> *"Bersama Revan ayo, Bermain Ceria, Tumbuh Cerdas!"*

Platform permainan edukatif interaktif anak usia dini (PAUD & TK, usia 3–6 tahun) berkualitas tinggi, modern, ceria, aman 100% tanpa iklan, dan dilengkapi dengan **39 permainan interaktif yang berfungsi penuh**.

---

## 🌐 Tautan Aplikasi Langsung (Live Web Demo)

Aplikasi ini telah aktif dan dapat langsung dimainkan melalui tautan berikut:
- **Web App URL**: [https://ais-pre-u3qxgt3qdszvwyjsabjvoy-62410596230.asia-east1.run.app](https://ais-pre-u3qxgt3qdszvwyjsabjvoy-62410596230.asia-east1.run.app)
- **Development URL**: [https://ais-dev-u3qxgt3qdszvwyjsabjvoy-62410596230.asia-east1.run.app](https://ais-dev-u3qxgt3qdszvwyjsabjvoy-62410596230.asia-east1.run.app)

---

## 🚀 Cara Push & Deploy ke Repositori GitHub Anda

Repositori Git lokal telah diinisialisasi dan di-commit. Untuk mempublikasikannya ke akun GitHub Anda:

### Langkah 1: Buat Repositori Baru di GitHub
1. Buka [github.com/new](https://github.com/new).
2. Beri nama repositori: `permainan-revan-utomo`.
3. Pilih **Public** lalu klik **Create repository** (jangan centang Add README).

### Langkah 2: Hubungkan & Push dari Terminal
Jalankan perintah berikut:
```bash
git branch -M main
git remote add origin https://github.com/revanutomo/permainan-revan-utomo.git
git push -u origin main
```

### Langkah 3: Aktifkan GitHub Pages (Gratis)
1. Di repositori `https://github.com/revanutomo/permainan-revan-utomo`, klik tab **Settings** > **Pages** (di menu kiri).
2. Pada bagian **Build and deployment > Source**, pilih **GitHub Actions**.
3. Website permainan akan otomatis online di:
   ```
   https://revanutomo.github.io/permainan-revan-utomo/
   ```

---

## 🎮 Fitur & Pustaka Permainan (39 Game)

1. **Mengenal Huruf & Membaca**:
   - Mengenal Huruf A-Z
   - Menyusun Kata Bergambar (BOLA, APEL, SAPI, IKAN, BUKU, AYAM, ROTI, MATA)
   - Cocok Huruf & Gambar
   - Gelembung Huruf Pintar
   - Mengenal Huruf Vokal (A, I, U, E, O)
2. **Angka & Berhitung Ceria**:
   - Mengenal Angka 1-20
   - Menghitung Benda Lucu
   - Mengurutkan Angka Kereta
   - Cocok Angka & Jumlah
   - Penjumlahan Ceria
   - Pengurangan Balon
3. **Warna & Bentuk Geometri**:
   - Mengenal Warna Pelangi
   - Kelompokkan ke Keranjang Warna
   - Detektif Warna
   - Mengenal Bentuk Geometri
   - Mencocokkan Bentuk Lubang
   - Membangun Rumah dari Bentuk Geometri
4. **Hewan, Buah & Lingkungan**:
   - Tebak Hewan & Suaranya
   - Rumah & Habitat Hewan
   - Makanan Kesukaan Hewan
   - Buah & Sayuran Manis
   - Aneka Kendaraan Dunia
   - Mengenal Anggota Tubuh
   - First Words English Ceria
5. **Logika & Melatih Memori**:
   - Kartu Memori Satwa (Card Flip Match)
   - Melanjutkan Pola Ceria
   - Cari yang Berbeda (Odd One Out)
   - Urutan Tumbuh Kembang Siklus Pohon Apel
6. **Kreativitas, Seni & Musik**:
   - Papan Gambar Bebas (HTML5 Canvas dengan kuas, warna, stiker bintang/pelangi, dan unduh hasil gambar)
   - Mewarnai Gambar Ceria (Ikan, Rumah, Bunga Matahari)
   - Alat Musik Xilofon Pelangi (8 bilah nada riil C4–C5 dan panduan lagu anak)
7. **Agama Islam & Budi Pekerti**:
   - Mengenal Huruf Hijaiyah
   - Mengenal Angka Arab 1-10
   - 5 Rukun Islam
   - 6 Rukun Iman
   - Urutan Gerakan Wudhu
   - Doa Sehari-hari Anak Saleh
   - Adab & Akhlak Terpuji

---

## 🛡️ Keamanan & Dashboard Orang Tua / Guru
- **PIN Proteksi**: Melindungi area pengaturan (`PIN: 1234` atau hitungan matematika orang tua).
- **Analisis Pembelajaran**: Menampilkan kategori yang sudah dikuasai vs perlu pendampingan lebih lanjut.
- **Sertifikat Juara Cilik**: Dapat langsung dicetak (*print*) atau disimpan sebagai PDF.
- **Offline-First & Privasi**: Tersimpan di *localStorage*, tanpa meminta data pribadi sensitif anak.

---

## 💻 Menjalankan Secara Lokal

```bash
# Pasang dependensi
npm install

# Jalankan server pengembangan
npm run dev

# Jalankan pengujian logika murni
npx tsx --test src/utils/gameRules.test.ts

# Bangun versi produksi
npm run build
```

Dibuat dengan ❤️ untuk anak-anak Indonesia oleh **Revan Utomo**.
