
import { Exam } from "@/types";

const API_URL = "http://localhost:8080/api";

export async function getAllExams(): Promise<Exam[]> {
  try {
    const response = await fetch(`${API_URL}/exams/all`);
    if (!response.ok) {
      throw new Error("Failed to fetch exams");
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching exams:", error);
    throw error;
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

// Simulated study session management
export function getStoredStudySessions() {
  const sessions = localStorage.getItem(STUDY_SESSIONS_KEY);
  return sessions ? JSON.parse(sessions) : [];
}

export function storeStudySessions(sessions: any[]) {
  localStorage.setItem(STUDY_SESSIONS_KEY, JSON.stringify(sessions));
}

// Simulated materials management
export function getStoredMaterials() {
  const materials = localStorage.getItem(MATERIALS_KEY);
  return materials ? JSON.parse(materials) : [];
}

export function storeMaterials(materials: any[]) {
  localStorage.setItem(MATERIALS_KEY, JSON.stringify(materials));
}
