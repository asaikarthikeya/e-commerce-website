import React, { useState, useRef } from 'react';
import Hero, { HeroProps } from '../components/Hero';
import { useCart }        from '../contexts/CartContext';
import '../index.css';

type Category = 'kitchen' | 'electronics' | 'fashion';

const productData: Record<
  Category,
  { featured: string[]; newCollection: string[] }
> = {
  kitchen: {
    featured: ['f1.png','f2.png','f3.png','f4.png','f5.png'],
    newCollection: ['n1.png','n2.png','n3.png','n4.png','n5.png'],
  },
  electronics: {
    featured: ['f6.png','f7.png','f8.png','f9.png','f10.png'],
    newCollection: ['n6.png','n7.png','n8.png','n9.png','n10.png'],
  },
  fashion: {
    featured: ['p1.png','p2.png','p3.png','p4.png','p5.png'],
    newCollection: ['n11.png','n12.png','n13.png','n14.png','n15.png'],
  },
};

const PRICE_PER_ITEM = 10; // $10 each

const LandingPage: React.FC = () => {
  const [category, setCategory] = useState<Category>('kitchen');
  const sectionsRef = useRef<HTMLDivElement>(null);
  const { addToCart } = useCart();

  const handleShop: HeroProps['onShop'] = (index) => {
    const keys: Category[] = ['kitchen','electronics','fashion'];
    setCategory(keys[index]);
    sectionsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <Hero onShop={handleShop} />

      <div ref={sectionsRef}>
        {/* Featured Products */}
        <section style={{ padding: '3rem 2rem' }}>
          <h2>Featured Products</h2>
          <div className="product-grid">
            {productData[category].featured.map((file, i) => {
              const sku = `feat-${category}-${i}`;
              return (
                <div className="product-card" key={sku}>
                  <img
                    src={`/images/products/${file}`}
                    alt={`Product ${i + 1}`}
                  />
                  <p>Product {i + 1}</p>
                  <p className="price">${PRICE_PER_ITEM}</p>
                  <button
                    className="add-cart-icon"
                    onClick={() =>
                      addToCart({ sku, name: `Product ${i + 1}` })
                    }
                    title="Add to Cart"
                  >
                    🛒
                  </button>
                </div>
              );
            })}
          </div>
        </section>

        {/* New Collection */}
        <section style={{ padding: '3rem 2rem' }}>
          <h2>New Collection</h2>
          <div className="product-grid">
            {productData[category].newCollection.map((file, i) => {
              const sku = `new-${category}-${i}`;
              return (
                <div className="product-card" key={sku}>
                  <img
                    src={`/images/products/${file}`}
                    alt={`New ${i + 1}`}
                  />
                  <p>New {i + 1}</p>
                  <p className="price">${PRICE_PER_ITEM}</p>
                  <button
                    className="add-cart-icon"
                    onClick={() =>
                      addToCart({ sku, name: `New ${i + 1}` })
                    }
                    title="Add to Cart"
                  >
                    🛒
                  </button>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </>
  );
};

export default LandingPage;
