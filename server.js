// ========== SERVER SETUP ==========
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// ========== DOSYA YOLLARI ==========
const dataDir = path.join(__dirname, 'data');
const usersFile = path.join(dataDir, 'users.json');
const ordersFile = path.join(dataDir, 'orders.json');
const chatDir = path.join(dataDir, 'chats');
const numbersFile = path.join(dataDir, 'numbers.json');
const paymentConfigFile = path.join(dataDir, 'payment-config.json');

// Dosya yapısını kontrol et ve oluştur
function initializeFiles() {
    if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
    if (!fs.existsSync(chatDir)) fs.mkdirSync(chatDir, { recursive: true });

    if (!fs.existsSync(usersFile)) {
        fs.writeFileSync(usersFile, JSON.stringify({
            users: [],
            admins: [{
                id: 'admin-1',
                email: 'admin@verifypro.com',
                password: crypto.createHash('sha256').update('admin123').digest('hex'),
                username: 'admin',
                role: 'admin',
                createdAt: new Date().toISOString()
            }]
        }, null, 2));
    }

    if (!fs.existsSync(ordersFile)) {
        fs.writeFileSync(ordersFile, JSON.stringify({ orders: [] }, null, 2));
    }

    if (!fs.existsSync(paymentConfigFile)) {
        fs.writeFileSync(paymentConfigFile, JSON.stringify({
            paymentMethods: {
                paytr: {
                    name: 'PayTR',
                    enabled: false,
                    merchantId: '',
                    merchantKey: '',
                    merchantSalt: ''
                },
                shopier: {
                    name: 'Shopier',
                    enabled: false,
                    apiKey: '',
                    apiSecret: ''
                },
                stripe: {
                    name: 'Stripe',
                    enabled: false,
                    publicKey: '',
                    secretKey: ''
                },
                iyzipay: {
                    name: 'Iyzipay',
                    enabled: false,
                    apiKey: '',
                    secretKey: ''
                },
                twocheckout: {
                    name: '2Checkout',
                    enabled: false,
                    merchantCode: '',
                    apiKey: ''
                },
                paypal: {
                    name: 'PayPal',
                    enabled: false,
                    clientId: '',
                    clientSecret: ''
                }
            }
        }, null, 2));
    }

    if (!fs.existsSync(numbersFile)) {
        fs.writeFileSync(numbersFile, JSON.stringify({
            categories: [
                {
                    id: 'whatsapp',
                    name: 'WhatsApp',
                    icon: '💬',
                    platform: 'whatsapp',
                    numbers: [
                        '+1 555 123 4567',
                        '+44 7911 123456',
                        '+49 30 12345678'
                    ]
                },
                {
                    id: 'telegram',
                    name: 'Telegram',
                    icon: '✈️',
                    platform: 'telegram',
                    numbers: [
                        '+7 912 345 6789',
                        '+81 90 1234 5678',
                        '+86 123 4567 8901'
                    ]
                }
            ]
        }, null, 2));
    }
}

initializeFiles();

// ========== HELPER FUNCTIONS ==========
function readJSONFile(filePath) {
    try {
        return JSON.parse(fs.readFileSync(filePath, 'utf8'));
    } catch (e) {
        return null;
    }
}

function writeJSONFile(filePath, data) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

function hashPassword(password) {
    return crypto.createHash('sha256').update(password).digest('hex');
}

function generateToken() {
    return crypto.randomBytes(32).toString('hex');
}

function getChatFile(userId) {
    return path.join(chatDir, `${userId}-chat.json`);
}

function readChatMessages(userId) {
    const chatFile = getChatFile(userId);
    if (!fs.existsSync(chatFile)) {
        return { userId, messages: [] };
    }
    return JSON.parse(fs.readFileSync(chatFile, 'utf8'));
}

function writeChatMessages(userId, messages) {
    const chatFile = getChatFile(userId);
    fs.writeFileSync(chatFile, JSON.stringify(messages, null, 2));
}

