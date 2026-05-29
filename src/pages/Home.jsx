import Topbar from "../components/Topbar";
import Navbar from "../components/Navbar";
import Depoimentos from "../components/Depoimentos";
import FAQ from "../components/FAQ";
import Footer from "../components/Footer";
import WhatsAppFloat from "../components/WhatsAppFloat";
import WelcomePopup from "../components/WelcomePopup";
import "../styles/card.css";

import LPHero from "../components/LPHero";
import Objections from "../components/Objections";
import ScarcityOffers from "../components/ScarcityOffers";

function Home({ navigate }) {
  const whatsappNumber = "5541997246465";
  const finalCtaMessage = encodeURIComponent("Ola! Quero aproveitar os estoques limitados e falar com um consultor agora.");
  const finalCtaLink = `https://wa.me/${whatsappNumber}?text=${finalCtaMessage}`;

  return (
    <div className="app-wrapper" style={{ backgroundColor: "var(--color-background)" }}>
      <Topbar />
      <Navbar navigate={navigate} />

      <main>
        <LPHero />
        <Objections />
        <ScarcityOffers
          title="Maiores Promocoes"
          subtitle="Selecionadas automaticamente pelo maior percentual de desconto."
        />

        <Depoimentos />
        <FAQ />

        <section className="final-cta-section">
          <div className="final-cta-content">
            <h2>Nao perca a chance. Estoques limitados.</h2>
            <p>Fale com um consultor agora e garanta seus produtos antes que acabem.</p>
            <a href={finalCtaLink} target="_blank" rel="noopener noreferrer" className="cta-button" style={{ animation: "pulse-green 2s infinite" }}>
              Comprar agora pelo WhatsApp
            </a>
          </div>
        </section>
      </main>

      <Footer navigate={navigate} />
      <WhatsAppFloat />
      <WelcomePopup />
    </div>
  );
}

export default Home;
