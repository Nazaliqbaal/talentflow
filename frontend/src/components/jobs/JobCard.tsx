import type { Job } from "../../api/types";

interface Props {
  job: Job;
  onDelete: (id: number) => void;
}

export default function JobCard({ job, onDelete }: Props) {
  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <div>
          <h3 style={styles.title}>{job.title}</h3>
          <span style={styles.badge}>{job.type}</span>
        </div>
        <button style={styles.deleteBtn} onClick={() => onDelete(job.id)}>✕</button>
      </div>
      <p style={styles.description}>{job.description}</p>
      <small style={styles.meta}>📍 {job.location} · Posted {new Date(job.postedAt).toLocaleDateString()}</small>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  card: {
    border: "1px solid #e2e8f0",
    borderRadius: 10,
    padding: "16px 20px",
    marginBottom: 12,
    background: "#fff",
    boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
  },
  header: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 },
  title: { margin: "0 0 4px", fontSize: 17, fontWeight: 600 },
  badge: {
    background: "#eff6ff", color: "#3b82f6", fontSize: 12,
    padding: "2px 8px", borderRadius: 20, fontWeight: 500,
  },
  description: { margin: "0 0 8px", color: "#555", fontSize: 14 },
  meta: { color: "#888", fontSize: 13 },
  deleteBtn: {
    background: "none", border: "none", cursor: "pointer",
    color: "#aaa", fontSize: 16, padding: 4,
  },
};
