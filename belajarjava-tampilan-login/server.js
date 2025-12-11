const express  = require('express');
const path = require('path');
const { promisePool, testConnection } = require('./config/database');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/login', async (req, res) => {
    const { username, password } = req.body || {};

    if (!username || !password) {
        return res.status(400).json({ message: 'Username dan password diperlukan' });
    }
    
    try {
    // Query user dari database
    const [rows] = await promisePool.execute(
      'SELECT * FROM users WHERE Username = ? AND Password = ?',
      [username, password]
    );

    if (rows.length > 0) {
      const user = rows[0];
      return res.status(200).json({ 
        success: true, 
        message: `Login berhasil! Selamat datang` 
      });
    } else {
      return res.status(401).json({ 
        success: false, 
        message: 'Login gagal. Email atau password salah.' 
      });
    }
  } catch (error) {
    console.error('Database error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Terjadi kesalahan server. Silakan coba lagi.' 
    });
  }

});

app.get('/:path(*)', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});



app.listen(PORT,async () => {
    await testConnection();
    console.log(`Server berjalan di http://localhost:${PORT}`);
});