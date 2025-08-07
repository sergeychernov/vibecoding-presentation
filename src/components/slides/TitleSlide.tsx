import React from 'react';
import styles from './Slide.module.css';
import titleStyles from './TitleSlide.module.css';

interface SlideProps {
  isActive: boolean;
  isVisited: boolean;
}

const TitleSlide: React.FC<SlideProps> = ({ isActive, isVisited }) => {
  return (
    <div className={`${styles.slideContent} ${titleStyles.titleSlide}`}>
      <h1>Использование AI инструментов в разработке</h1>
      <p className={titleStyles.subtitle}>Опыт внедрения и анализ эффективности</p>
      <div className={titleStyles.titleDecoration}>
        <div className={titleStyles.decorationCircle}></div>
        <div className={titleStyles.decorationCircle}></div>
        <div className={titleStyles.decorationCircle}></div>
      </div>
    </div>
  );
};

export default TitleSlide;