import React, { useEffect, useMemo, useRef } from 'react';
import CardProduto from './CardProduto';
import '../styles/apple-store.css';

export default function ProductShelf({ title, subtitle, produtos }) {
  const carouselRef = useRef(null);
  const animationRef = useRef(null);
  const isHovered = useRef(false);
  const shouldLoop = produtos.length > 1;

  const carouselItems = useMemo(() => {
    if (!shouldLoop) return produtos;
    return [...produtos, ...produtos, ...produtos];
  }, [produtos, shouldLoop]);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel || !shouldLoop) return;

    const getCopyWidth = () => carousel.scrollWidth / 3;

    const centerCarousel = () => {
      carousel.scrollLeft = getCopyWidth();
    };

    const normalizeScroll = () => {
      const copyWidth = getCopyWidth();

      if (carousel.scrollLeft >= copyWidth * 2) {
        carousel.scrollLeft -= copyWidth;
      }

      if (carousel.scrollLeft <= 0) {
        carousel.scrollLeft += copyWidth;
      }
    };

    centerCarousel();

    const animate = () => {
      if (!isHovered.current) {
        normalizeScroll();
        carousel.scrollLeft += 0.45;
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    const handleResize = () => centerCarousel();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationRef.current);
    };
  }, [shouldLoop, produtos]);

  const normalizeAfterButtonScroll = () => {
    window.setTimeout(() => {
      const carousel = carouselRef.current;
      if (!carousel || !shouldLoop) return;

      const copyWidth = carousel.scrollWidth / 3;

      if (carousel.scrollLeft >= copyWidth * 2) {
        carousel.scrollLeft -= copyWidth;
      }

      if (carousel.scrollLeft <= 0) {
        carousel.scrollLeft += copyWidth;
      }
    }, 420);
  };

  const scrollLeftAction = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -320, behavior: 'smooth' });
      normalizeAfterButtonScroll();
    }
  };

  const scrollRightAction = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 320, behavior: 'smooth' });
      normalizeAfterButtonScroll();
    }
  };

  return (
    <section className="as-section" style={{ position: 'relative' }}>
      <div className="as-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>{title} <span style={{ color: 'var(--color-text-secondary)' }}>{subtitle}</span></h2>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={scrollLeftAction}
            aria-label="Produtos anteriores"
            style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--color-card-bg)', border: '1px solid var(--color-border)', color: 'var(--color-text-primary)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            &larr;
          </button>
          <button
            onClick={scrollRightAction}
            aria-label="Proximos produtos"
            style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--color-card-bg)', border: '1px solid var(--color-border)', color: 'var(--color-text-primary)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
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
          <div className="as-card-snap" style={{ width: '313px' }} key={`${p.id}-${i}`}>
            <CardProduto produto={p} index={i % Math.max(produtos.length, 1)} />
          </div>
        ))}
        {produtos.length === 0 && (
          <div style={{ padding: '20px', color: 'var(--color-text-secondary)' }}>
            Nenhum produto encontrado nesta categoria.
          </div>
        )}
      </div>
    </section>
  );
}
