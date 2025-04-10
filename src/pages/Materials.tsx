
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Folder, FolderOpen, FileText, Search, ChevronRight, ChevronDown, ArrowLeft, Upload, Plus, File, BookOpen, FileQuestion } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SCHOOLS } from '@/lib/constants';
import { motion, AnimatePresence } from 'framer-motion';

interface StudyMaterial {
  id: string;
  name: string;
  type: 'file' | 'folder';
  fileType?: 'exam' | 'lecture' | 'quiz' | 'reading' | 'general';
  dateAdded?: string;
  size?: string;
  path: string[];
  children?: StudyMaterial[];
}

const Materials = () => {
  const [currentPath, setCurrentPath] = useState<string[]>([]);
  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({});
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  
  // Example folder structure - this would be loaded from an API in a real application
  const [folderStructure, setFolderStructure] = useState<StudyMaterial[]>([
    {
      id: 'seds',
      name: 'School of Engineering and Digital Sciences (SEDS)',
      type: 'folder',
      path: ['seds'],
      children: [
        {
          id: 'csci',
          name: 'Computer Science',
          type: 'folder',
          path: ['seds', 'csci'],
          children: [
            {
              id: 'csci151',
              name: 'CSCI151 - Programming for Scientists',
              type: 'folder',
              path: ['seds', 'csci', 'csci151'],
              children: [
                {
                  id: 'csci151-2024',
                  name: '2024',
                  type: 'folder',
                  path: ['seds', 'csci', 'csci151', 'csci151-2024'],
                  children: [
                    {
                      id: 'csci151-lectures',
                      name: 'Lectures',
                      type: 'folder',
                      path: ['seds', 'csci', 'csci151', 'csci151-2024', 'csci151-lectures'],
                      children: [
                        {
                          id: 'lecture1',
                          name: 'Lecture 1 - Introduction to Programming',
                          type: 'file',
                          fileType: 'lecture',
                          dateAdded: '2024-09-01',
                          size: '1.2 MB',
                          path: ['seds', 'csci', 'csci151', 'csci151-2024', 'csci151-lectures', 'lecture1']
                        },
                        {
                          id: 'lecture2',
                          name: 'Lecture 2 - Variables and Data Types',
                          type: 'file',
                          fileType: 'lecture',
                          dateAdded: '2024-09-08',
                          size: '2.5 MB',
                          path: ['seds', 'csci', 'csci151', 'csci151-2024', 'csci151-lectures', 'lecture2']
                        }
                      ]
                    },
                    {
                      id: 'csci151-exams',
                      name: 'Exams',
                      type: 'folder',
                      path: ['seds', 'csci', 'csci151', 'csci151-2024', 'csci151-exams'],
                      children: [
                        {
                          id: 'midterm',
                          name: 'Midterm Exam Fall 2024',
                          type: 'file',
                          fileType: 'exam',
                          dateAdded: '2024-10-15',
                          size: '850 KB',
                          path: ['seds', 'csci', 'csci151', 'csci151-2024', 'csci151-exams', 'midterm']
                        },
                        {
                          id: 'final',
                          name: 'Final Exam Fall 2024',
                          type: 'file',
                          fileType: 'exam',
                          dateAdded: '2024-12-10',
                          size: '1.1 MB',
                          path: ['seds', 'csci', 'csci151', 'csci151-2024', 'csci151-exams', 'final']
                        }
                      ]
                    },
                    {
                      id: 'csci151-reading',
                      name: 'Reading Materials',
                      type: 'folder',
                      path: ['seds', 'csci', 'csci151', 'csci151-2024', 'csci151-reading'],
                      children: [
                        {
                          id: 'textbook',
                          name: 'Introduction to Python Programming',
                          type: 'file',
                          fileType: 'reading',
                          dateAdded: '2024-09-01',
                          size: '15.7 MB',
                          path: ['seds', 'csci', 'csci151', 'csci151-2024', 'csci151-reading', 'textbook']
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              id: 'csci152',
              name: 'CSCI152 - Performance and Data Structures',
              type: 'folder',
              path: ['seds', 'csci', 'csci152'],
              children: []
            }
          ]
        }
      ]
    },
    {
      id: 'ssh',
      name: 'School of Sciences and Humanities (SSH)',
      type: 'folder',
      path: ['ssh'],
      children: [
        {
          id: 'math',
          name: 'Mathematics',
          type: 'folder',
          path: ['ssh', 'math'],
          children: [
            {
              id: 'math161',
              name: 'MATH161 - Calculus I',
              type: 'folder',
              path: ['ssh', 'math', 'math161'],
              children: []
            }
          ]
        }
      ]
    },
    {
      id: 'gsb',
      name: 'Graduate School of Business (GSB)',
      type: 'folder',
      path: ['gsb'],
      children: []
    },
    {
      id: 'smg',
      name: 'School of Mining and Geosciences (SMG)',
      type: 'folder',
      path: ['smg'],
      children: []
    }
  ]);
  
  // Function to find current directory based on path
  const getCurrentDirectory = (path: string[]) => {
    if (path.length === 0) return folderStructure;
    
    let current = [...folderStructure];
    for (const segment of path) {
      const found = current.find(item => item.id === segment);
      if (found && found.children) {
        current = found.children;
      } else {
        return [];
      }
    }
    return current;
  };
  
  // Current directory items based on path
  const currentDirectory = getCurrentDirectory(currentPath);
  
  // Handle folder click - navigate into folder
  const handleFolderClick = (folder: StudyMaterial) => {
    setCurrentPath(folder.path);
  };
  
  // Handle expanding/collapsing folders in tree view
  const toggleFolder = (folderId: string) => {
    setExpandedFolders(prev => ({
      ...prev,
      [folderId]: !prev[folderId]
    }));
  };
  
  // Go back to parent folder
  const navigateUp = () => {
    setCurrentPath(prev => prev.slice(0, -1));
  };
  
  // Get file icon based on file type
  const getFileIcon = (fileType?: string) => {
    switch (fileType) {
      case 'exam':
        return <FileQuestion className="h-5 w-5 text-red-500" />;
      case 'lecture':
        return <FileText className="h-5 w-5 text-blue-500" />;
      case 'quiz':
        return <FileText className="h-5 w-5 text-purple-500" />;
      case 'reading':
        return <BookOpen className="h-5 w-5 text-green-500" />;
      default:
        return <File className="h-5 w-5 text-gray-500" />;
    }
  };
  
  // Breadcrumb navigation
  const getBreadcrumbs = () => {
    if (currentPath.length === 0) return [{ id: 'root', name: 'Materials', path: [] }];
    
    const crumbs = [{ id: 'root', name: 'Materials', path: [] }];
    let builtPath: string[] = [];
    
    currentPath.forEach(segment => {
      builtPath = [...builtPath, segment];
      
      // Find the folder name for this segment
      let current = folderStructure;
      for (const pathSegment of builtPath) {
        const found = current.find(item => item.id === pathSegment);
        if (found) {
          if (found.id === segment) {
            crumbs.push({
              id: found.id,
              name: found.name,
              path: [...builtPath]
            });
          }
          if (found.children) {
            current = found.children;
          }
        }
      }
    });
    
    return crumbs;
  };
  
  const renderFolderTree = (items: StudyMaterial[], depth = 0) => {
    return (
      <ul className={cn("space-y-1", depth > 0 && "ml-4 pl-2 border-l border-gray-200")}>
        {items.map(item => {
          if (item.type === 'folder') {
            const isExpanded = expandedFolders[item.id] === true;
            return (
              <li key={item.id}>
                <div 
                  className={cn(
                    "flex items-center py-1 px-2 rounded-md cursor-pointer group",
                    item.id === selectedItem && "bg-blue-50",
                    "hover:bg-blue-50"
                  )}
                  onClick={() => {
                    toggleFolder(item.id);
                    setSelectedItem(item.id);
                  }}
                >
                  <button className="mr-1 text-gray-500">
                    {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                  </button>
                  <div className="flex items-center text-gray-800 hover:text-blue-600">
                    {isExpanded ? 
                      <FolderOpen className="h-5 w-5 text-blue-500 mr-2" /> :
                      <Folder className="h-5 w-5 text-amber-500 mr-2" />
                    }
                    <span 
                      className="text-sm font-medium"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleFolderClick(item);
                      }}
                    >
                      {item.name}
                    </span>
                  </div>
                </div>
                <AnimatePresence>
                  {isExpanded && item.children && item.children.length > 0 && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {renderFolderTree(item.children, depth + 1)}
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          }
          return null;
        })}
      </ul>
    );
  };
  
  // Handle file upload
  const handleUpload = () => {
    toast("File uploaded successfully", {
      description: "Your file has been uploaded to the current folder.",
      action: {
        label: "View",
        onClick: () => console.log("View"),
      },
    });
    setUploadOpen(false);
  };
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-nu-darkblue mb-1">Study Materials</h1>
        <p className="text-muted-foreground">Explore and share course materials by school and department.</p>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left sidebar - folder tree */}
        <Card className="md:w-1/4">
          <CardHeader className="py-3">
            <CardTitle className="text-lg font-medium flex items-center">
              <FolderOpen className="h-5 w-5 text-blue-500 mr-2" /> 
              Schools
            </CardTitle>
          </CardHeader>
          <Separator />
          <CardContent className="py-3">
            <ScrollArea className="h-[calc(100vh-16rem)]">
              {renderFolderTree(folderStructure)}
            </ScrollArea>
          </CardContent>
        </Card>
        
        {/* Main content - current directory */}
        <Card className="flex-1">
          <CardHeader className="py-4">
            <div className="flex items-center justify-between">
              <div>
                {/* Breadcrumb navigation */}
                <nav className="flex items-center space-x-1 text-sm">
                  {getBreadcrumbs().map((crumb, idx) => (
                    <div key={crumb.id} className="flex items-center">
                      {idx > 0 && <ChevronRight className="h-4 w-4 text-gray-500 mx-1" />}
                      <button
                        className={cn(
                          "hover:text-blue-600 transition-colors",
                          idx === getBreadcrumbs().length - 1 ? "font-medium text-nu-blue" : "text-gray-700"
                        )}
                        onClick={() => setCurrentPath(crumb.path)}
                      >
                        {idx === 0 ? 'Materials' : crumb.name.split(' - ')[0]}
                      </button>
                    </div>
                  ))}
                </nav>
                <h2 className="text-xl font-semibold mt-2">
                  {currentPath.length === 0 
                    ? 'All Materials' 
                    : getBreadcrumbs()[getBreadcrumbs().length - 1].name}
                </h2>
              </div>
              
              <div className="flex gap-2">
                <div className="relative w-64">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search in this folder..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <Dialog open={uploadOpen} onOpenChange={setUploadOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Upload className="mr-2 h-4 w-4" /> Upload
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Upload Material</DialogTitle>
                      <DialogDescription>
                        Upload new study materials to the current folder.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">File Name</label>
                        <Input placeholder="Lecture notes" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Material Type</label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="lecture">Lecture Notes</SelectItem>
                            <SelectItem value="exam">Exam</SelectItem>
                            <SelectItem value="quiz">Quiz</SelectItem>
                            <SelectItem value="reading">Reading Material</SelectItem>
                            <SelectItem value="general">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">File</label>
                        <Input type="file" className="cursor-pointer" />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setUploadOpen(false)}>Cancel</Button>
                      <Button onClick={handleUpload}>Upload</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </CardHeader>
          <Separator />
          <CardContent className="py-4">
            {currentPath.length > 0 && (
              <Button 
                variant="ghost" 
                className="mb-4"
                onClick={navigateUp}
              >
                <ArrowLeft className="h-4 w-4 mr-2" /> Back
              </Button>
            )}
            
            <ScrollArea className="h-[calc(100vh-20rem)]">
              {/* Folders first, then files */}
              <div className="space-y-1">
                {currentDirectory.length === 0 ? (
                  <div className="text-center py-12">
                    <FolderOpen className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-600">This folder is empty</h3>
                    <p className="text-gray-500 mt-1">Upload materials or create a new folder</p>
                    <Button className="mt-4" variant="outline" onClick={() => setUploadOpen(true)}>
                      <Plus className="h-4 w-4 mr-2" /> Add Files
                    </Button>
                  </div>
                ) : (
                  <div>
                    {/* Folders */}
                    {currentDirectory.filter(item => item.type === 'folder').map(folder => (
                      <div
                        key={folder.id}
                        className="flex items-center p-2 rounded-md cursor-pointer hover:bg-blue-50 transition-colors"
                        onClick={() => handleFolderClick(folder)}
                      >
                        <Folder className="h-5 w-5 text-amber-500 mr-3" />
                        <div className="flex-1">
                          <div className="font-medium text-gray-800">{folder.name}</div>
                        </div>
                      </div>
                    ))}
                    
                    {/* Separator if both folders and files exist */}
                    {currentDirectory.some(item => item.type === 'folder') && 
                     currentDirectory.some(item => item.type === 'file') && 
                     <Separator className="my-3" />}
                    
                    {/* Files */}
                    {currentDirectory.filter(item => item.type === 'file').map(file => (
                      <div
                        key={file.id}
                        className="flex items-center p-2 rounded-md cursor-pointer hover:bg-blue-50 transition-colors"
                        onClick={() => setSelectedItem(file.id)}
                      >
                        {getFileIcon(file.fileType)}
                        <div className="flex-1 ml-3">
                          <div className="font-medium text-gray-800">{file.name}</div>
                          <div className="flex items-center text-xs text-gray-500 mt-1">
                            <span>{file.dateAdded}</span>
                            <span className="mx-2">•</span>
                            <span>{file.size}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Materials;
