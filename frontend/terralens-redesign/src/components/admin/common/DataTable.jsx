export default function DataTable({
  columns,
  data,
  renderActions,
}) {
  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: "20px",
        overflow: "hidden",
        border: "1px solid #e2e8f0",
        boxShadow:
          "0 8px 30px rgba(15,23,42,0.05)",
        width: "100%",
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
              borderBottom: "1px solid #e2e8f0",
            }}
          >
            {columns.map((column) => (
              <th
                key={column.key}
                style={{
                  padding: "18px",
                  textAlign: "left",
                  color: "#334155",
                  fontWeight: "700",
                  fontSize: "0.875rem",
                  whiteSpace: "nowrap",
                }}
              >
                {column.label}
              </th>
            ))}

            {renderActions && (
              <th
                style={{
                  padding: "18px",
                  textAlign: "left",
                  color: "#334155",
                  fontWeight: "700",
                  fontSize: "0.875rem",
                  whiteSpace: "nowrap",
                }}
              >
                Actions
              </th>
            )}
          </tr>
        </thead>

        <tbody>
          {data.map((row) => (
            <tr
              key={row.id}
              style={{
                borderBottom: "1px solid #f1f5f9",
                transition: "background 0.2s ease",
              }}
            >
              {columns.map((column) => (
                <td
                  key={column.key}
                  style={{
                    padding: "18px",
                    color: "#334155",
                    fontSize: "0.95rem",
                    verticalAlign: "middle",
                  }}
                >
                  {column.render
                    ? column.render(row)
                    : row[column.key]}
                </td>
              ))}

              {renderActions && (
                <td
                  style={{
                    padding: "18px",
                    verticalAlign: "middle",
                  }}
                >
                  {renderActions(row)}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}