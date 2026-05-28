import React, { useEffect, useMemo, useState } from 'react';
import produtos from '../data/produtos';
import '../styles/landing-page.css';

const LPHero = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const whatsappNumber = '5541997246465';
  const whatsappMessage = encodeURIComponent('Ola! Vim pelo site e quero ver as ofertas.');
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  const showcaseProducts = useMemo(() => {
    const uniqueImages = new Map();

    produtos.forEach((produto) => {
      if (!uniqueImages.has(produto.imagem)) {
        uniqueImages.set(produto.imagem, produto);
      }
    });

    return Array.from(uniqueImages.values());
  }, []);

  useEffect(() => {
    if (showcaseProducts.length < 2) return;

    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % showcaseProducts.length);
    }, 2600);

    return () => window.clearInterval(interval);
  }, [showcaseProducts.length]);

  const getSlidePosition = (index) => {
    const total = showcaseProducts.length;
    const diff = (index - activeIndex + total) % total;

    if (diff === 0) return 'center';
    if (diff === 1) return 'right';
    if (diff === total - 1) return 'left';
    if (diff === total - 2) return 'hidden-left';
    return 'hidden-right';
  };

  return (
    <section className="lp-hero-container">
      <div className="lp-hero-content">
        <h1 className="lp-headline">Importados 100% Originais Direto para Voce.</h1>
        <p className="lp-subheadline">
          Perfumes e eletronicos premium com precos exclusivos. Compre com seguranca e envio imediato para todo o Brasil.
        </p>

        <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="cta-button">
          Ver Ofertas no WhatsApp
        </a>

        <div className="trust-badges">
          <span>Compra Segura</span>
          <span>•</span>
          <span>Envio Expresso</span>
          <span>•</span>
          <span>5/5 Avaliacoes</span>
        </div>
      </div>

      <div className="lp-hero-visual">
        <div className="lp-product-showcase" aria-label="Produtos em destaque">
          {showcaseProducts.map((produto, index) => {
            const position = getSlidePosition(index);

            return (
              <figure
                className={`lp-product-slide ${position}`}
                key={produto.id}
                aria-hidden={position === 'hidden-left' || position === 'hidden-right'}
              >
                <img src={produto.imagem} alt={produto.nome} />
              </figure>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default LPHero;
