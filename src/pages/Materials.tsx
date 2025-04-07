
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/components/ui/use-toast';
import { FileIcon, Upload, Search, Filter, Download, FileText, FileQuestion, ChevronDown, Trash2 } from 'lucide-react';
import { StudyMaterial } from '@/types';
import { getStoredMaterials, storeMaterials } from '@/services/api';
import { v4 as uuidv4 } from 'uuid';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Materials = () => {
  const [materials, setMaterials] = useState<StudyMaterial[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [materialType, setMaterialType] = useState<string | undefined>();
  const [courseCode, setCourseCode] = useState('');
  const [title, setTitle] = useState('');
  const [fileType, setFileType] = useState<"EXAM" | "NOTE" | "SOLUTION" | "OTHER">("EXAM");
  const [open, setOpen] = useState(false);
  const [currentTab, setCurrentTab] = useState('all');
  
  // Sample course codes for demonstration
  const courseCodes = [
    "CSCI151", "CSCI152", "CSCI235", "MATH161", "MATH162", 
    "PHYS161", "PHYS162", "CHME201", "CHME202", "ECON101", "ECON201"
  ];
  
  // Load stored materials
  useEffect(() => {
    const storedMaterials = getStoredMaterials();
    if (storedMaterials.length) {
      setMaterials(storedMaterials);
    } else {
      // Add some sample materials for demonstration
      const sampleMaterials: StudyMaterial[] = [
        {
          id: uuidv4(),
          courseCode: "CSCI151",
          title: "Midterm Exam Fall 2024",
          type: "EXAM",
          uploadedBy: "Professor Smith",
          uploadDate: "2024-10-15",
          fileUrl: "#"
        },
        {
          id: uuidv4(),
          courseCode: "MATH161",
          title: "Lecture Notes - Integration",
          type: "NOTE",
          uploadedBy: "John Doe",
          uploadDate: "2024-11-05",
          fileUrl: "#"
        },
        {
          id: uuidv4(),
          courseCode: "PHYS161",
          title: "Problem Set Solutions",
          type: "SOLUTION",
          uploadedBy: "TA Group",
          uploadDate: "2024-11-12",
          fileUrl: "#"
        }
      ];
      
      setMaterials(sampleMaterials);
      storeMaterials(sampleMaterials);
    }
  }, []);
  
  // Upload new material
  const handleUpload = () => {
    if (!courseCode || !title) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }
    
    const newMaterial: StudyMaterial = {
      id: uuidv4(),
      courseCode,
      title,
      type: fileType,
      uploadedBy: "You",
      uploadDate: new Date().toISOString().split('T')[0],
      fileUrl: "#"
    };
    
    const updatedMaterials = [...materials, newMaterial];
    setMaterials(updatedMaterials);
    storeMaterials(updatedMaterials);
    
    toast({
      title: "Material uploaded",
      description: `Successfully uploaded ${title} for ${courseCode}`
    });
    
    // Reset form
    setCourseCode('');
    setTitle('');
    setFileType("EXAM");
    setOpen(false);
  };
  
  // Delete material
  const handleDelete = (id: string) => {
    const updatedMaterials = materials.filter(material => material.id !== id);
    setMaterials(updatedMaterials);
    storeMaterials(updatedMaterials);
    
    toast({
      title: "Material deleted",
      description: "The material has been removed"
    });
  };
  
  // Filter and search materials
  const filteredMaterials = materials.filter(material => {
    // Filter by tab
    if (currentTab !== 'all' && material.type !== currentTab) {
      return false;
    }
    
    // Filter by material type dropdown
    if (materialType && material.type !== materialType) {
      return false;
    }
    
    // Search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        material.courseCode.toLowerCase().includes(query) ||
        material.title.toLowerCase().includes(query)
      );
    }
    
    return true;
  });
  
  // Get icon based on material type
  const getMaterialIcon = (type: string) => {
    switch (type) {
      case "EXAM":
        return <FileQuestion className="h-5 w-5" />;
      case "NOTE":
        return <FileText className="h-5 w-5" />;
      case "SOLUTION":
        return <FileIcon className="h-5 w-5" />;
      default:
        return <FileIcon className="h-5 w-5" />;
    }
  };
  
  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-nu-darkblue mb-1">Study Materials</h1>
          <p className="text-muted-foreground">Access and share course materials.</p>
        </div>
        
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="md:w-auto w-full">
              <Upload className="mr-2 h-4 w-4" /> Upload Material
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Upload Study Material</DialogTitle>
              <DialogDescription>
                Share study materials with your classmates. Please respect copyright and university policies.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label htmlFor="course" className="text-sm font-medium">Course Code</label>
                <Select 
                  value={courseCode} 
                  onValueChange={setCourseCode}
                >
                  <SelectTrigger id="course">
                    <SelectValue placeholder="Select course" />
                  </SelectTrigger>
                  <SelectContent>
                    {courseCodes.map((code) => (
                      <SelectItem key={code} value={code}>{code}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid gap-2">
                <label htmlFor="title" className="text-sm font-medium">Title</label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Midterm Exam Spring 2025"
                />
              </div>
              
              <div className="grid gap-2">
                <label htmlFor="type" className="text-sm font-medium">Material Type</label>
                <Select 
                  value={fileType} 
                  onValueChange={(value) => setFileType(value as "EXAM" | "NOTE" | "SOLUTION" | "OTHER")}
                >
                  <SelectTrigger id="type">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="EXAM">Past Exam</SelectItem>
                    <SelectItem value="NOTE">Lecture Notes</SelectItem>
                    <SelectItem value="SOLUTION">Solutions</SelectItem>
                    <SelectItem value="OTHER">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid gap-2">
                <label htmlFor="file" className="text-sm font-medium">File</label>
                <Input
                  id="file"
                  type="file"
                  className="cursor-pointer"
                />
                <p className="text-xs text-muted-foreground">Max size: 10MB. Supported formats: PDF, DOCX, PNG, JPG</p>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
              <Button onClick={handleUpload}>Upload</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <Tabs defaultValue="all" value={currentTab} onValueChange={setCurrentTab}>
            <TabsList className="grid grid-cols-4">
              <TabsTrigger value="all">All Materials</TabsTrigger>
              <TabsTrigger value="EXAM">Exams</TabsTrigger>
              <TabsTrigger value="NOTE">Notes</TabsTrigger>
              <TabsTrigger value="SOLUTION">Solutions</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by course code or title..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="md:w-[200px]">
                  <Filter className="mr-2 h-4 w-4" /> Filter
                  <ChevronDown className="ml-auto h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[200px]">
                <DropdownMenuItem onClick={() => setMaterialType(undefined)}>All Types</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setMaterialType("EXAM")}>Exams</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setMaterialType("NOTE")}>Notes</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setMaterialType("SOLUTION")}>Solutions</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setMaterialType("OTHER")}>Other</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          {filteredMaterials.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Material</TableHead>
                  <TableHead>Course</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Uploaded By</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMaterials.map((material) => (
                  <TableRow key={material.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        <div className="mr-2 text-muted-foreground">
                          {getMaterialIcon(material.type)}
                        </div>
                        {material.title}
                      </div>
                    </TableCell>
                    <TableCell>{material.courseCode}</TableCell>
                    <TableCell>{material.type}</TableCell>
                    <TableCell>{material.uploadedBy}</TableCell>
                    <TableCell>{formatDate(material.uploadDate)}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Download className="h-4 w-4" />
                      </Button>
                      {material.uploadedBy === "You" && (
                        <Button 
                          variant="ghost" 
                          size="icon"
                          className="h-8 w-8 text-red-500"
                          onClick={() => handleDelete(material.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-8">
              <FileIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-medium text-lg mb-2">No materials found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filters</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Materials;
