// src/types.ts

export interface User {
  id: number;
  name: string;
  email: string;
  role: 'student' | 'teacher' | 'admin';
}

export interface CourseProgress {
  id: number;
  title: string;
  progressPercentage: number;
  lastAccessed: string;
}

export interface Submission {
  id: number;
  studentName: string;
  taskTitle: string;
  repoLink: string;
  status: 'pending' | 'in_review' | 'approved' | 'rejected';
  submittedAt: string;
}

export interface AiPrediction {
  successProbability: number;
  riskLevel: 'low' | 'medium' | 'high';
  recommendation: string;
}

export interface Material {
  id: number;
  title: string;
  type: 'video' | 'pdf' | 'doc' | 'link';
  duration?: string; // для видео
  size?: string; // для файлов
  url: string;
}

export interface Lesson {
  id: number;
  title: string;
  date: string; // Формат "2026-05-20"
  time: string; // Формат "18:30"
  mentor: string;
  link?: string; // Ссылка на Zoom/Stream
}

export interface Homework {
  id: number;
  title: string;
  subject: string;
  deadline: string;
  status: 'todo' | 'submitted' | 'graded';
  score?: number;
}