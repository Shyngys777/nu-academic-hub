
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useQuery } from '@tanstack/react-query';
import { getAllExams, getStoredStudySessions } from '@/services/api';
import { useState, useEffect } from 'react';
import { CalendarDays, Clock, BookOpen, CheckCircle, ChevronRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { DashboardStats } from "@/types";

const Dashboard = () => {
  const [stats, setStats] = useState<DashboardStats>({
    upcomingExams: 0,
    completedStudySessions: 0,
    plannedStudySessions: 0,
    totalStudyHours: 0
  });

  const { data: exams = [], isLoading: examsLoading } = useQuery({
    queryKey: ['exams'],
    queryFn: getAllExams,
  });

  useEffect(() => {
    // Calculate stats from exams and study sessions
    const now = new Date();
    const upcomingExams = exams.filter(exam => new Date(exam.date) > now).length;
    
    // Get study sessions
    const studySessions = getStoredStudySessions();
    const completedSessions = studySessions.filter((s: any) => s.completed);
    
    // Calculate total study hours
    let totalHours = 0;
    studySessions.forEach((session: any) => {
      const startParts = session.startTime.split(':');
      const endParts = session.endTime.split(':');
      const startHour = parseInt(startParts[0]);
      const startMinute = parseInt(startParts[1]);
      const endHour = parseInt(endParts[0]);
      const endMinute = parseInt(endParts[1]);
      
      const hours = endHour - startHour + (endMinute - startMinute) / 60;
      totalHours += hours;
    });
    
    setStats({
      upcomingExams,
      completedStudySessions: completedSessions.length,
      plannedStudySessions: studySessions.length,
      totalStudyHours: parseFloat(totalHours.toFixed(1))
    });
  }, [exams]);

  // Study time trend data (simulated)
  const studyTimeData = [
    { day: 'Mon', hours: 2.5 },
    { day: 'Tue', hours: 1.5 },
    { day: 'Wed', hours: 3.0 },
    { day: 'Thu', hours: 2.0 },
    { day: 'Fri', hours: 1.0 },
    { day: 'Sat', hours: 4.0 },
    { day: 'Sun', hours: 2.5 },
  ];
  
  // Subject distribution data
  const subjectData = [
    { name: 'CSCI', value: 35 },
    { name: 'MATH', value: 25 },
    { name: 'PHYS', value: 20 },
    { name: 'ENGL', value: 10 },
    { name: 'ECON', value: 10 },
  ];
  
  const COLORS = ['#005baa', '#3182CE', '#63B3ED', '#4299E1', '#f7a81b'];
  
  // Filter upcoming exams
  const upcomingExams = exams
    .filter(exam => new Date(exam.date) > new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 3);

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-nu-darkblue mb-1">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's an overview of your academic progress.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">Upcoming Exams</p>
              <p className="text-3xl font-bold">{stats.upcomingExams}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <CalendarDays className="h-6 w-6 text-nu-blue" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">Study Hours</p>
              <p className="text-3xl font-bold">{stats.totalStudyHours}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <Clock className="h-6 w-6 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">Study Sessions</p>
              <p className="text-3xl font-bold">{stats.plannedStudySessions}</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <BookOpen className="h-6 w-6 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">Completed Sessions</p>
              <p className="text-3xl font-bold">{stats.completedStudySessions}</p>
            </div>
            <div className="bg-amber-100 p-3 rounded-full">
              <CheckCircle className="h-6 w-6 text-nu-gold" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Study Time Trend</CardTitle>
            <CardDescription>Hours spent studying per day over the last week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={studyTimeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis unit="h" />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="hours" 
                    stroke="#005baa" 
                    strokeWidth={2} 
                    activeDot={{ r: 8 }} 
                    name="Study Hours" 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Study Distribution</CardTitle>
            <CardDescription>Time spent on each subject area</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex justify-center items-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={subjectData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {subjectData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Next Exams</CardTitle>
              <CardDescription>Your upcoming exams</CardDescription>
            </div>
            <Button variant="outline" asChild>
              <Link to="/exams">View All <ChevronRight className="ml-1 h-4 w-4" /></Link>
            </Button>
          </CardHeader>
          <CardContent>
            {examsLoading ? (
              <div className="py-6 text-center text-muted-foreground">Loading exams...</div>
            ) : upcomingExams.length > 0 ? (
              <div className="space-y-4">
                {upcomingExams.map((exam) => (
                  <div key={exam.id} className="flex items-start space-x-4 rounded-lg border p-3">
                    <div className="bg-nu-blue text-white p-2 rounded-md min-w-[48px] text-center">
                      <div className="text-sm font-bold">{formatDate(exam.date)}</div>
                    </div>
                    <div>
                      <h4 className="font-semibold">{exam.courseCode}</h4>
                      <p className="text-sm text-muted-foreground">{exam.title}</p>
                      <p className="text-xs mt-1">Room {exam.room} · {exam.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-6 text-center text-muted-foreground">No upcoming exams</div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Tools</CardTitle>
            <CardDescription>Useful academic tools</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="h-auto flex-col py-4 px-2">
              <CalendarDays className="h-8 w-8 mb-2" />
              <span className="text-sm font-medium">GPA Calculator</span>
            </Button>
            <Button variant="outline" className="h-auto flex-col py-4 px-2">
              <BookOpen className="h-8 w-8 mb-2" />
              <span className="text-sm font-medium">Flashcards</span>
            </Button>
            <Button variant="outline" className="h-auto flex-col py-4 px-2" asChild>
              <Link to="/planner">
                <Clock className="h-8 w-8 mb-2" />
                <span className="text-sm font-medium">Create Study Plan</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-auto flex-col py-4 px-2">
              <CheckCircle className="h-8 w-8 mb-2" />
                <span className="text-sm font-medium">Track Progress</span>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
