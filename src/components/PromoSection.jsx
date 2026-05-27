import { useState, useEffect } from "react";
import "../styles/promo.css";

function PromoSection() {
  const [timeLeft, setTimeLeft] = useState({
    dias: 0, horas: 0, minutos: 0, segundos: 0,
  });

  useEffect(() => {
    const promoEnd = new Date();
    promoEnd.setDate(promoEnd.getDate() + 3);
    promoEnd.setHours(23, 59, 59, 0);

    const timer = setInterval(() => {
      const now = new Date();
      const diff = promoEnd - now;

      if (diff <= 0) {
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        dias: Math.floor(diff / (1000 * 60 * 60 * 24)),
        horas: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutos: Math.floor((diff / (1000 * 60)) % 60),
        segundos: Math.floor((diff / 1000) % 60),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const pad = (n) => String(n).padStart(2, "0");

  return (
    <section className="promo-section" id="promocoes">
      <div className="promo-container">
        {/* Card 1: Main Promo */}
        <div className="promo-card promo-card-primary">
          <div className="promo-card-content">
            <span className="promo-card-label">Oferta por Tempo Limitado</span>
            <h2 className="promo-card-title">
              Até 30% OFF<br />em Perfumes Importados.
            </h2>
            <p className="promo-card-text">
              Fragrâncias originais das melhores marcas com preços que você não encontra em nenhum outro lugar.
            </p>
            <a
              href="https://wa.me/5541997246465?text=Olá! Vi a promoção no site e quero aproveitar os descontos!"
              target="_blank"
              rel="noopener noreferrer"
              className="promo-card-cta"
            >
              Aproveitar agora <span className="cta-arrow">→</span>
            </a>
          </div>
          <div className="promo-card-image-bg"></div>
        </div>

        {/* Card 2: Timer Card */}
        <div className="promo-card promo-card-secondary">
          <div className="promo-card-content">
            <span className="promo-card-label">Mega Promoção</span>
            <h2 className="promo-card-title">
              Eletrônicos<br />com desconto especial.
            </h2>
            <div className="promo-timer">
              <div className="timer-unit">
                <span className="timer-value">{pad(timeLeft.dias)}</span>
                <span className="timer-label">dias</span>
              </div>
              <span className="timer-colon">:</span>
              <div className="timer-unit">
                <span className="timer-value">{pad(timeLeft.horas)}</span>
                <span className="timer-label">hrs</span>
              </div>
              <span className="timer-colon">:</span>
              <div className="timer-unit">
                <span className="timer-value">{pad(timeLeft.minutos)}</span>
                <span className="timer-label">min</span>
              </div>
              <span className="timer-colon">:</span>
              <div className="timer-unit">
                <span className="timer-value">{pad(timeLeft.segundos)}</span>
                <span className="timer-label">seg</span>
              </div>
            </div>
            <a
              href="https://wa.me/5541997246465?text=Olá! Quero saber mais sobre a promoção de eletrônicos!"
              target="_blank"
              rel="noopener noreferrer"
              className="promo-card-cta promo-card-cta-dark"
            >
              Ver ofertas <span className="cta-arrow">→</span>
            </a>
          </div>
          <div className="promo-card-image-bg"></div>
        </div>
      </div>
    </section>
  );
}

export default PromoSection;
