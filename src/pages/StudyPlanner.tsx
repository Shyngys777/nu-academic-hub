
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAllExams, getStoredStudySessions, storeStudySessions } from '@/services/api';
import { Exam, StudySession } from '@/types';
import { calculateStudyHours, generateStudySessions } from '@/utils/studyUtils';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { format, addDays, isWithinInterval, parseISO, isToday } from 'date-fns';
import { toast } from '@/components/ui/use-toast';
import { ArrowRight, Calendar as CalendarIcon, Clock, BookCheck, BookPlus, Trash2, Check } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

const StudyPlanner = () => {
  // State for creating a study plan
  const [selectedExam, setSelectedExam] = useState<Exam | null>(null);
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [hoursPerDay, setHoursPerDay] = useState(2);
  const [totalHours, setTotalHours] = useState(10);
  const [studySessions, setStudySessions] = useState<StudySession[]>([]);
  
  // Fetch all exams
  const { data: allExams = [], isLoading: examsLoading } = useQuery({
    queryKey: ['exams'],
    queryFn: getAllExams,
  });

  // Filter only future exams
  const futureExams = allExams.filter((exam: Exam) => {
    const examDate = new Date(exam.date);
    return examDate > new Date();
  }).sort((a: Exam, b: Exam) => {
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });

  // Load saved study sessions
  useEffect(() => {
    const savedSessions = getStoredStudySessions();
    if (savedSessions.length) {
      setStudySessions(savedSessions);
    }
  }, []);

  // Generate suggested study hours when exam selected
  useEffect(() => {
    if (selectedExam) {
      const suggestedHours = calculateStudyHours(selectedExam.courseCode);
      setTotalHours(suggestedHours);
      
      // Calculate days until exam to suggest appropriate hours per day
      const examDate = new Date(selectedExam.date);
      const today = new Date();
      const daysUntilExam = Math.max(1, Math.floor((examDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)));
      
      const suggestedHoursPerDay = Math.min(4, Math.ceil(suggestedHours / daysUntilExam));
      setHoursPerDay(suggestedHoursPerDay);
    }
  }, [selectedExam]);

  // Handle creating a new study plan
  const handleCreatePlan = () => {
    if (!selectedExam) {
      toast({
        title: "Error",
        description: "Please select an exam",
        variant: "destructive"
      });
      return;
    }
    
    // Generate new study sessions
    const newSessions = generateStudySessions(
      selectedExam,
      totalHours,
      format(startDate, 'yyyy-MM-dd'),
      1,
      hoursPerDay
    );
    
    // Add the new sessions to existing ones
    const updatedSessions = [...studySessions, ...newSessions];
    setStudySessions(updatedSessions);
    storeStudySessions(updatedSessions);
    
    toast({
      title: "Success",
      description: `Created ${newSessions.length} study sessions for ${selectedExam.courseCode}`,
    });
    
    // Reset form
    setSelectedExam(null);
  };

  // Handle toggling a session as completed
  const handleToggleSession = (sessionId: string) => {
    const updatedSessions = studySessions.map(session => {
      if (session.id === sessionId) {
        return { ...session, completed: !session.completed };
      }
      return session;
    });
    
    setStudySessions(updatedSessions);
    storeStudySessions(updatedSessions);
  };

  // Handle deleting a session
  const handleDeleteSession = (sessionId: string) => {
    const updatedSessions = studySessions.filter(session => session.id !== sessionId);
    setStudySessions(updatedSessions);
    storeStudySessions(updatedSessions);
    
    toast({
      title: "Success",
      description: "Study session deleted",
    });
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, 'EEE, MMM d');
  };

  // Group sessions by date
  const sessionsByDate = studySessions.reduce((acc: Record<string, StudySession[]>, session) => {
    if (!acc[session.date]) {
      acc[session.date] = [];
    }
    acc[session.date].push(session);
    return acc;
  }, {});

  // Sort dates
  const sortedDates = Object.keys(sessionsByDate).sort((a, b) => {
    return new Date(a).getTime() - new Date(b).getTime();
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-nu-darkblue mb-1">Study Planner</h1>
        <p className="text-muted-foreground">Create personalized study plans for your exams.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Create Study Plan</CardTitle>
            <CardDescription>Generate a personalized study schedule</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Select Exam</label>
              <Select
                value={selectedExam?.id.toString()}
                onValueChange={(value) => {
                  const exam = allExams.find((e: Exam) => e.id.toString() === value);
                  setSelectedExam(exam || null);
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select an exam" />
                </SelectTrigger>
                <SelectContent>
                  {futureExams.map((exam: Exam) => (
                    <SelectItem key={exam.id} value={exam.id.toString()}>
                      {exam.courseCode} - {format(new Date(exam.date), 'MMM d')}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {selectedExam && (
              <>
                <div className="p-3 bg-blue-50 rounded-md">
                  <p className="font-medium">{selectedExam.courseCode} - {selectedExam.title}</p>
                  <p className="text-sm text-muted-foreground">Exam date: {format(new Date(selectedExam.date), 'EEEE, MMM d, yyyy')}</p>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Start Date</label>
                  <div className="border rounded-md p-3">
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={(date) => date && setStartDate(date)}
                      disabled={(date) => {
                        // Disable dates after the exam
                        return date < new Date() || date > new Date(selectedExam.date);
                      }}
                      className="rounded-md border"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center justify-between">
                    <span>Total Study Hours</span>
                    <span className="text-nu-blue font-bold">{totalHours} hours</span>
                  </label>
                  <Slider 
                    value={[totalHours]} 
                    min={1} 
                    max={40}
                    step={1}
                    onValueChange={(value) => setTotalHours(value[0])}
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center justify-between">
                    <span>Hours Per Day</span>
                    <span className="text-nu-blue font-bold">{hoursPerDay} hours</span>
                  </label>
                  <Slider 
                    value={[hoursPerDay]} 
                    min={0.5} 
                    max={6}
                    step={0.5}
                    onValueChange={(value) => setHoursPerDay(value[0])}
                  />
                </div>
              </>
            )}
          </CardContent>
          <CardFooter>
            <Button 
              onClick={handleCreatePlan} 
              disabled={!selectedExam}
              className="w-full"
            >
              Generate Study Plan <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Your Study Schedule</CardTitle>
              <CardDescription>Upcoming and completed study sessions</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            {studySessions.length === 0 ? (
              <div className="text-center py-8">
                <BookPlus className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-medium text-lg mb-2">No study sessions yet</h3>
                <p className="text-muted-foreground">Generate a study plan to get started</p>
              </div>
            ) : (
              <div className="space-y-6">
                {sortedDates.map((date) => (
                  <div key={date}>
                    <div className="flex items-center mb-2">
                      <CalendarIcon className="h-4 w-4 mr-2 text-nu-blue" />
                      <h3 className="font-medium">
                        {formatDate(date)}
                        {isToday(new Date(date)) && (
                          <span className="ml-2 text-xs bg-nu-blue text-white px-2 py-0.5 rounded-full">Today</span>
                        )}
                      </h3>
                    </div>
                    <div className="space-y-2">
                      {sessionsByDate[date].map((session) => (
                        <div 
                          key={session.id} 
                          className={`p-3 rounded-lg border flex items-center justify-between ${
                            session.completed ? 'bg-gray-50 border-gray-200' : 'bg-white'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <Checkbox
                              checked={session.completed}
                              onCheckedChange={() => handleToggleSession(session.id)}
                            />
                            <div>
                              <h4 className={`font-medium ${session.completed ? 'line-through text-muted-foreground' : ''}`}>
                                {session.courseCode} - {session.title}
                              </h4>
                              <div className="flex items-center text-sm text-muted-foreground">
                                <Clock className="h-3 w-3 mr-1" />
                                {session.startTime} - {session.endTime}
                              </div>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteSession(session.id)}
                          >
                            <Trash2 className="h-4 w-4 text-muted-foreground" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudyPlanner;
