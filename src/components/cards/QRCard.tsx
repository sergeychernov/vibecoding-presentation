import React, { useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import styles from './QRCard.module.css';

interface QRCardProps {
  title: string;
  description: string;
  url: string;
  icon: string;
}

const QRCard: React.FC<QRCardProps> = ({ title, description, url, icon }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const generateQR = async () => {
      if (canvasRef.current) {
        try {
          await QRCode.toCanvas(canvasRef.current, url, {
            width: 200,
            margin: 2,
            color: {
              dark: '#000000',
              light: '#FFFFFF'
            },
            errorCorrectionLevel: 'M'
          });
        } catch (error) {
          console.error('Error generating QR code:', error);
        }
      }
    };

    generateQR();
  }, [url]);

  return (
    <div className={styles.qrCard}>
      <div className={styles.qrCodeWrapper}>
        <canvas 
          ref={canvasRef}
          className={styles.qrCode}
        />
      </div>
      <div className={styles.qrInfo}>
        <h3>{icon} {title}</h3>
        <p className={styles.qrDescription}>{description}</p>
        <a 
          href={url} 
          target="_blank" 
          rel="noopener noreferrer"
          className={styles.qrLink}
        >
          {url.replace(/^https?:\/\//, '')}
        </a>
      </div>
    </div>
  );
};

export default QRCard;