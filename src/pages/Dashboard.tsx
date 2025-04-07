
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { CalendarDays, BookOpen, GraduationCap, Clock } from "lucide-react";
import { DashboardStats, Exam } from "@/types";
import { getAllExams } from "@/services/api";
import { Skeleton } from "@/components/ui/skeleton";
import { format, isAfter, parseISO } from "date-fns";

// Mock data for dashboard stats
const fetchDashboardStats = async (): Promise<DashboardStats> => {
  // In a real application, this would come from your backend
  return {
    upcomingExams: 4,
    completedStudySessions: 8,
    plannedStudySessions: 12,
    totalStudyHours: 26
  };
};

// Study hours by day (mock data)
const studyData = [
  { day: "Mon", hours: 2 },
  { day: "Tue", hours: 3.5 },
  { day: "Wed", hours: 2 },
  { day: "Thu", hours: 4 },
  { day: "Fri", hours: 1.5 },
  { day: "Sat", hours: 5 },
  { day: "Sun", hours: 3 },
];

const Dashboard = () => {
  // Fetch dashboard statistics
  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ['dashboardStats'],
    queryFn: fetchDashboardStats,
  });

  // Fetch exams
  const { data: exams = [], isLoading: examsLoading } = useQuery({
    queryKey: ['exams'],
    queryFn: getAllExams,
  });

  // Filter upcoming exams (next 7 days)
  const upcomingExams = exams
    .filter((exam: Exam) => {
      const examDate = parseISO(exam.date);
      const today = new Date();
      const sevenDaysFromNow = new Date();
      sevenDaysFromNow.setDate(today.getDate() + 7);
      
      return isAfter(examDate, today) && !isAfter(examDate, sevenDaysFromNow);
    })
    .sort((a: Exam, b: Exam) => {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    })
    .slice(0, 3);

  return (
    <div className="animate-fade-in">
      <h1 className="text-3xl font-bold text-nu-darkblue mb-1">Academic Dashboard</h1>
      <p className="text-muted-foreground mb-6">Welcome back to your academic hub.</p>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card className="hover-scale">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">Upcoming Exams</p>
              {statsLoading ? (
                <Skeleton className="h-8 w-16" />
              ) : (
                <p className="text-3xl font-bold">{stats?.upcomingExams}</p>
              )}
            </div>
            <GraduationCap className="h-10 w-10 text-nu-blue opacity-80" />
          </CardContent>
        </Card>
        <Card className="hover-scale">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">Study Sessions</p>
              {statsLoading ? (
                <Skeleton className="h-8 w-16" />
              ) : (
                <p className="text-3xl font-bold">{stats?.completedStudySessions} / {stats?.plannedStudySessions}</p>
              )}
            </div>
            <BookOpen className="h-10 w-10 text-nu-yellow opacity-80" />
          </CardContent>
        </Card>
        <Card className="hover-scale">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">Total Study Hours</p>
              {statsLoading ? (
                <Skeleton className="h-8 w-16" />
              ) : (
                <p className="text-3xl font-bold">{stats?.totalStudyHours}</p>
              )}
            </div>
            <Clock className="h-10 w-10 text-green-500 opacity-80" />
          </CardContent>
        </Card>
        <Card className="hover-scale">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">Today's Sessions</p>
              {statsLoading ? (
                <Skeleton className="h-8 w-16" />
              ) : (
                <p className="text-3xl font-bold">2</p>
              )}
            </div>
            <CalendarDays className="h-10 w-10 text-purple-500 opacity-80" />
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
        </TabsList>
        
        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Upcoming Exams Card */}
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Exams</CardTitle>
                <CardDescription>Your next exams in the next 7 days</CardDescription>
              </CardHeader>
              <CardContent>
                {examsLoading ? (
                  <div className="space-y-3">
                    <Skeleton className="h-14 w-full" />
                    <Skeleton className="h-14 w-full" />
                    <Skeleton className="h-14 w-full" />
                  </div>
                ) : upcomingExams.length > 0 ? (
                  <div className="space-y-4">
                    {upcomingExams.map((exam: Exam) => (
                      <div key={exam.id} className="flex justify-between items-center p-3 bg-secondary rounded-lg">
                        <div>
                          <h4 className="font-semibold">{exam.courseCode}: {exam.title}</h4>
                          <p className="text-sm text-muted-foreground">Room {exam.room}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{format(new Date(exam.date), 'MMM dd')}</p>
                          <p className="text-sm text-muted-foreground">{exam.time.substring(0, 5)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center py-8 text-muted-foreground">No upcoming exams in the next 7 days</p>
                )}
              </CardContent>
            </Card>
            
            {/* Study Hours Card */}
            <Card>
              <CardHeader>
                <CardTitle>Weekly Study Hours</CardTitle>
                <CardDescription>Your study time distribution this week</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={studyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="hours" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Study Performance</CardTitle>
              <CardDescription>Detailed analytics will be available here</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center">
              <p className="text-muted-foreground text-center">
                Advanced analytics coming soon!<br />
                Track your study efficiency and progress over time.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Schedule Tab */}
        <TabsContent value="schedule" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Today's Schedule</CardTitle>
              <CardDescription>Your planned study sessions for today</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg flex justify-between items-center bg-secondary/50">
                  <div>
                    <h4 className="font-medium">CSCI151 - Data Structures Review</h4>
                    <p className="text-sm text-muted-foreground">2 hours</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">10:00 - 12:00</p>
                    <p className="text-sm text-green-600">In Progress</p>
                  </div>
                </div>
                <div className="p-4 border rounded-lg flex justify-between items-center">
                  <div>
                    <h4 className="font-medium">MATH273 - Practice Problems</h4>
                    <p className="text-sm text-muted-foreground">1.5 hours</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">14:30 - 16:00</p>
                    <p className="text-sm text-muted-foreground">Upcoming</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
