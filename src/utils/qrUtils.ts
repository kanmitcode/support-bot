import QRCode from 'qrcode';
import * as fs from 'fs';

// Function to generate the QR code
export const generateQRCode = async (qrData: string, filePath: string) => {
  try {
    // Generate QR code as an image with valid options
    await QRCode.toFile(filePath, qrData, {
      errorCorrectionLevel: 'H', // Correct the error level here
      type: 'png',                // Define the image type
    });
    console.log('QR Code generated and saved at:', filePath);
  } catch (err) {
    console.error('Error generating QR code:', err);
  }
};
