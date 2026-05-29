import React, { useEffect, useMemo, useRef } from 'react';
import CardProduto from './CardProduto';
import { groupProductVariations } from '../utils/product-grouping';
import '../styles/apple-store.css';

export default function ProductShelf({ title, subtitle, produtos }) {
  const carouselRef = useRef(null);
  const animationRef = useRef(null);
  const interactionTimeoutRef = useRef(null);
  const isHovered = useRef(false);
  const carouselItems = useMemo(() => groupProductVariations(produtos), [produtos]);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel || carouselItems.length < 2) return;

    const animate = () => {
      if (!isHovered.current) {
        const maxScrollLeft = carousel.scrollWidth - carousel.clientWidth;

        if (carousel.scrollLeft >= maxScrollLeft - 1) {
          carousel.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          carousel.scrollLeft += 0.45;
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.clearTimeout(interactionTimeoutRef.current);
    };
  }, [carouselItems.length]);

  const pauseAutoScroll = (duration = 900) => {
    isHovered.current = true;
    window.clearTimeout(interactionTimeoutRef.current);
    interactionTimeoutRef.current = window.setTimeout(() => {
      isHovered.current = false;
    }, duration);
  };

  const getScrollStep = () => {
    const carousel = carouselRef.current;
    const firstCard = carousel?.querySelector('.as-card-snap');

    if (!carousel || !firstCard) return 320;

    const carouselStyles = window.getComputedStyle(carousel);
    const gap = parseFloat(carouselStyles.columnGap || carouselStyles.gap) || 20;

    return firstCard.getBoundingClientRect().width + gap;
  };

  const normalizeAfterButtonScroll = () => {
    window.setTimeout(() => {
      const carousel = carouselRef.current;
      if (!carousel) return;

      const maxScrollLeft = carousel.scrollWidth - carousel.clientWidth;

      if (carousel.scrollLeft > maxScrollLeft) {
        carousel.scrollLeft = maxScrollLeft;
      }

      if (carousel.scrollLeft < 0) {
        carousel.scrollLeft = 0;
      }
    }, 420);
  };

  const scrollLeftAction = () => {
    if (carouselRef.current) {
      pauseAutoScroll();
      carouselRef.current.scrollBy({ left: -getScrollStep(), behavior: 'smooth' });
      normalizeAfterButtonScroll();
    }
  };

  const scrollRightAction = () => {
    if (carouselRef.current) {
      pauseAutoScroll();
      carouselRef.current.scrollBy({ left: getScrollStep(), behavior: 'smooth' });
      normalizeAfterButtonScroll();
    }
  };

  return (
    <section className="as-section">
      <div className="as-header as-shelf-header">
        <h2>{title} <span style={{ color: 'var(--color-text-secondary)' }}>{subtitle}</span></h2>

        <div className="as-shelf-controls">
          <button
            className="as-shelf-arrow"
            onClick={scrollLeftAction}
            aria-label="Produtos anteriores"
          >
            &larr;
          </button>
          <button
            className="as-shelf-arrow"
            onClick={scrollRightAction}
            aria-label="Proximos produtos"
          >
            &rarr;
          </button>
        </div>
      </div>

      <div
        className="as-carousel"
        ref={carouselRef}
        onMouseEnter={() => isHovered.current = true}
        onMouseLeave={() => isHovered.current = false}
        onTouchStart={() => isHovered.current = true}
        onTouchEnd={() => isHovered.current = false}
      >
        {carouselItems.map((p, i) => (
          <div className="as-card-snap" key={`${p.id}-${i}`}>
            <CardProduto produto={p} index={i} />
          </div>
        ))}
        {carouselItems.length === 0 && (
          <div style={{ padding: '20px', color: 'var(--color-text-secondary)' }}>
            Nenhum produto encontrado nesta categoria.
          </div>
        )}
      </div>
    </section>
  );
}
