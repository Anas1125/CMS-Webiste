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
          }}
        >
          {title}
        </h1>

        <p
          style={{
            color: "#64748b",
            margin: 0,
          }}
        >
          {subtitle}
        </p>
      </div>

      {buttonText && (
        <button
          onClick={onButtonClick}
          style={{
            background: "#0284c7",
            color: "#ffffff",
            border: "none",
            padding: "14px 22px",
            borderRadius: "12px",
            cursor: "pointer",
            fontWeight: "600",
          }}
        >
          + {buttonText}
        </button>
      )}
    </div>
  );
}