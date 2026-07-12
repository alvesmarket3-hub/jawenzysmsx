# 📁 VerifyPro - Proje Dosya Yapısı

## 🗂️ Tam Dosya Ağacı

```
verifypro/
│
├── 🖥️ FRONTEND (Kullanıcı Arayüzü)
│   ├── app.html                  # Kullanıcı ana uygulaması
│   │   ├── Login/Register sayfaları
│   │   ├── Paketler sayfası
│   │   ├── Siparişler sayfası
│   │   ├── Bakiye yükleme
│   │   └── Canlı destek chat widget
│   │
│   └── admin.html                # Admin kontrol paneli
│       ├── Dashboard (istatistikler)
│       ├── Kullanıcı yönetimi
│       ├── Sipariş yönetimi
│       ├── Ödeme sistemleri ayarları
│       ├── Numaralar yönetimi
│       └── Canlı destek yönetimi
│
├── ⚙️ BACKEND (Sunucu)
│   ├── server.js                 # Express.js sunucu
│   │   ├── Auth endpoints (login, register)
│   │   ├── User endpoints (profile, balance)
│   │   ├── Order endpoints (sipariş yönetimi)
│   │   ├── Chat endpoints (canlı destek)
│   │   ├── Numbers endpoints (numara yönetimi)
│   │   ├── Payment endpoints (ödeme ayarları)
│   │   └── Admin endpoints (yönetim işlemleri)
│   │
│   └── package.json              # NPM bağımlılıkları
│       ├── express
│       ├── cors
│       ├── dotenv
│       └── diğer modüller
│
├── 🗄️ VERİTABANI (Dosya Sistemi)
│   ├── data/
│   │   ├── users.json            # Kullanıcı hesapları
│   │   │   ├── Kullanıcı ID
│   │   │   ├── E-posta
│   │   │   ├── Şifrelenmiş şifre
│   │   │   └── Bakiye
│   │   │
│   │   ├── orders.json           # Tüm siparişler
│   │   │   ├── Sipariş ID
│   │   │   ├── Kullanıcı ID
│   │   │   ├── Paket bilgileri
│   │   │   ├── Onay kodu
│   │   │   └── Numara
│   │   │
│   │   ├── numbers.json          # Platformlar ve numaralar
│   │   │   ├── WhatsApp numaraları
│   │   │   ├── Telegram numaraları
│   │   │   ├── Instagram numaraları
│   │   │   ├── Google numaraları
│   │   │   └── ... (15+ platform)
│   │   │
│   │   ├── payment-config.json   # Ödeme sistemleri ayarları
│   │   │   ├── PayTR ayarları
│   │   │   ├── Shopier ayarları
│   │   │   ├── Stripe ayarları
│   │   │   ├── Iyzipay ayarları
│   │   │   ├── 2Checkout ayarları
│   │   │   └── PayPal ayarları
│   │   │
│   │   └── chats/                # Canlı destek mesajları
│   │       ├── user-abc123-chat.json
│   │       ├── user-xyz789-chat.json
│   │       └── ... (her kullanıcı için)
│   │
│   ├── .env.example              # Environment şablon
│   ├── .env                      # Gerçek environment (git ignore)
│   │
│   ├── README.md                 # Detaylı dokümantasyon
│   ├── QUICKSTART.md             # Hızlı başlangıç rehberi
│   │
│   └── .gitignore                # Git ignore dosyası
│       ├── data/                 # Veritabanı dosyaları
│       ├── .env                  # Gizli anahtarlar
│       ├── node_modules/         # Bağımlılıklar
│       └── *.log                 # Log dosyaları
```

## 📄 Dosya Açıklamaları

### Frontend Dosyaları

#### `app.html` (Kullanıcı Uygulaması)
**Boyut:** ~50 KB  
**Amaç:** Kullanıcıların paket satın almak, siparişleri takip etmek ve destek almak için kullandığı arabirim.

**Bölümler:**
- 🔐 Authentication (Login/Register)
- 📦 Paket Satın Alma
- 💰 Bakiye Yönetimi
- 📋 Sipariş Takibi
- 💬 Canlı Destek Chat
- 📱 WhatsApp Entegrasyonu

**Teknoloji:** HTML5 + CSS3 + Vanilla JavaScript

---

#### `admin.html` (Admin Paneli)
**Boyut:** ~40 KB  
**Amaç:** Yöneticilerin sistem üzerinde tam kontrol sahibi olması.

