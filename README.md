# 🔐 VerifyPro - Kurumsal SMS Onay & Hesap Teslimat Sistemi

Bir temel SMS onay ve hesap teslimat platformu. WhatsApp, Telegram ve 15+ platformu destekler.

## 📋 Özellikler

### 🎯 Frontend Features
- ✅ Kullanıcı Login/Register Sistemi
- ✅ Paket Satın Alma (Ödeme Gateway Entegrasyonu)
- ✅ Bakiye Yükleme Sistemi
- ✅ Siparişler Takip Sayfası
- ✅ Gerçek Zamanlı Canlı Destek Chat (Dosya Tabanlı)
- ✅ WhatsApp Yönlendirmesi
- ✅ Responsive Tasarım

### ⚙️ Backend Features
- ✅ Node.js + Express Server
- ✅ Dosya Tabanlı Veritabanı (JSON)
- ✅ Kullanıcı Yönetimi
- ✅ Sipariş Yönetimi
- ✅ Ödeme Gateway Yapılandırması
- ✅ Dosya Tabanlı Canlı Destek (Her kullanıcı için bağımsız)
- ✅ Numara Yönetimi
- ✅ Kategori & Platform Yönetimi

### 👨‍💼 Admin Panel Features
- ✅ Kullanıcı Yönetimi (Listele, Sil, Banla, Bakiye Ekle)
- ✅ Sipariş Yönetimi (Kod Girme, Numara Atama)
- ✅ Ödeme Sistemleri Yapılandırması
- ✅ Numaralar Yönetimi (Kategori, Numara Ekleme/Silme)
- ✅ Canlı Destek Mesajları Yönetimi
- ✅ Dashboard İstatistikleri

## 🚀 Kurulum

### 1. Gerekli Yazılım
- Node.js 16+
- npm veya yarn
- Git

### 2. Projeyi İndir
```bash
git clone https://github.com/yourusername/verifypro.git
cd verifypro
```

### 3. Bağımlılıkları Yükle
```bash
npm install
```

### 4. Environment Dosyası Oluştur
```bash
cp .env.example .env
# .env dosyasını düzenle
```

### 5. Sunucuyu Başlat
```bash
npm start
# veya development için:
npm run dev
```

Sunucu `http://localhost:5000` adresinde çalışacak.

## 📁 Dosya Yapısı

```
verifypro/
├── server.js                 # Ana Express sunucusu
├── package.json              # Proje bağımlılıkları
├── .env                      # Environment değişkenleri
├── app.html                  # Kullanıcı Frontend
├── admin.html                # Admin Paneli
├── data/                     # Veritabanı Dosyaları
│   ├── users.json            # Kullanıcı verileri
│   ├── orders.json           # Sipariş verileri
│   ├── numbers.json          # Platform numaraları
│   ├── payment-config.json   # Ödeme sistemi ayarları
│   └── chats/                # Canlı destek mesajları
│       ├── user-xxx-chat.json
│       └── user-yyy-chat.json
└── README.md
```

## 🔑 Admin Giriş Bilgileri

**Varsayılan Admin Hesabı:**
- E-Posta: `admin@verifypro.com`
- Şifre: `admin123`

⚠️ **Üretim ortamında bunu değiştirin!**

## 💳 Ödeme Sistemleri Yapılandırması

Admin paneline giriş yapıp **Ödeme Sistemleri** sayfasından ayarla:

### Desteklenen Sistemler:
1. **PayTR** - Türkiye için en popüler seçenek
2. **Shopier** - E-ticaret ödeme sistemi
3. **Stripe** - Uluslararası ödeme
4. **Iyzipay** - Türk fintech çözümü
5. **2Checkout** - Global ödeme
6. **PayPal** - Uluslararası ödeme

### Nasıl Aktif Etkiniz:
1. Admin paneline giriş yap
2. "Ödeme Sistemleri" bölümüne git
3. Kullanmak istediğin sistemi seç
4. API anahtarlarını gir
5. "Toggle" butonuyla etkinleştir
6. "Kaydet" butonuna tıkla

## 💬 Canlı Destek Sistemi

### Nasıl Çalışır:
- Her kullanıcının kendi bağımsız destek sohbeti vardır
- Mesajlar `data/chats/` klasöründe JSON dosyaları olarak kaydedilir
- Admin bu dosyaları silebilir veya temizleyebilir
- Sunucu tabanına bağlı değildir (tamamen dosya tabanlı)

### Kullanıcı Tarafı:
1. Sağ alt köşedeki 💬 düğmesine tıkla
2. Mesaj yazıp Enter tuşuna bas
3. Admin'in cevabını bekle

### Admin Tarafı:
1. Admin panelinden "Canlı Destek" bölümüne git
2. Kullanıcı sohbetlerini görebilirsin
3. "Temizle" butonuyla konuşmayı sil

## 📱 Numaralar Yönetimi

### Numara Kategorileri:
- WhatsApp
- Telegram
- Instagram
- Google
- Twitter/X
- TikTok
- Facebook
- Discord
- Snapchat
- LinkedIn
- Netflix
- Spotify
- Amazon
- Uber
- Apple ID

### Nasıl Numara Ekle:
1. Admin paneline giriş yap
2. "Numaralar" bölümüne git
3. Kategorisini seç
4. Numarayı yaz ve "Ekle" butonuna tıkla
5. Numara listesine eklenir

