
import { Exam, StudySession } from "@/types";
import { v4 as uuidv4 } from "uuid";

export const HOURS_PER_CREDIT = 2; // Assume 2 hours of study per credit

// Difficulty levels from 1-5
const COURSE_DIFFICULTY: Record<string, number> = {
  "CSCI": 4,
  "MATH": 4,
  "PHYS": 4,
  "CHME": 3.5,
  "ELCE": 3.5,
  "BIOL": 3,
  "ECON": 3,
  "HIST": 2.5,
  "PSYC": 2.5,
  "ARST": 2
};

// Get difficulty from course code
export function getCourseDifficulty(courseCode: string): number {
  const department = courseCode.substring(0, 4);
  return COURSE_DIFFICULTY[department] || 3; // Default to medium difficulty
}

// Calculate suggested study hours based on course difficulty
export function calculateStudyHours(courseCode: string): number {
  const difficulty = getCourseDifficulty(courseCode);
  const courseLevel = parseInt(courseCode.substring(4, 7)) || 100;
  
  // Higher level courses need more study time
  const levelFactor = courseLevel >= 400 ? 1.5 : 
                      courseLevel >= 300 ? 1.3 : 
                      courseLevel >= 200 ? 1.2 : 1.0;
  
  return Math.round(difficulty * levelFactor * HOURS_PER_CREDIT);
}

// Generate study sessions for an exam
export function generateStudySessions(
  exam: Exam, 
  totalHours: number, 
  startDate: string, 
  sessionsPerDay: number = 1,
  hoursPerSession: number = 2
): StudySession[] {
  const sessions: StudySession[] = [];
  
  const examDate = new Date(exam.date);
  let currentDate = new Date(startDate);
  
  // Don't create sessions on the exam day
  examDate.setHours(0, 0, 0, 0);
  
  let remainingHours = totalHours;
  
  // Create sessions until we've allocated all hours or reached exam day
  while (remainingHours > 0 && currentDate < examDate) {
    for (let i = 0; i < sessionsPerDay && remainingHours > 0; i++) {
      const sessionHours = Math.min(hoursPerSession, remainingHours);
      
      // Create start and end times for this session
      // Use 13:00 (1 PM) as default start time
      const startTime = `13:${i * 30 < 10 ? '0' + i * 30 : i * 30}`;
      
      // Calculate end time based on hours
      const startHour = 13 + Math.floor(i * 30 / 60);
      const startMinute = i * 30 % 60;
      const endHour = startHour + Math.floor(sessionHours);
      const endMinute = startMinute + Math.round((sessionHours % 1) * 60);
      const adjustedEndHour = endHour + Math.floor(endMinute / 60);
      const adjustedEndMinute = endMinute % 60;
      
      const endTime = `${adjustedEndHour}:${adjustedEndMinute < 10 ? '0' + adjustedEndMinute : adjustedEndMinute}`;
      
      sessions.push({
        id: uuidv4(),
        examId: exam.id,
        courseCode: exam.courseCode,
        title: exam.title,
        date: currentDate.toISOString().split('T')[0],
        startTime,
        endTime,
        completed: false
      });
      
      remainingHours -= sessionHours;
      if (remainingHours <= 0) break;
    }
    
    // Move to the next day
    currentDate.setDate(currentDate.getDate() + 1);
  }
  
  return sessions;
}

// Calculate GPA from courses and grades
export function calculateGPA(courses: { credits: number, grade: string }[]): number {
  const gradePoints: Record<string, number> = {
    'A+': 4.0, 'A': 4.0, 'A-': 3.67,
    'B+': 3.33, 'B': 3.0, 'B-': 2.67,
    'C+': 2.33, 'C': 2.0, 'C-': 1.67,
    'D+': 1.33, 'D': 1.0, 'F': 0.0
  };
  
  let totalPoints = 0;
  let totalCredits = 0;
  
  courses.forEach(course => {
    totalPoints += gradePoints[course.grade] * course.credits;
    totalCredits += course.credits;
  });
  
  return totalCredits > 0 ? totalPoints / totalCredits : 0;
}
