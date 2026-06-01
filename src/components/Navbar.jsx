import { useEffect, useRef, useState } from "react";
import { FiChevronDown, FiChevronRight, FiMenu, FiSearch, FiShoppingBag, FiUser, FiX } from "react-icons/fi";
import ModeToggle from "./ModeToggle";
import "../styles/navbar.css";

const menuItems = [
  { label: "Inicio", path: "/", target: "hero" },
  { label: "Catalogo", path: "/catalogo" },
  { label: "Promocoes", path: "/catalogo", target: "promocoes" },
  { label: "Avaliacoes", path: "/", target: "depoimentos" },
  { label: "Contato", path: "/", target: "contato" },
];

function Navbar({ onSearch, navigate, currentUser, onLogout }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const accountRef = useRef(null);

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
      if (event.key === "Escape") {
        setMenuOpen(false);
        setProfileOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.classList.remove("nav-menu-open");
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileOpen && accountRef.current && !accountRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };

    window.addEventListener("mousedown", handleClickOutside);
    return () => window.removeEventListener("mousedown", handleClickOutside);
  }, [profileOpen]);

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    if (onSearch) onSearch(term);
  };

  const handleMenuNavigation = (item) => {
    setMenuOpen(false);

    if (navigate) {
      navigate(item.path, item.target);
      return;
    }

    window.location.href = item.target ? `${item.path}#${item.target}` : item.path;
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

          <a
            href="/"
            className="apple-nav-logo"
            id="navbar-logo"
            aria-label="Imports GR"
            onClick={(event) => {
              if (!navigate) return;
              event.preventDefault();
              navigate("/", "hero");
            }}
          >
            <img src="/logo.png" alt="Imports GR" />
          </a>

          <div className="apple-nav-account" ref={accountRef}>
            <button
              className="apple-nav-login"
              type="button"
              onClick={() => {
                if (!currentUser) {
                  navigate?.("/login");
                  return;
                }
                setProfileOpen((open) => !open);
              }}
            >
              <FiUser />
              <span>{currentUser ? currentUser.name || "Minha conta" : "Login"}</span>
              {currentUser && <FiChevronDown />}
            </button>

            {currentUser && profileOpen && (
              <div className="apple-nav-account-menu">
                <button type="button" className="apple-nav-account-menu-item" onClick={() => { setProfileOpen(false); navigate?.("/profile"); }}>
                  <span>Perfil</span>
                </button>
                <button type="button" className="apple-nav-account-menu-item" onClick={() => { setProfileOpen(false); onLogout?.(); navigate?.("/"); }}>
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
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
            <button type="button" key={`${item.path}-${item.target || item.label}`} onClick={() => handleMenuNavigation(item)}>
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
