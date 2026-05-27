import React from 'react';
import '../styles/landing-page.css';

const Objections = () => {
  return (
    <section className="objections-section">
      <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '3rem' }}>
        Por que comprar na IMPORTS GR?
      </h2>
      <div className="objections-grid">
        <div className="guarantee-box">
          <span className="guarantee-icon">🛡️</span>
          <h3>100% Original e Lacrado</h3>
          <p>Trabalhamos apenas com produtos originais, novos e na caixa selada. Sua segurança e confiança em primeiro lugar.</p>
        </div>
        
        <div className="guarantee-box">
          <span className="guarantee-icon">🚀</span>
          <h3>Envio Rápido para todo Brasil</h3>
          <p>Despachamos seu pedido imediatamente após a confirmação. Receba rápido e com total rastreabilidade.</p>
        </div>
        
        <div className="guarantee-box">
          <span className="guarantee-icon">💎</span>
          <h3>Atendimento VIP</h3>
          <p>Suporte humanizado antes, durante e após a sua compra. Nossa equipe está pronta para tirar todas as suas dúvidas.</p>
        </div>
        
        <div className="guarantee-box">
          <span className="guarantee-icon">🤝</span>
          <h3>Garantia de Satisfação</h3>
          <p>Seu produto assegurado contra qualquer defeito. Oferecemos garantia completa para você comprar com tranquilidade.</p>
        </div>
      </div>
    </section>
  );
};

export default Objections;
