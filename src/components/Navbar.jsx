import { useEffect, useState } from "react";
import { FiChevronRight, FiMenu, FiSearch, FiShoppingBag, FiUser, FiX } from "react-icons/fi";
import ModeToggle from "./ModeToggle";
import "../styles/navbar.css";

const menuItems = [
  { label: "Inicio", target: "hero" },
  { label: "Catalogo", target: "catalogo" },
  { label: "Promocoes", target: "promocoes" },
  { label: "Avaliacoes", target: "depoimentos" },
  { label: "Contato", target: "contato" },
];

function Navbar({ onSearch }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("nav-menu-open", menuOpen);

    const handleKeyDown = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.classList.remove("nav-menu-open");
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    if (onSearch) onSearch(term);
  };

  const scrollToSection = (id) => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav className={`apple-nav ${scrolled ? "scrolled" : ""}`} id="navbar">
        <div className="apple-nav-container">
          <button
            className="apple-nav-menu-button"
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Abrir menu"
            aria-expanded={menuOpen}
          >
            <FiMenu />
            <span>Menu</span>
          </button>

          <a href="#hero" className="apple-nav-logo" id="navbar-logo" aria-label="Imports GR">
            <img src="/logo.png" alt="Imports GR" />
          </a>

          <button className="apple-nav-login" type="button">
            <FiUser />
            <span>Login</span>
          </button>
        </div>
      </nav>

      <button
        className={`apple-nav-backdrop ${menuOpen ? "active" : ""}`}
        type="button"
        aria-label="Fechar menu"
        onClick={() => setMenuOpen(false)}
      />

      <aside className={`apple-side-menu ${menuOpen ? "active" : ""}`} aria-hidden={!menuOpen}>
        <div className="apple-side-menu-header">
          <img src="/logo.png" alt="Imports GR" />
          <button type="button" onClick={() => setMenuOpen(false)} aria-label="Fechar menu">
            <FiX />
          </button>
        </div>

        <div className="apple-side-search">
          <FiSearch />
          <input
            type="text"
            placeholder="Buscar produtos..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>

        <nav className="apple-side-links" aria-label="Menu principal">
          {menuItems.map((item) => (
            <button type="button" key={item.target} onClick={() => scrollToSection(item.target)}>
              <span>{item.label}</span>
              <FiChevronRight />
            </button>
          ))}
        </nav>

        <div className="apple-side-actions">
          <div>
            <span className="apple-side-label">Tema</span>
            <ModeToggle />
          </div>
          <button type="button" className="apple-side-cart">
            <FiShoppingBag />
            <span>Carrinho</span>
          </button>
        </div>

        <div className="apple-side-promo">
          <strong>Frete gratis acima de R$299</strong>
          <span>Confira ofertas selecionadas no catalogo.</span>
        </div>
      </aside>
    </>
  );
}

export default Navbar;
