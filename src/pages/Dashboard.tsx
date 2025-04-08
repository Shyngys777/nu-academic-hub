
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { CalendarDays, BookOpen, GraduationCap, Clock } from "lucide-react";
import { DashboardStats, Exam } from "@/types";
import { getAllExams } from "@/services/api";
import { Skeleton } from "@/components/ui/skeleton";
import { format, isAfter, parseISO } from "date-fns";
import { motion } from "framer-motion";

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

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="animate-fade-in relative"
    >
      {/* Background design elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-nu-blue/5 rounded-full filter blur-3xl -z-10"></div>
      <div className="absolute bottom-20 left-10 w-72 h-72 bg-nu-gold/5 rounded-full filter blur-3xl -z-10"></div>
      
      <motion.h1 variants={itemVariants} className="text-3xl font-serif text-nu-darkblue mb-1">Academic Dashboard</motion.h1>
      <motion.p variants={itemVariants} className="text-muted-foreground mb-6">Welcome back to your academic hub.</motion.p>

      {/* Stats Cards */}
      <motion.div 
        variants={containerVariants}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
      >
        <motion.div variants={itemVariants}>
          <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-nu-blue overflow-hidden group">
            <CardContent className="p-6 flex items-center justify-between relative">
              <div className="absolute -right-12 -top-12 w-32 h-32 bg-nu-blue/10 rounded-full transition-all duration-500 group-hover:w-36 group-hover:h-36"></div>
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Upcoming Exams</p>
                {statsLoading ? (
                  <Skeleton className="h-8 w-16" />
                ) : (
                  <p className="text-3xl font-bold">{stats?.upcomingExams}</p>
                )}
              </div>
              <GraduationCap className="h-10 w-10 text-nu-blue opacity-80 relative z-10" />
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-nu-gold overflow-hidden group">
            <CardContent className="p-6 flex items-center justify-between relative">
              <div className="absolute -right-12 -top-12 w-32 h-32 bg-nu-gold/10 rounded-full transition-all duration-500 group-hover:w-36 group-hover:h-36"></div>
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Study Sessions</p>
                {statsLoading ? (
                  <Skeleton className="h-8 w-16" />
                ) : (
                  <p className="text-3xl font-bold">{stats?.completedStudySessions} / {stats?.plannedStudySessions}</p>
                )}
              </div>
              <BookOpen className="h-10 w-10 text-nu-gold opacity-80 relative z-10" />
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-green-500 overflow-hidden group">
            <CardContent className="p-6 flex items-center justify-between relative">
              <div className="absolute -right-12 -top-12 w-32 h-32 bg-green-500/10 rounded-full transition-all duration-500 group-hover:w-36 group-hover:h-36"></div>
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Total Study Hours</p>
                {statsLoading ? (
                  <Skeleton className="h-8 w-16" />
                ) : (
                  <p className="text-3xl font-bold">{stats?.totalStudyHours}</p>
                )}
              </div>
              <Clock className="h-10 w-10 text-green-500 opacity-80 relative z-10" />
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-purple-500 overflow-hidden group">
            <CardContent className="p-6 flex items-center justify-between relative">
              <div className="absolute -right-12 -top-12 w-32 h-32 bg-purple-500/10 rounded-full transition-all duration-500 group-hover:w-36 group-hover:h-36"></div>
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Today's Sessions</p>
                {statsLoading ? (
                  <Skeleton className="h-8 w-16" />
                ) : (
                  <p className="text-3xl font-bold">2</p>
                )}
              </div>
              <CalendarDays className="h-10 w-10 text-purple-500 opacity-80 relative z-10" />
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      {/* Main Content Tabs */}
      <motion.div variants={itemVariants}>
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
              <Card className="overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-300">
                <CardHeader className="bg-gradient-to-r from-nu-blue/5 to-transparent">
                  <CardTitle>Upcoming Exams</CardTitle>
                  <CardDescription>Your next exams in the next 7 days</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  {examsLoading ? (
                    <div className="space-y-3">
                      <Skeleton className="h-14 w-full" />
                      <Skeleton className="h-14 w-full" />
                      <Skeleton className="h-14 w-full" />
                    </div>
                  ) : upcomingExams.length > 0 ? (
                    <div className="space-y-4">
                      {upcomingExams.map((exam: Exam) => (
                        <div key={exam.id} className="flex justify-between items-center p-3 bg-secondary rounded-lg hover:bg-secondary/80 transition-colors">
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
              <Card className="overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-300">
                <CardHeader className="bg-gradient-to-r from-nu-gold/5 to-transparent">
                  <CardTitle>Weekly Study Hours</CardTitle>
                  <CardDescription>Your study time distribution this week</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={studyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: "rgba(255, 255, 255, 0.95)",
                          borderRadius: "8px",
                          border: "1px solid #eaeaea",
                          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)"
                        }}
                      />
                      <Bar dataKey="hours" fill="#005baa" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-4">
            <Card>
              <CardHeader className="bg-gradient-to-r from-purple-50 to-transparent">
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
              <CardHeader className="bg-gradient-to-r from-green-50 to-transparent">
                <CardTitle>Today's Schedule</CardTitle>
                <CardDescription>Your planned study sessions for today</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg flex justify-between items-center bg-secondary/50 hover:bg-secondary/70 transition-colors">
                    <div>
                      <h4 className="font-medium">CSCI151 - Data Structures Review</h4>
                      <p className="text-sm text-muted-foreground">2 hours</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">10:00 - 12:00</p>
                      <p className="text-sm text-green-600">In Progress</p>
                    </div>
                  </div>
                  <div className="p-4 border rounded-lg flex justify-between items-center hover:bg-gray-50 transition-colors">
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
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;