### Numara Silme:
1. Silmek istediğin numaranın yanındaki "Sil" butonuna tıkla
2. Numara listesinden kaldırılır

## 🛒 Paket Satın Alma Akışı

1. **Kullanıcı Giriş Yap**
   ```
   Login → Email + Şifre
   ```

2. **Paket Seç**
   ```
   Paketler → Paket Kartından "Satın Al"
   ```

3. **Ödeme Yap**
   ```
   Ödeme Sayfası (Ödeme Geçidi) → Başarılı
   ```

4. **Sipariş Oluştur**
   ```
   Sipariş #ORD-xxx oluşturulur
   ```

5. **Admin Tarafından İşleme Alın**
   ```
   Admin Paneli → Siparişler → Kod Gir
   ```

6. **Teslimat Tamamla**
   ```
   Kullanıcı sipariş sayfasında kodu görür
   Canlı destek ile iletişim kurulur
   ```

## 🔗 API Endpoints

### Auth Endpoints
```
POST   /api/register              # Kullanıcı kayıt
POST   /api/login                 # Kullanıcı giriş
POST   /api/admin/login           # Admin giriş
```

### User Endpoints
```
GET    /api/user/:userId          # Kullanıcı bilgisi
POST   /api/user/:userId/add-balance    # Bakiye ekle
GET    /api/orders/:userId        # Kullanıcı siparişleri
```

### Order Endpoints
```
POST   /api/orders                # Sipariş oluştur
GET    /api/admin/orders          # Tüm siparişler
POST   /api/admin/orders/:orderId/update  # Siparişi güncelle
```

### Chat Endpoints
```
GET    /api/chat/:userId          # Sohbet mesajları
POST   /api/chat/:userId/send     # Mesaj gönder
POST   /api/chat/:userId/clear    # Sohbeti sil
GET    /api/admin/chats           # Tüm sohbetler
```

### Numbers Endpoints
```
GET    /api/numbers               # Tüm kategoriler
GET    /api/numbers/:categoryId/random  # Rastgele numara
POST   /api/admin/numbers/category      # Kategori ekle
POST   /api/admin/numbers/:categoryId/add    # Numara ekle
DELETE /api/admin/numbers/:categoryId/:number  # Numara sil
```

### Payment Endpoints
```
GET    /api/payment-methods       # Aktif ödeme yöntemleri
GET    /api/admin/payment-config  # Tüm ödeme ayarları
POST   /api/admin/payment-config/:method  # Ödeme yöntemi güncelle
```

## 🚀 Railway'e Deployment

### 1. Railway'e Kaydol
https://railway.app

### 2. Proje Bağla
```bash
railway init
railway add
railway up
```

### 3. Environment Değişkenlerini Ayarla
Railway dashboard'da:
- `PORT=5000`
- `.env` dosyasındaki tüm değerleri ekle

### 4. Custom Domain Ekle (Opsiyonel)
Railway Settings → Custom Domain

## 📊 Veritabanı Yapısı

### users.json
```json
{
  "users": [
    {
      "id": "user-xxx",
      "name": "Kullanıcı Adı",
      "email": "example@mail.com",
      "password": "hashed_password",
      "balance": 100.00,
      "createdAt": "2024-01-15T10:00:00Z",
      "token": "token_xxx"
    }
  ],
  "admins": [...]
}
```

### orders.json
```json
{
  "orders": [
    {
      "id": "ORD-1234567890",
      "userId": "user-xxx",
      "packageId": "whatsapp-telegram",
      "price": 89.99,
      "status": "Tamamlandı",
      "paymentStatus": "Ödendi",
      "code": "123456",
      "number": "+90 555 123 4567",
      "createdAt": "2024-01-15T10:00:00Z"
    }
  ]
}
```

### chats/{userId}-chat.json
```json
{
  "userId": "user-xxx",
  "messages": [
    {
      "sender": "user",
      "content": "Merhaba, yardım lazım",
      "timestamp": "2024-01-15T10:00:00Z",
      "read": false
    },
    {
      "sender": "admin",
      "content": "Merhaba! Size nasıl yardımcı olabilirim?",
      "timestamp": "2024-01-15T10:00:30Z",
      "read": false
    }
  ]
}
```

## 🐛 Sorun Giderme

### Sunucu Başlamıyor
```bash
# Port zaten kullanılıyor olabilir
# Farklı port kullan:
PORT=3000 npm start
```

### Veri Kayboldu
```bash
# Veriler data/ klasöründe tutulur
# Git ignore dosyasında data/ var mı kontrol et
# Yedekle ve geri yükle
```

### WhatsApp Mesajları Gönderilmiyor
```bash
# WhatsApp API'si yapılandırıldı mı kontrol et
# Numara format doğru mu kontrol et: +90 555 123 4567
```

## 📧 Destek & Sorular

- 📧 Email: support@verifypro.com
- 💬 Canlı Destek: Admin panelinden
- 📱 WhatsApp: +90 555 123 4567

## 📄 Lisans

MIT License - Detaylar için LICENSE dosyasını kontrol et.

## 👥 Yapımcılar

- VerifyPro Team

---

**Sürüm:** 1.0.0  
**Son Güncelleme:** Ocak 2024  
**Durum:** Aktif Geliştirme
