import { motion } from "framer-motion";
import {
  ArrowDown,
  Users,
  Code2,
  BrainCircuit,
  MapPinned,
} from "lucide-react";
import { useEffect, useState } from "react";
import api from "../../api/client";

export default function CareerHero() {
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

  const backgroundVideo = settings?.careers_video
    ? `${import.meta.env.VITE_API_URL}${settings.careers_video}`
    : null;

  const hasVideo = Boolean(backgroundVideo);

  /* =======================================================
     THEME — white section when there's no video, the
     original dark/video theme when there is
     ======================================================= */

  const theme = {
    sectionBg: hasVideo ? "#050505" : "#ffffff",
    label: hasVideo ? "#38bdf8" : "#0ea5e9",
    heading: hasVideo ? "#ffffff" : "#0f172a",
    body: hasVideo ? "#d1d5db" : "#475569",
    gridLine: hasVideo
      ? "rgba(255,255,255,.2)"
      : "rgba(15,23,42,0.07)",
    cardBg: hasVideo
      ? "rgba(17,17,19,0.12)"
      : "rgba(255,255,255,0.5)",
    cardBorder: hasVideo
      ? "1px solid rgba(255,255,255,0.15)"
      : "1px solid rgba(15,23,42,0.10)",
    cardShadow: hasVideo
      ? "0 20px 80px -20px rgba(14,165,233,0.15)"
      : "0 20px 60px rgba(15,23,42,0.08)",
    cardHeading: hasVideo ? "#ffffff" : "#0f172a",
    cardBody: hasVideo ? "#d1d5db" : "#475569",
    bottomFade: hasVideo
      ? "linear-gradient(to bottom, transparent 0%, rgba(5,5,5,0.3) 35%, rgba(5,5,5,0.8) 70%, #050505 90%, #ffffff 100%)"
      : "linear-gradient(to bottom, rgba(255,255,255,0), #ffffff)",
  };

  const scrollToWhyJoin = () => {
    document.getElementById("why-join")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  const roles = [
    {
      Icon: Code2,
      title: "Software Engineers",
      blurb: "Build scalable applications",
    },
    {
      Icon: MapPinned,
      title: "GIS Specialists",
      blurb: "Mapping & Spatial Intelligence",
    },
    {
      Icon: BrainCircuit,
      title: "AI Engineers",
      blurb: "Machine Learning & Computer Vision",
    },
    {
      Icon: Users,
      title: "Collaborative Culture",
      blurb: "Learn, innovate and grow together",
    },
  ];

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{
        backgroundColor: theme.sectionBg,
        minHeight: "100vh",
        padding: "128px 0px 128px 0px",
        boxSizing: "border-box",
      }}
    >
      {/* =====================================================
          BACKGROUND VIDEO
      ===================================================== */}

      {hasVideo && (
        <video
          autoPlay
          muted
          loop
          playsInline
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: 0.92,
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
          WHITE READABILITY OVERLAY

          Only rendered when there's a video underneath it —
          otherwise it just washed out the white background.
      ===================================================== */}

      {hasVideo && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(rgba(255,255,255,0.08), rgba(255,255,255,0.16))",
            zIndex: 1,
            pointerEvents: "none",
          }}
        />
      )}

      {/* =====================================================
          WHITE GLOWS
      ===================================================== */}

      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{
          zIndex: 2,
        }}
      >
        <div className="absolute left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-white/[0.08] blur-[170px]" />

        <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-white/[0.05] blur-[130px]" />

        <div className="absolute top-20 right-[-10%] h-96 w-96 rounded-full bg-white/[0.07] blur-[150px]" />
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
          backgroundImage: `linear-gradient(${theme.gridLine} 1px, transparent 1px), linear-gradient(90deg, ${theme.gridLine} 1px, transparent 1px)`,
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
          mx-auto
          w-full
          max-w-[90rem]
          px-6
          lg:px-8
          grid
          lg:grid-cols-12
          items-center
          gap-16
        "
      >

        {/* =================================================
            LEFT COLUMN
        ================================================= */}

        <div
          className="
            lg:col-span-6
            xl:col-span-5
            xl:col-start-2
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
              text-sm
              font-bold
              mb-6
            "
            style={{ color: theme.label }}
          >
            CAREERS
          </motion.p>

          <motion.h1
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.15,
            }}
            className="
              text-5xl
              lg:text-6xl
              font-extrabold
              leading-[1.1]
            "
            style={{ color: theme.heading }}
          >
            Build the Future

            <span className="block" style={{ color: theme.label }}>
              with TerraLens
            </span>
          </motion.h1>

          <motion.p
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              delay: 0.3,
            }}
            className="
              mt-8
              max-w-xl
              text-lg
              leading-8
            "
            style={{ color: theme.body }}
          >
            Join a passionate team building innovative GIS,
            AI, cloud and enterprise software solutions that
            create real-world impact.
          </motion.p>

          <motion.button
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              delay: 0.45,
            }}
            onClick={scrollToWhyJoin}
            className="
              mt-12
              inline-flex
              items-center
              rounded-full
              bg-sky-500
              px-10
              py-4
              text-lg
              font-bold
              text-white
              transition-all
              duration-300
              hover:bg-sky-400
              hover:shadow-[0_0_35px_rgba(56,189,248,.35)]
              hover:-translate-y-1
              cursor-pointer
            "
          >
            Explore Careers

            <ArrowDown
              className="ml-3"
              size={20}
            />
          </motion.button>

        </div>

        {/* =================================================
            RIGHT COLUMN — GLASS CARD
        ================================================= */}

        <motion.div
          initial={{
            opacity: 0,
            x: 40,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            delay: 0.3,
          }}
          className="
            lg:col-span-6
            xl:col-span-5
            xl:col-start-7
          "
          style={{
            borderRadius: "2.5rem",

            /* GLASS */
            backgroundColor: theme.cardBg,

            backdropFilter: "blur(4px)",
            WebkitBackdropFilter: "blur(4px)",

            border: theme.cardBorder,

            boxShadow: theme.cardShadow,

            padding: "40px",
          }}
        >

          <div className="space-y-8">

            {roles.map(({ Icon, title, blurb }) => (
              <div className="flex items-center gap-5" key={title}>

                <div
                  className="
                    w-16
                    h-16
                    rounded-2xl
                    bg-sky-500/10
                    border
                    border-sky-500/20
                    flex
                    items-center
                    justify-center
                    shrink-0
                  "
                >
                  <Icon className="text-sky-400" />
                </div>

                <div>

                  <h3
                    className="font-bold text-xl"
                    style={{ color: theme.cardHeading }}
                  >
                    {title}
                  </h3>

                  <p style={{ color: theme.cardBody }}>
                    {blurb}
                  </p>

                </div>

              </div>
            ))}

          </div>

        </motion.div>

      </div>

      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: "180px",
          background:
            "linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0.15) 35%, rgba(255,255,255,0.6) 75%, #ffffff 100%)",
          pointerEvents: "none",
          zIndex: 20,
        }}
      />

    </section>
  );
}