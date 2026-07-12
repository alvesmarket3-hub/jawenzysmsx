# 🚀 VerifyPro - Hızlı Başlangıç Rehberi

## 📦 Sistemin Yapısı

```
Kullanıcı                Admin
   ↓                       ↓
app.html           →     admin.html
   ↓                       ↓
Frontend            Admin Panel
   ↓                       ↓
   └─────→ server.js ←─────┘
           (Express)
           ↓
        data/ (JSON)
   ├── users.json
   ├── orders.json
   ├── numbers.json
   ├── payment-config.json
   └── chats/
       ├── user-xxx-chat.json
       └── user-yyy-chat.json
```

## ⚡ 5 Dakikada Başlat

### Adım 1: Projeyi Kurgulandır
```bash
npm install
```

### Adım 2: Sunucuyu Başlat
```bash
npm start
```

Çıktı:
```
✅ Server http://localhost:5000 adresinde çalışıyor
📂 Veri dosyaları: /path/to/data
💾 Canlı destek mesajları: /path/to/data/chats
```

### Adım 3: Uygulamayı Aç
- **Kullanıcı App:** http://localhost:5000/app.html
- **Admin Panel:** http://localhost:5000/admin.html

### Adım 4: Admin Giriş Yap
```
E-Posta: admin@verifypro.com
Şifre: admin123
```

### Adım 5: Ödeme Sistemini Etkinleştir
Admin Panel → Ödeme Sistemleri → PayTR'yi Seç → API Anahtarlarını Gir → Kaydet

## 🔄 İş Akışı

### Kullanıcı Tarafında:

1️⃣ **Kayıt**
```
Anasayfa → "Giriş Yap" → "Kayıt Ol"
E-posta, Ad Soyad, Şifre gir → Kayıt Ol
```

2️⃣ **Bakiye Yükle**
```
Bakiye Yükle → Ödeme Yöntemi Seç (PayTR) → Ödeme Yap
Bakiyeniz otomatik eklenir
```

3️⃣ **Paket Satın Al**
```
Paketler → İstediğin Paketi Seç → Satın Al
Ödeme yap → Sipariş oluşturulur
```

4️⃣ **Siparişi Takip Et**
```
Siparişler → Sipariş Detaylarını Gör
Canlı Destek butonuyla admin ile iletişim kur
WhatsApp butonuyla destek numarasına yönlendir
```

### Admin Tarafında:

1️⃣ **Siparişleri Kontrol Et**
```
Admin Panel → Siparişler
Tüm bekleyen siparişleri görebilirsin
```

2️⃣ **Kodu Gir**
```
Siparişler → "Kod Gir" Butonu
Onay kodunu yaz (örn: 123456)
Numarayı ekle (opsiyonel)
Kaydet
```

3️⃣ **Canlı Destek Yönet**
```
Canlı Destek → Konuşmaları Görmek
Kullanıcı mesajlarına cevap ver
Gerekirse konuşmayı temizle
```

4️⃣ **Numaralar Yönet**
```
Numaralar → Kategori Seç
Yeni numara ekle veya sil
Kategorisi yönet
```

## 💾 Veriler Nereden Yönetilir?

| İş | Dosya | Yönetim |
|----|-------|--------|
| Kullanıcı Bilgileri | `data/users.json` | Admin Panel + Frontend |
| Siparişler | `data/orders.json` | Admin Panel |
| Numaralar | `data/numbers.json` | Admin Panel |
| Ödeme Ayarları | `data/payment-config.json` | Admin Panel |
| Canlı Destek | `data/chats/user-xxx-chat.json` | Admin Panel |

## 🔐 Güvenlik İpuçları

### Admin Paneli Şifresi Değiştir
1. Bir terminal aç
2. Node.js kodu çalıştır:
```javascript
const crypto = require('crypto');
const newPassword = 'yeni_sifre_123';
const hashed = crypto.createHash('sha256').update(newPassword).digest('hex');
console.log('Hashed password:', hashed);
```
3. `data/users.json` dosyasını aç
4. `admins` kısmında `password` alanını değiştir

### Üretim Ortamında
- `.env` dosyasındaki tüm gizli anahtarları değiştir
- `process.env.NODE_ENV = 'production'` yap
- CORS ayarlarını sıkılaştır
- HTTPS kullan

## 🌍 Railway'e Deploy

### 1. Railway'e Kaydol
https://railway.app

### 2. GitHub Bağla
Railway Dashboard → New Project → Deploy from GitHub

### 3. Environment Değişkenlerini Ekle
```
PORT=5000
NODE_ENV=production
JWT_SECRET=çok_uzun_gizli_anahtar
```

### 4. Özel Domain Ekle
Railway Settings → Custom Domain

## 🧪 Test Verisi Oluştur

### Test Kullanıcı:
```bash
# Terminal'de:
curl -X POST http://localhost:5000/api/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Kullanıcı",
    "email": "test@example.com",
    "password": "test123"
  }'
```

### Yanıt:
```json
{
  "success": true,
  "message": "Kayıt başarılı",
  "user": {
    "id": "user-xxxxx",
    "name": "Test Kullanıcı",
    "email": "test@example.com",
    "token": "token_xxxxx"
  }
}
```

## 📱 Numara Ekleme (Admin)

### Yol 1: Admin Panel
```
Admin Panel → Numaralar → Numara Ekle
Kategori seç → Numarayı yazıp Ekle
```

### Yol 2: API (curl)
```bash
curl -X POST http://localhost:5000/api/admin/numbers/whatsapp/add \
  -H "Content-Type: application/json" \
  -d '{
    "number": "+90 555 123 4567"
  }'
```

## 💳 Ödeme Sistemi Etkinleştirme

### PayTR Örneği:
1. paytr.com'a giriş yap
2. Merchant ID, Merchant Key, Merchant Salt al
3. Admin Panel → Ödeme Sistemleri → PayTR
4. Bilgileri yapıştır
5. Toggle'ı aç
6. Kaydet

### Diğer Sistemler:
Aynı adımları takip et.

## 🆘 Sık Sorulan Sorular

**S: Sunucu başlamıyor?**  
C: Port 5000 zaten kullanılıyor olabilir. `PORT=3000 npm start` yap.

**S: Admin şifremi unutum?**  
C: `data/users.json` dosyasını düzenle, admin password'ünü sıfırla.

**S: Veriler kayboldu?**  
C: `data/` klasöründe yedek var mı kontrol et.

**S: WhatsApp mesajı gönderilmiyor?**  
C: WhatsApp API setup doğru mu kontrol et.

**S: Çalışan number yok?**  
C: Admin Panel → Numaralar → Numara Ekle

## 📞 Destek

- 📧 Email: support@verifypro.com
- 💬 Admin Panel Canlı Destek
- 📱 WhatsApp: +90 555 123 4567

## 🎓 Sonraki Adımlar

1. Üretim sunucusunu kur
2. SSL/TLS sertifikası ekle
3. Veritabanını yedekle
4. Email sistemini entegre et
5. SMS/WhatsApp API'larını bağla
6. Analytics ekle

---

**Başarılı kullanımlar!** 🎉
