import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { useEffect, useState } from "react";
import { getSettings } from "../../api/settings";

export default function ProductsHero() {
  const [productsVideo, setProductsVideo] = useState("");

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const data = await getSettings();

        if (data?.products_video) {
          const videoUrl = data.products_video.startsWith("http")
            ? data.products_video
            : `${import.meta.env.VITE_API_URL}${data.products_video}`;

          setProductsVideo(videoUrl);
        } else {
          setProductsVideo("");
        }
      } catch (error) {
        console.error("Failed to load Products video:", error);
        setProductsVideo("");
      }
    };

    loadSettings();
  }, []);

  const scrollToProducts = () => {
    document.getElementById("products-grid")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{
        minHeight: "100vh",
        width: "100%",
        backgroundColor: "#ffffff",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxSizing: "border-box",
      }}
    >
      {/* Background Video */}

      {productsVideo && (
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
            opacity: 1,
            zIndex: 0,
          }}
        >
          <source src={productsVideo} type="video/mp4" />
        </video>
      )}

      {/* Subtle Video Color Overlay */}

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(14,165,233,0.06), rgba(255,255,255,0.02) 60%, rgba(255,255,255,0.08))",
          zIndex: 1,
        }}
      />

      {/* Background Glow */}

      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ zIndex: 2 }}
      >
        <div className="absolute left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-white/[0.08] blur-[170px]" />

        <div className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-white/[0.05] blur-[140px]" />

        <div className="absolute top-20 right-[-10%] h-96 w-96 rounded-full bg-white/[0.07] blur-[170px]" />
      </div>

      {/* Grid Pattern */}

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

      {/* Content */}

      <div
        className="
          relative
          z-10
          w-full
          max-w-4xl
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
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="
            uppercase
            tracking-[6px]
            text-sky-400
            text-sm
            font-bold
            mb-6
          "
        >
          OUR PRODUCTS
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.15,
            duration: 0.6,
          }}
          className="
            text-5xl
            md:text-6xl
            lg:text-7xl
            font-extrabold
            text-white font-extrabold
            leading-tight
          "
        >
          Software Products
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: 0.3,
            duration: 0.6,
          }}
          className="
            mt-8
            max-w-3xl
            text-lg
            md:text-xl
            text-gray-300
            leading-relaxed
          "
        >
          Purpose-built software solutions by TerraLens Innovations —
          designed for GIS professionals, field surveyors, and municipal
          authorities.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.45,
            duration: 0.6,
          }}
          onClick={scrollToProducts}
          className="
            group
            mt-14
            inline-flex
            items-center
            justify-center
            rounded-full
            bg-sky-500
            px-10
            py-5
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
          Explore Products

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

      {/* Bottom Fade */}

      <div
        className="absolute bottom-0 left-0 w-full h-72 pointer-events-none"
        style={{
          zIndex: 5,
          background:
            "linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.05) 45%, rgba(255,255,255,0.35) 75%, #ffffff 100%)",
        }}
      />
    </section>
  );
}