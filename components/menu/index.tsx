'use client';

import { useRef, useState, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Image from 'next/image';
import { Category, Product } from '@/sanity.types';
import { urlFor } from '@/sanity/lib/image';

interface MenuProps {
  categories: Category[];
  productsByCategory: Record<string, Product[]>;
}

const Menu = ({ categories, productsByCategory }: MenuProps) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);

  // Get featured products from the first category or all products if no categories
  useEffect(() => {
    if (categories.length > 0) {
      const firstCategorySlug = categories[0].slug?.current;
      if (firstCategorySlug && productsByCategory[firstCategorySlug]) {
        setFeaturedProducts(productsByCategory[firstCategorySlug]);
      }
    }
  }, [categories, productsByCategory]);

  useGSAP(() => {
    gsap.fromTo('#title', { opacity: 0 }, { opacity: 1, duration: 1 });
    gsap.fromTo('.cocktail img', { opacity: 0, xPercent: -100 }, {
      xPercent: 0, opacity: 1, duration: 1, ease: 'power1.inOut'
    });
    gsap.fromTo('.details h2', { yPercent: 100, opacity: 0 }, {
      yPercent: 0, opacity: 1, ease: 'power1.inOut'
    });
    gsap.fromTo('.details p', { yPercent: 100, opacity: 0 }, {
      yPercent: 0, opacity: 1, ease: 'power1.inOut'
    });
  }, [currentIndex]);

  const totalProducts = featuredProducts.length;

  const goToSlide = (index: number) => {
    const newIndex = (index + totalProducts) % totalProducts;
    setCurrentIndex(newIndex);
  };

  const getProductAt = (indexOffset: number): Product | null => {
    if (featuredProducts.length === 0) return null;
    return featuredProducts[(currentIndex + indexOffset + totalProducts) % totalProducts];
  };

  const currentProduct = getProductAt(0);
  const prevProduct = getProductAt(-1);
  const nextProduct = getProductAt(1);

  // If no products, show loading or empty state
  if (!currentProduct) {
    return (
      <section id="menu" aria-labelledby="menu-heading">
        <div className="content">
          <div className="text-center">
            <p>Loading menu items...</p>
          </div>
        </div>
      </section>
    );
  }
  
  return (
    <section id="menu" aria-labelledby="menu-heading">
      <Image src="/images/slider-left-leaf.png" alt="left-leaf" width={300} height={400} id="m-left-leaf" />
      <Image src="/images/slider-right-leaf.png" alt="right-leaf" width={300} height={400} id="m-right-leaf" />
      
      <h2 id="menu-heading" className="sr-only">
        Coffee Menu
      </h2>

      <nav className="cocktail-tabs" aria-label="Coffee Navigation">
        {featuredProducts.map((product, index) => {
          const isActive = index === currentIndex;

          return (
            <button
              key={product._id}
              className={`${isActive ? 'text-white border-white' : 'text-white/50 border-white/50'}`}
              onClick={() => goToSlide(index)}
            >
              {product.name}
            </button>
          );
        })}
      </nav>
      
      <div className="content">
        <div className="arrows">
          <button className="text-left" onClick={() => goToSlide(currentIndex - 1)}>
            <span>{prevProduct?.name}</span>
            <Image src="/images/right-arrow.png" alt="right-arrow" width={24} height={24} aria-hidden="true" />
          </button>

          <button className="text-left" onClick={() => goToSlide(currentIndex + 1)}>
            <span>{nextProduct?.name}</span>
            <Image src="/images/left-arrow.png" alt="left-arrow" width={24} height={24} aria-hidden="true" />
          </button>
        </div>

        <div className="cocktail">
          <Image
            src={currentProduct.image ? urlFor(currentProduct.image).url() : '/images/coffee1.png'}
            alt={currentProduct.name || 'Product'}
            width={400}
            height={400}
            className="object-contain"
          />
        </div>

        <div className="recipe">
          <div ref={contentRef} className="info">
            <p>Product Profile:</p>
            <p id="title">{currentProduct.name}</p>
          </div>

          <div className="details">
            <h2>{currentProduct.label || 'Premium Quality'}</h2>
            <p>{currentProduct.description || 'A carefully crafted product made with the finest ingredients and attention to detail.'}</p>
            {currentProduct.price && (
              <div className="price mt-4">
                <span className="text-yellow-400 text-xl font-bold">${currentProduct.price}</span>
                {currentProduct.discount && currentProduct.discount > 0 && (
                  <span className="text-gray-400 text-sm ml-2">
                    ({currentProduct.discount}% off)
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Menu;
