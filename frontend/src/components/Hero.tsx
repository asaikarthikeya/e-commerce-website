// src/components/Hero.tsx

import React, { useState } from 'react';
import './Hero.css';

export interface HeroProps {
  /** Called when the Shop Now button is clicked. 
      slideIndex: 0 = Kitchen, 1 = Electronics, 2 = Fashion */
  onShop: (slideIndex: number) => void;
}

const slides = [
  {
    title: 'Kitchen & Life Essentials',
    subtitle: 'Upgrade your home with the best kitchen and lifestyle items.',
    image: '/images/kitchen.png',
  },
  {
    title: 'Electronics & Gadgets',
    subtitle: 'Discover the latest in tech and accessories.',
    image: '/images/electronics.png',
  },
  {
    title: 'Fashion & Clothing',
    subtitle: 'Step out in style with our trending collections.',
    image: '/images/fashion.png',
  },
];

const Hero: React.FC<HeroProps> = ({ onShop }) => {
  const [index, setIndex] = useState(0);

  const prev = () =>
    setIndex((i) => (i === 0 ? slides.length - 1 : i - 1));
  const next = () =>
    setIndex((i) => (i === slides.length - 1 ? 0 : i + 1));

  return (
    <div className="hero-container">
      <div className="hero-inner">
        <button className="arrow left" onClick={prev}>
          ←
        </button>

        <div className="hero-text">
          <h1>{slides[index].title}</h1>
          <p>{slides[index].subtitle}</p>
          <button
            className="shop-now"
            onClick={() => onShop(index)}
          >
            Shop Now
          </button>
        </div>

        <div className="hero-image">
          <img
            src={slides[index].image}
            alt={slides[index].title}
          />
        </div>

        <button className="arrow right" onClick={next}>
          →
        </button>

        <div className="hero-dots">
          {slides.map((_, i) => (
            <span
              key={i}
              className={i === index ? 'dot active' : 'dot'}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
