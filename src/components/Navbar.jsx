import { useState, useEffect } from "react";
import { FiSearch, FiShoppingBag, FiMenu, FiX } from "react-icons/fi";
import "../styles/navbar.css";

function Navbar({ onSearch }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    if (onSearch) onSearch(term);
  };

  const scrollToSection = (id) => {
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className={`apple-nav ${scrolled ? 'scrolled' : ''}`} id="navbar">
      <div className="apple-nav-container">
        {/* Logo */}
        <a href="#" className="apple-nav-logo" id="navbar-logo">
          IMPORTS <span>GR</span>
        </a>

        {/* Desktop Menu - simple text links */}
        <ul className="apple-nav-menu" id="navbar-menu">
          <li onClick={() => scrollToSection('hero')}>Início</li>
          <li onClick={() => scrollToSection('catalogo')}>Catálogo</li>
          <li onClick={() => scrollToSection('promocoes')}>Promoções</li>
          <li onClick={() => scrollToSection('depoimentos')}>Avaliações</li>
          <li onClick={() => scrollToSection('contato')}>Contato</li>
        </ul>

        {/* Right side actions */}
        <div className="apple-nav-actions">
          <button className={`apple-nav-btn ${searchOpen ? 'active' : ''}`} onClick={() => setSearchOpen(!searchOpen)} id="search-toggle" aria-label="Buscar">
            <FiSearch />
          </button>
          <button className="apple-nav-btn" id="navbar-cart" aria-label="Carrinho">
            <FiShoppingBag />
          </button>
          <button className={`apple-nav-hamburger ${mobileOpen ? 'active' : ''}`} onClick={() => setMobileOpen(!mobileOpen)} id="hamburger" aria-label="Menu">
            {mobileOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {/* Search bar dropdown */}
      {searchOpen && (
        <div className="apple-nav-search" id="search-bar">
          <div className="apple-nav-search-inner">
            <FiSearch className="search-icon" />
            <input
              type="text"
              placeholder="Buscar produtos..."
              className="apple-nav-search-input"
              id="search-input"
              value={searchTerm}
              onChange={handleSearchChange}
              autoFocus
            />
          </div>
        </div>
      )}

      {/* Mobile menu */}
      <div className={`apple-nav-mobile ${mobileOpen ? 'active' : ''}`} id="mobile-menu">
        <ul>
          <li onClick={() => scrollToSection('hero')}>Início</li>
          <li onClick={() => scrollToSection('catalogo')}>Catálogo</li>
          <li onClick={() => scrollToSection('promocoes')}>Promoções</li>
          <li onClick={() => scrollToSection('depoimentos')}>Avaliações</li>
          <li onClick={() => scrollToSection('contato')}>Contato</li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;