export default function PageHeader({
  title,
  subtitle,
  buttonText,
  onButtonClick,
}) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "35px",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      <div>
        <h1
          style={{
            color: "#0f172a",
            fontSize: "2.3rem",
            fontWeight: "700",
            margin: 0,
            marginBottom: "8px",
            lineHeight: "1.2",
            letterSpacing: "-0.02em",
          }}
        >
          {title}
        </h1>

        <p
          style={{
            color: "#64748b",
            fontSize: "1rem",
            margin: 0,
            lineHeight: "1.5",
          }}
        >
          {subtitle}
        </p>
      </div>

      {buttonText && (
        <button
          onClick={onButtonClick}
          style={{
            background: "#0ea5e9",
            color: "#ffffff",
            border: "none",
            padding: "14px 22px",
            borderRadius: "12px",
            cursor: "pointer",
            fontWeight: "600",
            fontSize: "0.95rem",
            transition: "all 0.3s ease",
            boxShadow: "0 4px 14px rgba(14,165,233,0.18)",
          }}
        >
          + {buttonText}
        </button>
      )}
    </div>
  );
}