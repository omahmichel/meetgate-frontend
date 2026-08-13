import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const navigation = [
  { label: "Home", href: "#home" },
  { label: "Overview", href: "#overview" },
  { label: "Features", href: "#features" },
  { label: "Architecture", href: "#architecture" },
  { label: "Process", href: "#workflow" },
  { label: "Security", href: "#security" },
];

function Brand() {
  return (
    <Link className="brand" to="/" aria-label="MeetGate homepage">
      <span className="brand-mark" aria-hidden="true">
        <span />
        <span />
      </span>

      <span className="brand-copy">
        <strong>MeetGate</strong>
        <small>Zoom Integration System</small>
      </span>
    </Link>
  );
}

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    document.body.classList.toggle("menu-open", menuOpen);

    return () => {
      document.body.classList.remove("menu-open");
    };
  }, [menuOpen]);

  useEffect(() => {
    const sections = navigation
      .map(({ href }) => document.querySelector(href))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSection = entries.find((entry) => entry.isIntersecting);

        if (visibleSection) {
          setActiveSection(visibleSection.target.id);
        }
      },
      {
        rootMargin: "-35% 0px -55% 0px",
        threshold: 0,
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="site-header">
      <div className="container nav-container">
        <Brand />

        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((current) => !current)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav className={`main-nav ${menuOpen ? "open" : ""}`}>
          {navigation.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              className={activeSection === href.slice(1) ? "active" : ""}
              onClick={closeMenu}
            >
              {label}
            </a>
          ))}

          <Link to="/login" onClick={closeMenu}>
  Login
</Link>

<Link className="nav-button" to="/register" onClick={closeMenu}>
  Create Account
</Link>
        </nav>
      </div>
    </header>
  );
}

export { Brand };
export default Navbar;