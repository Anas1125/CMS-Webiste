import { motion } from "framer-motion";
import {
  ArrowRight,
  Globe,
  MapPinned,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { getSettings } from "../../api/settings";

/* =========================================================
   SMOOTH BACKGROUND VIDEO
   Crossfades between MULTIPLE video sources in sequence.
   Pass an array of URLs via `sources`.
   ========================================================= */

function SmoothBackgroundVideo({ sources }) {
  const videoA = useRef(null);
  const videoB = useRef(null);

  const [activeVideo, setActiveVideo] = useState("a");

  // Which clip (index into `sources`) each <video> layer currently holds
  const [indexA, setIndexA] = useState(0);
  const [indexB, setIndexB] = useState(
    sources.length > 1 ? 1 % sources.length : 0
  );

  const transitioning = useRef(false);

  // Index of the clip that's actually playing right now
  const currentIndex = useRef(0);

  /* -------------------------------------------------------
     Start / reset when the source LIST changes
     ------------------------------------------------------- */

  useEffect(() => {
    const first = videoA.current;
    const second = videoB.current;

    if (!first || !second || sources.length === 0) return;

    transitioning.current = false;
    currentIndex.current = 0;

    setIndexA(0);
    setIndexB(sources.length > 1 ? 1 % sources.length : 0);
    setActiveVideo("a");

    first.pause();
    second.pause();

    first.currentTime = 0;
    second.currentTime = 0;

    first
      .play()
      .catch((error) => {
        // React StrictMode double-invokes this effect in dev
        // (mount -> unmount -> mount), so the first play() call
        // often gets interrupted by the phantom cleanup's pause().
        // That specific case is harmless - only log real failures.
        if (error.name !== "AbortError") {
          console.error(
            "Background video playback failed:",
            error
          );
        }
      });

    return () => {
      first.pause();
      second.pause();
    };
  }, [sources]);

  /* -------------------------------------------------------
     Crossfade to the NEXT video in the list
     ------------------------------------------------------- */

  const crossfade = () => {
    if (transitioning.current) return;
    if (sources.length < 2) return; // nothing to crossfade to

    const goingToA = activeVideo === "b";

    const current =
      activeVideo === "a"
        ? videoA.current
        : videoB.current;

    const next =
      activeVideo === "a"
        ? videoB.current
        : videoA.current;

    if (!current || !next) return;

    transitioning.current = true;

    const nextIndex =
      (currentIndex.current + 1) % sources.length;

    /* Load the upcoming clip into the hidden layer */

    if (goingToA) {
      setIndexA(nextIndex);
    } else {
      setIndexB(nextIndex);
    }

    /*
      Wait a tick so React flushes the new `src` to the
      DOM before we try to play it — otherwise we can
      briefly play the previous clip instead of the new one.
    */

    requestAnimationFrame(() => {
      next.currentTime = 0;

      next
        .play()
        .catch((error) => {
          if (error.name !== "AbortError") {
            console.error(
              "Next background video playback failed:",
              error
            );
          }
        });
    });

    /* Switch visible layer */

    setActiveVideo(
      activeVideo === "a"
        ? "b"
        : "a"
    );

    currentIndex.current = nextIndex;

    /*
      Allow the transition to finish before
      resetting the old video.
    */

    setTimeout(() => {
      current.pause();
      current.currentTime = 0;

      transitioning.current = false;
    }, 1400);
  };

  /* -------------------------------------------------------
     Watch current video duration
     ------------------------------------------------------- */

  const handleTimeUpdate = (event) => {
    if (transitioning.current) return;

    const video = event.currentTarget;

    if (!video.duration) return;

    const remaining =
      video.duration - video.currentTime;

    /*
      Start crossfade 1.4 seconds before
      the video reaches the end.
    */

    if (remaining <= 1.4) {
      crossfade();
    }
  };

  if (sources.length === 0) return null;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        zIndex: 0,
      }}
    >
      {/* =====================================================
          VIDEO A
          ===================================================== */}

      <video
        ref={videoA}
        src={sources[indexA]} 
        muted
        playsInline
        loop
        preload="auto"
        onTimeUpdate={handleTimeUpdate}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",

          opacity:
            activeVideo === "a"
              ? 0.68
              : 0,

          transition:
            "opacity 1.4s ease-in-out",

          zIndex: 1,
        }}
      />

      {/* =====================================================
          VIDEO B
          ===================================================== */}

      <video
        ref={videoB}
        src={sources[indexB]}
        muted
        playsInline
        preload="auto"
        onTimeUpdate={handleTimeUpdate}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",

          opacity:
            activeVideo === "b"
              ? 0.68
              : 0,

          transition:
            "opacity 1.4s ease-in-out",

          zIndex: 2,
        }}
      />

      {/* =====================================================
          DARK GLASS OVERLAY
          ===================================================== */}

      <div
        style={{
          position: "absolute",
          inset: 0,

          background:
            "linear-gradient(to bottom, rgba(5,5,5,0.18), rgba(5,5,5,0.48))",

          zIndex: 3,

          pointerEvents: "none",
        }}
      />
    </div>
  );
}


