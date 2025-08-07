import React from 'react';
import styles from './ModelCard.module.css';

interface ModelCardProps {
  icon: string;
  name: string;
  description: string;
  animate?: boolean;
  animationDelay?: string;
}

const ModelCard: React.FC<ModelCardProps> = ({ 
  icon, 
  name, 
  description, 
  animate = false,
  animationDelay = '0ms'
}) => {
  return (
    <div
      className={`${styles.modelCard} ${animate ? styles.animate : ''}`}
      style={{ animationDelay }}
      tabIndex={0}
    >
      <div className={styles.modelIcon}>{icon}</div>
      <h3>{name}</h3>
      <p>{description}</p>
    </div>
  );
};

export default ModelCard;