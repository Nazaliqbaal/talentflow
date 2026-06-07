import type { Job } from "./types";

const BASE = `${import.meta.env.VITE_API_URL}/api/jobs`;

export async function getAllJobs(): Promise<Job[]> {
  const res = await fetch(BASE);
  return res.json();
}

export async function getJobById(id: number): Promise<Job> {
  const res = await fetch(`${BASE}/${id}`);
  return res.json();
}

export async function createJob(job: Omit<Job, "id" | "postedAt">): Promise<Job> {
  const res = await fetch(BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(job),
  });
  return res.json();
}

export async function updateJob(id: number, job: Omit<Job, "id" | "postedAt">): Promise<void> {
  await fetch(`${BASE}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(job),
  });
}

export async function deleteJob(id: number): Promise<void> {
  await fetch(`${BASE}/${id}`, { method: "DELETE" });
}
