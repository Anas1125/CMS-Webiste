import { useEffect, useState } from "react";
import JobTable from "../../components/admin/jobs/JobTable";
import { getJobs } from "../../api/jobs";
import AddJobModal from "../../components/admin/jobs/AddJobModal";
import EditJobModal from "../../components/admin/jobs/EditJobModal";
import DeleteJobModal from "../../components/admin/jobs/DeleteJobModal";
import PageHeader from "../../components/admin/common/PageHeader";
import SearchBar from "../../components/admin/common/SearchBar";

export default function Jobs() {
  const [jobs, setJobs] = useState([]);

  const [openAddModal, setOpenAddModal] = useState(false);

  const [selectedJob, setSelectedJob] = useState(null);
  const [openEditModal, setOpenEditModal] = useState(false);

  const [openDeleteModal, setOpenDeleteModal] =
    useState(false);

  const [search, setSearch] = useState("");

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    try {
      const data = await getJobs();
      setJobs(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (job) => {
    setSelectedJob(job);
    setOpenEditModal(true);
  };

  const handleDelete = (job) => {
    setSelectedJob(job);
    setOpenDeleteModal(true);
  };

  const filteredJobs = jobs.filter((job) =>
    job.title
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div
      style={{
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      {/* Page Header */}

      <PageHeader
        title="Jobs"
        subtitle="Manage career openings."
        buttonText="Add Job"
        onButtonClick={() =>
          setOpenAddModal(true)
        }
      />

      {/* Search */}

      <div
        style={{
          marginTop: "28px",
          marginBottom: "24px",
          width: "100%",
        }}
      >
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search jobs..."
        />
      </div>

      {/* Jobs Table */}

      <div
        style={{
          width: "100%",
          background: "#ffffff",
          border: "1px solid #e2e8f0",
          borderRadius: "20px",
          boxShadow:
            "0 8px 30px rgba(15,23,42,0.05)",
          overflow: "hidden",
        }}
      >
        <JobTable
          jobs={filteredJobs}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      {/* Add Job */}

      <AddJobModal
        open={openAddModal}
        onClose={() =>
          setOpenAddModal(false)
        }
        onSuccess={loadJobs}
      />

      {/* Edit Job */}

      <EditJobModal
        open={openEditModal}
        job={selectedJob}
        onClose={() => {
          setOpenEditModal(false);
          setSelectedJob(null);
        }}
        onSuccess={loadJobs}
      />

      {/* Delete Job */}

      <DeleteJobModal
        open={openDeleteModal}
        job={selectedJob}
        onClose={() => {
          setOpenDeleteModal(false);
          setSelectedJob(null);
        }}
        onSuccess={loadJobs}
      />
    </div>
  );
}