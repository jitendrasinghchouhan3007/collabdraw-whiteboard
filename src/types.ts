export interface User { id: number; username: string; }
export interface Project { id: number; name: string; description: string; owner_id: number; owner_name?: string; created_at: string; }
export interface Whiteboard {
  id: number;
  project_id: number;
  name: string;
  state?: string;
  created_at: string;
}