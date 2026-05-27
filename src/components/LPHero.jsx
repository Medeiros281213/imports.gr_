import React from 'react';
import '../styles/landing-page.css';

const LPHero = () => {
  const whatsappNumber = '5541997246465';
  const whatsappMessage = encodeURIComponent('Olá! Vim pelo site e quero ver as ofertas.');
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <section className="lp-hero-container">
      <div className="lp-hero-content">
        <h1 className="lp-headline">Importados 100% Originais Direto para Você.</h1>
        <p className="lp-subheadline">
          Perfumes e eletrônicos premium com preços exclusivos. Compre com segurança e envio imediato para todo o Brasil.
        </p>
        
        <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="cta-button">
          Ver Ofertas no WhatsApp
        </a>
        
        <div className="trust-badges">
          <span>🔒 Compra Segura</span>
          <span>•</span>
          <span>📦 Envio Expresso</span>
          <span>•</span>
          <span>⭐ 5/5 Avaliações</span>
        </div>
      </div>

      <div className="lp-hero-visual">
        <div className="lp-collage">
          <img 
            src="/images/afnan_9pm_perfume_1779844985702.png" 
            alt="Afnan 9PM" 
            className="img-side" 
          />
          <img 
            src="/images/iphone_16_1779845010068.png" 
            alt="iPhone 16" 
            className="img-main" 
          />
          <img 
            src="/images/lattafa_yara_kit_1779845171171.png" 
            alt="Lattafa Yara" 
            className="img-side" 
          />
        </div>
      </div>
    </section>
  );
};

export default LPHero;
