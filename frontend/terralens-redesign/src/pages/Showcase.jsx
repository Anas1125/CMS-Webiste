import { useState } from "react";

import ShowcaseHero from "../components/ShowcasePage/ShowcaseHero";
import ShowcaseTabs from "../components/ShowcasePage/ShowcaseTabs";
import Portfolio from "../components/ShowcasePage/Portfolio";
import Gallery from "../components/ShowcasePage/Gallery";
import Blog from "../components/ShowcasePage/Blog";

export default function Showcase() {
  const [activeTab, setActiveTab] = useState("portfolio");

  return (
    <div>

      <ShowcaseHero />

      <ShowcaseTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {activeTab === "portfolio" && <Portfolio />}
      {activeTab === "gallery" && <Gallery />}
      {activeTab === "blog" && <Blog />}

    </div>
  );
}