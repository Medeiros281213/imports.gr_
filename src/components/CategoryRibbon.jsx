import React from 'react';
import '../styles/apple-store.css';

export default function CategoryRibbon({ categorias, ativa, setAtiva }) {
  const cats = categorias || [];

  return (
    <div className="as-carousel" style={{ gap: '30px', paddingBottom: '20px' }}>
      <div 
        className="as-card-snap" 
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer', gap: '8px' }}
        onClick={() => setAtiva('todos')}
      >
        <div style={{ 
          width: '74px', 
          height: '74px', 
          borderRadius: '50%', 
          background: ativa === 'todos' ? '#000' : '#f5f5f7',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: ativa === 'todos' ? '#fff' : '#1d1d1f',
          fontSize: '24px'
        }}>
          ∞
        </div>
        <span style={{ fontSize: '14px', fontWeight: ativa === 'todos' ? '600' : '400', color: '#1d1d1f' }}>Todos</span>
      </div>

      {cats.map((cat, i) => {
        if (cat.toLowerCase() === 'todos') return null;
        const isAtiva = ativa === cat;
        return (
          <div 
            key={i} 
            className="as-card-snap" 
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer', gap: '8px' }}
            onClick={() => setAtiva(cat)}
          >
            <div style={{ 
              width: '74px', 
              height: '74px', 
              borderRadius: '50%', 
              background: isAtiva ? '#000' : '#f5f5f7',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: isAtiva ? '#fff' : '#1d1d1f',
              fontSize: '20px',
              fontWeight: 'bold'
            }}>
              {cat.charAt(0).toUpperCase()}
            </div>
            <span style={{ fontSize: '14px', fontWeight: isAtiva ? '600' : '400', color: '#1d1d1f' }}>
              {cat}
            </span>
          </div>
        )
      })}
    </div>
  );
}
