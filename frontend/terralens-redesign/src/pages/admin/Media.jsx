import { useEffect, useState } from "react";

import PageHeader from "../../components/admin/common/PageHeader";
import FileUploader from "../../components/admin/common/FileUploader";
import MediaGrid from "../../components/admin/common/MediaGrid";

import { getMedia } from "../../api/media";

const folders = [
  {
    value: "hero",
    label: "Hero",
  },
  {
    value: "about",
    label: "About",
  },
  {
    value: "services",
    label: "Services",
  },
  {
    value: "products",
    label: "Products",
  },
  {
    value: "showcase",
    label: "Showcase",
  },
  {
    value: "careers",
    label: "Careers",
  },
  {
    value: "contact",
    label: "Contact",
  },
  {
    value: "logo",
    label: "Logo",
  },
  {
    value: "general",
    label: "General",
  },
];

export default function Media() {
  const [files, setFiles] = useState([]);
  const [folder, setFolder] = useState("hero");

  useEffect(() => {
    loadMedia();
  }, []);

  const loadMedia = async () => {
    try {
      const data = await getMedia();
      setFiles(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      style={{
        width: "100%",
        color: "#0f172a",
      }}
    >
      {/* Folder Selector */}

      <div
        style={{
          marginBottom: "25px",
        }}
      >
        <label
          style={{
            display: "block",
            color: "#334155",
            fontWeight: "600",
            marginBottom: "10px",
          }}
        >
          Upload Folder
        </label>

        <select
          value={folder}
          onChange={(e) => setFolder(e.target.value)}
          style={{
            width: "100%",
            maxWidth: "350px",
            padding: "14px 16px",
            borderRadius: "10px",
            background: "#ffffff",
            color: "#0f172a",
            border: "1px solid #cbd5e1",
            fontSize: "15px",
            outline: "none",
            boxSizing: "border-box",
          }}
        >
          {folders.map((item) => (
            <option
              key={item.value}
              value={item.value}
            >
              {item.label}
            </option>
          ))}
        </select>
      </div>

      {/* Upload */}

      <FileUploader
        folder={folder}
        label={`Upload to ${
          folders.find(
            (item) => item.value === folder
          )?.label
        }`}
        onUploaded={loadMedia}
      />

      {/* Media */}

      <MediaGrid
        files={files}
        onRefresh={loadMedia}
      />
    </div>
  );
}