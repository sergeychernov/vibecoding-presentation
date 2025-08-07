import React from 'react';
import styles from './Slide.module.css';
import qrStyles from './QRCodesSlide.module.css';
import QRCard from '../cards/QRCard';

interface SlideProps {
  isActive: boolean;
  isVisited: boolean;
}

const QRCodesSlide: React.FC<SlideProps> = ({ isActive, isVisited }) => {
  return (
    <div className={`${styles.slideContent} ${qrStyles.qrSlide}`}>
      <h2>Ссылки для быстрого доступа</h2>
      
      <div className={qrStyles.qrContainer}>
        <QRCard
          title="GitHub Repository"
          description="Исходный код презентации"
          url="https://github.com/sergeychernov/vibecoding-presentation"
          icon="📁"
        />
        
        <QRCard
          title="Презентация"
          description="Онлайн версия презентации"
          url="https://sergeychernov.github.io/vibecoding-presentation/"
          icon="🎯"
        />
      </div>

      <div className={qrStyles.footer}>
        <p>Отсканируйте QR-код камерой телефона для быстрого перехода</p>
      </div>
    </div>
  );
};

export default QRCodesSlide;