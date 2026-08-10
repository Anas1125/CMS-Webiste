import { useEffect, useState } from "react";
import { getStats } from "../../api/dashboard";

export default function Dashboard() {
  const [stats, setStats] = useState({
    jobs: 0,
    contacts: 0,
    applications: 0,
    active_jobs: 0,
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const data = await getStats();
      setStats(data);
    } catch (err) {
      console.error(err);
    }
  };

  const cards = [
    {
      title: "Jobs",
      value: stats.jobs,
      color: "#0ea5e9",
    },
    {
      title: "Contacts",
      value: stats.contacts,
      color: "#f59e0b",
    },
    {
      title: "Applications",
      value: stats.applications,
      color: "#22c55e",
    },
    {
      title: "Active Jobs",
      value: stats.active_jobs,
      color: "#8b5cf6",
    },
  ];

  return (
    <div
      style={{
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      {/* Header */}

      <div style={{ marginBottom: "40px" }}>
        <h1
          style={{
            fontSize: "2.5rem",
            fontWeight: "700",
            margin: "0 0 8px 0",
            color: "#0f172a",
            letterSpacing: "-0.03em",
          }}
        >
          Dashboard
        </h1>

        <p
          style={{
            margin: 0,
            color: "#64748b",
            fontSize: "1rem",
          }}
        >
          Welcome back 👋
        </p>
      </div>

      {/* Statistics Cards */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "24px",
          width: "100%",
        }}
      >
        {cards.map((card) => (
          <div
            key={card.title}
            style={{
              background: "#ffffff",
              border: "1px solid #e2e8f0",
              borderRadius: "24px",
              padding: "28px",
              boxSizing: "border-box",
              boxShadow:
                "0 8px 30px rgba(15, 23, 42, 0.06)",
              transition:
                "transform 0.2s ease, box-shadow 0.2s ease",
            }}
          >
            <p
              style={{
                margin: 0,
                color: "#64748b",
                fontSize: "1rem",
                fontWeight: "500",
              }}
            >
              {card.title}
            </p>

            <h2
              style={{
                color: card.color,
                fontSize: "3rem",
                fontWeight: "700",
                lineHeight: "1",
                margin: "18px 0 0 0",
              }}
            >
              {card.value}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
}