// ========== AUTH ENDPOINTS ==========
app.post('/api/register', (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ error: 'Tüm alanlar zorunludur' });
    }

    let data = readJSONFile(usersFile);
    
    if (data.users.some(u => u.email === email)) {
        return res.status(400).json({ error: 'Bu e-posta zaten kullanılıyor' });
    }

    const user = {
        id: 'user-' + crypto.randomBytes(8).toString('hex'),
        name,
        email,
        password: hashPassword(password),
        balance: 0,
        createdAt: new Date().toISOString(),
        token: generateToken()
    };

    data.users.push(user);
    writeJSONFile(usersFile, data);

    // Canlı destek mesajları dosyası oluştur
    writeChatMessages(user.id, { userId: user.id, messages: [] });

    res.json({
        success: true,
        message: 'Kayıt başarılı',
        user: { id: user.id, name, email, token: user.token }
    });
});

app.post('/api/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'E-posta ve şifre gerekli' });
    }

    let data = readJSONFile(usersFile);
    const user = data.users.find(u => u.email === email && u.password === hashPassword(password));

    if (!user) {
        return res.status(401).json({ error: 'E-posta veya şifre hatalı' });
    }

    res.json({
        success: true,
        message: 'Giriş başarılı',
        user: { id: user.id, name: user.name, email, balance: user.balance, token: user.token }
    });
});

app.post('/api/admin/login', (req, res) => {
    const { email, password } = req.body;

    let data = readJSONFile(usersFile);
    const admin = data.admins.find(a => a.email === email && a.password === hashPassword(password));

    if (!admin) {
        return res.status(401).json({ error: 'Admin kimlik bilgileri hatalı' });
    }

    res.json({
        success: true,
        message: 'Admin girişi başarılı',
        admin: { id: admin.id, email, token: generateToken() }
    });
});

// ========== USER ENDPOINTS ==========
app.get('/api/user/:userId', (req, res) => {
    const { userId } = req.params;
    let data = readJSONFile(usersFile);
    const user = data.users.find(u => u.id === userId);

    if (!user) {
        return res.status(404).json({ error: 'Kullanıcı bulunamadı' });
    }

    res.json({
        id: user.id,
        name: user.name,
        email: user.email,
        balance: user.balance,
        createdAt: user.createdAt
    });
});

app.post('/api/user/:userId/add-balance', (req, res) => {
    const { userId } = req.params;
    const { amount } = req.body;

    let data = readJSONFile(usersFile);
    const user = data.users.find(u => u.id === userId);

    if (!user) {
        return res.status(404).json({ error: 'Kullanıcı bulunamadı' });
    }

    user.balance += parseFloat(amount);
    writeJSONFile(usersFile, data);

    res.json({
        success: true,
        message: 'Bakiye eklendi',
        newBalance: user.balance
    });
});

// ========== PAYMENT CONFIG ENDPOINTS ==========
app.get('/api/admin/payment-config', (req, res) => {
    const config = readJSONFile(paymentConfigFile);
    res.json(config);
});

app.post('/api/admin/payment-config/:method', (req, res) => {
    const { method } = req.params;
    const config = readJSONFile(paymentConfigFile);

    if (!config.paymentMethods[method]) {
        return res.status(404).json({ error: 'Ödeme yöntemi bulunamadı' });
    }

    config.paymentMethods[method] = {
        ...config.paymentMethods[method],
        ...req.body
    };

    writeJSONFile(paymentConfigFile, config);

    res.json({
        success: true,
        message: `${method} yöntemi güncellendi`,
        method: config.paymentMethods[method]
    });
});

app.get('/api/payment-methods', (req, res) => {
    const config = readJSONFile(paymentConfigFile);
    const enabledMethods = Object.entries(config.paymentMethods)
        .filter(([_, m]) => m.enabled)
        .map(([key, m]) => ({ id: key, name: m.name }));

    res.json(enabledMethods);
});

