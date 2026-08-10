import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function FeaturedService({
  activeTab = "survey",
  services = [],
}) {
  const navigate = useNavigate();

  const categoryServices = services.filter(
    (service) =>
      service.category === activeTab &&
      service.is_active !== false
  );

  const service = categoryServices[0];

  if (!service) {
    return null;
  }

  const imageUrl = service.image
    ? service.image.startsWith("http")
      ? service.image
      : `${import.meta.env.VITE_API_URL}${service.image}`
    : null;

  return (
    <section
      style={{
        backgroundColor: "#ffffff",
        padding: "96px 0",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        overflow: "hidden",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "85rem",
          margin: "0 auto",
          padding: "0 24px",
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(320px, 1fr))",
          alignItems: "center",
          gap: "64px",
          boxSizing: "border-box",
        }}
      >
        {/* =========================
            TEXT
        ========================= */}

        <motion.div
          key={`text-${service.id}`}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p
            style={{
              textTransform: "uppercase",
              letterSpacing: "5px",
              color: "#0ea5e9",
              fontSize: "0.75rem",
              fontWeight: "700",
              marginBottom: "20px",
            }}
          >
            {service.category} SERVICE
          </p>

          <h2
            style={{
              fontSize: "clamp(2.5rem, 4vw, 3.75rem)",
              fontWeight: "800",
              color: "#0f172a",
              lineHeight: "1.15",
            }}
          >
            {service.name}
          </h2>

          <p
            style={{
              marginTop: "32px",
              maxWidth: "38rem",
              fontSize: "1rem",
              lineHeight: "1.7",
              color: "#64748b",
            }}
          >
            {service.description}
          </p>

          <div style={{ marginTop: "48px" }}>
            <button
              onClick={() =>
                navigate(`/services/${service.slug}`)
              }
              className="
                group
                inline-flex
                items-center
                justify-center
                rounded-full
                bg-sky-500
                px-9
                py-4
                font-bold
                text-white
                transition
                hover:bg-sky-400
                hover:-translate-y-0.5
                hover:shadow-[0_0_30px_rgba(56,189,248,0.4)]
                cursor-pointer
              "
            >
              Learn More

              <ArrowRight
                size={18}
                className="ml-3 transition-transform group-hover:translate-x-1"
              />
            </button>
          </div>
        </motion.div>

        {/* =========================
            IMAGE
        ========================= */}

        <motion.div
          key={`image-${service.id}`}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            position: "relative",
            width: "100%",
          }}
        >
          {imageUrl && (
            <>
              {/* Soft blue glow */}
              <div
                style={{
                  position: "absolute",
                  inset: "-20px",
                  borderRadius: "40px",
                  backgroundColor:
                    "rgba(14, 165, 233, 0.08)",
                  filter: "blur(40px)",
                  pointerEvents: "none",
                }}
              />

              {/* Image */}
              <img
                src={imageUrl}
                alt={service.name}
                style={{
                  position: "relative",
                  width: "100%",
                  height: "520px",
                  objectFit: "cover",
                  borderRadius: "2.5rem",
                  border:
                    "1px solid rgba(15, 23, 42, 0.08)",
                  boxShadow:
                    "0 20px 80px -20px rgba(15, 23, 42, 0.18)",
                  backgroundColor: "#f8fafc",
                }}
              />
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
}