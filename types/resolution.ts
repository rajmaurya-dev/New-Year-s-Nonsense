export interface ResolutionPoint {
  id: string;
  content: string;
  isCompleted: boolean;
  completedAt: string | null;
  createdAt: string;
  updatedAt: string;
  resolutionId: string;
}

export interface Resolution {
  id: string;
  title: string;
  userId: string;
  creatorName: string | null;
  createdAt: string;
  updatedAt: string;
  category: string;
  isCompleted: boolean;
  completedAt: string | null;
  points: ResolutionPoint[];
}
