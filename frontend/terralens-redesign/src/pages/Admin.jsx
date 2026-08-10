export default function Admin() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0B0B0D",
        color: "white",
        display: "flex",
      }}
    >
      {/* Sidebar */}
      <aside
        style={{
          width: "260px",
          background: "#111113",
          borderRight: "1px solid rgba(255,255,255,.08)",
          padding: "32px 24px",
        }}
      >
        <h1
          style={{
            fontSize: "1.8rem",
            fontWeight: "700",
            marginBottom: "48px",
          }}
        >
          TerraLens
        </h1>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <button className="admin-btn">Dashboard</button>
          <button className="admin-btn">Jobs</button>
          <button className="admin-btn">Contacts</button>
          <button className="admin-btn">Applications</button>
        </div>
      </aside>

      {/* Main */}
      <main
        style={{
          flex: 1,
          padding: "40px",
        }}
      >
        <>
    <h1
        style={{
        fontSize: "2.5rem",
        fontWeight: "700",
        marginBottom: "8px",
        }}
    >
        Dashboard
    </h1>

    <p
        style={{
        color: "#9ca3af",
        marginBottom: "40px",
        }}
    >
        Welcome to TerraLens Admin Panel
    </p>

    <div
        style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
        gap: "24px",
        marginBottom: "40px",
        }}
    >
        {[
        {
            title: "Jobs",
            value: "0",
            color: "#38bdf8",
        },
        {
            title: "Applications",
            value: "0",
            color: "#10b981",
        },
        {
            title: "Contacts",
            value: "0",
            color: "#f59e0b",
        },
        {
            title: "Active Jobs",
            value: "0",
            color: "#8b5cf6",
        },
        ].map((card) => (
        <div
            key={card.title}
            style={{
            background: "#111113",
            border: "1px solid rgba(255,255,255,.08)",
            borderRadius: "24px",
            padding: "28px",
            }}
        >
            <p
            style={{
                color: "#9ca3af",
                fontSize: ".95rem",
            }}
            >
            {card.title}
            </p>

            <h2
            style={{
                fontSize: "2.8rem",
                marginTop: "14px",
                color: card.color,
                fontWeight: "700",
            }}
            >
            {card.value}
            </h2>
        </div>
        ))}
    </div>

    <div
        style={{
        background: "#111113",
        borderRadius: "24px",
        border: "1px solid rgba(255,255,255,.08)",
        padding: "32px",
        }}
    >
        <h2
        style={{
            fontSize: "1.5rem",
            marginBottom: "20px",
        }}
        >
        Recent Jobs
        </h2>

        <p style={{ color: "#9ca3af" }}>
        Job table will appear here.
        </p>
    </div>
    </>
      </main>
    </div>
  );
}