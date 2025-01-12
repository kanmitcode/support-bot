import QRCode from 'qrcode';

export const generateQRCode = async (qrData: string, filePath: string) => {
  try {
    await QRCode.toFile(filePath, qrData, {
      errorCorrectionLevel: 'H',
      type: 'png',
    });
    console.log('QR Code generated and saved at:', filePath);
  } catch (err) {
    console.error('Error generating QR code:', err);
  }
};
