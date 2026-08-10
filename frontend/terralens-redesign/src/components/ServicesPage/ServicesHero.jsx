import { motion } from "framer-motion";
import {
  ArrowDown,
  Globe2,
  Code2,
  MapPinned,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/client";

export default function ServicesHero() {
  const navigate = useNavigate();

  const [settings, setSettings] = useState(null);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const { data } = await api.get("/settings/");
        setSettings(data);
      } catch (error) {
        console.error("Failed to load settings:", error);
      }
    };

    loadSettings();
  }, []);

  const backgroundVideo = settings?.services_video
    ? `http://127.0.0.1:8000${settings.services_video}`
    : null;

  const scrollToServices = () => {
    const section = document.getElementById("services-list");

    if (!section) {
      console.error("services-list section not found");
      return;
    }

    const y =
      section.getBoundingClientRect().top +
      window.scrollY -
      20;

    window.scrollTo({
      top: y,
      behavior: "smooth",
    });
  };

  return (
    <section className="w-full bg-white pb-40 mb-20"
      style={{ 
        position: "relative",
        overflow: "hidden",
        backgroundColor: "#050505",
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        boxSizing: "border-box",
      }}
    >
      {/* =========================================================
          BACKGROUND VIDEO
      ========================================================= */}

      {backgroundVideo && (
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
            opacity: 0.65,
            zIndex: 0,
          }}
        >
          <source
            src={backgroundVideo}
            type="video/mp4"
          />
        </video>
      )}

      {/* =========================================================
          VIDEO OVERLAY
      ========================================================= */}

      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(rgba(5,5,5,.25), rgba(5,5,5,.4))",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />

      {/* =========================================================
          BACKGROUND GLOWS
      ========================================================= */}

      <div
        style={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",
          pointerEvents: "none",
          zIndex: 2,
        }}
      >
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: 0,
            height: "500px",
            width: "500px",
            transform: "translateX(-50%)",
            borderRadius: "9999px",
            backgroundColor: "rgba(56,189,248,0.08)",
            filter: "blur(140px)",
          }}
        />

        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            height: "288px",
            width: "288px",
            borderRadius: "9999px",
            backgroundColor: "rgba(56,189,248,0.05)",
            filter: "blur(120px)",
          }}
        />

        <div
          style={{
            position: "absolute",
            top: "80px",
            right: "-10%",
            height: "384px",
            width: "384px",
            borderRadius: "9999px",
            backgroundColor: "rgba(59,130,246,0.08)",
            filter: "blur(140px)",
          }}
        />
      </div>

      {/* =========================================================
          GRID PATTERN
      ========================================================= */}

      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.03,
          pointerEvents: "none",
          zIndex: 3,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.2) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* =========================================================
          MAIN WRAPPER
      ========================================================= */}

      <div
        style={{
          position: "relative",
          zIndex: 10,
          margin: "0 auto",
          width: "100%",
          maxWidth: "85rem",
          padding: "128px 24px",
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(320px, 1fr))",
          alignItems: "center",
          gap: "64px",
          boxSizing: "border-box",
        }}
      >
        {/* =====================================================
            LEFT COLUMN
        ===================================================== */}

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            boxSizing: "border-box",
          }}
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{
              textTransform: "uppercase",
              letterSpacing: "5px",
              color: "#38bdf8",
              fontSize: "0.75rem",
              fontWeight: "700",
              marginBottom: "20px",
            }}
          >
            OUR SERVICES
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            style={{
              fontSize: "clamp(2.5rem, 4vw, 3.75rem)",
              fontWeight: "800",
              color: "#ffffff",
              lineHeight: "1.15",
              letterSpacing: "-0.025em",
            }}
          >
            Engineering

            <span
              style={{
                display: "block",
                color: "#38bdf8",
                margin: "4px 0",
              }}
            >
              Digital &
            </span>

            Geospatial Solutions
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            style={{
              marginTop: "32px",
              maxWidth: "38rem",
              fontSize: "1rem",
              lineHeight: "1.7",
              color: "#d1d5db",
            }}
          >
            We deliver end-to-end GIS, remote sensing,
            enterprise software, artificial intelligence,
            cloud platforms and consulting services
            for governments and enterprises.
          </motion.p>

          {/* Buttons */}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            style={{
              marginTop: "48px",
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: "20px",
              boxSizing: "border-box",
            }}
          >
            <button
              onClick={scrollToServices}
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "9999px",
                backgroundColor: "#0ea5e9",
                padding: "16px 36px",
                fontSize: "1rem",
                fontWeight: "700",
                color: "#ffffff",
                border: "none",
                cursor: "pointer",
                transition: "all 0.3s ease",
                boxSizing: "border-box",
              }}
              className="hover:bg-sky-400 hover:shadow-[0_0_30px_rgba(56,189,248,0.4)] hover:-translate-y-0.5 group"
            >
              Explore

              <ArrowDown
                style={{
                  marginLeft: "12px",
                  transition: "transform 0.3s ease",
                }}
                className="ml-3 transition-transform group-hover:translate-y-1"
                size={18}
              />
            </button>

            <button
              onClick={() => navigate("/contact")}
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "9999px",
                border:
                  "1px solid rgba(255,255,255,0.2)",
                backgroundColor:
                  "rgba(255,255,255,0.05)",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
                padding: "16px 36px",
                fontSize: "1rem",
                fontWeight: "600",
                color: "#ffffff",
                cursor: "pointer",
                transition: "all 0.3s ease",
                boxSizing: "border-box",
              }}
              className="hover:border-sky-400/50 hover:bg-sky-500/10 hover:text-sky-400 hover:-translate-y-0.5 group"
            >
              Contact Us
            </button>
          </motion.div>
        </div>

        {/* =====================================================
            RIGHT COLUMN — GLASS CARD
        ===================================================== */}

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.6,
          }}
          style={{
            position: "relative",
            width: "100%",
            borderRadius: "2.5rem",
            backgroundColor:
              "rgba(17,17,19,0.35)",
            backdropFilter: "blur(18px)",
            WebkitBackdropFilter:
              "blur(18px)",
            border:
              "1px solid rgba(255,255,255,0.15)",
            boxShadow:
              "0 20px 80px -20px rgba(14,165,233,0.15)",
            overflow: "hidden",
            padding: "40px",
            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "32px",
              boxSizing: "border-box",
            }}
          >
            {/* ITEM 1 */}

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "24px",
              }}
            >
              <div
                style={{
                  width: "60px",
                  height: "60px",
                  flexShrink: 0,
                  borderRadius: "20px",
                  backgroundColor:
                    "rgba(56,189,248,0.1)",
                  border:
                    "1px solid rgba(56,189,248,0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <MapPinned
                  className="text-sky-400"
                  size={26}
                />
              </div>

              <div>
                <h3
                  style={{
                    fontSize: "1.375rem",
                    fontWeight: "700",
                    color: "#ffffff",
                    marginBottom: "4px",
                  }}
                >
                  GIS Solutions
                </h3>

                <p
                  style={{
                    color: "#d1d5db",
                    fontSize: "0.95rem",
                    fontWeight: "500",
                  }}
                >
                  Mapping • Survey • Spatial Analytics
                </p>
              </div>
            </div>

            {/* ITEM 2 */}

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "24px",
              }}
            >
              <div
                style={{
                  width: "60px",
                  height: "60px",
                  flexShrink: 0,
                  borderRadius: "20px",
                  backgroundColor:
                    "rgba(56,189,248,0.1)",
                  border:
                    "1px solid rgba(56,189,248,0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Code2
                  className="text-sky-400"
                  size={26}
                />
              </div>

              <div>
                <h3
                  style={{
                    fontSize: "1.375rem",
                    fontWeight: "700",
                    color: "#ffffff",
                    marginBottom: "4px",
                  }}
                >
                  IT Solutions
                </h3>

                <p
                  style={{
                    color: "#d1d5db",
                    fontSize: "0.95rem",
                    fontWeight: "500",
                  }}
                >
                  Web Apps • Cloud • AI
                </p>
              </div>
            </div>

            {/* ITEM 3 */}

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "24px",
              }}
            >
              <div
                style={{
                  width: "60px",
                  height: "60px",
                  flexShrink: 0,
                  borderRadius: "20px",
                  backgroundColor:
                    "rgba(56,189,248,0.1)",
                  border:
                    "1px solid rgba(56,189,248,0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Globe2
                  className="text-sky-400"
                  size={26}
                />
              </div>

              <div>
                <h3
                  style={{
                    fontSize: "1.375rem",
                    fontWeight: "700",
                    color: "#ffffff",
                    marginBottom: "4px",
                  }}
                >
                  Consultancy
                </h3>

                <p
                  style={{
                    color: "#d1d5db",
                    fontSize: "0.95rem",
                    fontWeight: "500",
                  }}
                >
                  Enterprise • Government Projects
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* =========================================================
          BOTTOM VIDEO FADE
      ========================================================= */}

      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: "220px",
          background:
            "linear-gradient(to bottom, transparent 0%, rgba(5,5,5,0.3) 35%, rgba(5,5,5,0.8) 70%, #050505 90%, #ffffff 100%)",
          pointerEvents: "none",
          zIndex: 20,
        }}
      />
    </section>
  );
}