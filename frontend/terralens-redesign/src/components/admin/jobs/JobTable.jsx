import { Pencil, Trash2 } from "lucide-react";

export default function JobTable({
  jobs,
  onEdit,
  onDelete,
}) {
  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: "20px",
        overflow: "hidden",
        border: "1px solid #e2e8f0",
      }}
    >
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
        }}
      >
        <thead>
          <tr
            style={{
              background: "#f8fafc",
            }}
          >
            {[
              "Title",
              "Department",
              "Location",
              "Type",
              "Status",
              "Actions",
            ].map((item) => (
              <th
                key={item}
                style={{
                  padding: "18px",
                  textAlign: "left",
                  color: "#475569",
                  fontWeight: "600",
                  borderBottom: "1px solid #e2e8f0",
                }}
              >
                {item}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {jobs.map((job) => (
            <tr
              key={job.id}
              style={{
                borderTop: "1px solid #e2e8f0",
              }}
            >
              <td
                style={{
                  padding: 18,
                  color: "#0f172a",
                  fontWeight: "600",
                }}
              >
                {job.title}
              </td>

              <td
                style={{
                  padding: 18,
                  color: "#475569",
                }}
              >
                {job.department}
              </td>

              <td
                style={{
                  padding: 18,
                  color: "#475569",
                }}
              >
                {job.location}
              </td>

              <td
                style={{
                  padding: 18,
                  color: "#475569",
                }}
              >
                {job.employment_type}
              </td>

              <td style={{ padding: 18 }}>
                <span
                  style={{
                    background: job.is_active
                      ? "#dcfce7"
                      : "#fee2e2",
                    color: job.is_active
                      ? "#15803d"
                      : "#dc2626",
                    padding: "6px 12px",
                    borderRadius: "999px",
                    fontSize: ".8rem",
                    fontWeight: "600",
                  }}
                >
                  {job.is_active ? "Open" : "Closed"}
                </span>
              </td>

              <td style={{ padding: 18 }}>
                <button
                  onClick={() => onEdit(job)}
                  style={{
                    background: "#eff6ff",
                    border: "1px solid #bfdbfe",
                    borderRadius: "8px",
                    cursor: "pointer",
                    marginRight: "10px",
                    padding: "8px",
                  }}
                >
                  <Pencil
                    color="#0284c7"
                    size={18}
                  />
                </button>

                <button
                  onClick={() => onDelete(job)}
                  style={{
                    background: "#fef2f2",
                    border: "1px solid #fecaca",
                    borderRadius: "8px",
                    cursor: "pointer",
                    padding: "8px",
                  }}
                >
                  <Trash2
                    color="#dc2626"
                    size={18}
                  />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}