/* =========================================================
   ABOUT HERO
   ========================================================= */

export default function AboutHero() {
  const navigate = useNavigate();

  const [settings, setSettings] =
    useState(null);

  /* =======================================================
     LOAD CMS SETTINGS
     ======================================================= */

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const data =
          await getSettings();

        setSettings(data);
      } catch (error) {
        console.error(
          "Failed to load About settings:",
          error
        );
      }
    };

    loadSettings();
  }, []);

  /* =======================================================
     VIDEO URLS
     =======================================================

     Expects `settings.about_videos` to be an array of paths
     or full URLs. Falls back to the old single-video field
     (`settings.about_video`) if present, so this keeps
     working even if the CMS hasn't been updated yet.
     ======================================================= */

  const getVideoUrl = (path) => {
    if (!path) return null;

    if (path.startsWith("http")) {
      return path;
    }

    return `http://127.0.0.1:8000${path}`;
  };

  const rawVideoList =
    settings?.about_videos && Array.isArray(settings.about_videos)
      ? settings.about_videos
      : settings?.about_video
      ? [settings.about_video]
      : [];

  const backgroundVideos = useMemo(
    () =>
      rawVideoList
        .map(getVideoUrl)
        .filter(Boolean),
    [settings]
  );

  if (process.env.NODE_ENV === "development") {
    console.log("ABOUT VIDEOS:", backgroundVideos);
  }

  /* =======================================================
     PAGE
     ======================================================= */

  return (
    <section
      style={{
        position: "relative",
        overflow: "hidden",

        backgroundColor:
          "#0B0B0D",

        padding:
          "128px 0px 96px 0px",

        width: "100%",

        display: "flex",
        alignItems: "center",

        boxSizing: "border-box",

        minHeight: "760px",
      }}
    >

      {/* ===================================================
          BACKGROUND VIDEO(S)
          =================================================== */}

      {backgroundVideos.length > 0 && (
        <SmoothBackgroundVideo
          sources={backgroundVideos}
        />
      )}


      {/* ===================================================
          BACKGROUND GLOWS
          =================================================== */}

      <div
        style={{
          position: "absolute",
          inset: 0,

          overflow: "hidden",

          pointerEvents: "none",

          zIndex: 4,
        }}
      >

        {/* Top glow */}

        <div
          style={{
            position: "absolute",

            top: "-160px",
            left: "50%",

            height: "400px",
            width: "400px",

            transform:
              "translateX(-50%)",

            borderRadius:
              "9999px",

            backgroundColor:
              "rgba(56,189,248,0.06)",

            filter:
              "blur(120px)",
          }}
        />

        {/* Bottom left glow */}

        <div
          style={{
            position: "absolute",

            bottom: 0,
            left: 0,

            height: "288px",
            width: "288px",

            borderRadius:
              "9999px",

            backgroundColor:
              "rgba(56,189,248,0.04)",

            filter:
              "blur(100px)",
          }}
        />

        {/* Right glow */}

        <div
          style={{
            position: "absolute",

            top: "160px",
            right: "-10%",

            height: "384px",
            width: "384px",

            borderRadius:
              "9999px",

            backgroundColor:
              "rgba(59,130,246,0.06)",

            filter:
              "blur(150px)",
          }}
        />

      </div>


      {/* ===================================================
                  GRID PATTERN
        =================================================== */}

        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.025,
            pointerEvents: "none",
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.2) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            zIndex: 5,
          }}
        />

        {/* ===================================================
            BOTTOM FADE — blends into WhoWeAre's white bg
            =================================================== */}

        <div
          className="
            pointer-events-none
            absolute
            inset-x-0
            bottom-0
            z-[6]
            h-[13px]
            bg-gradient-to-b
            from-transparent
            to-white
          "
        />


      {/* ===================================================
          MAIN CONTENT
          =================================================== */}

      <div
        style={{
          position: "relative",

          zIndex: 10,

          margin: "0 auto",

          width: "100%",

          maxWidth: "85rem",

          padding: "0 24px",

          display: "grid",

          gridTemplateColumns:
            "repeat(auto-fit, minmax(320px, 1fr))",

          alignItems: "center",

          gap: "64px",

          boxSizing: "border-box",
        }}
      >

        {/* =================================================
            LEFT COLUMN
            ================================================= */}

        <div
          style={{
            display: "flex",

            flexDirection:
              "column",

            justifyContent:
              "center",

            boxSizing:
              "border-box",
          }}
        >

          {/* Label */}

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
            style={{
              textTransform:
                "uppercase",

              letterSpacing:
                "5px",

              color:
                "#38bdf8",

              fontSize:
                "0.75rem",

              fontWeight:
                "700",

              marginBottom:
                "20px",
            }}
          >
            ABOUT TERRALENS
          </motion.p>


          {/* Heading */}

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
            style={{
              fontSize:
                "clamp(2.5rem, 4vw, 3.75rem)",

              fontWeight:
                "800",

              color:
                "#ffffff",

              lineHeight:
                "1.15",

              letterSpacing:
                "-0.025em",
            }}
          >

            Bridging

            <span
              style={{
                display:
                  "block",

                color:
                  "#38bdf8",

                margin:
                  "4px 0",
              }}
            >
              Geospatial
            </span>

            Intelligence &

            <span
              style={{
                display:
                  "block",

                marginTop:
                  "4px",
              }}
            >
              Digital Innovation
            </span>

          </motion.h1>


          {/* Description */}

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
            style={{
              marginTop:
                "32px",

              maxWidth:
                "38rem",

              fontSize:
                "1rem",

              lineHeight:
                "1.7",

              color:
                "#d1d5db",
            }}
          >
            Terralens Innovations
            Private Limited empowers
            governments, enterprises
            and research institutions
            with precision-driven GIS,
            AI and software engineering
            solutions that transform
            complex spatial data into
            intelligent business
            decisions.
          </motion.p>


          {/* =================================================
              BUTTONS
              ================================================= */}

          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.4,
            }}
            style={{
              marginTop:
                "48px",

              display:
                "flex",

              flexWrap:
                "wrap",

              alignItems:
                "center",

              gap:
                "20px",

              boxSizing:
                "border-box",
            }}
          >

            {/* Explore Services */}

            <button
              onClick={() =>
                navigate("/services")
              }
              style={{
                display:
                  "inline-flex",

                alignItems:
                  "center",

                justifyContent:
                  "center",

                borderRadius:
                  "9999px",

                background:
                  "rgba(255,255,255,0.10)",

                border:
                  "1px solid rgba(255,255,255,0.22)",

                backdropFilter:
                  "blur(18px)",

                WebkitBackdropFilter:
                  "blur(18px)",

                padding:
                  "16px 36px",

                fontSize:
                  "1rem",

                fontWeight:
                  "700",

                color:
                  "#ffffff",

                cursor:
                  "pointer",

                transition:
                  "all 0.3s ease",

                boxSizing:
                  "border-box",
              }}

              className="
                hover:bg-white/20
                hover:border-white/40
                hover:-translate-y-0.5
                hover:shadow-[0_0_30px_rgba(255,255,255,0.12)]
                group
              "
            >

              Explore Our Services

              <ArrowRight
                style={{
                  marginLeft:
                    "12px",

                  transition:
                    "transform 0.3s ease",
                }}
                className="
                  group-hover:translate-x-1
                "
                size={18}
              />

            </button>


            {/* Contact */}

            <button
              onClick={() =>
                navigate("/contact")
              }
              style={{
                display:
                  "inline-flex",

                alignItems:
                  "center",

                justifyContent:
                  "center",

                borderRadius:
                  "9999px",

                background:
                  "rgba(255,255,255,0.06)",

                border:
                  "1px solid rgba(255,255,255,0.18)",

                backdropFilter:
                  "blur(18px)",

                WebkitBackdropFilter:
                  "blur(18px)",

                padding:
                  "16px 36px",

                fontSize:
                  "1rem",

                fontWeight:
                  "600",

                color:
                  "#ffffff",

                cursor:
                  "pointer",

                transition:
                  "all 0.3s ease",

                boxSizing:
                  "border-box",
              }}

              className="
                hover:bg-white/15
                hover:border-white/35
                hover:-translate-y-0.5
                group
              "
            >

              Contact Us

              <ArrowRight
                style={{
                  marginLeft:
                    "12px",

                  transition:
                    "transform 0.3s ease",
                }}
                className="
                  group-hover:translate-x-1
                "
                size={18}
              />

            </button>

          </motion.div>

        </div>


        {/* =================================================
            RIGHT COLUMN - GLASS CARD
            ================================================= */}

        <motion.div
          initial={{
            opacity: 0,
            x: 30,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            delay: 0.3,
            duration: 0.6,
          }}
          style={{
            position: "relative",
            width: "100%",
            borderRadius: "2.5rem",
            border: "1px solid rgba(255,255,255,0.18)",
            backgroundColor: "rgba(255,255,255,0.10)",
            backdropFilter: "blur(14px)",
            WebkitBackdropFilter: "blur(14px)",
            boxShadow: "0 20px 80px -20px rgba(14,165,233,0.15)",
            overflow: "hidden",
            padding: "40px",
            boxSizing: "border-box",
          }}
        >

          {/* =================================================
              GLASS HIGHLIGHT
              ================================================= */}

          <div
            style={{
              position:
                "absolute",

              top: 0,
              left: 0,
              right: 0,

              height:
                "1px",

              background:
                "linear-gradient(to right, transparent, rgba(255,255,255,0.35), transparent)",

              pointerEvents:
                "none",
            }}
          />


          {/* =================================================
              EXPERTISE
              ================================================= */}

          <div>

            {/* Icon */}

            <div
              style={{
                width:
                  "56px",

                height:
                  "56px",

                borderRadius:
                  "16px",

                backgroundColor:
                  "rgba(56,189,248,0.10)",

                border:
                  "1px solid rgba(56,189,248,0.20)",

                display:
                  "flex",

                alignItems:
                  "center",

                justifyContent:
                  "center",

                marginBottom:
                  "28px",
              }}
            >

              <Globe
                className=
                  "text-sky-400"
                size={24}
              />

            </div>


            {/* Small heading */}

            <p
              style={{
                textTransform:
                  "uppercase",

                letterSpacing:
                  "4px",

                color:
                  "#38bdf8",

                fontSize:
                  "0.75rem",

                fontWeight:
                  "700",

                marginBottom:
                  "12px",
              }}
            >
              Expertise
            </p>


            {/* Main heading */}

            <h3
              style={{
                fontSize:
                  "clamp(2rem, 3vw, 2.75rem)",

                fontWeight:
                  "800",

                color: "#ffffff",

                marginBottom:
                  "20px",

                letterSpacing:
                  "-0.025em",
              }}
            >
              GIS + IT
            </h3>


            {/* Description */}

            <p
              style={{
                
                color: "#e2e8f0",

                fontSize:
                  "1rem",

                lineHeight:
                  "1.7",

                fontWeight:
                  "500",
              }}
            >
              Remote Sensing,
              Artificial Intelligence,
              Enterprise Software,
              Cloud Infrastructure,
              Spatial Analytics &
              Web Platforms.
            </p>

          </div>


          {/* =================================================
              DIVIDER
              ================================================= */}

          <div
            style={{
              margin:
                "36px 0",

              height:
                "1px",

              width:
                "100%",

              background:
                "linear-gradient(to right, transparent, rgba(255,255,255,0.12), transparent)",
            }}
          />


          {/* =================================================
              STATS
              ================================================= */}

          <div
            style={{
              display:
                "grid",

              gridTemplateColumns:
                "repeat(auto-fit, minmax(180px, 1fr))",

              gap:
                "24px",

              boxSizing:
                "border-box",
            }}
          >

            {/* PROJECTS */}

            <div
              style={{
                display:
                  "flex",

                alignItems:
                  "center",

                gap:
                  "20px",
              }}
            >

              <div
                style={{
                  width:
                    "52px",

                  height:
                    "52px",

                  flexShrink:
                    0,

                  borderRadius:
                    "16px",

                  backgroundColor:
                    "rgba(56,189,248,0.05)",

                  border:
                    "1px solid rgba(255,255,255,0.08)",

                  display:
                    "flex",

                  alignItems:
                    "center",

                  justifyContent:
                    "center",
                }}
              >

                <MapPinned
                  className=
                    "text-sky-400"
                  size={22}
                />

              </div>


              <div>

                <h2
                  style={{
                    fontSize:
                      "1.75rem",

                    fontWeight:
                      "700",

                    color: "#ffffff",

                    marginBottom:
                      "4px",
                  }}
                >
                  500+
                </h2>

                <p
                  style={{

                    color: "#cbd5e1",

                    fontSize:
                      "0.75rem",

                    fontWeight:
                      "600",

                    textTransform:
                      "uppercase",

                    letterSpacing:
                      "0.05em",
                  }}
                >
                  Projects
                </p>

              </div>

            </div>


            {/* CLIENTS */}

            <div
              style={{
                display:
                  "flex",

                alignItems:
                  "center",

                gap:
                  "20px",
              }}
            >

              <div
                style={{
                  width:
                    "52px",

                  height:
                    "52px",

                  flexShrink:
                    0,

                  borderRadius:
                    "16px",

                  backgroundColor:
                    "rgba(56,189,248,0.05)",

                  border:
                    "1px solid rgba(255,255,255,0.08)",

                  display:
                    "flex",

                  alignItems:
                    "center",

                  justifyContent:
                    "center",
                }}
              >

                <Globe
                  className=
                    "text-sky-400"
                  size={22}
                />

              </div>


              <div>

                <h2
                  style={{
                    fontSize:
                      "1.75rem",

                    fontWeight:
                      "700",

                    color:
                      "#ffffff",

                    marginBottom:
                      "4px",
                  }}
                >
                  100+
                </h2>

                <p
                  style={{
                    color:
                      "#9ca3af",

                    fontSize:
                      "0.75rem",

                    fontWeight:
                      "600",

                    textTransform:
                      "uppercase",

                    letterSpacing:
                      "0.05em",
                  }}
                >
                  Clients
                </p>

              </div>

            </div>

          </div>

        </motion.div>

      </div>

    </section>
  );
}