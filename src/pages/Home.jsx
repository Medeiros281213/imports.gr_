import React, { useState, useMemo, useEffect } from "react";
import Topbar from "../components/Topbar";
import Navbar from "../components/Navbar";
import CategoryRibbon from "../components/CategoryRibbon";
import ProductShelf from "../components/ProductShelf";
import Depoimentos from "../components/Depoimentos";
import FAQ from "../components/FAQ";
import Footer from "../components/Footer";
import WhatsAppFloat from "../components/WhatsAppFloat";
import WelcomePopup from "../components/WelcomePopup";
import produtos from "../data/produtos";
import "../styles/card.css";

// New Landing Page Components
import LPHero from "../components/LPHero";
import Objections from "../components/Objections";
import ScarcityOffers from "../components/ScarcityOffers";

function Home() {
  const [categoriaAtiva, setCategoriaAtiva] = useState("todos");
  const [termoBusca, setTermoBusca] = useState("");

  const categorias = ["Cremes", "Perfumes", "Body Splash", "Eletrônicos"];

  const produtosFiltrados = useMemo(() => {
    let filtrados = produtos;
    
    if (categoriaAtiva !== "todos") {
      filtrados = filtrados.filter((p) => p.categoria === categoriaAtiva);
    }
    
    if (termoBusca.trim() !== "") {
      const termo = termoBusca.toLowerCase();
      filtrados = filtrados.filter(
        (p) => 
          p.nome.toLowerCase().includes(termo) || 
          p.marca.toLowerCase().includes(termo) ||
          p.descricao.toLowerCase().includes(termo)
      );
    }
    
    return filtrados;
  }, [categoriaAtiva, termoBusca]);

  // Scroll Reveal Animation Hook
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animated");
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll(".animate-on-scroll");
    elements.forEach((el) => observer.observe(el));

    return () => elements.forEach((el) => observer.unobserve(el));
  }, [categoriaAtiva, termoBusca]);

  const whatsappNumber = '5541997246465';
  const finalCtaMessage = encodeURIComponent('Olá! Quero aproveitar os estoques limitados e falar com um consultor agora.');
  const finalCtaLink = `https://wa.me/${whatsappNumber}?text=${finalCtaMessage}`;

  return (
    <div className="app-wrapper" style={{ backgroundColor: 'var(--color-background)' }}>
      <Topbar />
      <Navbar onSearch={setTermoBusca} />
      
      <main>
        <LPHero />
        <Objections />
        <ScarcityOffers />
        
        {/* Catalog Section */}
        <div style={{ paddingTop: '4rem', paddingBottom: '2rem' }}>
          <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '2rem' }}>Nosso Catálogo</h2>
          <CategoryRibbon 
            categorias={categorias} 
            ativa={categoriaAtiva} 
            setAtiva={setCategoriaAtiva} 
          />
          
          {categoriaAtiva === "todos" && termoBusca === "" ? (
            <>
              {categorias.map(cat => {
                const prodsCat = produtos.filter(p => p.categoria === cat);
                if (prodsCat.length === 0) return null;
                
                return (
                  <ProductShelf 
                    key={cat}
                    title={`${cat}.`} 
                    subtitle="Explore as opções" 
                    produtos={prodsCat} 
                  />
                );
              })}
            </>
          ) : (
            <ProductShelf 
              title={termoBusca !== "" ? "Resultados da Busca" : `${categoriaAtiva}`} 
              subtitle={termoBusca !== "" ? `Buscando por "${termoBusca}"` : "Produtos selecionados"} 
              produtos={produtosFiltrados} 
            />
          )}
        </div>
        
        <Depoimentos />
        <FAQ />
        
        {/* Final Massive CTA Block */}
        <section className="final-cta-section">
          <div className="final-cta-content">
            <h2>Não perca a chance. Estoques limitados.</h2>
            <p>Fale com um consultor agora e garanta seus produtos antes que acabem.</p>
            <a href={finalCtaLink} target="_blank" rel="noopener noreferrer" className="cta-button" style={{ animation: 'pulse-green 2s infinite' }}>
              Comprar agora pelo WhatsApp
            </a>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppFloat />
      <WelcomePopup />
    </div>
  );
}

export default Home;