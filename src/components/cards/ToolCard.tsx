import React from 'react';
import styles from './ToolCard.module.css';

interface Feature {
  icon: string;
  text: string;
}

interface ToolCardProps {
  title: string;
  category: string;
  features: Feature[];
  note?: {
    type: 'note' | 'warning';
    text: string;
  };
  animate?: boolean;
  animationDelay?: string;
}

const ToolCard: React.FC<ToolCardProps> = ({ 
  title, 
  category, 
  features, 
  note, 
  animate = false,
  animationDelay = '0ms'
}) => {
  return (
    <div 
      className={`${styles.toolGroup} ${animate ? styles.animate : ''}`}
      style={{ animationDelay }}
    >
      <div className={styles.toolHeader}>
        <h3>{title}</h3>
        <p className={styles.toolCategory}>{category}</p>
      </div>
      <div className={styles.toolFeatures}>
        <div className={styles.featureGrid}>
          {features.map((feature, index) => (
            <div key={index} className={styles.featureItem}>
              <span className={styles.featureIcon}>{feature.icon}</span>
              <span>{feature.text}</span>
            </div>
          ))}
        </div>
        {note && (
          <div className={note.type === 'note' ? styles.toolNote : styles.toolWarning}>
            {note.text}
          </div>
        )}
      </div>
    </div>
  );
};

export default ToolCard;