import React, { useEffect, useState } from 'react';
import ModelCard from '../cards/ModelCard';
import styles from './Slide.module.css';

interface SlideProps {
  isActive: boolean;
  isVisited: boolean;
}

const ModelsSlide: React.FC<SlideProps> = ({ isActive, isVisited }) => {
  const [animateCards, setAnimateCards] = useState(false);

  const models = [
    { icon: '🤖', name: 'GPT', description: 'Модель от OpenAI' },
    { icon: '💎', name: 'Gemini', description: 'Модель от Google' },
    { icon: '🎭', name: 'Claude', description: 'Модель от Anthropic' },
    { icon: '🌙', name: 'Kimi', description: 'Модель от Moonshot AI' },
    { icon: '🔍', name: 'DeepSeek', description: 'Модель от DeepSeek' },
    { icon: '⚡', name: 'Grok', description: 'Модель от xAI' },
  ];

  // Разные паттерны задержек для более интересной анимации
  const animationDelays = ['0ms', '150ms', '100ms', '250ms', '200ms', '350ms'];

  useEffect(() => {
    if (isActive && !isVisited) {
      const timer = setTimeout(() => {
        setAnimateCards(true);
      }, 300);
      return () => clearTimeout(timer);
    } else if (isVisited) {
      setAnimateCards(true);
    }
  }, [isActive, isVisited]);

  return (
    <div className={styles.slideContent}>
      <h2>Протестированные модели</h2>
      <div className={styles.modelsGrid}>
        {models.map((model, index) => (
          <ModelCard
            key={model.name}
            icon={model.icon}
            name={model.name}
            description={model.description}
            animate={animateCards}
            animationDelay={animationDelays[index]}
          />
        ))}
      </div>
    </div>
  );
};

export default ModelsSlide;