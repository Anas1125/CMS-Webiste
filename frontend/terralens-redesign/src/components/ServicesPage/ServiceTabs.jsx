import {
  MapPinned,
  Globe2,
  Code2,
  BriefcaseBusiness,
} from "lucide-react";

const tabs = [
  {
    id: "survey",
    icon: MapPinned,
    title: "Survey",
  },
  {
    id: "gis",
    icon: Globe2,
    title: "GIS Services",
  },
  {
    id: "it",
    icon: Code2,
    title: "IT Services",
  },
  {
    id: "consultancy",
    icon: BriefcaseBusiness,
    title: "Consultancy",
  },
];

export default function ServiceTabs({
  activeTab,
  setActiveTab,
}) {
  return (
    <div className="w-full max-w-5xl mx-auto">

      <div
        className="
          w-full
          rounded-[2rem]
          lg:rounded-full
          border
          border-slate-200
          bg-white
          p-2
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-4
          gap-2
        "
      >

        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.title}
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex
                items-center
                justify-center
                gap-3
                rounded-[1.5rem]
                lg:rounded-full
                py-4
                lg:py-5
                transition-all
                duration-300
                font-semibold
                text-sm
                md:text-base
                cursor-pointer

                ${
                  isActive
                    ? `
                      bg-sky-500
                      text-white
                      shadow-[0_0_25px_rgba(14,165,233,0.25)]
                    `
                    : `
                      text-slate-500
                      hover:bg-sky-50
                      hover:text-sky-600
                    `
                }
              `}
            >

              <Icon
                size={20}
                className={`
                  transition-colors
                  duration-300

                  ${
                    isActive
                      ? "text-white"
                      : "text-sky-500"
                  }
                `}
              />

              <span>
                {tab.title}
              </span>

            </button>
          );
        })}

      </div>

    </div>
  );
}