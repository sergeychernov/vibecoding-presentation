import React, { useEffect, useState } from 'react';
import styles from './ConclusionCard.module.css';

interface ConclusionCardProps {
  text: string;
  hasChart?: boolean;
  index: number;
  isVisible?: boolean;
  chart?: React.ReactNode;
  animate?: boolean;
  animationDelay?: string;
}

const ConclusionCard: React.FC<ConclusionCardProps> = ({ 
  text, 
  hasChart = false, 
  index, 
  isVisible = true,
  chart,
  animate = false,
  animationDelay = '0ms'
}) => {
  const [showExplosion, setShowExplosion] = useState(false);
  const [showLightning, setShowLightning] = useState(false);
  const [animateCard, setAnimateCard] = useState(false);

  useEffect(() => {
    if (animate) {
      // Используем animationDelay из пропсов
      const delay = parseInt(animationDelay) || 0;
      
      // Сначала показываем молнию
      const lightningTimer = setTimeout(() => {
        setShowLightning(true);
      }, delay);

      // Затем взрыв
      const explosionTimer = setTimeout(() => {
        setShowExplosion(true);
      }, delay + 100);

      // И наконец карточку
      const cardTimer = setTimeout(() => {
        setAnimateCard(true);
      }, delay + 300);

      // Убираем эффекты через некоторое время
      const cleanupTimer = setTimeout(() => {
        setShowExplosion(false);
        setShowLightning(false);
      }, delay + 1500);

      return () => {
        clearTimeout(lightningTimer);
        clearTimeout(explosionTimer);
        clearTimeout(cardTimer);
        clearTimeout(cleanupTimer);
      };
    }
  }, [animate, animationDelay]);

  const generateLightningPath = () => {
    const paths = [
      "M50,0 L45,20 L55,25 L40,45 L60,50 L35,70 L50,100",
      "M0,30 L20,25 L15,45 L35,40 L30,60 L50,55 L45,75 L70,70",
      "M100,20 L80,30 L90,50 L70,45 L75,65 L55,70 L60,90 L40,95"
    ];
    return paths[index % paths.length];
  };

  const generateExplosionParticles = () => {
    const particles = [];
    const particleCount = 12;
    
    for (let i = 0; i < particleCount; i++) {
      const angle = (360 / particleCount) * i;
      const distance = 50 + Math.random() * 30;
      const size = 3 + Math.random() * 4;
      
      particles.push(
        <div
          key={i}
          className={styles.explosionParticle}
          style={{
            '--angle': `${angle}deg`,
            '--distance': `${distance}px`,
            '--size': `${size}px`,
            '--delay': `${i * 20}ms`,
          } as React.CSSProperties}
        />
      );
    }
    return particles;
  };

  return (
    <div className={styles.cardContainer}>
      {/* Молния */}
      {showLightning && (
        <div className={styles.lightningContainer}>
          <svg className={styles.lightning} viewBox="0 0 100 100">
            <defs>
              <filter id={`glow-${index}`}>
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge> 
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            <path
              d={generateLightningPath()}
              stroke="#00d4ff"
              strokeWidth="2"
              fill="none"
              filter={`url(#glow-${index})`}
              className={styles.lightningPath}
            />
          </svg>
        </div>
      )}

      {/* Взрыв */}
      {showExplosion && (
        <div className={styles.explosionContainer}>
          <div className={styles.explosionCore} />
          <div className={styles.explosionRing} />
          <div className={styles.explosionShockwave} />
          {generateExplosionParticles()}
        </div>
      )}

      {/* Карточка */}
      <div
        className={`${styles.conclusionCard} ${animateCard ? styles.animate : ''} ${
          index % 2 === 0 ? styles.fromRight : styles.fromLeft
        }`}
        style={{
          animationDelay: animationDelay
        }}
        tabIndex={0}
      >
        <div className={`${styles.conclusionBorderLeft} ${styles.blue}`}></div>
        
        {/* Эффект энергетического поля */}
        <div className={styles.energyField}></div>
        
        {/* Частицы вокруг карточки */}
        <div className={styles.ambientParticles}>
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className={styles.ambientParticle}
              style={{
                '--particle-delay': `${i * 0.5}s`,
                '--particle-angle': `${i * 60}deg`,
              } as React.CSSProperties}
            />
          ))}
        </div>

        {hasChart && chart}
        <p>{text}</p>
      </div>
    </div>
  );
};

export default ConclusionCard;