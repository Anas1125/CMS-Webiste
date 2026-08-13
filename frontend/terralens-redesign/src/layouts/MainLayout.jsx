import { Outlet, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

export default function MainLayout() {
  const location = useLocation();

  return (
    <>
      <Navbar />

      <main>
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.5,
            ease: "easeInOut",
          }}
        >
          <Outlet />
        </motion.div>
      </main>

      <Footer />
    </>
  );
}