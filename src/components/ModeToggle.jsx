import { useEffect, useRef, useState } from "react";
import { FiCheck, FiChevronDown, FiMoon, FiSun } from "react-icons/fi";
import { useTheme } from "./theme-provider";
import "../styles/mode-toggle.css";

const options = [
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
  { value: "system", label: "System" },
];

function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleThemeChange = (nextTheme) => {
    setTheme(nextTheme);
    setOpen(false);
  };

  return (
    <div className="mode-toggle" ref={menuRef}>
      <button
        className={`apple-nav-btn mode-toggle-trigger ${open ? "active" : ""}`}
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-label="Alterar tema"
        aria-expanded={open}
      >
        <FiSun className="mode-toggle-icon mode-toggle-sun" />
        <FiMoon className="mode-toggle-icon mode-toggle-moon" />
        <FiChevronDown className="mode-toggle-chevron" />
        <span className="sr-only">Alterar tema</span>
      </button>

      {open && (
        <div className="mode-toggle-menu" role="menu">
          {options.map((option) => (
            <button
              className="mode-toggle-item"
              type="button"
              key={option.value}
              onClick={() => handleThemeChange(option.value)}
              role="menuitem"
            >
              <span>{option.label}</span>
              {theme === option.value && <FiCheck />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default ModeToggle;
