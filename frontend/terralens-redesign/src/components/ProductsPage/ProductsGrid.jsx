import { useEffect, useState } from "react";
import { getProducts } from "../../api/products";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function ProductGrid() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await getProducts();

        const activeProducts = data.filter(
          (product) => product.is_active !== false
        );

        setProducts(activeProducts);
      } catch (error) {
        console.error("Failed to load products:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  // =========================
  // IMAGE URL
  // =========================

  const getImageUrl = (image) => {
    if (!image) {
      return null;
    }

    if (
      image.startsWith("http://") ||
      image.startsWith("https://")
    ) {
      return image;
    }

    return `${import.meta.env.VITE_API_URL}${image}`;
  };

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <section
        className="
          w-full
          bg-white
          px-6
          py-32
          text-center
        "
      >
        <p className="text-slate-500">
          Loading products...
        </p>
      </section>
    );
  }

  return (
    <section
      id="products-grid"
      className="
        w-full
        bg-white
        px-6
        py-24
        md:py-28
        overflow-hidden
      "
    >

      {/* =========================
          MAIN CONTAINER
      ========================= */}

      <div className="mx-auto flex w-full max-w-[85rem] flex-col items-center">

        {/* =========================
            PRODUCT GRID
        ========================= */}

        <div
          className="
            grid
            w-full
            max-w-7xl
            grid-cols-1
            gap-10
            lg:grid-cols-2
          "
        >

          {products.map((product, index) => (

            <motion.div
              key={product.id}
              initial={{
                opacity: 0,
                y: 40,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                delay: index * 0.08,
                duration: 0.5,
              }}
              whileHover={{
                y: -6,
              }}
              className="
                group
                relative
                flex
                flex-col
                overflow-hidden
                rounded-[2.5rem]
                border
                border-slate-200
                bg-white
                shadow-[0_10px_40px_rgba(15,23,42,0.06)]
                transition-all
                duration-500
                hover:border-sky-300
                hover:shadow-[0_20px_60px_rgba(14,165,233,0.12)]
              "
            >

              {/* =========================
                  IMAGE
              ========================= */}

              <div
                className="
                  relative
                  h-[280px]
                  w-full
                  shrink-0
                  overflow-hidden
                  bg-slate-100
                "
              >

                {getImageUrl(product.image) ? (
                  <img
                    src={getImageUrl(product.image)}
                    alt={product.name}
                    className="
                      h-full
                      w-full
                      object-cover
                      transition-transform
                      duration-700
                      group-hover:scale-105
                    "
                  />
                ) : (
                  <div
                    className="
                      flex
                      h-full
                      w-full
                      items-center
                      justify-center
                      bg-slate-100
                      text-slate-400
                    "
                  >
                    No Image
                  </div>
                )}

                {/* Soft image fade */}
                <div
                  className="
                    pointer-events-none
                    absolute
                    inset-x-0
                    bottom-0
                    h-32
                    bg-gradient-to-t
                    from-white
                    via-white/40
                    to-transparent
                  "
                />

              </div>


              {/* =========================
                  CONTENT
              ========================= */}

              <div
                className="
                  flex
                  w-full
                  flex-1
                  flex-col
                  p-8
                  md:p-10
                  lg:p-12
                "
              >

                {/* Eyebrow */}

                <p
                  className="
                    mb-4
                    text-xs
                    font-bold
                    uppercase
                    tracking-[5px]
                    text-sky-500
                  "
                >
                  Software Product
                </p>


                {/* Product Name */}

                <h2
                  className="
                    mb-3
                    text-3xl
                    font-extrabold
                    leading-tight
                    tracking-tight
                    text-slate-900
                    transition-colors
                    duration-300
                    group-hover:text-sky-500
                    md:text-4xl
                  "
                >
                  {product.name}
                </h2>


                {/* Tagline */}

                <h3
                  className="
                    mb-6
                    text-lg
                    font-semibold
                    text-slate-600
                  "
                >
                  {product.tagline}
                </h3>


                {/* Description */}

                <p
                  className="
                    mb-8
                    text-base
                    leading-7
                    text-slate-500
                    md:text-lg
                  "
                >
                  {product.description}
                </p>


                {/* =========================
                    FEATURES
                ========================= */}

                <div
                  className="
                    mb-10
                    flex
                    flex-1
                    flex-col
                    gap-4
                  "
                >

                  {(
                    typeof product.features === "string"
                      ? JSON.parse(product.features)
                      : product.features || []
                  ).map((feature) => (

                    <div
                      key={feature}
                      className="
                        flex
                        w-full
                        items-start
                        gap-3
                      "
                    >

                      <CheckCircle2
                        size={20}
                        className="
                          mt-1
                          shrink-0
                          text-sky-500
                        "
                      />

                      <span
                        className="
                          flex-1
                          break-words
                          text-base
                          leading-6
                          text-slate-600
                        "
                      >
                        {feature}
                      </span>

                    </div>

                  ))}

                </div>


                {/* =========================
                    BUTTON
                ========================= */}

                <div
                  className="
                    mt-auto
                    w-full
                    border-t
                    border-slate-200
                    pt-6
                  "
                >

                  <Link
                    to="/contact"
                    className="
                      group/button
                      inline-flex
                      items-center
                      gap-3
                      text-base
                      font-bold
                      text-sky-500
                      no-underline
                      transition-all
                      duration-300
                      hover:text-sky-600
                    "
                  >

                    {product.button}

                    <ArrowRight
                      size={20}
                      className="
                        transition-transform
                        duration-300
                        group-hover/button:translate-x-1.5
                      "
                    />

                  </Link>

                </div>

              </div>

            </motion.div>

          ))}

        </div>


        {/* =========================
            CUSTOM SOLUTION BANNER
        ========================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.6,
          }}
          className="
            relative
            mt-24
            w-full
            max-w-7xl
            overflow-hidden
            rounded-[2.5rem]
            border
            border-slate-200
            bg-slate-50
            px-6
            py-16
            text-center
            shadow-[0_15px_50px_rgba(15,23,42,0.06)]
            md:px-12
            lg:py-20
          "
        >

          {/* Top Glow */}

          <div
            className="
              pointer-events-none
              absolute
              left-1/2
              top-[-180px]
              h-[400px]
              w-[400px]
              -translate-x-1/2
              rounded-full
              bg-sky-400/10
              blur-[120px]
            "
          />


          {/* Bottom Glow */}

          <div
            className="
              pointer-events-none
              absolute
              bottom-[-150px]
              right-[-100px]
              h-[300px]
              w-[300px]
              rounded-full
              bg-sky-300/10
              blur-[100px]
            "
          />


          {/* Banner Content */}

          <div
            className="
              relative
              z-10
              mx-auto
              flex
              w-full
              max-w-3xl
              flex-col
              items-center
              justify-center
            "
          >

            {/* Eyebrow */}

            <p
              className="
                mb-5
                text-xs
                font-bold
                uppercase
                tracking-[6px]
                text-sky-500
                md:text-sm
              "
            >
              Tailored Solutions
            </p>


            {/* Heading */}

            <h2
              className="
                mb-6
                text-4xl
                font-extrabold
                leading-tight
                tracking-tight
                text-slate-900
                md:text-5xl
                lg:text-6xl
              "
            >
              Need a Custom Solution?
            </h2>


            {/* Description */}

            <p
              className="
                mb-9
                max-w-2xl
                text-base
                leading-7
                text-slate-500
                md:text-lg
                md:leading-8
              "
            >
              We also build custom GIS and IT software products
              tailored to your specific requirements. Let's discuss
              your vision.
            </p>


            {/* Contact Button */}

            <Link
              to="/contact"
              className="
                inline-flex
                items-center
                justify-center
                gap-3
                rounded-full
                bg-sky-500
                px-8
                py-4
                text-base
                font-bold
                text-white
                no-underline
                transition-all
                duration-300
                hover:-translate-y-1
                hover:bg-sky-400
                hover:shadow-[0_12px_30px_rgba(14,165,233,0.25)]
              "
            >
              Contact Us

              <ArrowRight size={20} />

            </Link>

          </div>

        </motion.div>

      </div>

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