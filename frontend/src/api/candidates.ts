import type { Candidate } from "./types";

const BASE = `${import.meta.env.VITE_API_URL}/api/candidates`;

export async function getAllCandidates(): Promise<Candidate[]> {
  const res = await fetch(BASE);
  return res.json();
}

export async function getCandidateById(id: number): Promise<Candidate> {
  const res = await fetch(`${BASE}/${id}`);
  return res.json();
}

export async function getCandidatesByJob(jobId: number): Promise<Candidate[]> {
  const res = await fetch(`${BASE}/job/${jobId}`);
  return res.json();
}

export async function applyForJob(
  candidate: Omit<Candidate, "id" | "appliedAt" | "status">
): Promise<Candidate> {
  const res = await fetch(BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(candidate),
  });
  return res.json();
}

export async function updateCandidateStatus(id: number, status: string): Promise<void> {
  await fetch(`${BASE}/${id}/status`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(status),
  });
}
