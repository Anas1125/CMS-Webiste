import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import Button from "../ui/Button";

import { getSettings } from "../../api/settings";
import { getMedia } from "../../api/media";

function Hero() {
  const navigate = useNavigate();

  const [currentVideo, setCurrentVideo] = useState(0);
  const [videos, setVideos] = useState([]);
  const [settings, setSettings] = useState(null);

  // =====================================================
  // LOAD HERO VIDEOS
  // =====================================================

  useEffect(() => {
    const loadHeroVideos = async () => {
      try {
        const data = await getMedia();

        const heroVideos = data.filter((file) => {
          const filename =
            file.filename?.toLowerCase() || "";

          const isVideo =
            file.mime_type
              ?.toLowerCase()
              .startsWith("video/") ||
            /\.(mp4|webm|mov|avi|mkv)$/i.test(
              filename
            );

          return (
            file.folder === "hero" &&
            isVideo
          );
        });

        const sortedVideos =
          heroVideos.sort((a, b) =>
            a.filename.localeCompare(
              b.filename,
              undefined,
              {
                numeric: true,
              }
            )
          );

        setVideos(sortedVideos);
      } catch (error) {
        console.error(
          "Failed to load hero videos:",
          error
        );
      }
    };

    loadHeroVideos();
  }, []);

  // =====================================================
  // LOAD SETTINGS
  // =====================================================

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const data = await getSettings();

        setSettings(data);
      } catch (error) {
        console.error(
          "Failed to load homepage settings:",
          error
        );
      }
    };

    loadSettings();
  }, []);

  // =====================================================
  // VIDEO URL
  // =====================================================

  const getVideoUrl = (path) => {
    if (!path) return null;

    if (path.startsWith("http")) {
      return path;
    }

    return `${import.meta.env.VITE_API_URL}${path}`;
  };

  // =====================================================
  // AUTOMATIC VIDEO CHANGE
  // =====================================================

  useEffect(() => {
    if (videos.length <= 1) {
      return;
    }

    const interval = setInterval(() => {
      setCurrentVideo(
        (prev) =>
          (prev + 1) % videos.length
      );
    }, 6000);

    return () => {
      clearInterval(interval);
    };
  }, [videos.length]);

  // =====================================================
  // RESET INDEX
  // =====================================================

  useEffect(() => {
    if (
      videos.length > 0 &&
      currentVideo >= videos.length
    ) {
      setCurrentVideo(0);
    }
  }, [videos.length, currentVideo]);

  // =====================================================
  // NEXT VIDEO
  // =====================================================

  const nextVideo = () => {
    if (videos.length === 0) return;

    setCurrentVideo(
      (prev) =>
        (prev + 1) % videos.length
    );
  };

  // =====================================================
  // PREVIOUS VIDEO
  // =====================================================

  const prevVideo = () => {
    if (videos.length === 0) return;

    setCurrentVideo((prev) =>
      prev === 0
        ? videos.length - 1
        : prev - 1
    );
  };

  // =====================================================
  // CURRENT VIDEO
  // =====================================================

  const currentVideoUrl =
    videos.length > 0
      ? getVideoUrl(
          videos[currentVideo]?.path
        )
      : null;

  const hasVideo = Boolean(currentVideoUrl);

  // =====================================================
  // THEME — white section when there's no video, the
  // original dark/video theme when there is
  // =====================================================

  const theme = {
    labelClass: hasVideo ? "text-white/80" : "text-slate-500",
    headingClass: hasVideo ? "text-white" : "text-slate-900",
    headingShadow: hasVideo
      ? "0 4px 30px rgba(0,0,0,0.35)"
      : "none",
    subtitleClass: hasVideo ? "text-gray-100" : "text-slate-600",
    primaryBtnClass: hasVideo
      ? `
        inline-flex items-center justify-center rounded-full
        border border-white/20 bg-white/[0.10]
        px-10 py-4 text-[17px] font-bold text-white
        backdrop-blur-2xl transition-all duration-300
        hover:scale-105 hover:border-white/40 hover:bg-white/[0.18]
        hover:shadow-[0_0_35px_rgba(255,255,255,0.12)]
      `
      : `
        inline-flex items-center justify-center rounded-full
        border border-slate-300 bg-slate-900/[0.04]
        px-10 py-4 text-[17px] font-bold text-slate-900
        backdrop-blur-2xl transition-all duration-300
        hover:scale-105 hover:border-slate-400 hover:bg-slate-900/[0.08]
        hover:shadow-[0_0_25px_rgba(15,23,42,0.08)]
      `,
    secondaryBtnClass: hasVideo
      ? `
        inline-flex items-center justify-center rounded-full
        border border-white/20 bg-white/[0.08]
        px-10 py-4 text-[17px] font-bold text-white
        backdrop-blur-2xl transition-all duration-300
        hover:scale-105 hover:border-white/40 hover:bg-white/[0.16]
        hover:shadow-[0_0_35px_rgba(255,255,255,0.10)]
      `
      : `
        inline-flex items-center justify-center rounded-full
        border border-slate-300 bg-slate-900/[0.02]
        px-10 py-4 text-[17px] font-bold text-slate-900
        backdrop-blur-2xl transition-all duration-300
        hover:scale-105 hover:border-slate-400 hover:bg-slate-900/[0.06]
        hover:shadow-[0_0_25px_rgba(15,23,42,0.06)]
      `,
  };

  // =====================================================
  // HERO
  // =====================================================

  return (
    <section
      className="
        relative
        h-screen
        min-h-[700px]
        overflow-hidden
        bg-white
      "
    >

      {/* =================================================
          BACKGROUND VIDEOS
          ================================================= */}

      {currentVideoUrl ? (
        <AnimatePresence initial={false}>
          <motion.video
            key={currentVideoUrl}
            autoPlay
            muted
            playsInline
            preload="auto"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              duration: 1.5,
              ease: "easeInOut",
            }}
            className="
              absolute
              inset-0
              z-0
              h-full
              w-full
              object-cover
            "
            onError={(error) => {
              console.error(
                "Hero video failed:",
                error
              );
            }}
          >
            <source
              src={currentVideoUrl}
              type="video/mp4"
            />
          </motion.video>
        </AnimatePresence>
      ) : (
        <div
          className="
            absolute
            inset-0
            bg-white
          "
        />
      )}

      {/* =================================================
          LIGHT READABILITY OVERLAY

          Only rendered when there's a video underneath it —
          otherwise it just washed out the white background.
          ================================================= */}

      {hasVideo && (
        <div
          className="
            absolute
            inset-0
            z-[1]
            bg-white/[0.10]
          "
        />
      )}

      {/* SUBTLE WHITE GLASS OVERLAY */}
          <div
            className="
              pointer-events-none
              absolute
              inset-0
              z-[2]
              bg-gradient-to-br
              from-white/[0.06]
              via-transparent
              to-white/[0.05]
            "
          />

          {/* BOTTOM GRADIENT — fades video into white */}
          <div
            className="
              pointer-events-none
              absolute
              inset-x-0
              bottom-0
              z-[3]
              h-13
              bg-gradient-to-b
              from-transparent
              via-white/20
              to-white
            "
          />

      {/* =================================================
          LEFT ARROW
          ================================================= */}

      {videos.length > 1 && (
        <button
          onClick={prevVideo}
          aria-label="Previous video"
          className="
            absolute
            left-8
            top-1/2
            z-20
            flex
            h-14
            w-14
            -translate-y-1/2
            items-center
            justify-center
            rounded-full
            border
            border-white/20
            bg-white/[0.08]
            text-white
            backdrop-blur-xl
            transition-all
            duration-300
            hover:scale-110
            hover:border-white/40
            hover:bg-white/[0.18]
          "
        >
          <ChevronLeft size={30} />
        </button>
      )}

      {/* =================================================
          RIGHT ARROW
          ================================================= */}

      {videos.length > 1 && (
        <button
          onClick={nextVideo}
          aria-label="Next video"
          className="
            absolute
            right-8
            top-1/2
            z-20
            flex
            h-14
            w-14
            -translate-y-1/2
            items-center
            justify-center
            rounded-full
            border
            border-white/20
            bg-white/[0.08]
            text-white
            backdrop-blur-xl
            transition-all
            duration-300
            hover:scale-110
            hover:border-white/40
            hover:bg-white/[0.18]
          "
        >
          <ChevronRight size={30} />
        </button>
      )}

      {/* =================================================
          CONTENT
          ================================================= */}

      <div
        className="
          relative
          z-10
          flex
          h-full
          items-center
          justify-center
          px-6
        "
      >
        <motion.div
          initial={{
            opacity: 0,
            y: 60,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.9,
          }}
          className="-mt-20 text-center"
        >

          {/* COMPANY NAME */}

          <p
            className={`
              mb-6
              text-sm
              font-medium
              uppercase
              tracking-[8px]
              ${theme.labelClass}
            `}
          >
            {settings?.company_name ||
              "TerraLens Innovations"}
          </p>

          {/* TITLE */}

          <h1
            className={`
              text-6xl
              font-bold
              leading-[0.95]
              tracking-tight
              md:text-8xl
              ${theme.headingClass}
            `}
            style={{
              whiteSpace: "pre-line",
              textShadow: theme.headingShadow,
            }}
          >
            {settings?.hero_title ||
              "Precision\nBeyond\nBoundaries"}
          </h1>

          {/* SUBTITLE */}

          <p
            className={`
              mx-auto
              mt-8
              max-w-3xl
              text-xl
              leading-8
              ${theme.subtitleClass}
            `}
          >
            {settings?.hero_subtitle ||
              "Engineering the future with GIS, Surveying, LiDAR and Geospatial Intelligence."}
          </p>

          {/* =================================================
              BUTTONS
              ================================================= */}

          <div
            className="
              mt-14
              flex
              justify-center
              gap-6
            "
          >

            {/* EXPLORE SOLUTIONS */}

            <Button
              onClick={() =>
                navigate(
                  settings?.hero_button_link ||
                    "/services"
                )
              }
              className={theme.primaryBtnClass}
            >
              {settings?.hero_button_text ||
                "Explore Solutions"}
            </Button>

            {/* VIEW PROJECTS */}

            <Button
              onClick={() =>
                navigate("/showcase")
              }
              className={theme.secondaryBtnClass}
            >
              View Projects
            </Button>

          </div>

        </motion.div>
      </div>

      {/* =================================================
          NAVIGATION DOTS
          ================================================= */}

      {videos.length > 1 && (
        <div
          className="
            absolute
            bottom-28
            left-1/2
            z-20
            flex
            -translate-x-1/2
            gap-3
          "
        >
          {videos.map(
            (video, index) => (
              <button
                key={video.path}
                onClick={() =>
                  setCurrentVideo(index)
                }
                aria-label={`Go to video ${
                  index + 1
                }`}
                className={`
                  cursor-pointer
                  rounded-full
                  transition-all
                  duration-500

                  ${
                    currentVideo === index
                      ? "h-2.5 w-8 bg-white shadow-[0_0_12px_rgba(255,255,255,0.5)]"
                      : "h-2.5 w-2.5 bg-white/40 hover:bg-white/70"
                  }
                `}
              />
            )
          )}
        </div>
      )}

      {/* =================================================
          SCROLL INDICATOR
          ================================================= */}

      <motion.div
        animate={{
          y: [0, 10, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 3,
        }}
        className="
          absolute
          bottom-10
          left-1/2
          z-20
          -translate-x-1/2
        "
      >
        <div
          className="
            flex
            h-12
            w-7
            justify-center
            rounded-full
            border
            border-white/40
            bg-white/[0.03]
            backdrop-blur-sm
          "
        >
          <div
            className="
              mt-2
              h-3
              w-1
              rounded-full
              bg-white
            "
          />
        </div>
      </motion.div>

    </section>
  );
}

export default Hero;