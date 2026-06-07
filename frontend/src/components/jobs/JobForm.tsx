import { useState } from "react";
import type { Job } from "../../api/types";

interface Props {
  onSubmit: (job: Omit<Job, "id" | "postedAt">) => void;
}

const empty = { title: "", description: "", location: "", type: "Full-time" };

export default function JobForm({ onSubmit }: Props) {
  const [form, setForm] = useState(empty);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
    setForm(empty);
  };

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm(prev => ({ ...prev, [field]: e.target.value }));

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h2 style={styles.heading}>Post a New Job</h2>

      <label style={styles.label}>Job Title</label>
      <input style={styles.input} placeholder="e.g. FullStack Engineer" value={form.title} onChange={set("title")} required />

      <label style={styles.label}>Description</label>
      <textarea style={{ ...styles.input, height: 80, resize: "vertical" }} placeholder="Role overview..." value={form.description} onChange={set("description")} required />

      <label style={styles.label}>Location</label>
      <input style={styles.input} placeholder="e.g. Abu Dhabi, UAE" value={form.location} onChange={set("location")} required />

      <label style={styles.label}>Job Type</label>
      <select style={styles.input} value={form.type} onChange={set("type")}>
        <option>Full-time</option>
        <option>Contract</option>
        <option>Part-time</option>
        <option>Remote</option>
      </select>

      <button style={styles.btn} type="submit">Post Job</button>
    </form>
  );
}

const styles: Record<string, React.CSSProperties> = {
  form: { background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 10, padding: 24, marginBottom: 32 },
  heading: { margin: "0 0 20px", fontSize: 18 },
  label: { display: "block", marginBottom: 4, fontSize: 13, fontWeight: 600, color: "#374151" },
  input: { width: "100%", padding: "8px 12px", borderRadius: 6, border: "1px solid #d1d5db", fontSize: 14, marginBottom: 14, boxSizing: "border-box" },
  btn: { background: "#3b82f6", color: "#fff", border: "none", borderRadius: 6, padding: "10px 20px", fontSize: 14, fontWeight: 600, cursor: "pointer", width: "100%" },
};
