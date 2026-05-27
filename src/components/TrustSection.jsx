import '../styles/trust.css';

function TrustSection() {
  const trustItems = [
    {
      id: 1,
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 18H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3.19M15 6h2.81M19 6h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2"/>
          <path d="M12 2v20"/>
          <rect x="7" y="10" width="10" height="8" rx="1"/>
          <path d="M7 10V8a5 5 0 0 1 10 0v2"/>
        </svg>
      ),
      title: "Produtos Originais",
      description: "100% autênticos com garantia."
    },
    {
      id: 2,
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="1" y="3" width="15" height="13" rx="2"/>
          <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
          <circle cx="5.5" cy="18.5" r="2.5"/>
          <circle cx="18.5" cy="18.5" r="2.5"/>
        </svg>
      ),
      title: "Envio Rápido",
      description: "Entrega segura para todo o Brasil."
    },
    {
      id: 3,
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          <path d="M9 12l2 2 4-4"/>
        </svg>
      ),
      title: "Compra Segura",
      description: "Pagamento blindado com Pix e cartão."
    },
    {
      id: 4,
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
      ),
      title: "Suporte Dedicado",
      description: "Atendimento humanizado via WhatsApp."
    }
  ];

  return (
    <section className="trust-section">
      <div className="trust-container">
        {trustItems.map((item, index) => (
          <div key={item.id} className="trust-item-wrapper">
            <div className="trust-item">
              <div className="trust-icon">{item.icon}</div>
              <div className="trust-info">
                <h3 className="trust-title">{item.title}</h3>
                <p className="trust-description">{item.description}</p>
              </div>
            </div>
            {index < trustItems.length - 1 && <div className="trust-divider" />}
          </div>
        ))}
      </div>
    </section>
  );
}

export default TrustSection;