// ========== ORDERS ENDPOINTS ==========
app.post('/api/orders', (req, res) => {
    const { userId, packageId, price } = req.body;

    let ordersData = readJSONFile(ordersFile);
    let userData = readJSONFile(usersFile);
    
    const user = userData.users.find(u => u.id === userId);
    if (!user) {
        return res.status(404).json({ error: 'Kullanıcı bulunamadı' });
    }

    const order = {
        id: 'ORD-' + Date.now(),
        userId,
        packageId,
        price,
        status: 'Beklemede',
        paymentStatus: 'Ödeme Bekleniyor',
        code: null,
        number: null,
        createdAt: new Date().toISOString()
    };

    ordersData.orders.push(order);
    writeJSONFile(ordersFile, ordersData);

    res.json({
        success: true,
        message: 'Sipariş oluşturuldu. Canlı destek ile iletişime geçin.',
        order
    });
});

app.get('/api/orders/:userId', (req, res) => {
    const { userId } = req.params;
    let ordersData = readJSONFile(ordersFile);

    const userOrders = ordersData.orders.filter(o => o.userId === userId);
    res.json(userOrders);
});

app.post('/api/admin/orders/:orderId/update', (req, res) => {
    const { orderId } = req.params;
    const { code, number, status } = req.body;

    let ordersData = readJSONFile(ordersFile);
    const order = ordersData.orders.find(o => o.id === orderId);

    if (!order) {
        return res.status(404).json({ error: 'Sipariş bulunamadı' });
    }

    if (code) order.code = code;
    if (number) order.number = number;
    if (status) order.status = status;

    writeJSONFile(ordersFile, ordersData);

    res.json({
        success: true,
        message: 'Sipariş güncellendi',
        order
    });
});

// ========== CHAT ENDPOINTS ==========
app.get('/api/chat/:userId', (req, res) => {
    const { userId } = req.params;
    const messages = readChatMessages(userId);
    res.json(messages);
});

app.post('/api/chat/:userId/send', (req, res) => {
    const { userId } = req.params;
    const { sender, content } = req.body;

    if (!sender || !content) {
        return res.status(400).json({ error: 'Gönderen ve mesaj gerekli' });
    }

    let messages = readChatMessages(userId);

    messages.messages.push({
        sender,
        content,
        timestamp: new Date().toISOString(),
        read: false
    });

    writeChatMessages(userId, messages);

    res.json({
        success: true,
        message: 'Mesaj gönderildi',
        messages
    });
});

app.post('/api/chat/:userId/clear', (req, res) => {
    const { userId } = req.params;
    writeChatMessages(userId, { userId, messages: [] });

    res.json({
        success: true,
        message: 'Sohbet silindi'
    });
});

app.get('/api/admin/chats', (req, res) => {
    const files = fs.readdirSync(chatDir);
    const chats = [];

    files.forEach(file => {
        const content = JSON.parse(fs.readFileSync(path.join(chatDir, file), 'utf8'));
        if (content.messages.length > 0) {
            chats.push({
                userId: content.userId,
                messageCount: content.messages.length,
                lastMessage: content.messages[content.messages.length - 1]
            });
        }
    });

    res.json(chats);
});

// ========== NUMBERS ENDPOINTS ==========
app.get('/api/numbers', (req, res) => {
    const numbers = readJSONFile(numbersFile);
    res.json(numbers.categories);
});

app.post('/api/admin/numbers/category', (req, res) => {
    const { name, icon, platform } = req.body;
    let numbers = readJSONFile(numbersFile);

    const category = {
        id: platform.toLowerCase(),
        name,
        icon,
        platform,
        numbers: []
    };

    numbers.categories.push(category);
    writeJSONFile(numbersFile, numbers);

    res.json({
        success: true,
        message: 'Kategori oluşturuldu',
        category
    });
});

