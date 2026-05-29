import React from 'react';
import produtos from '../data/produtos';
import { getTopDiscountProducts } from '../utils/product-pricing';
import '../styles/landing-page.css';

const ScarcityOffers = ({ limit = 3, title = "Maiores Promocoes", subtitle }) => {
  const topOffers = getTopDiscountProducts(produtos, limit);
  const whatsappNumber = '5541997246465';

  return (
    <section className="scarcity-section" id="promocoes">
      <h2 className="section-title">{title}</h2>
      {subtitle && <p className="section-subtitle">{subtitle}</p>}

      <div className="scarcity-grid">
        {topOffers.map((produto) => {
          const whatsappMessage = encodeURIComponent(`Ola! Quero garantir a oferta do ${produto.nome} que vi no site.`);
          const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

          return (
            <div key={produto.id} className="scarcity-card">
              <div className="urgency-badge">{produto.descontoPercentual}% OFF</div>
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
