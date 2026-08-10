import { Search } from "lucide-react";

export default function SearchBar({
  value,
  onChange,
  placeholder = "Search...",
}) {
  return (
    <div
      style={{
        position: "relative",
        marginBottom: "25px",
      }}
    >
      <Search
        size={18}
        style={{
          position: "absolute",
          left: "16px",
          top: "50%",
          transform: "translateY(-50%)",
          color: "#64748b",
        }}
      />

      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          width: "100%",
          padding: "14px 18px 14px 46px",
          borderRadius: "12px",
          border: "1px solid #cbd5e1",
          background: "#ffffff",
          color: "#0f172a",
          fontSize: "15px",
          outline: "none",
          boxSizing: "border-box",
        }}
      />
    </div>
  );
}