import type { Candidate } from "../../api/types";

interface Props {
  candidate: Candidate;
  onStatusChange: (id: number, status: string) => void;
}

const statusColors: Record<string, string> = {
  Applied: "#fef3c7",
  Reviewing: "#dbeafe",
  Interviewed: "#ede9fe",
  Hired: "#dcfce7",
  Rejected: "#fee2e2",
};

export default function CandidateCard({ candidate, onStatusChange }: Props) {
  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <div>
          <h3 style={styles.name}>{candidate.name}</h3>
          <a href={`mailto:${candidate.email}`} style={styles.email}>{candidate.email}</a>
        </div>
        <span style={{ ...styles.badge, background: statusColors[candidate.status] ?? "#f3f4f6" }}>
          {candidate.status}
        </span>
      </div>

      <small style={styles.meta}>
        Job #{candidate.jobId} · Applied {new Date(candidate.appliedAt).toLocaleDateString()}
      </small>

      <div style={styles.actions}>
        {["Reviewing", "Interviewed", "Hired", "Rejected"].map(s => (
          <button
            key={s}
            style={{ ...styles.actionBtn, opacity: candidate.status === s ? 0.4 : 1 }}
            disabled={candidate.status === s}
            onClick={() => onStatusChange(candidate.id, s)}
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  card: {
    border: "1px solid #e2e8f0", borderRadius: 10, padding: "16px 20px",
    marginBottom: 12, background: "#fff", boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
  },
  header: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 },
  name: { margin: "0 0 2px", fontSize: 16, fontWeight: 600 },
  email: { fontSize: 13, color: "#3b82f6", textDecoration: "none" },
  badge: { fontSize: 12, padding: "3px 10px", borderRadius: 20, fontWeight: 500 },
  meta: { color: "#888", fontSize: 13, display: "block", marginBottom: 12 },
  actions: { display: "flex", gap: 6, flexWrap: "wrap" },
  actionBtn: {
    fontSize: 12, padding: "4px 10px", borderRadius: 6,
    border: "1px solid #d1d5db", background: "#f9fafb", cursor: "pointer",
  },
};
