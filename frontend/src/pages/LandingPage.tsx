// src/pages/LandingPage.tsx

import React, { useState, useRef } from 'react';
import Header from '../components/Header';
import Hero, { HeroProps } from '../components/Hero';
import '../index.css'; // assuming this contains .product-grid, .product-card, etc.

type Category = 'kitchen' | 'electronics' | 'fashion';

const productData: Record<Category, { featured: string[]; newCollection: string[] }> = {
  kitchen: {
    featured: ['f1.png','f2.png','f3.png','f4.png','f5.png'],
    newCollection: ['n1.png','n2.png','n3.png','n4.png','n5.png'],
  },
  electronics: {
    featured: ['f6.png','f7.png','f8.png','f9.png','f10.png'],
    newCollection: ['n6.png','n7.png','n8.png','n9.png','n10.png'],
  },
  fashion: {
    featured: ['f11.png','f12.png','f13.png','f14.png','f15.png'],
    newCollection: ['n11.png','n12.png','n13.png','n14.png','n15.png'],
  },
};

const LandingPage: React.FC = () => {
  // Which category to show
  const [category, setCategory] = useState<Category>('kitchen');
  // Ref to scroll into
  const sectionsRef = useRef<HTMLDivElement>(null);

  // Called by Hero when "Shop Now" is clicked
  const handleShop: HeroProps['onShop'] = (slideIndex) => {
    const keys: Category[] = ['kitchen', 'electronics', 'fashion'];
    const newCat = keys[slideIndex];
    setCategory(newCat);

    // Scroll the product sections into view
    sectionsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* Pass our handler into Hero */}
      <Hero onShop={handleShop} />

      {/* Wrap both sections so we can scroll here */}
      <div ref={sectionsRef}>
        {/* Featured Products */}
        <section style={{ padding: '3rem 2rem' }}>
          <h2>Featured Products</h2>
          <div className="product-grid">
            {productData[category].featured.map((img, i) => (
              <div className="product-card" key={`feat-${i}`}>
                <img
                  src={`/images/products/${img}`}
                  alt={`Product ${i + 1}`}
                />
                <p>Product {i + 1}</p>
              </div>
            ))}
          </div>
        </section>

        {/* New Collection */}
        <section style={{ padding: '3rem 2rem' }}>
          <h2>New Collection</h2>
          <div className="product-grid">
            {productData[category].newCollection.map((img, i) => (
              <div className="product-card" key={`new-${i}`}>
                <img
                  src={`/images/products/${img}`}
                  alt={`New ${i + 1}`}
                />
                <p>New {i + 1}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default LandingPage;
