import React, { useState } from 'react';
import '../../styles/layout/_scroll-top-button.scss';

function ScrollTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  function handleScroll() {
    if (window.pageYOffset > 200) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }

  function handleClick() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  window.addEventListener('scroll', handleScroll);

  return (
    <button className={`scroll-top-btn ${isVisible ? 'is-visible' : ''}`} title="Scroll to top" onClick={handleClick}>
      <i className="fas fa-arrow-up scroll-top-btn__icon"></i>
    </button>
  );
}

export default ScrollTopButton;