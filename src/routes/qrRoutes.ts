import express from 'express';
import path from 'path';

const router = express.Router();

// Serve the QR code
router.get('/api/qr', (req, res) => {
  const qrPath = path.join(__dirname, '../public/qr.png');
  res.sendFile(qrPath, (err) => {
    if (err) {
      res.status(500).send('QR Code not available yet.');
    }
  });
});

export default router;