**Bölümler:**
- 📊 Dashboard (istatistikler)
- 👥 Kullanıcı Yönetimi
  - Tüm kullanıcıları listele
  - Kullanıcıyı banla/sil
  - Manuel bakiye ekle
- 📋 Sipariş Yönetimi
  - Siparişleri listele
  - Kod girme
  - Numara atama
- 💳 Ödeme Sistemleri
  - PayTR, Shopier, Stripe, vb.
  - Toggle ile aktif/pasif
  - API anahtarlarını yapılandır
- 📱 Numaralar Yönetimi
  - Kategorileri yönet
  - Numaralar ekle/sil
  - Platform düzenle
- 💬 Canlı Destek
  - Tüm konuşmaları görebilirsin
  - Sohbetleri temizle

**Teknoloji:** HTML5 + CSS3 + Vanilla JavaScript

---

### Backend Dosyaları

#### `server.js` (Express Server)
**Boyut:** ~15 KB  
**Amaç:** Tüm API endpoint'lerini yönetir.

**Harita:**

| Kategori | Endpoint | Metod |
|----------|----------|-------|
| **Auth** | /api/register | POST |
| | /api/login | POST |
| | /api/admin/login | POST |
| **User** | /api/user/:userId | GET |
| | /api/user/:userId/add-balance | POST |
| **Orders** | /api/orders | POST |
| | /api/orders/:userId | GET |
| | /api/admin/orders | GET |
| | /api/admin/orders/:orderId/update | POST |
| **Chat** | /api/chat/:userId | GET |
| | /api/chat/:userId/send | POST |
| | /api/chat/:userId/clear | POST |
| | /api/admin/chats | GET |
| **Numbers** | /api/numbers | GET |
| | /api/numbers/:categoryId/random | GET |
| | /api/admin/numbers/category | POST |
| | /api/admin/numbers/:categoryId/add | POST |
| | /api/admin/numbers/:categoryId/:number | DELETE |
| **Payment** | /api/payment-methods | GET |
| | /api/admin/payment-config | GET |
| | /api/admin/payment-config/:method | POST |

**Teknoloji:** Node.js + Express.js

---

#### `package.json` (Bağımlılıklar)
**Amaç:** Projeye gereken tüm NPM paketlerini tanımla.

**Ana Bağımlılıklar:**
```json
{
  "express": "^4.18.2",      // Web framework
  "cors": "^2.8.5",          // Cross-Origin Resource Sharing
  "dotenv": "^16.3.1",       // Environment variables
  "crypto": "^1.0.1",        // Şifreleme
  "axios": "^1.6.2",         // HTTP istemcisi
  "socket.io": "^4.7.2"      // WebSocket (gelecek)
}
```

**Yükleme:**
```bash
npm install
```

---

### Konfigürasyon Dosyaları

#### `.env.example` → `.env`
**Amaç:** Gizli anahtarları ve yapılandırmaları tutmak.

**Önemli Değişkenler:**
- `PORT` - Sunucu portu
- `NODE_ENV` - development/production
- `PAYTR_*` - PayTR API anahtarları
- `SHOPIER_*` - Shopier API anahtarları
- `STRIPE_*` - Stripe API anahtarları
- `WHATSAPP_*` - WhatsApp API

**Kullanım:**
```bash
cp .env.example .env
# .env dosyasını düzenle
```

---

### Veritabanı Dosyaları

#### `data/users.json` (Kullanıcılar)
```json
{
  "users": [
    {
      "id": "user-abc123",
      "name": "Ahmet Yılmaz",
      "email": "ahmet@example.com",
      "password": "hash_xxx",
      "balance": 500.00,
      "createdAt": "2024-01-15T10:00:00Z",
      "token": "token_xxx",
      "banned": false
    }
  ],
  "admins": [...]
}
```

**Yapısı:**
- ID: Benzersiz kullanıcı tanımlayıcı
- Email: Giriş için kullanılır
- Password: SHA256 ile şifrelenmiş
- Balance: Hesaptaki para
- Token: Oturum yönetimi

---

