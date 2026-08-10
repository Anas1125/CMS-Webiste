import { useEffect, useState } from "react";
import { uploadFile } from "../../api/media";
import MediaPicker from "../../components/admin/common/MediaPicker";
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
} from "../../api/projects";

export default function Showcase() {
  const [projects, setProjects] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [mediaPickerOpen, setMediaPickerOpen] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    try {
      setUploadingImage(true);

      const data = await uploadFile("showcase", file);

      setForm((prev) => ({
        ...prev,
        image: data.path,
      }));
    } catch (error) {
      console.error("Failed to upload image:", error);
      alert("Failed to upload image.");
    } finally {
      setUploadingImage(false);

      // Allows selecting the same file again later
      e.target.value = "";
    }
  };

  const [form, setForm] = useState({
    category: "",
    title: "",
    subtitle: "",
    client: "",
    location: "",
    year: "",
    duration: "",
    team: "",
    description: "",
    challenge: "",
    solution: "",
    results: [],
    technologies: [],
    image: "",
    is_active: true,
  });

  const loadProjects = async () => {
    try {
      const data = await getProjects();
      setProjects(data);
    } catch (error) {
      console.error("Failed to load projects:", error);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const resetForm = () => {
    setForm({
      category: "",
      title: "",
      subtitle: "",
      client: "",
      location: "",
      year: "",
      duration: "",
      team: "",
      description: "",
      challenge: "",
      solution: "",
      results: [],
      technologies: [],
      image: "",
      is_active: true,
    });

    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const payload = {
        ...form,
        results: JSON.stringify(form.results),
        technologies: JSON.stringify(form.technologies),
      };

      if (editingId) {
        await updateProject(editingId, payload);
      } else {
        await createProject(payload);
      }

      resetForm();
      await loadProjects();
    } catch (error) {
      console.error("Failed to save project:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (project) => {
    setEditingId(project.id);

    setForm({
      category: project.category || "",
      title: project.title || "",
      subtitle: project.subtitle || "",
      client: project.client || "",
      location: project.location || "",
      year: project.year || "",
      duration: project.duration || "",
      team: project.team || "",
      description: project.description || "",
      challenge: project.challenge || "",
      solution: project.solution || "",
      results: project.results
        ? typeof project.results === "string"
          ? JSON.parse(project.results)
          : project.results
        : [],
      technologies: project.technologies
        ? typeof project.technologies === "string"
          ? JSON.parse(project.technologies)
          : project.technologies
        : [],
      image: project.image || "",
      is_active: project.is_active ?? true,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this project?")) {
      return;
    }

    try {
      await deleteProject(id);
      await loadProjects();
    } catch (error) {
      console.error("Failed to delete project:", error);
    }
  };

  return (
    <div
      style={{
        color: "#0f172a",
        paddingBottom: "60px",
      }}
    >
      <h1
        style={{
          fontSize: "32px",
          fontWeight: "700",
          marginBottom: "8px",
        }}
      >
        Showcase
      </h1>

      <p
        style={{
          color: "#64748b",
          marginBottom: "30px",
        }}
      >
        Create and manage the projects displayed on the website.
      </p>

      {/* FORM */}
      <div
        style={{
          background: "#ffffff",
          borderRadius: "20px",
          padding: "30px",
          marginBottom: "35px",
          border: "1px solid #e2e8f0",
        }}
      >
        <h2
          style={{
            fontSize: "20px",
            marginBottom: "25px",
          }}
        >
          {editingId ? "Edit Project" : "Add Project"}
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Basic Information */}
          <h3 style={{ marginBottom: "20px" }}>
            Basic Information
          </h3>

          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Project Title"
            required
            style={inputStyle}
          />

          <input
            name="subtitle"
            value={form.subtitle}
            onChange={handleChange}
            placeholder="Subtitle"
            style={inputStyle}
          />

          <input
            name="category"
            value={form.category}
            onChange={handleChange}
            placeholder="GIS"
            required
            style={inputStyle}
          />

          <div style={{ marginBottom: "25px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "10px",
                fontWeight: "600",
              }}
            >
              Project Image
            </label>

            {form.image && (
              <img
                src={
                  form.image.startsWith("http")
                    ? form.image
                    : `${import.meta.env.VITE_API_URL}${form.image}`
                }
                alt="Project preview"
                style={{
                  width: "260px",
                  height: "160px",
                  objectFit: "cover",
                  borderRadius: "14px",
                  marginBottom: "15px",
                  display: "block",
                }}
              />
            )}

            <div
              style={{
                display: "flex",
                gap: "12px",
                flexWrap: "wrap",
              }}
            >
              {/* Upload from computer */}
              <label
                style={{
                  ...secondaryButtonStyle,
                  display: "inline-flex",
                  alignItems: "center",
                  cursor: uploadingImage
                    ? "not-allowed"
                    : "pointer",
                }}
              >
                {uploadingImage
                  ? "Uploading..."
                  : "Upload Image"}

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={uploadingImage}
                  style={{ display: "none" }}
                />
              </label>

              {/* Choose existing image */}
              <button
                type="button"
                onClick={() => setMediaPickerOpen(true)}
                style={secondaryButtonStyle}
              >
                Choose from Media Library
              </button>
            </div>
          </div>

          {/* Project Information */}
          <h3 style={{ margin: "30px 0 20px" }}>
            Project Information
          </h3>

          <input
            name="client"
            value={form.client}
            onChange={handleChange}
            placeholder="Client"
            style={inputStyle}
          />

          <input
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="Location"
            style={inputStyle}
          />

          <input
            name="year"
            value={form.year}
            onChange={handleChange}
            placeholder="2025"
            style={inputStyle}
          />

          <input
            name="duration"
            value={form.duration}
            onChange={handleChange}
            placeholder="8 Months"
            style={inputStyle}
          />

          <input
            name="team"
            value={form.team}
            onChange={handleChange}
            placeholder="12 Engineers"
            style={inputStyle}
          />

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Project description..."
            rows={5}
            style={textareaStyle}
          />

          {/* Details */}
          <h3 style={{ margin: "30px 0 20px" }}>
            Project Details
          </h3>

          <textarea
            name="challenge"
            value={form.challenge}
            onChange={handleChange}
            placeholder="Challenge..."
            rows={5}
            style={textareaStyle}
          />

          <textarea
            name="solution"
            value={form.solution}
            onChange={handleChange}
            placeholder="Solution..."
            rows={5}
            style={textareaStyle}
          />

          <textarea
            value={form.results.join("\n")}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                results: e.target.value
                  .split("\n")
                  .map((item) => item.trim())
                  .filter(Boolean),
              }))
            }
            placeholder={"Results, one per line"}
            rows={5}
            style={textareaStyle}
          />

          <textarea
            value={form.technologies.join("\n")}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                technologies: e.target.value
                  .split("\n")
                  .map((item) => item.trim())
                  .filter(Boolean),
              }))
            }
            placeholder={"Technologies, one per line"}
            rows={5}
            style={textareaStyle}
          />

          {/* Active */}
          <label
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              margin: "20px 0",
            }}
          >
            <input
              type="checkbox"
              name="is_active"
              checked={form.is_active}
              onChange={handleChange}
            />

            Active
          </label>

          <div
            style={{
              display: "flex",
              gap: "12px",
            }}
          >
            <button
              type="submit"
              disabled={loading}
              style={primaryButtonStyle}
            >
              {loading
                ? "Saving..."
                : editingId
                ? "Update Project"
                : "Create Project"}
            </button>

            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                style={secondaryButtonStyle}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* PROJECT LIST */}
      <div
        style={{
          background: "#ffffff",
          borderRadius: "20px",
          padding: "30px",
          border: "1px solid #e2e8f0",
        }}
      >
        <h2 style={{ marginBottom: "25px" }}>
          Existing Projects
        </h2>

        {projects.map((project) => (
          <div
            key={project.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "20px",
              padding: "20px",
              marginBottom: "15px",
              background: "#f8fafc",
              borderRadius: "14px",
            }}
          >
            <div>
              <h3 style={{ margin: 0 }}>
                {project.title}
              </h3>

              <p
                style={{
                  color: "#64748b",
                  fontSize: "14px",
                }}
              >
                {project.category}
              </p>

              <span
                style={{
                  color: project.is_active
                    ? "#4ade80"
                    : "#f87171",
                  fontSize: "12px",
                }}
              >
                {project.is_active
                  ? "Active"
                  : "Inactive"}
              </span>
            </div>

            <div
              style={{
                display: "flex",
                gap: "10px",
              }}
            >
              <button
                onClick={() => handleEdit(project)}
                style={secondaryButtonStyle}
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(project.id)}
                style={deleteButtonStyle}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <MediaPicker
        open={mediaPickerOpen}
        folder="showcase"
        type="image"
        onClose={() => setMediaPickerOpen(false)}
        onSelect={(file) => {
          setForm((prev) => ({
            ...prev,
            image: file.path,
          }));
        }}
      />
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "14px 16px",
  marginBottom: "15px",
  borderRadius: "10px",
  border: "1px solid #cbd5e1",
  background: "#f8fafc",
  color: "#0f172a",
  boxSizing: "border-box",
};

const textareaStyle = {
  ...inputStyle,
  resize: "vertical",
};

const primaryButtonStyle = {
  padding: "13px 22px",
  borderRadius: "10px",
  border: "none",
  background: "#0ea5e9",
  color: "#0f172a",
  fontWeight: "600",
  cursor: "pointer",
};

const secondaryButtonStyle = {
  padding: "13px 22px",
  borderRadius: "10px",
  border: "1px solid #cbd5e1",
  background: "#f8fafc",
  color: "#0f172a",
  fontWeight: "600",
  cursor: "pointer",
};

const deleteButtonStyle = {
  ...secondaryButtonStyle,
  color: "#dc2626",
};