import "../styles/footer.css";

function Footer({ navigate }) {
  const handleNavigate = (event, path, hash) => {
    if (!navigate) return;

    event.preventDefault();
    navigate(path, hash);
  };

  return (
    <footer className="footer" id="contato">
      <div className="footer-top">
        <div className="footer-container">
          <div className="footer-column">
            <h4 className="footer-column-title">Navegacao</h4>
            <ul className="footer-links">
              <li><a href="/" onClick={(event) => handleNavigate(event, "/", "hero")}>Home</a></li>
              <li><a href="/catalogo" onClick={(event) => handleNavigate(event, "/catalogo")}>Catalogo</a></li>
              <li><a href="/catalogo#promocoes" onClick={(event) => handleNavigate(event, "/catalogo", "promocoes")}>Promocoes</a></li>
              <li><a href="/#depoimentos" onClick={(event) => handleNavigate(event, "/", "depoimentos")}>Depoimentos</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4 className="footer-column-title">Categorias</h4>
            <ul className="footer-links">
              <li><a href="/catalogo" onClick={(event) => handleNavigate(event, "/catalogo")}>Perfumes</a></li>
              <li><a href="/catalogo" onClick={(event) => handleNavigate(event, "/catalogo")}>Body Splash</a></li>
              <li><a href="/catalogo" onClick={(event) => handleNavigate(event, "/catalogo")}>Eletronicos</a></li>
              <li><a href="/catalogo" onClick={(event) => handleNavigate(event, "/catalogo")}>Cremes</a></li>
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
                  href="https://wa.me/5541997246465?text=Ola! Vim pelo site e gostaria de mais informacoes."
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
                <a href="#" id="footer-tiktok">
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
          <p>Copyright {new Date().getFullYear()} IMPORTS GR. Todos os direitos reservados.</p>
          <div className="footer-bottom-links">
            <a href="#">Politica de Privacidade</a>
            <span className="footer-bottom-sep">|</span>
            <a href="#">Termos de Uso</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