#### `data/orders.json` (Siparişler)
```json
{
  "orders": [
    {
      "id": "ORD-1705308000",
      "userId": "user-abc123",
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

**Durumlar:**
- `Beklemede` - Yeni sipariş
- `Tamamlandı` - Admin tarafından işlendi
- `İptal` - Kullanıcı iptal etti

---

#### `data/numbers.json` (Numaralar)
```json
{
  "categories": [
    {
      "id": "whatsapp",
      "name": "WhatsApp",
      "icon": "💬",
      "platform": "whatsapp",
      "numbers": [
        "+1 (555) 123-4567",
        "+44 7911 123456",
        // ... daha fazla numara
      ]
    },
    // ... daha fazla kategori
  ]
}
```

**Özellikler:**
- Platformlar kategoriye ayrılmış
- Her kategori kendi numaralarını tutar
- Admin tarafından yönetilir
- Rastgele numara seçimi desteklenir

---

#### `data/chats/` (Canlı Destek)
```json
// user-abc123-chat.json
{
  "userId": "user-abc123",
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

**Özellikler:**
- Her kullanıcı için bağımsız dosya
- Sunucu tabanına bağımlı değil
- Admin tarafından silinebilir
- Kalıcı depolama

---

#### `data/payment-config.json` (Ödeme Ayarları)
```json
{
  "paymentMethods": {
    "paytr": {
      "name": "💳 PayTR",
      "enabled": false,
      "merchantId": "",
      "merchantKey": "",
      "merchantSalt": "",
      "commission": "2.5%"
    },
    // ... diğer sistemler
  }
}
```

**Ayarlanabilir Sistemler:**
1. PayTR
2. Shopier
3. Stripe
4. Iyzipay
5. 2Checkout
6. PayPal

---

### Dokümantasyon Dosyaları

#### `README.md` (Detaylı Dokümantasyon)
**Amaç:** Proje hakkında kapsamlı bilgi.

**İçerik:**
- Özellikler listesi
- Kurulum adımları
- Dosya yapısı
- API dokümantasyonu
- Deployment rehberi
- Veritabanı yapısı
- Sorun giderme

---

#### `QUICKSTART.md` (Hızlı Başlangıç)
**Amaç:** 5 dakikada sistemi başlatmak.

**İçerik:**
- Hızlı kurulum
- Test verisi oluşturma
- Temel işlemler
- Sık sorulan sorular

---

## 🚀 Kullanmaya Başla

### 1. Tüm Dosyaları İndir
```bash
git clone https://github.com/yourusername/verifypro.git
cd verifypro
```

### 2. Bağımlılıkları Yükle
```bash
npm install
```

### 3. Ortamı Ayarla
```bash
cp .env.example .env
# .env dosyasını düzenle
```

### 4. Sunucuyu Başlat
```bash
npm start
```

### 5. Uygulamaları Aç
- **Kullanıcı:** http://localhost:5000/app.html
- **Admin:** http://localhost:5000/admin.html

---

## 📊 Dosya Boyutları

| Dosya | Boyut | Tip |
|-------|-------|-----|
| app.html | ~50 KB | Frontend |
| admin.html | ~40 KB | Frontend |
| server.js | ~15 KB | Backend |
| package.json | ~2 KB | Config |
| .env | ~5 KB | Config |
| README.md | ~30 KB | Dokü |
| QUICKSTART.md | ~15 KB | Dokü |
| data/users.json | Değişken | Veritabanı |
| data/orders.json | Değişken | Veritabanı |
| data/numbers.json | ~20 KB | Veritabanı |
| data/payment-config.json | ~5 KB | Veritabanı |

**Toplam:** ~200 KB (veri dışında)

---

## 🔄 Dosya İlişkileri

```
app.html (Kullanıcı)
    ↓
    Fetch API ile request gönerir
    ↓
server.js (Express)
    ↓
    data/ klasörünü okur/yazar
    ↓
JSON dosyaları (users.json, orders.json, vb.)

admin.html (Admin)
    ↓
    Fetch API ile request gönerir
    ↓
server.js (Express)
    ↓
    data/ klasörünü okur/yazar/siler
    ↓
JSON dosyaları
```

---

## ✅ Hazırlık Kontrol Listesi

- [ ] Tüm dosyalar indirildi
- [ ] Node.js 16+ kurulu
- [ ] `npm install` çalıştırıldı
- [ ] `.env` dosyası oluşturuldu
- [ ] Sunucu `npm start` ile başladı
- [ ] app.html açıldı
- [ ] Admin paneli açıldı
- [ ] Admin giriş yapıldı
- [ ] Test kullanıcı oluşturuldu
- [ ] Ödeme sistemi yapılandırıldı

---

Başarılı! 🎉 Sistem hazır! 🚀
