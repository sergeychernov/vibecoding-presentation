import React from 'react';
import styles from './TaskCard.module.css';

interface TaskCardProps {
  title: string;
  description: string;
  tool: string;
  rating: 'conditional' | 'satisfactory' | 'excellent';
  animate?: boolean;
  animationDelay?: string;
}

const TaskCard: React.FC<TaskCardProps> = ({
  title,
  description,
  tool,
  rating,
  animate = false,
  animationDelay = '0ms'
}) => {
  // Функция для получения иконки в зависимости от названия задачи
  const getTaskIcon = (taskTitle: string): string => {
    const title = taskTitle.toLowerCase();
    
    if (title.includes('тест')) return '🧪';
    if (title.includes('pipeline') || title.includes('github')) return '🔄';
    if (title.includes('лог') || title.includes('ошибок')) return '🔍';
    if (title.includes('ревью') || title.includes('код')) return '👀';
    if (title.includes('прототип')) return '🎨';
    if (title.includes('библиотек') || title.includes('обновление')) return '📦';
    if (title.includes('баг') || title.includes('фикс')) return '🐛';
    if (title.includes('бд') || title.includes('база')) return '🗄️';
    if (title.includes('документация')) return '📚';
    if (title.includes('перевод')) return '🌍';
    if (title.includes('регулярные') || title.includes('regex')) return '🔤';
    if (title.includes('npm') || title.includes('opensource')) return '📦';
    
    return '⚡'; // дефолтная иконка
  };

  return (
    <div
      className={`${styles.taskCard} ${animate ? styles.animate : ''} ${styles[rating]}`}
      style={{ animationDelay }}
      tabIndex={0}
    >
      <div className={`${styles.taskBorderLeft} ${styles[`border${rating.charAt(0).toUpperCase() + rating.slice(1)}`]}`}></div>
      
      <div className={styles.taskContent}>
        <h4 className={styles.taskTitle}>{title}</h4>
        <p className={styles.taskDescription}>{description}</p>
      </div>
      
      <div className={styles.taskFooter}>
        <span className={styles.taskTool}>{tool}</span>
        <div className={styles.taskIcon}>{getTaskIcon(title)}</div>
      </div>
    </div>
  );
};

export default TaskCard;