app.post('/api/admin/numbers/:categoryId/add', (req, res) => {
    const { categoryId } = req.params;
    const { number } = req.body;

    let numbers = readJSONFile(numbersFile);
    const category = numbers.categories.find(c => c.id === categoryId);

    if (!category) {
        return res.status(404).json({ error: 'Kategori bulunamadı' });
    }

    if (!category.numbers.includes(number)) {
        category.numbers.push(number);
        writeJSONFile(numbersFile, numbers);
    }

    res.json({
        success: true,
        message: 'Numara eklendi',
        category
    });
});

app.delete('/api/admin/numbers/:categoryId/:number', (req, res) => {
    const { categoryId, number } = req.params;

    let numbers = readJSONFile(numbersFile);
    const category = numbers.categories.find(c => c.id === categoryId);

    if (!category) {
        return res.status(404).json({ error: 'Kategori bulunamadı' });
    }

    category.numbers = category.numbers.filter(n => n !== decodeURIComponent(number));
    writeJSONFile(numbersFile, numbers);

    res.json({
        success: true,
        message: 'Numara silindi'
    });
});

app.get('/api/numbers/:categoryId/random', (req, res) => {
    const { categoryId } = req.params;
    const numbers = readJSONFile(numbersFile);
    const category = numbers.categories.find(c => c.id === categoryId);

    if (!category || category.numbers.length === 0) {
        return res.status(404).json({ error: 'Numara bulunamadı' });
    }

    const randomNumber = category.numbers[Math.floor(Math.random() * category.numbers.length)];

    res.json({
        success: true,
        number: randomNumber,
        category: category.name
    });
});

// ========== ADMIN ENDPOINTS ==========
app.get('/api/admin/users', (req, res) => {
    let data = readJSONFile(usersFile);
    res.json(data.users);
});

app.delete('/api/admin/users/:userId', (req, res) => {
    const { userId } = req.params;
    let data = readJSONFile(usersFile);

    data.users = data.users.filter(u => u.id !== userId);
    writeJSONFile(usersFile, data);

    // Canlı destek mesajlarını sil
    const chatFile = getChatFile(userId);
    if (fs.existsSync(chatFile)) {
        fs.unlinkSync(chatFile);
    }

    res.json({
        success: true,
        message: 'Kullanıcı silindi'
    });
});

app.post('/api/admin/users/:userId/ban', (req, res) => {
    const { userId } = req.params;
    let data = readJSONFile(usersFile);

    const user = data.users.find(u => u.id === userId);
    if (!user) {
        return res.status(404).json({ error: 'Kullanıcı bulunamadı' });
    }

    user.banned = true;
    writeJSONFile(usersFile, data);

    res.json({
        success: true,
        message: 'Kullanıcı banlandı'
    });
});

app.get('/api/admin/orders', (req, res) => {
    let ordersData = readJSONFile(ordersFile);
    res.json(ordersData.orders);
});

// ========== WHATSAPP INTEGRATION ==========
app.post('/api/whatsapp/send', (req, res) => {
    const { phoneNumber, orderId, orderDetails } = req.body;

    const message = `
🔐 *VerifyPro - Sipariş Bildirimi*

📦 *Sipariş No:* ${orderId}
💰 *Tutar:* ${orderDetails.price} ₺
📊 *Durum:* ${orderDetails.status}

Siparişiniz alınmıştır. Teslim için admin ile iletişime geçebilirsiniz.

👨‍💼 *Canlı Destek:* Sohbet Sistemi
📞 Destekle İletişim: Support@VerifyPro.com
    `;

    // Gerçek implementasyonda Twilio veya WhatsApp API kullanılır
    console.log(`WhatsApp mesajı gönderiliyor: ${phoneNumber}`);
    console.log(message);

    res.json({
        success: true,
        message: 'WhatsApp mesajı gönderildi'
    });
});

// ========== ERROR HANDLER ==========
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({
        error: 'Sunucu hatası',
        message: err.message
    });
});

// ========== SERVER START ==========
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`✅ Server http://localhost:${PORT} adresinde çalışıyor`);
    console.log('📂 Veri dosyaları:', dataDir);
    console.log('💾 Canlı destek mesajları:', chatDir);
});
