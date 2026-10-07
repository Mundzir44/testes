# Portofolio

Website portofolio satu halaman dengan gaya modern dan santai. Tanpa framework, tanpa build step: cukup HTML, CSS, dan JavaScript.

## Cara menjalankan

Buka `index.html` langsung di browser, atau jalankan server lokal:

```bash
python3 -m http.server 8000
# lalu buka http://localhost:8000
```

## Yang perlu kamu ganti

- **Nama & teks**: `Nama Kamu`, inisial logo `nk`, deskripsi di hero, dan bagian "Tentang" di `index.html`.
- **Proyek**: setiap `<a class="card">` di bagian `#karya`. Ganti `div.card-art` dengan `<img>` screenshot proyekmu kalau sudah ada.
- **Kontak**: email dan link sosial media.
- **Warna**: ubah `--primary` dan warna blob (`.b1`, `.b2`, `.b3`) di `style.css`.

## Deploy gratis

- **GitHub Pages**: Settings → Pages → pilih branch → Save.
- **Netlify / Vercel**: hubungkan repo ini, tanpa konfigurasi tambahan.
