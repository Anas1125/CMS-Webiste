import { motion } from "framer-motion";
import {
  ArrowDown,
  Mail,
  Phone,
  MapPin,
  Clock,
} from "lucide-react";
import { useEffect, useState } from "react";
import api from "../../api/client";

export default function ContactHero() {
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

  const backgroundVideo = settings?.contact_video
    ? `http://127.0.0.1:8000${settings.contact_video}`
    : null;

  const scrollToContact = () => {
    document.getElementById("contact-section")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{
        backgroundColor: "#050505",
        minHeight: "100vh",
        padding: "128px 0px 128px 0px",
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
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
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
          VIDEO OVERLAY
      ===================================================== */}

      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(rgba(5,5,5,.25), rgba(5,5,5,.45))",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />

      {/* =====================================================
          BACKGROUND GLOW
      ===================================================== */}

      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{
          zIndex: 2,
        }}
      >
        <div className="absolute left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-sky-500/10 blur-[170px]" />

        <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-sky-500/5 blur-[130px]" />

        <div className="absolute top-20 right-[-10%] h-96 w-96 rounded-full bg-blue-500/10 blur-[150px]" />
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
              text-sky-400
              text-sm
              font-bold
              mb-6
            "
          >
            CONTACT
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
              text-white
              leading-[1.1]
            "
          >
            Let's Build

            <span className="block text-sky-400">
              Something Great
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
              text-gray-300
            "
          >
            Whether you need GIS solutions, enterprise software,
            AI integration or consulting services, our team is
            ready to help turn your ideas into reality.
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
            onClick={scrollToContact}
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
            "
          >
            Contact Us

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
            backgroundColor:
              "rgba(17,17,19,0.35)",

            backdropFilter: "blur(18px)",
            WebkitBackdropFilter:
              "blur(18px)",

            border:
              "1px solid rgba(255,255,255,0.15)",

            boxShadow:
              "0 20px 80px -20px rgba(14,165,233,0.15)",

            padding: "40px",
          }}
        >

          <div className="space-y-8">

            {[
              {
                icon: Mail,
                title: "Email",
                value: "info@terralens.com",
              },
              {
                icon: Phone,
                title: "Phone",
                value: "+91 98765 43210",
              },
              {
                icon: MapPin,
                title: "Location",
                value: "Bangalore, India",
              },
              {
                icon: Clock,
                title: "Business Hours",
                value: "Mon - Fri • 9:00 AM - 6:00 PM",
              },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="flex items-center gap-5"
                >

                  <div
                    className="
                      w-16
                      h-16
                      shrink-0
                      rounded-2xl
                      bg-sky-500/10
                      border
                      border-sky-500/20
                      flex
                      items-center
                      justify-center
                    "
                  >
                    <Icon
                      className="text-sky-400"
                      size={28}
                    />
                  </div>

                  <div>

                    <h3 className="text-white font-bold text-xl">
                      {item.title}
                    </h3>

                    <p className="text-gray-300">
                      {item.value}
                    </p>

                  </div>

                </div>
              );
            })}

          </div>

        </motion.div>

      </div>

      {/* Bottom Video Fade */}
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