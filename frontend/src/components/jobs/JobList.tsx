import type { Job } from "../../api/types";
import JobCard from "./JobCard";

interface Props {
  jobs: Job[];
  onDelete: (id: number) => void;
}

export default function JobList({ jobs, onDelete }: Props) {
  if (jobs.length === 0) {
    return <p style={{ color: "#888", textAlign: "center", padding: 40 }}>No jobs posted yet.</p>;
  }

  return (
    <div>
      {jobs.map(job => (
        <JobCard key={job.id} job={job} onDelete={onDelete} />
      ))}
    </div>
  );
}
