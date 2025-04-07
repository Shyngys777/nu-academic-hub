
import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAllExams, searchExamsByCourse, searchExamsBySchool, searchExamsByDate } from '@/services/api';
import { Exam } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Search, BadgeInfo } from 'lucide-react';
import { format } from 'date-fns';
import { toast } from '@/components/ui/use-toast';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const ExamSchedule = () => {
  // State for search filters
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState('course');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedSchool, setSelectedSchool] = useState<string | undefined>(undefined);
  
  // Fetch all exams
  const { data: allExams = [], isLoading, error } = useQuery({
    queryKey: ['exams'],
    queryFn: getAllExams,
  });

  // Filtering logic
  const filteredExams = useMemo(() => {
    if (!searchQuery && !selectedDate && !selectedSchool) {
      return allExams;
    }
    
    return allExams.filter((exam: Exam) => {
      // Filter by search query (course code or title)
      const matchesQuery = !searchQuery || 
        exam.courseCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exam.title.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Filter by date if selected
      const matchesDate = !selectedDate || 
        exam.date === format(selectedDate, 'yyyy-MM-dd');
      
      // Filter by school if selected
      const matchesSchool = !selectedSchool || 
        exam.school === selectedSchool;
      
      return matchesQuery && matchesDate && matchesSchool;
    });
  }, [allExams, searchQuery, selectedDate, selectedSchool]);

  // Group exams by date
  const examsByDate = useMemo(() => {
    const grouped: Record<string, Exam[]> = {};
    
    filteredExams.forEach((exam: Exam) => {
      if (!grouped[exam.date]) {
        grouped[exam.date] = [];
      }
      grouped[exam.date].push(exam);
    });
    
    // Sort dates
    return Object.keys(grouped)
      .sort()
      .map(date => ({
        date,
        exams: grouped[date].sort((a, b) => a.time.localeCompare(b.time))
      }));
  }, [filteredExams]);

  // Get unique schools for filter dropdown
  const schools = useMemo(() => {
    const uniqueSchools = new Set<string>();
    allExams.forEach((exam: Exam) => uniqueSchools.add(exam.school));
    return Array.from(uniqueSchools).sort();
  }, [allExams]);

  // Handle search
  const handleSearch = () => {
    if (!searchQuery) {
      toast({ description: "Please enter a search query" });
      return;
    }
  };

  // Format exam time for display
  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${minutes} ${ampm}`;
  };
  
  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-nu-darkblue mb-1">Exam Schedule</h1>
        <p className="text-muted-foreground">Search and view upcoming exams.</p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search by course code or title..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>
            
            <div className="flex gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-[190px] flex justify-start">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDate ? format(selectedDate, 'PP') : "Filter by date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              
              <Select onValueChange={setSelectedSchool} value={selectedSchool}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by school" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Schools</SelectLabel>
                    {schools.map(school => (
                      <SelectItem key={school} value={school}>{school}</SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              
              <Button variant="ghost" onClick={() => {
                setSearchQuery('');
                setSelectedDate(undefined);
                setSelectedSchool(undefined);
              }}>
                Clear
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {isLoading ? (
        <div className="py-12 text-center">
          <p className="text-lg text-muted-foreground">Loading exams...</p>
        </div>
      ) : error ? (
        <div className="py-12 text-center">
          <p className="text-lg text-red-500">Error loading exams. Please try again later.</p>
        </div>
      ) : filteredExams.length === 0 ? (
        <div className="py-12 text-center">
          <p className="text-lg text-muted-foreground">No exams found matching your criteria.</p>
          <Button variant="outline" onClick={() => {
            setSearchQuery('');
            setSelectedDate(undefined);
            setSelectedSchool(undefined);
          }} className="mt-4">
            Clear filters
          </Button>
        </div>
      ) : (
        <>
          <div className="text-sm text-muted-foreground mb-4">
            Showing {filteredExams.length} exam{filteredExams.length !== 1 ? 's' : ''}
          </div>
          
          <div className="space-y-6">
            {examsByDate.map(({ date, exams }) => (
              <Card key={date} className="overflow-hidden">
                <div className="bg-nu-blue text-white p-3 font-medium">
                  {formatDate(date)}
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Time</TableHead>
                      <TableHead>Course</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>Room</TableHead>
                      <TableHead>School</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {exams.map((exam) => (
                      <TableRow key={exam.id}>
                        <TableCell className="font-medium">
                          {formatTime(exam.time)}
                        </TableCell>
                        <TableCell>{exam.courseCode}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            {exam.title}
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button variant="ghost" size="icon" className="h-4 w-4 ml-1">
                                    <BadgeInfo className="h-3 w-3" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <div className="text-sm">
                                    <p>Course: {exam.courseCode}</p>
                                    <p>School: {exam.school}</p>
                                    <p>Date: {formatDate(exam.date)}</p>
                                    <p>Time: {formatTime(exam.time)}</p>
                                    <p>Room: {exam.room}</p>
                                  </div>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                        </TableCell>
                        <TableCell>{exam.room}</TableCell>
                        <TableCell>{exam.school}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ExamSchedule;
