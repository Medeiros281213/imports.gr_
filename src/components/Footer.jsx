import { FaWhatsapp, FaInstagram, FaTiktok } from "react-icons/fa";
import "../styles/footer.css";

function Footer() {
  return (
    <footer className="footer" id="contato">
      <div className="footer-top">
        <div className="footer-container">
          <div className="footer-column">
            <h4 className="footer-column-title">Navegação</h4>
            <ul className="footer-links">
              <li><a href="#hero">Home</a></li>
              <li><a href="#catalogo">Catálogo</a></li>
              <li><a href="#promocoes">Promoções</a></li>
              <li><a href="#depoimentos">Depoimentos</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4 className="footer-column-title">Categorias</h4>
            <ul className="footer-links">
              <li><a href="#catalogo">Perfumes</a></li>
              <li><a href="#catalogo">Body Splash</a></li>
              <li><a href="#catalogo">Eletrônicos</a></li>
              <li><a href="#catalogo">Cremes</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4 className="footer-column-title">Contato</h4>
            <ul className="footer-links">
              <li><a href="tel:+5541997246465">(41) 99724-6465</a></li>
              <li><a href="mailto:contato@importsgr.com">contato@importsgr.com</a></li>
              <li><span className="footer-text-muted">Entrega para todo o Brasil</span></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4 className="footer-column-title">Redes Sociais</h4>
            <ul className="footer-links">
              <li>
                <a
                  href="https://wa.me/5541997246465?text=Olá! Vim pelo site e gostaria de mais informações."
                  target="_blank"
                  rel="noopener noreferrer"
                  id="footer-whatsapp"
                >
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/imports.gr_/"
                  target="_blank"
                  rel="noopener noreferrer"
                  id="footer-instagram"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="#"
                  id="footer-tiktok"
                >
                  TikTok
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-legal">
        <div className="footer-legal-container">
          <p className="footer-disclaimer">
            Mais formas de comprar: <a href="https://wa.me/5541997246465" target="_blank" rel="noopener noreferrer">fale com um consultor</a> ou visite nosso <a href="https://www.instagram.com/imports.gr_/" target="_blank" rel="noopener noreferrer">Instagram</a>.
          </p>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-container">
          <p>Copyright © {new Date().getFullYear()} IMPORTS GR. Todos os direitos reservados.</p>
          <div className="footer-bottom-links">
            <a href="#">Política de Privacidade</a>
            <span className="footer-bottom-sep">|</span>
            <a href="#">Termos de Uso</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
