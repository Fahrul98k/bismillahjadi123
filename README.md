# Taik Mini App - Farcaster Mini App dengan Next.js

Mini App Farcaster yang dibangun menggunakan Next.js dan Farcaster SDK. Aplikasi ini mendemonstrasikan berbagai fitur Mini App seperti wallet integration, actions, haptics, dan lainnya.

## 🚀 Fitur

- ✅ Integrasi Farcaster SDK
- ✅ Wallet Ethereum dengan Wagmi
- ✅ Actions (Add App, Compose Cast, View Profile, dll)
- ✅ Haptic Feedback
- ✅ User Profile Display
- ✅ Context Detection
- ✅ Responsive Design dengan Tailwind CSS
- ✅ TypeScript Support

## 📦 Instalasi

1. Clone repository ini:
```bash
git clone <repository-url>
cd taik
```

2. Install dependencies:
```bash
npm install
```

3. Jalankan development server:
```bash
npm run dev
```

4. Buka [http://localhost:3000](http://localhost:3000) di browser Anda.

## 🔧 Konfigurasi

### 1. Update Domain

Ganti semua URL `https://your-domain.com` dengan domain Anda yang sebenarnya di file-file berikut:
- `app/page.tsx`
- `public/.well-known/farcaster.json`
- `app/layout.tsx`

### 2. Account Association

Untuk memverifikasi kepemilikan domain, Anda perlu menambahkan `accountAssociation` ke `public/.well-known/farcaster.json`. Gunakan [Mini App Manifest Tool](https://farcaster.xyz/~/developers/new) di Warpcast untuk menghasilkan signature.

### 3. Images

Tambahkan gambar-gambar berikut ke folder `public/`:
- `logo.png` - Logo aplikasi (200x200px)
- `og-image.png` - Open Graph image (1200x630px)
- `screenshot1.png` - Screenshot aplikasi
- `screenshot2.png` - Screenshot aplikasi

## 🏗️ Struktur Proyek

```
taik/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── Actions.tsx
│   ├── MiniApp.tsx
│   ├── UserProfile.tsx
│   ├── WalletConnect.tsx
│   └── WagmiProvider.tsx
├── lib/
│   └── wagmi.ts
├── public/
│   └── .well-known/
│       └── farcaster.json
├── package.json
├── next.config.js
├── tailwind.config.js
└── README.md
```

## 🎯 Fitur Mini App

### Actions
- **Add Mini App**: Menambahkan aplikasi ke Farcaster client
- **Compose Cast**: Membuat cast dengan embed
- **View Profile**: Melihat profil pengguna
- **Open URL**: Membuka URL eksternal
- **Close App**: Menutup aplikasi

### Haptics
- **Impact**: Feedback fisik untuk aksi
- **Notification**: Feedback untuk notifikasi
- **Selection**: Feedback untuk pemilihan

### Wallet Integration
- Koneksi wallet Ethereum otomatis
- Mendukung Base network
- Integrasi dengan Farcaster wallet

## 🚀 Deployment

### Vercel (Recommended)

1. Push kode ke GitHub
2. Connect repository ke Vercel
3. Deploy otomatis

### Manual Deployment

1. Build aplikasi:
```bash
npm run build
```

2. Start production server:
```bash
npm start
```

## 🔍 Testing

### Mini App Debug Tool

1. Buka [Mini App Debug Tool](https://farcaster.xyz/~/developers/mini-apps/debug)
2. Masukkan URL aplikasi Anda
3. Klik "Preview"

### Local Testing

Untuk testing lokal, gunakan ngrok atau layanan tunnel serupa:

```bash
npx ngrok http 3000
```

## 📚 Dokumentasi

- [Farcaster Mini Apps Documentation](https://docs.farcaster.xyz/miniapps)
- [Farcaster SDK](https://docs.farcaster.xyz/miniapps/sdk)
- [Next.js Documentation](https://nextjs.org/docs)
- [Wagmi Documentation](https://wagmi.sh)

## 🤝 Kontribusi

1. Fork repository
2. Buat feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push ke branch (`git push origin feature/amazing-feature`)
5. Buat Pull Request

## 📄 License

MIT License - lihat file [LICENSE](LICENSE) untuk detail.

## 🙏 Acknowledgments

- [Farcaster](https://farcaster.xyz) untuk platform Mini Apps
- [Next.js](https://nextjs.org) untuk framework React
- [Wagmi](https://wagmi.sh) untuk wallet integration
- [Tailwind CSS](https://tailwindcss.com) untuk styling 