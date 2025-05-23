
export interface Exam {
  id: number;
  courseCode: string;
  title: string;
  school: string;
  date: string; // ISO format: "YYYY-MM-DD"
  time: string; // 24h format: "HH:MM"
  room: string;
}

export interface StudySession {
  id: string;
  examId: number;
  courseCode: string;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  completed: boolean;
}

export interface StudyMaterial {
  id: string;
  courseCode: string;
  title: string;
  type: "EXAM" | "NOTE" | "SOLUTION" | "OTHER";
  uploadedBy: string;
  uploadDate: string;
  fileUrl: string;
}

export interface DashboardStats {
  upcomingExams: number;
  completedStudySessions: number;
  plannedStudySessions: number;
  totalStudyHours: number;
}

export interface CourseReview {
  id: string;
  courseCode: string;
  professorName: string;
  semester: string;
  year: number;
  rating: number; // 1-5
  difficulty: number; // 1-5
  workload: number; // 1-5
  comment: string;
  anonymous: boolean;
  authorId?: string;
  createdAt: string;
}
