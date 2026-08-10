import { NavLink, Outlet } from "react-router-dom";
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

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "28px",
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