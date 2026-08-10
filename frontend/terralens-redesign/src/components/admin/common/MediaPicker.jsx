import { useEffect, useState } from "react";
import { getMedia } from "../../../api/media";

export default function MediaPicker({
  open,
  folder,
  allFiles = false,
  type = "image",
  onClose,
  onSelect,
}) {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) {
      loadMedia();
    }
  }, [open, folder, type, allFiles]);

  const loadMedia = async () => {
    try {
      setLoading(true);

      const data = await getMedia();

      const filtered = data.filter((file) => {
        // If allFiles is true, ignore the folder.
        const matchesFolder = allFiles
          ? true
          : folder
          ? file.folder === folder
          : true;

        const filename =
          file.filename?.toLowerCase() || "";

        const mimeType =
          file.mime_type?.toLowerCase() || "";

        const isVideo =
          mimeType.startsWith("video/") ||
          /\.(mp4|webm|mov|avi|mkv)$/i.test(filename);

        const isImage =
          mimeType.startsWith("image/") ||
          /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(filename);

        const matchesType =
          type === "video"
            ? isVideo
            : isImage;

        return matchesFolder && matchesType;
      });

      setFiles(filtered);
    } catch (err) {
      console.error("Failed to load media:", err);
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  const title =
    type === "video"
      ? "Choose Video"
      : "Choose Image";

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,.75)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      }}
    >
      <div
        style={{
          width: "900px",
          background: "#111113",
          borderRadius: "24px",
          padding: "35px",
          maxHeight: "85vh",
          overflowY: "auto",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "30px",
          }}
        >
          <h2
            style={{
              color: "white",
              margin: 0,
            }}
          >
            {title}
          </h2>

          <button
            onClick={onClose}
            style={{
              background: "transparent",
              border: "none",
              color: "#9ca3af",
              fontSize: "24px",
              cursor: "pointer",
            }}
          >
            ×
          </button>
        </div>

        {/* Loading */}
        {loading && (
          <p
            style={{
              color: "#9ca3af",
              textAlign: "center",
              padding: "40px",
            }}
          >
            Loading media...
          </p>
        )}

        {/* Empty */}
        {!loading && files.length === 0 && (
          <div
            style={{
              textAlign: "center",
              padding: "60px 20px",
              border: "1px dashed #333",
              borderRadius: "16px",
            }}
          >
            <p
              style={{
                color: "#9ca3af",
                fontSize: "16px",
              }}
            >
              No {type === "video" ? "videos" : "images"} found.
            </p>

            <p
              style={{
                color: "#6b7280",
                fontSize: "13px",
                marginTop: "8px",
              }}
            >
              Upload a {type === "video" ? "video" : "image"} to the{" "}
              <strong>{folder}</strong> folder first.
            </p>
          </div>
        )}

        {/* Media Grid */}
        {!loading && files.length > 0 && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fill,minmax(180px,1fr))",
              gap: "20px",
            }}
          >
            {files.map((file) => {
              const mediaUrl =
                `${import.meta.env.VITE_API_URL}${file.path}`;

              return (
                <div
                  key={file.path}
                  style={{
                    cursor: "pointer",
                    borderRadius: "14px",
                    overflow: "hidden",
                    border: "1px solid #333",
                    background: "#1A1A1D",
                    transition: "0.2s",
                  }}
                  onClick={() => {
                    onSelect(file);
                    onClose();
                  }}
                >
                  {type === "video" ? (
                    <video
                      src={mediaUrl}
                      muted
                      playsInline
                      style={{
                        width: "100%",
                        height: "150px",
                        objectFit: "cover",
                        display: "block",
                      }}
                    />
                  ) : (
                    <img
                      src={mediaUrl}
                      alt={file.filename}
                      style={{
                        width: "100%",
                        height: "150px",
                        objectFit: "cover",
                        display: "block",
                      }}
                    />
                  )}

                  <p
                    style={{
                      color: "white",
                      margin: 0,
                      padding: "10px",
                      textAlign: "center",
                      fontSize: "13px",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {file.filename}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}