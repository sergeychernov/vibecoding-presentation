import React from 'react';
import styles from './TaskCard.module.css';

interface TaskCardProps {
  title: string;
  description: string;
  tool: string;
  rating: 'conditional' | 'satisfactory' | 'excellent';
  icon: string;
  animate?: boolean;
  animationDelay?: string;
}

const TaskCard: React.FC<TaskCardProps> = ({
  title,
  description,
  tool,
  rating,
  icon,
  animate = false,
  animationDelay = '0ms'
}) => {
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
        <div className={styles.taskIcon}>{icon}</div>
      </div>
    </div>
  );
};

export default TaskCard;