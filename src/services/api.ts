
import { Exam, StudySession, StudyMaterial, DashboardStats, CourseReview } from "@/types";

const API_URL = "http://localhost:8080/api";

// Real API endpoints
export async function getAllExams(): Promise<Exam[]> {
  try {
    const response = await fetch(`${API_URL}/exams/all`);
    if (!response.ok) {
      throw new Error("Failed to fetch exams");
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching exams:", error);
    // Return mock data if API fails
    return getMockExams();
  }
}

export async function searchExamsByCourse(courseCode: string): Promise<Exam[]> {
  try {
    const response = await fetch(`${API_URL}/exams/search?course=${courseCode}`);
    if (!response.ok) {
      throw new Error("Failed to search exams");
    }
    return response.json();
  } catch (error) {
    console.error("Error searching exams:", error);
    throw error;
  }
}

export async function searchExamsBySchool(school: string): Promise<Exam[]> {
  try {
    const response = await fetch(`${API_URL}/exams/searchBySchool?school=${school}`);
    if (!response.ok) {
      throw new Error("Failed to search exams by school");
    }
    return response.json();
  } catch (error) {
    console.error("Error searching exams by school:", error);
    throw error;
  }
}

export async function searchExamsByDate(date: string): Promise<Exam[]> {
  try {
    const response = await fetch(`${API_URL}/exams/searchByDate?date=${date}`);
    if (!response.ok) {
      throw new Error("Failed to search exams by date");
    }
    return response.json();
  } catch (error) {
    console.error("Error searching exams by date:", error);
    throw error;
  }
}

// Simulated endpoints for functionality that would be in a real backend
const STUDY_SESSIONS_KEY = "nu_study_sessions";
const MATERIALS_KEY = "nu_materials";
const COURSE_REVIEWS_KEY = "nu_course_reviews";

// Mock data for when API is unavailable
function getMockExams(): Exam[] {
  return [
    {
      id: 1,
      courseCode: "CHME202",
      title: "Fluid Mechanics",
      school: "SEDS",
      date: "2025-04-28",
      time: "09:00",
      room: "9.105"
    },
    {
      id: 2,
      courseCode: "ELCE486",
      title: "Photonics for Engineering",
      school: "SEDS",
      date: "2025-04-28",
      time: "12:00",
      room: "3E.221"
    },
    {
      id: 3,
      courseCode: "CSCI151",
      title: "Programming for Scientists and Engineers",
      school: "SEDS",
      date: "2025-04-28",
      time: "12:00",
      room: "Ballroom Right"
    },
    {
      id: 4,
      courseCode: "MATH273",
      title: "Linear Algebra II",
      school: "SSH",
      date: "2025-04-30",
      time: "09:00",
      room: "8.305"
    },
    {
      id: 5, 
      courseCode: "PHYS162",
      title: "Physics II: Electricity and Magnetism",
      school: "SSH",
      date: "2025-05-02",
      time: "15:00",
      room: "Ballroom Left"
    }
  ];
}

// Simulated study session management
export function getStoredStudySessions(): StudySession[] {
  const sessions = localStorage.getItem(STUDY_SESSIONS_KEY);
  return sessions ? JSON.parse(sessions) : [];
}

export function storeStudySessions(sessions: StudySession[]) {
  localStorage.setItem(STUDY_SESSIONS_KEY, JSON.stringify(sessions));
}

// Simulated materials management
export function getStoredMaterials(): StudyMaterial[] {
  const materials = localStorage.getItem(MATERIALS_KEY);
  return materials ? JSON.parse(materials) : [];
}

export function storeMaterials(materials: StudyMaterial[]) {
  localStorage.setItem(MATERIALS_KEY, JSON.stringify(materials));
}

// Course reviews management
export function getStoredCourseReviews(): CourseReview[] {
  const reviews = localStorage.getItem(COURSE_REVIEWS_KEY);
  return reviews ? JSON.parse(reviews) : [];
}

export function storeCourseReviews(reviews: CourseReview[]) {
  localStorage.setItem(COURSE_REVIEWS_KEY, JSON.stringify(reviews));
}

// Dashboard stats (simulated)
export async function getDashboardStats(): Promise<DashboardStats> {
  // In a real app, this would be an API call
  return {
    upcomingExams: 4,
    completedStudySessions: 8,
    plannedStudySessions: 12,
    totalStudyHours: 26
  };
}
