import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { useEffect, useState } from "react";
import api from "../../api/client";

export default function ShowcaseHero() {
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

  const backgroundVideo = settings?.showcase_video
    ? `http://127.0.0.1:8000${settings.showcase_video}`
    : null;

  const scrollToPortfolio = () => {
    document
      .getElementById("portfolio-section")
      ?.scrollIntoView({
        behavior: "smooth",
      });
  };

  return (
    <section
      className="relative w-full overflow-hidden w-full bg-white pb-40 mb-20"
      style={{
        minHeight: "100vh",
        width: "100%",
        backgroundColor: "#050505",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxSizing: "border-box",
      }}
    >
      {/* =====================================================
          BACKGROUND VIDEO
      ===================================================== */}

      {backgroundVideo && (
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
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

      {/* =====================================================
          DARK VIDEO OVERLAY
      ===================================================== */}

      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(rgba(5,5,5,0.25), rgba(5,5,5,0.4))",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />

      {/* =====================================================
          BLUE GLOW
      ===================================================== */}

      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{
          zIndex: 2,
        }}
      >
        <div
          className="
            absolute
            left-1/2
            top-0
            h-[500px]
            w-[500px]
            -translate-x-1/2
            rounded-full
            bg-sky-500/[0.08]
            blur-[140px]
          "
        />

        <div
          className="
            absolute
            bottom-0
            left-0
            h-72
            w-72
            rounded-full
            bg-sky-500/[0.05]
            blur-[120px]
          "
        />

        <div
          className="
            absolute
            top-20
            right-[-10%]
            h-96
            w-96
            rounded-full
            bg-blue-500/[0.08]
            blur-[140px]
          "
        />
      </div>

      {/* =====================================================
          GRID
      ===================================================== */}

      <div
        className="
          absolute
          inset-0
          opacity-[0.03]
          pointer-events-none
        "
        style={{
          zIndex: 3,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.2) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <div
        className="
          relative
          z-10
          w-full
          max-w-5xl
          mx-auto
          px-6
          flex
          flex-col
          items-center
          justify-center
          text-center
        "
      >
        <motion.p
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
          }}
          className="
            uppercase
            tracking-[6px]
            text-sky-400
            text-sm
            font-bold
            mb-6
            w-full
          "
        >
          OUR SHOWCASE
        </motion.p>

        <motion.h1
          initial={{
            opacity: 0,
            y: 25,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.15,
            duration: 0.6,
          }}
          className="
            text-5xl
            md:text-6xl
            lg:text-7xl
            font-extrabold
            text-white
            leading-tight
            mb-8
            w-full
            tracking-tight
          "
        >
          Featured Projects
        </motion.h1>

        <motion.p
          initial={{
            opacity: 0,
            y: 25,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.3,
            duration: 0.6,
          }}
          className="
            text-lg
            md:text-xl
            text-gray-300
            max-w-3xl
            mx-auto
            leading-relaxed
            mb-12
            w-full
          "
        >
          Explore our latest work across GIS, IT, Artificial Intelligence,
          IoT, Cloud Computing and Cybersecurity solutions delivered for
          governments, enterprises and infrastructure projects.
        </motion.p>

        <motion.button
          initial={{
            opacity: 0,
            y: 25,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.45,
            duration: 0.6,
          }}
          onClick={scrollToPortfolio}
          className="
            group
            inline-flex
            items-center
            justify-center
            rounded-full
            bg-sky-500
            text-white
            font-bold
            cursor-pointer
            transition-all
            duration-300
            hover:bg-sky-400
            hover:shadow-[0_0_35px_rgba(56,189,248,.35)]
            hover:-translate-y-1
          "
          style={{
            padding: "18px 40px",
            fontSize: "1.125rem",
            boxSizing: "border-box",
            border: "none",
          }}
        >
          Explore Projects

          <ArrowDown
            size={22}
            className="
              ml-3
              transition-transform
              duration-300
              group-hover:translate-y-1.5
            "
          />
        </motion.button>
      </div>

      {/* =====================================================
          BOTTOM VIDEO FADE
      ===================================================== */}

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