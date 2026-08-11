import { NavLink, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

import logo from "../../assets/images/logo.png";
import { getSettings } from "../../api/settings";

function Navbar() {
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [settings, setSettings] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Products", path: "/products" },
    { name: "Showcase", path: "/showcase" },
    { name: "Careers", path: "/careers" },
    { name: "Contact", path: "/contact" },
  ];

  // =========================
  // LOAD SETTINGS
  // =========================

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const data = await getSettings();
        setSettings(data);
      } catch (error) {
        console.error(
          "Failed to load website settings:",
          error
        );
      }
    };

    loadSettings();
  }, []);

  // =========================
  // UPDATE FAVICON
  // =========================

  useEffect(() => {
    if (!settings?.favicon) return;

    const faviconUrl = settings.favicon.startsWith("http")
      ? settings.favicon
      : `http://127.0.0.1:8000${settings.favicon}`;

    let favicon = document.querySelector("link[rel='icon']");

    if (!favicon) {
      favicon = document.createElement("link");
      favicon.rel = "icon";
      document.head.appendChild(favicon);
    }

    favicon.href = `${faviconUrl}?v=${Date.now()}`;
  }, [settings?.favicon]);

  // =========================
  // NAVBAR SCROLL BEHAVIOR
  // =========================

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;

      if (currentScroll < 20) {
        setShowNavbar(true);
      } else if (currentScroll > lastScrollY) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }

      setLastScrollY(currentScroll);
    };

    window.addEventListener(
      "scroll",
      handleScroll
    );

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );
    };
  }, [lastScrollY]);

  // =========================
  // LOGO URL
  // =========================

  const logoUrl = settings?.logo
    ? settings.logo.startsWith("http")
      ? settings.logo
      : `http://127.0.0.1:8000${settings.logo}`
    : logo;

  return (
    <header
      className={`
        fixed
        top-0
        left-0
        w-full
        z-50
        transition-transform
        duration-500
        ease-in-out
        ${
          showNavbar
            ? "translate-y-0"
            : "-translate-y-full"
        }
      `}
      style={{
        /* VERY TRANSPARENT GLASS */
        background:
          "rgba(10, 10, 12, 0.12)",

        /* APPLE-STYLE GLASS */
        backdropFilter:
          "blur(22px) saturate(180%)",
        WebkitBackdropFilter:
          "blur(22px) saturate(180%)",

        /* SOFT SURROUNDING GLOW */
        boxShadow:
          "0 8px 40px rgba(255,255,255,0.12), 0 4px 80px rgba(255,255,255,0.06)",

        /* NO BORDER */
        border: "none",
      }}
    >

      {/* ==========================================
          NAVBAR CONTENT
          ========================================== */}

      <div
        style={{
          width: "100%",
          maxWidth: "1500px",
          margin: "0 auto",
          padding: "14px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          boxSizing: "border-box",
        }}
        className="lg:px-[44px]"
      >

        {/* ========================================
            LOGO
            ======================================== */}

        <Link
          to="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            textDecoration: "none",
            flexShrink: 0,
          }}
        >
          <img
            src={logoUrl}
            alt={
              settings?.company_name ||
              "TerraLens"
            }
            style={{
              width: "44px",
              height: "44px",
              objectFit: "contain",
              borderRadius: "8px",
            }}
          />

          <h1
            style={{
              margin: 0,
              fontSize: "1.6rem",
              fontWeight: "800",
              letterSpacing: "-0.03em",
              color: "#ffffff",

              /* BOLD WHITE GLOW */
              textShadow:
                "0 0 8px rgba(255,255,255,0.35), 0 2px 12px rgba(0,0,0,0.4)",
            }}
          >
            TerraLens
          </h1>
        </Link>

        {/* ========================================
            DESKTOP NAVIGATION
            ======================================== */}

        <nav
          className="hidden lg:flex"
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            gap: "42px",
          }}
        >
          {links.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              style={({ isActive }) => ({
                position: "relative",

                padding: "8px 2px",

                textDecoration: "none",

                /* ALWAYS WHITE */
                color: "#ffffff",

                fontSize: "15px",

                /* BOLD */
                fontWeight: "800",

                letterSpacing:
                  isActive
                    ? "0.04em"
                    : "0em",

                whiteSpace: "nowrap",

                /* GLOW AROUND TEXT */
                textShadow:
                  "0 0 8px rgba(255,255,255,0.45), 0 2px 10px rgba(0,0,0,0.45)",

                opacity: isActive
                  ? 1
                  : 0.88,

                transition:
                  "all 0.3s ease",

                background:
                  "transparent",

                border: "none",

                outline: "none",

                boxShadow: "none",
              })}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity =
                  "1";

                e.currentTarget.style.letterSpacing =
                  "0.05em";

                e.currentTarget.style.textShadow =
                  "0 0 12px rgba(255,255,255,0.75), 0 2px 12px rgba(0,0,0,0.5)";
              }}
              onMouseLeave={(e) => {
                const isActive =
                  e.currentTarget.getAttribute(
                    "aria-current"
                  ) === "page";

                e.currentTarget.style.opacity =
                  isActive
                    ? "1"
                    : "0.88";

                e.currentTarget.style.letterSpacing =
                  isActive
                    ? "0.04em"
                    : "0em";

                e.currentTarget.style.textShadow =
                  "0 0 8px rgba(255,255,255,0.45), 0 2px 10px rgba(0,0,0,0.45)";
              }}
            >
              {({ isActive }) => (
                <>
                  {item.name}

                  {/* ==================================
                      ACTIVE UNDERLINE
                      ================================== */}

                  <span
                    style={{
                      position: "absolute",

                      bottom: "-5px",

                      left: 0,

                      right: 0,

                      height: "2px",

                      borderRadius: "999px",

                      background:
                        "rgba(255,255,255,0.9)",

                      boxShadow:
                        "0 0 10px rgba(255,255,255,0.8)",

                      opacity: isActive
                        ? 1
                        : 0,

                      transform: isActive
                        ? "scaleX(1)"
                        : "scaleX(0)",

                      transformOrigin: "center",

                      transition:
                        "opacity 0.3s ease, transform 0.3s ease",
                    }}
                  />
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* ========================================
            MOBILE HAMBURGER BUTTON
            ======================================== */}

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden"
          style={{
            background: "transparent",
            border: "none",
            color: "#ffffff",
            cursor: "pointer",
            padding: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textShadow: "0 0 8px rgba(255,255,255,0.45)",
          }}
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

      </div>

      {/* ==========================================
          MOBILE DROPDOWN MENU
          ========================================== */}

      {isOpen && (
        <div
          className="lg:hidden"
          style={{
            background: "rgba(255, 255, 255, 0.92)",
            backdropFilter: "blur(22px) saturate(180%)",
            WebkitBackdropFilter: "blur(22px) saturate(180%)",
            borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
            padding: "24px",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            boxSizing: "border-box",
          }}
        >
          {links.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => setIsOpen(false)}
              style={({ isActive }) => ({
                position: "relative",
                padding: "8px 0",
                textDecoration: "none",
                color: "#111010",
                fontSize: "16px",
                fontWeight: "800",
                letterSpacing: isActive ? "0.04em" : "0em",
                textShadow: "0 0 8px rgba(255,255,255,0.45), 0 2px 10px rgba(0,0,0,0.45)",
                opacity: isActive ? 1 : 0.88,
                transition: "all 0.3s ease",
                background: "transparent",
                border: "none",
                outline: "none",
              })}
            >
              {item.name}
            </NavLink>
          ))}
        </div>
      )}
    </header>
  );
}

export default Navbar;