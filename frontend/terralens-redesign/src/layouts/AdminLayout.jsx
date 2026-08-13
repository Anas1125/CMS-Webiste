import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getSettings } from "../api/settings";
import {
  LayoutDashboard,
  Settings,
  Image,
  Package,
  Briefcase,
  Images,
  BriefcaseBusiness,
  FileText,
  Mail,
  Handshake,
  LogOut,
} from "lucide-react";

const menu = [
  {
    title: "Dashboard",
    items: [
      {
        name: "Dashboard",
        path: "/admin/dashboard",
        icon: LayoutDashboard,
      },
    ],
  },

  {
    title: "Website",
    items: [
      {
        name: "Settings",
        path: "/admin/settings",
        icon: Settings,
      },
      {
        name: "Media Library",
        path: "/admin/media",
        icon: Image,
      },
    ],
  },

  {
    title: "Content",
    items: [
      {
        name: "Products",
        path: "/admin/products",
        icon: Package,
      },
      {
        name: "Services",
        path: "/admin/services",
        icon: Briefcase,
      },
      {
        name: "Showcase",
        path: "/admin/showcase",
        icon: Images,
      },
      {
        name: "Clients & Partners",
        path: "/admin/partners",
        icon: Handshake,
      },
    ],
  },

  {
    title: "Careers",
    items: [
      {
        name: "Jobs",
        path: "/admin/jobs",
        icon: BriefcaseBusiness,
      },
      {
        name: "Applications",
        path: "/admin/applications",
        icon: FileText,
      },
    ],
  },

  {
    title: "Communication",
    items: [
      {
        name: "Contacts",
        path: "/admin/contacts",
        icon: Mail,
      },
    ],
  },
];

export default function AdminLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");

    navigate("/admin/login", {
      replace: true,
    });
  };

  useEffect(() => {
    const loadFavicon = async () => {
      try {
        const settings = await getSettings();

        if (!settings?.favicon) return;

        const faviconUrl = settings.favicon.startsWith("http")
          ? settings.favicon
          : `${import.meta.env.VITE_API_URL}${settings.favicon}`;

        let favicon = document.querySelector("link[rel='icon']");

        if (!favicon) {
          favicon = document.createElement("link");
          favicon.rel = "icon";
          document.head.appendChild(favicon);
        }

        favicon.href = `${faviconUrl}?v=${Date.now()}`;
      } catch (error) {
        console.error("Failed to load favicon:", error);
      }
    };

    loadFavicon();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100vh",
        overflow: "hidden",
        background: "#f8fafc",
        color: "#0f172a",
      }}
    >
      {/* Sidebar */}

      <aside
        style={{
          width: "270px",
          height: "100vh",
          flexShrink: 0,
          position: "fixed",
          top: 0,
          left: 0,
          bottom: 0,
          overflowY: "auto",
          overflowX: "hidden",
          boxSizing: "border-box",
          background: "#ffffff",
          borderRight: "1px solid #e2e8f0",
          padding: "32px 24px",
          zIndex: 100,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h1
          style={{
            fontSize: "1.8rem",
            fontWeight: "700",
            marginBottom: "50px",
            color: "#0f172a",
          }}
        >
          TerraLens CMS
        </h1>

        {/* Navigation */}

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            minHeight: 0,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "28px",
              overflowY: "auto",
              paddingRight: "4px",
            }}
          >
            {menu.map((section) => (
              <div key={section.title}>
                <p
                  style={{
                    color: "#94a3b8",
                    fontSize: "12px",
                    textTransform: "uppercase",
                    letterSpacing: "2px",
                    marginBottom: "12px",
                    fontWeight: "600",
                  }}
                >
                  {section.title}
                </p>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                  }}
                >
                  {section.items.map((item) => {
                    const Icon = item.icon;

                    return (
                      <NavLink
                        key={item.path}
                        to={item.path}
                        style={({ isActive }) => ({
                          display: "flex",
                          alignItems: "center",
                          gap: "12px",
                          padding: "14px 18px",
                          borderRadius: "12px",
                          textDecoration: "none",

                          color: isActive
                            ? "#0284c7"
                            : "#475569",

                          background: isActive
                            ? "#e0f2fe"
                            : "transparent",

                          transition: ".3s",
                          fontWeight: 500,

                          border: isActive
                            ? "1px solid #bae6fd"
                            : "1px solid transparent",
                        })}
                      >
                        <Icon size={18} />

                        {item.name}
                      </NavLink>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Logout Button */}

          <button
            type="button"
            onClick={handleLogout}
            style={{
              marginTop: "20px",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              width: "100%",
              padding: "14px 18px",
              borderRadius: "12px",
              border: "1px solid #fecaca",
              background: "#fef2f2",
              color: "#dc2626",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: 500,
              transition: ".3s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#fee2e2";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#fef2f2";
            }}
          >
            <LogOut size={18} />

            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}

      <main
        style={{
          marginLeft: "270px",
          width: "calc(100% - 270px)",
          height: "100vh",
          overflowY: "auto",
          overflowX: "hidden",
          padding: "40px",
          boxSizing: "border-box",
          background: "#f8fafc",
        }}
      >
        <Outlet />
      </main>
    </div>
  );
}