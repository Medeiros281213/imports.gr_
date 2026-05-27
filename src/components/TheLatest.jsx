import React, { useRef, useEffect } from 'react';
import '../styles/apple-store.css';

import produtos from '../data/produtos';

export default function TheLatest() {
  const carouselRef = useRef(null);
  const isHovered = useRef(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (carouselRef.current && !isHovered.current) {
        const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
        
        if (scrollWidth <= clientWidth) return;

        if (Math.ceil(scrollLeft + clientWidth) >= scrollWidth - 1) {
          carouselRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          carouselRef.current.scrollBy({ left: 1, behavior: 'auto' });
        }
      }
    }, 30);

    return () => clearInterval(interval);
  }, []);

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -420, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 420, behavior: 'smooth' });
    }
  };

  // Pegar os 4 primeiros produtos que têm badge de Lançamento, Novo ou Destaque
  const novidades = produtos
    .filter(p => p.badge === 'Lançamento' || p.badge === 'Novo' || p.badge === 'Destaque')
    .slice(0, 4)
    .map(p => ({
      id: p.id,
      tag: (p.badge || 'NOVIDADE').toUpperCase(),
      title: p.nome,
      subtitle: p.descricao.substring(0, 50) + '...',
      image: p.imagem,
      dark: p.categoria === 'Eletrônicos', // Exemplo: eletrônicos ficam com texto claro se o fundo for escuro (opcional)
    }));

  return (
    <section className="as-section">
      <div className="as-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>As novidades. <span style={{ color: 'var(--color-text-secondary)' }}>Veja o que acabou de chegar.</span></h2>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button 
            onClick={scrollLeft}
            style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--color-card-bg)', border: '1px solid var(--color-border)', color: 'var(--color-text-primary)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            ←
          </button>
          <button 
            onClick={scrollRight}
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
        {novidades.map(n => (
          <div 
            key={n.id} 
            className="as-card-snap" 
            style={{ 
              width: '400px', 
              height: '500px', 
              borderRadius: '18px', 
              background: 'var(--color-card-bg)',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '2px 4px 12px rgba(0,0,0,0.05)',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <div style={{ position: 'absolute', top: '30px', left: '30px', right: '30px', color: 'var(--color-text-primary)', zIndex: 10 }}>
              <p style={{ fontSize: '12px', fontWeight: '600', marginBottom: '8px' }}>{n.tag}</p>
              <h3 style={{ fontSize: '28px', fontWeight: '600', lineHeight: '1.1', marginBottom: '8px' }}>{n.title}</h3>
              <p style={{ fontSize: '17px', lineHeight: '1.2' }}>{n.subtitle}</p>
            </div>
            {n.image && (
                <div style={{ 
                    position: 'absolute', 
                    bottom: '0', 
                    left: '50%', 
                    transform: 'translateX(-50%)',
                    width: '80%', 
                    height: '60%', 
                    backgroundImage: `url(${n.image})`,
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'bottom'
                }}></div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
