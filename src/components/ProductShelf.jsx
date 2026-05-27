import React, { useRef, useEffect } from 'react';
import CardProduto from './CardProduto';
import '../styles/apple-store.css';

export default function ProductShelf({ title, subtitle, produtos }) {
  const carouselRef = useRef(null);
  const isHovered = useRef(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (carouselRef.current && !isHovered.current) {
        const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
        
        // Se todos os produtos já cabem na tela, não precisa rolar
        if (scrollWidth <= clientWidth) return;

        // Verifica se chegou no final (Math.ceil para corrigir erro de arredondamento)
        if (Math.ceil(scrollLeft + clientWidth) >= scrollWidth - 1) {
          carouselRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          carouselRef.current.scrollBy({ left: 1, behavior: 'auto' });
        }
      }
    }, 30); // Pan contínuo bem lento

    return () => clearInterval(interval);
  }, []);

  const scrollLeftAction = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -320, behavior: 'smooth' });
    }
  };

  const scrollRightAction = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 320, behavior: 'smooth' });
    }
  };

  return (
    <section className="as-section" style={{ position: 'relative' }}>
      <div className="as-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>{title} <span style={{ color: 'var(--color-text-secondary)' }}>{subtitle}</span></h2>
        
        <div style={{ display: 'flex', gap: '8px' }}>
          <button 
            onClick={scrollLeftAction}
            style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--color-card-bg)', border: '1px solid var(--color-border)', color: 'var(--color-text-primary)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            ←
          </button>
          <button 
            onClick={scrollRightAction}
            style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--color-card-bg)', border: '1px solid var(--color-border)', color: 'var(--color-text-primary)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            →
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
        {produtos.map((p, i) => (
          <div className="as-card-snap" style={{ width: '313px' }} key={p.id}>
             <CardProduto produto={p} index={i} />
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
