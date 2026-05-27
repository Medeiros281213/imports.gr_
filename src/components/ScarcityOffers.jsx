import React from 'react';
import produtos from '../data/produtos';
import '../styles/landing-page.css';

const ScarcityOffers = () => {
  // Get top 3 best-selling products
  const topOffers = produtos
    .filter(p => p.badge === "Mais Vendido" || p.badge === "Destaque")
    .slice(0, 3);

  const whatsappNumber = '5541997246465';

  return (
    <section className="scarcity-section">
      <h2 className="section-title">Ofertas Imperdíveis</h2>
      <div className="scarcity-grid">
        {topOffers.map(produto => {
          const whatsappMessage = encodeURIComponent(`Olá! Quero garantir a oferta do ${produto.nome} que vi no site.`);
          const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

          return (
            <div key={produto.id} className="scarcity-card">
              <div className="urgency-badge">⚠️ Apenas 2 unidades restantes!</div>
              <img src={produto.imagem} alt={produto.nome} className="scarcity-img" />
              
              <div className="scarcity-info">
                <h3>{produto.nome}</h3>
                <p style={{ color: '#6b7280', marginBottom: '1rem', fontSize: '0.9rem' }}>{produto.marca}</p>
                
                <div className="price-block">
                  <span className="price-old">De {produto.precoAntigo}</span>
                  <span className="price-new">Por {produto.preco}</span>
                </div>
              </div>
              
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="cta-button">
                Garantir Agora pelo WhatsApp
              </a>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ScarcityOffers;
