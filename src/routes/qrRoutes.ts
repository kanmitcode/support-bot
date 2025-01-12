import express from 'express';
import path from 'path';

const router = express.Router();

router.get('/api/qr', (req, res) => {
  const qrPath = path.join(__dirname, '../public/qr.png');
  res.sendFile(qrPath, (error) => {
    if (error) {
      res.status(500).send({ message: 'QR Code not available yet.', error });
    }
  });
});

export default router;
