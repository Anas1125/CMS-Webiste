import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import {
  AnimatePresence,
  motion,
} from "framer-motion";

import ScrollToTop from "./components/ScrollToTop";

import MainLayout from "./layouts/MainLayout";
import AdminLayout from "./layouts/AdminLayout";

import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Products from "./pages/Products";
import Showcase from "./pages/Showcase";
import Careers from "./pages/Careers";
import Contact from "./pages/Contact";
import ServiceDetails from "./pages/ServiceDetails";

import Login from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";
import Jobs from "./pages/admin/Jobs";
import ProductsAdmin from "./pages/admin/Products";
import ServicesAdmin from "./pages/admin/Services";
import ShowcaseAdmin from "./pages/admin/Showcase";
import Contacts from "./pages/admin/Contacts";
import Applications from "./pages/admin/Applications";
import Settings from "./pages/admin/Settings";
import Media from "./pages/admin/Media";
import Partners from "./pages/admin/Partners";

import ProtectedRoute from "./components/admin/ProtectedRoute";


function PublicRoutes() {
  const location = useLocation();

  /*
  =========================================================
  IS THE DESTINATION HOME?
  =========================================================
  */

  const goingHome = location.pathname === "/";


  /*
  =========================================================
  PAGE VARIANTS

  custom = goingHome

  When goingHome === true:
  - old page stays visible
  - new Home appears immediately
  - NO white fade

  When goingHome === false:
  - old page fades out
  - new page fades in
  =========================================================
  */

  const pageVariants = {
    initial: (isHome) => ({
      opacity: isHome ? 1 : 0,
    }),

    animate: {
      opacity: 1,
    },

    exit: (isHome) => ({
      opacity: isHome ? 1 : 0,
    }),
  };


  return (
    <AnimatePresence
      initial={false}
      mode="sync"
      custom={goingHome}
    >
      <motion.div
        key={location.pathname}
        custom={goingHome}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{
          duration: 0.6,
          ease: "easeInOut",
        }}
        style={{
          width: "100%",
        }}
      >
        <Routes location={location}>

          {/* =========================
              PUBLIC WEBSITE
          ========================= */}

          <Route element={<MainLayout />}>

            <Route
              path="/"
              element={<Home />}
            />

            <Route
              path="/about"
              element={<About />}
            />

            <Route
              path="/services"
              element={<Services />}
            />

            <Route
              path="/services/:slug"
              element={<ServiceDetails />}
            />

            <Route
              path="/products"
              element={<Products />}
            />

            <Route
              path="/showcase"
              element={<Showcase />}
            />

            <Route
              path="/careers"
              element={<Careers />}
            />

            <Route
              path="/contact"
              element={<Contact />}
            />

          </Route>

        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}


function AdminRoutes() {
  return (
    <Routes>

      {/* =========================
          ADMIN LOGIN
      ========================= */}

      <Route
        path="/admin/login"
        element={<Login />}
      />


      {/* =========================
          ADMIN PANEL
      ========================= */}

      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >

        <Route
          path="partners"
          element={<Partners />}
        />

        <Route
          path="dashboard"
          element={<Dashboard />}
        />

        <Route
          path="jobs"
          element={<Jobs />}
        />

        <Route
          path="services"
          element={<ServicesAdmin />}
        />

        <Route
          path="products"
          element={<ProductsAdmin />}
        />

        <Route
          path="showcase"
          element={<ShowcaseAdmin />}
        />

        <Route
          path="contacts"
          element={<Contacts />}
        />

        <Route
          path="applications"
          element={<Applications />}
        />

        <Route
          path="settings"
          element={<Settings />}
        />

        <Route
          path="media"
          element={<Media />}
        />

      </Route>

    </Routes>
  );
}


function App() {
  return (
    <BrowserRouter>

      <ScrollToTop />

      <PublicRoutes />

      <AdminRoutes />

    </BrowserRouter>
  );
}


export default App;