import { useState } from "react";
import type { Candidate, Job } from "../../api/types";

interface Props {
  jobs: Job[];
  onSubmit: (candidate: Omit<Candidate, "id" | "appliedAt" | "status">) => void;
}

const empty = { name: "", email: "", jobId: 0, resumeUrl: "" };

export default function ApplyForm({ jobs, onSubmit }: Props) {
  const [form, setForm] = useState(empty);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ ...form, jobId: Number(form.jobId) });
    setForm(empty);
  };

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm(prev => ({ ...prev, [field]: e.target.value }));

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h2 style={styles.heading}>Apply for a Job</h2>

      <label style={styles.label}>Full Name</label>
      <input style={styles.input} placeholder="Your full name" value={form.name} onChange={set("name")} required />

      <label style={styles.label}>Email</label>
      <input style={styles.input} type="email" placeholder="you@example.com" value={form.email} onChange={set("email")} required />

      <label style={styles.label}>Select Job</label>
      <select style={styles.input} value={form.jobId} onChange={set("jobId")} required>
        <option value={0} disabled>-- Choose a job --</option>
        {jobs.map(j => (
          <option key={j.id} value={j.id}>{j.title} — {j.location}</option>
        ))}
      </select>

      <label style={styles.label}>Resume URL</label>
      <input style={styles.input} placeholder="https://your-resume.com/cv.pdf" value={form.resumeUrl} onChange={set("resumeUrl")} />

      <button style={styles.btn} type="submit">Submit Application</button>
    </form>
  );
}

const styles: Record<string, React.CSSProperties> = {
  form: { background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 10, padding: 24, marginBottom: 32 },
  heading: { margin: "0 0 20px", fontSize: 18 },
  label: { display: "block", marginBottom: 4, fontSize: 13, fontWeight: 600, color: "#374151" },
  input: { width: "100%", padding: "8px 12px", borderRadius: 6, border: "1px solid #d1d5db", fontSize: 14, marginBottom: 14, boxSizing: "border-box" },
  btn: { background: "#10b981", color: "#fff", border: "none", borderRadius: 6, padding: "10px 20px", fontSize: 14, fontWeight: 600, cursor: "pointer", width: "100%" },
};
