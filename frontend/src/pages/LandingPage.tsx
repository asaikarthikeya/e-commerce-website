import React, { useState } from 'react';
import Hero from '../components/Hero';
import Header from '../components/Header';

const productData: Record<string, { featured: string[]; newCollection: string[] }> = {
  kitchen: {
    featured: ['f1.png', 'f2.png', 'f3.png', 'f4.png', 'f5.png'],
    newCollection: ['n1.png', 'n2.png', 'n3.png', 'n4.png', 'n5.png'],
  },
  electronics: {
    featured: ['f6.png', 'f7.png', 'f8.png', 'f9.png', 'f10.png'],
    newCollection: ['n6.png', 'n7.png', 'n8.png', 'n9.png', 'n10.png'],
  },
  fashion: {
    featured: ['f11.png', 'f12.png', 'f13.png', 'f14.png', 'f15.png'],
    newCollection: ['n11.png', 'n12.png', 'n13.png', 'n14.png', 'n15.png'],
  },
};

const LandingPage: React.FC = () => {
  const [category, setCategory] = useState<'kitchen' | 'electronics' | 'fashion'>('kitchen');

  return (
    <div>
      <Header />
      <Hero/>

      <section style={{ padding: '3rem 2rem' }}>
        <h2>Featured Products</h2>
        <div className="product-grid">
          {productData[category].featured.map((filename, i) => (
            <div className="product-card" key={`featured-${i}`}>
              <img src={`/images/products/${filename}`} alt={`Product ${i + 1}`} />
              <p>Product {i + 1}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: '3rem 2rem' }}>
        <h2>New Collection</h2>
        <div className="product-grid">
          {productData[category].newCollection.map((filename, i) => (
            <div className="product-card" key={`new-${i}`}>
              <img src={`/images/products/${filename}`} alt={`New ${i + 1}`} />
              <p>New {i + 1}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
