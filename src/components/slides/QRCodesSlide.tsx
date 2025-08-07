import React from 'react';
import styles from './Slide.module.css';
import qrStyles from './QRCodesSlide.module.css';

interface SlideProps {
  isActive: boolean;
  isVisited: boolean;
}

const QRCodesSlide: React.FC<SlideProps> = ({ isActive, isVisited }) => {
  return (
    <div className={`${styles.slideContent} ${qrStyles.qrSlide}`}>
      <h2>Ссылки для быстрого доступа</h2>
      
      <div className={qrStyles.qrContainer}>
        <div className={qrStyles.qrCard}>
          <div className={qrStyles.qrCodeWrapper}>
            <img 
              src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent('https://github.com/sergeychernov/vibecoding-presentation')}`}
              alt="QR код репозитория"
              className={qrStyles.qrCode}
            />
          </div>
          <div className={qrStyles.qrInfo}>
            <h3>📁 GitHub Repository</h3>
            <p className={qrStyles.qrDescription}>Исходный код презентации</p>
            <a 
              href="https://github.com/sergeychernov/vibecoding-presentation" 
              target="_blank" 
              rel="noopener noreferrer"
              className={qrStyles.qrLink}
            >
              github.com/sergeychernov/vibecoding-presentation
            </a>
          </div>
        </div>

        <div className={qrStyles.qrCard}>
          <div className={qrStyles.qrCodeWrapper}>
            <img 
              src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent('https://sergeychernov.github.io/vibecoding-presentation/')}`}
              alt="QR код презентации"
              className={qrStyles.qrCode}
            />
          </div>
          <div className={qrStyles.qrInfo}>
            <h3>🎯 Презентация</h3>
            <p className={qrStyles.qrDescription}>Онлайн версия презентации</p>
            <a 
              href="https://sergeychernov.github.io/vibecoding-presentation/" 
              target="_blank" 
              rel="noopener noreferrer"
              className={qrStyles.qrLink}
            >
              sergeychernov.github.io/vibecoding-presentation
            </a>
          </div>
        </div>
      </div>

      <div className={qrStyles.footer}>
        <p>Отсканируйте QR-код камерой телефона для быстрого перехода</p>
      </div>
    </div>
  );
};

export default QRCodesSlide;