import { useState, useEffect } from 'react';
import { FiX } from 'react-icons/fi';
import '../styles/popup.css';

function WelcomePopup() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hasSeenPopup = localStorage.getItem('importsgr-popup-seen');

    if (!hasSeenPopup) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem('importsgr-popup-seen', 'true');
  };

  const copyCode = () => {
    navigator.clipboard.writeText("BEMVINDO10");
    alert("Código copiado com sucesso!");
  };

  if (!isOpen) return null;

  return (
    <div className="popup-overlay" onClick={handleClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <button className="popup-close" onClick={handleClose} aria-label="Fechar">
          <FiX />
        </button>

        <div className="popup-body">
          <h2 className="popup-title">Ganhe 10% de desconto.</h2>
          <p className="popup-text">
            Bem-vindo à IMPORTS GR! Use o código abaixo na sua primeira compra via WhatsApp.
          </p>

          <div className="popup-code-box" onClick={copyCode} title="Clique para copiar">
            <span className="popup-code">BEMVINDO10</span>
            <span className="popup-code-hint">Toque para copiar</span>
          </div>

          <a
            href="https://wa.me/5541997246465?text=Olá! Quero usar meu cupom BEMVINDO10 na minha primeira compra."
            target="_blank"
            rel="noopener noreferrer"
            className="popup-cta"
            onClick={handleClose}
          >
            Usar cupom agora
          </a>

          <button className="popup-skip" onClick={handleClose}>
            Não, obrigado
          </button>
        </div>
      </div>
    </div>
  );
}

export default WelcomePopup;
