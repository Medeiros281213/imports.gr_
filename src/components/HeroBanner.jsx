import { useState, useEffect } from "react";
import "../styles/hero.css";

function HeroBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      id: 1,
      badge: "Novo Lançamento",
      badgeClass: "",
      title: "Lattafa Yara",
      subtitle: "O perfume do momento. Fragrância doce e envolvente que conquistou o Brasil.",
      primaryLink: { label: "Ver Catálogo", href: "#catalogo" },
      secondaryLink: { label: "Fale Conosco", href: null, isWhatsapp: true },
      image: "/images/lattafa_yara_kit_1779845171171.png",
      whatsappMessage: "Olá! Quero saber mais sobre o Lattafa Yara que vi no site."
    },
    {
      id: 2,
      badge: "Frete Grátis",
      badgeClass: "badge-blue",
      title: "iPhone 16",
      subtitle: "Tecnologia premium com envio imediato e frete grátis para todo o Brasil.",
      primaryLink: { label: "Ver Catálogo", href: "#catalogo" },
      secondaryLink: { label: "Consultar Cores", href: null, isWhatsapp: true },
      image: "/images/iphone_16_1779845010068.png",
      whatsappMessage: "Olá! Tenho interesse no iPhone 16."
    },
    {
      id: 3,
      badge: "Promoção",
      badgeClass: "badge-promo",
      title: "Victoria's Secret",
      subtitle: "Linha completa de body splashes. Diversas fragrâncias com preços especiais.",
      primaryLink: { label: "Ver Catálogo", href: "#catalogo" },
      secondaryLink: { label: "Ver Opções", href: null, isWhatsapp: true },
      image: "/images/vs_bare_vanilla_1779845095216.png",
      whatsappMessage: "Olá! Quais Body Splash da Victoria's Secret vocês têm?"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const whatsappNumber = "5541997246465";

  return (
    <section className="hero" id="hero">
      <div className="hero-container">
        {slides.map((slide, index) => {
          const isActive = index === currentSlide;
          const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(slide.whatsappMessage)}`;

          return (
            <div
              key={slide.id}
              className={`hero-slide ${isActive ? 'active' : ''}`}
              style={{
                animation: isActive ? 'heroFadeIn 0.6s ease-out forwards' : 'none'
              }}
            >
              <span className={`hero-badge ${slide.badgeClass}`}>{slide.badge}</span>
              <h1 className="hero-title">{slide.title}</h1>
              <p className="hero-subtitle">{slide.subtitle}</p>

              <div className="hero-links">
                <a
                  href={slide.primaryLink.href}
                  className="hero-link-primary"
                  id={`hero-link-catalog-${slide.id}`}
                >
                  {slide.primaryLink.label} <span className="hero-link-chevron">›</span>
                </a>
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hero-link-secondary"
                  id={`hero-link-whatsapp-${slide.id}`}
                >
                  {slide.secondaryLink.label} <span className="hero-link-chevron">›</span>
                </a>
              </div>

              <div className="hero-image-wrapper">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="hero-image"
                />
              </div>
            </div>
          );
        })}

        <div className="hero-indicators">
          {slides.map((_, idx) => (
            <button
              key={idx}
              className={`hero-indicator ${idx === currentSlide ? 'active' : ''}`}
              onClick={() => setCurrentSlide(idx)}
              aria-label={`Ir para slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default HeroBanner;
