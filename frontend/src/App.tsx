import { useEffect, useState } from "react";
import type { Job, Candidate } from "./api/types";
import { getAllJobs, createJob, deleteJob } from "./api/jobs";
import { getAllCandidates, applyForJob, updateCandidateStatus } from "./api/candidates";
import JobForm from "./components/jobs/JobForm";
import JobList from "./components/jobs/JobList";
import ApplyForm from "./components/candidates/ApplyForm";
import CandidateList from "./components/candidates/CandidateList";

type Tab = "jobs" | "candidates";

export default function App() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [activeTab, setActiveTab] = useState<Tab>("jobs");

  useEffect(() => {
    getAllJobs().then(setJobs);
    getAllCandidates().then(setCandidates);
  }, []);

  const handleCreateJob = async (job: Omit<Job, "id" | "postedAt">) => {
    const created = await createJob(job);
    setJobs(prev => [...prev, created]);
  };

  const handleDeleteJob = async (id: number) => {
    await deleteJob(id);
    setJobs(prev => prev.filter(j => j.id !== id));
  };

  const handleApply = async (candidate: Omit<Candidate, "id" | "appliedAt" | "status">) => {
    const created = await applyForJob(candidate);
    setCandidates(prev => [...prev, created]);
  };

  const handleStatusChange = async (id: number, status: string) => {
    await updateCandidateStatus(id, status);
    setCandidates(prev => prev.map(c => c.id === id ? { ...c, status } : c));
  };

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <h1 style={styles.logo}>TalentFlow</h1>
        <p style={styles.tagline}>Hiring platform · Abu Dhabi, UAE</p>
      </header>

      <div style={styles.tabBar}>
        <button
          style={{ ...styles.tab, ...(activeTab === "jobs" ? styles.tabActive : {}) }}
          onClick={() => setActiveTab("jobs")}
        >
          Jobs <span style={styles.count}>{jobs.length}</span>
        </button>
        <button
          style={{ ...styles.tab, ...(activeTab === "candidates" ? styles.tabActive : {}) }}
          onClick={() => setActiveTab("candidates")}
        >
          Candidates <span style={styles.count}>{candidates.length}</span>
        </button>
      </div>

      <main style={styles.main}>
        {activeTab === "jobs" && (
          <>
            <JobForm onSubmit={handleCreateJob} />
            <JobList jobs={jobs} onDelete={handleDeleteJob} />
          </>
        )}
        {activeTab === "candidates" && (
          <>
            <ApplyForm jobs={jobs} onSubmit={handleApply} />
            <CandidateList candidates={candidates} onStatusChange={handleStatusChange} />
          </>
        )}
      </main>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: { minHeight: "100vh", background: "#f1f5f9", fontFamily: "system-ui, sans-serif" },
  header: { background: "#1e293b", color: "#fff", padding: "24px 32px" },
  logo: { margin: 0, fontSize: 26, fontWeight: 700 },
  tagline: { margin: "4px 0 0", color: "#94a3b8", fontSize: 14 },
  tabBar: { display: "flex", gap: 4, padding: "16px 32px", background: "#fff", borderBottom: "1px solid #e2e8f0" },
  tab: {
    padding: "8px 18px", borderRadius: 6, border: "none",
    background: "none", cursor: "pointer", fontSize: 14, fontWeight: 500, color: "#64748b",
  },
  tabActive: { background: "#eff6ff", color: "#3b82f6" },
  count: {
    background: "#e2e8f0", borderRadius: 20, padding: "1px 7px",
    fontSize: 12, marginLeft: 6, fontWeight: 600,
  },
  main: { maxWidth: 720, margin: "0 auto", padding: "32px 24px" },
};
