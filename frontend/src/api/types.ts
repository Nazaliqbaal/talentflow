export interface Job {
  id: number;
  title: string;
  description: string;
  location: string;
  type: string;
  postedAt: string;
}

export interface Candidate {
  id: number;
  name: string;
  email: string;
  jobId: number;
  resumeUrl: string;
  status: string;
  appliedAt: string;
}
