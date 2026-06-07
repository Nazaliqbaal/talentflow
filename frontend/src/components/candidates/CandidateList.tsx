import type { Candidate } from "../../api/types";
import CandidateCard from "./CandidateCard";

interface Props {
  candidates: Candidate[];
  onStatusChange: (id: number, status: string) => void;
}

export default function CandidateList({ candidates, onStatusChange }: Props) {
  if (candidates.length === 0) {
    return <p style={{ color: "#888", textAlign: "center", padding: 40 }}>No applications yet.</p>;
  }

  return (
    <div>
      {candidates.map(c => (
        <CandidateCard key={c.id} candidate={c} onStatusChange={onStatusChange} />
      ))}
    </div>
  );
}
