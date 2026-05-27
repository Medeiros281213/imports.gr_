import React from 'react';
import '../styles/apple-store.css';

export default function HelpIsHere() {
  const helps = [
    {
      id: 1,
      icon: '📦',
      title: 'Frete Grátis.',
      desc: 'Fazemos entregas Curitiba região.',
    },
    {
      id: 3,
      icon: '💳',
      title: 'Parcelamento.',
      desc: 'Em até 12x no cartão de crédito.',
    },
    {
      id: 4,
      icon: '💬',
      title: 'Suporte VIP.',
      desc: 'Atendimento personalizado via WhatsApp.',
    }
  ];

  return (
    <section className="as-section">
      <div className="as-header">
        <h2>A diferença IMPORTS GR. <span style={{ color: '#6e6e73' }}>Razões para comprar com a gente.</span></h2>
      </div>
      <div className="as-carousel">
        {helps.map(h => (
          <div 
            key={h.id} 
            className="as-card-snap" 
            style={{ 
              width: '313px', 
              height: '240px', 
              borderRadius: '18px', 
              background: '#f5f5f7',
              padding: '30px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              boxShadow: '2px 4px 12px rgba(0,0,0,0.02)',
            }}
          >
            <div style={{ fontSize: '40px', marginBottom: '16px' }}>{h.icon}</div>
            <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#1d1d1f', marginBottom: '8px' }}>{h.title}</h3>
            <p style={{ fontSize: '16px', color: '#1d1d1f', lineHeight: '1.4' }}>{h.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
