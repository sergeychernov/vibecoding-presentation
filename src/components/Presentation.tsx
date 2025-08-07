import React, { useState, useEffect, useCallback } from 'react';
import styles from './Presentation.module.css';
import TitleSlide from './slides/TitleSlide';
import ToolsOverviewSlide from './slides/ToolsOverviewSlide';
import ModelsSlide from './slides/ModelsSlide';
import ResultsSlide from './slides/ResultsSlide';
import ConclusionsSlide from './slides/ConclusionsSlide';

const Presentation: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(1);
  const totalSlides = 5;
  const [visitedSlides, setVisitedSlides] = useState(new Set([1]));

  const slides = [
    { id: 1, component: TitleSlide },
    { id: 2, component: ToolsOverviewSlide },
    { id: 3, component: ModelsSlide },
    { id: 4, component: ResultsSlide },
    { id: 5, component: ConclusionsSlide },
  ];

  const nextSlide = useCallback(() => {
    if (currentSlide < totalSlides) {
      const newSlide = currentSlide + 1;
      setCurrentSlide(newSlide);
      setVisitedSlides(prev => {
        const newSet = new Set(prev);
        newSet.add(newSlide);
        return newSet;
      });
    }
  }, [currentSlide, totalSlides]);

  const previousSlide = useCallback(() => {
    if (currentSlide > 1) {
      setCurrentSlide(currentSlide - 1);
    }
  }, [currentSlide]);

  const goToSlide = useCallback((slideNumber: number) => {
    if (slideNumber >= 1 && slideNumber <= totalSlides) {
      setCurrentSlide(slideNumber);
      setVisitedSlides(prev => {
        const newSet = new Set(prev);
        newSet.add(slideNumber);
        return newSet;
      });
    }
  }, [totalSlides]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowLeft':
        case 'ArrowUp':
          e.preventDefault();
          previousSlide();
          break;
        case 'ArrowRight':
        case 'ArrowDown':
        case ' ':
          e.preventDefault();
          nextSlide();
          break;
        case 'Home':
          if (!e.ctrlKey) {
            e.preventDefault();
            goToSlide(1);
          }
          break;
        case 'End':
          if (!e.ctrlKey) {
            e.preventDefault();
            goToSlide(totalSlides);
          }
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, previousSlide, goToSlide, totalSlides]);

  // Touch support
  useEffect(() => {
    let startX = 0;
    let startY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (!startX || !startY) return;

      const endX = e.changedTouches[0].clientX;
      const endY = e.changedTouches[0].clientY;
      const deltaX = startX - endX;
      const deltaY = startY - endY;

      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
        if (deltaX > 0) {
          nextSlide();
        } else {
          previousSlide();
        }
      }

      startX = 0;
      startY = 0;
    };

    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [nextSlide, previousSlide]);

  const progressPercentage = (currentSlide / totalSlides) * 100;

  return (
    <div className={styles.presentationContainer}>
      {/* Progress Bar */}
      <div className={styles.progressBar}>
        <div 
          className={styles.progressFill} 
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      {/* Navigation */}
      <nav className={styles.navigation}>
        <button 
          className={styles.navBtn} 
          onClick={previousSlide}
          disabled={currentSlide === 1}
          style={{ 
            opacity: currentSlide === 1 ? 0.5 : 1, 
            cursor: currentSlide === 1 ? 'not-allowed' : 'pointer' 
          }}
        >
          ← Назад
        </button>
        <span className={styles.slideCounter}>
          <span>{currentSlide}</span> / <span>{totalSlides}</span>
        </span>
        <button 
          className={styles.navBtn} 
          onClick={nextSlide}
          disabled={currentSlide === totalSlides}
          style={{ 
            opacity: currentSlide === totalSlides ? 0.5 : 1, 
            cursor: currentSlide === totalSlides ? 'not-allowed' : 'pointer' 
          }}
        >
          Вперед →
        </button>
      </nav>

      {/* Slides Container */}
      <div className={styles.slidesContainer}>
        {slides.map(({ id, component: SlideComponent }) => (
          <div
            key={id}
            className={`${styles.slide} ${
              id === currentSlide 
                ? styles.active 
                : id < currentSlide 
                  ? styles.prev 
                  : styles.next
            }`}
            data-slide={id}
          >
            <SlideComponent 
              isActive={id === currentSlide}
              isVisited={visitedSlides.has(id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Presentation;