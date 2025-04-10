
import { useState, useEffect } from "react";
import { Search, X, BookOpen, Calendar, GraduationCap, ArrowRight, History } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

interface SearchResult {
  id: string;
  title: string;
  path: string;
  category: string;
}

const searchResults: SearchResult[] = [
  // Exams
  { id: "exam-1", title: "CSCI151 Final Exam", path: "/dashboard/exams", category: "Exams" },
  { id: "exam-2", title: "MATH273 Linear Algebra II Exam", path: "/dashboard/exams", category: "Exams" },
  { id: "exam-3", title: "PHYS162 Physics II Midterm", path: "/dashboard/exams", category: "Exams" },
  { id: "exam-4", title: "ECON201 Microeconomics Exam", path: "/dashboard/exams", category: "Exams" },
  { id: "exam-5", title: "BIOL160 Cell Biology Midterm", path: "/dashboard/exams", category: "Exams" },
  
  // Study Materials
  { id: "mat-1", title: "Programming Fundamentals Notes", path: "/dashboard/materials", category: "Study Materials" },
  { id: "mat-2", title: "Calculus Cheat Sheet", path: "/dashboard/materials", category: "Study Materials" },
  { id: "mat-3", title: "Physics Formulas Collection", path: "/dashboard/materials", category: "Study Materials" },
  { id: "mat-4", title: "Organic Chemistry Lab Notes", path: "/dashboard/materials", category: "Study Materials" },
  { id: "mat-5", title: "World History Timeline", path: "/dashboard/materials", category: "Study Materials" },
  
  // Study Plans  
  { id: "plan-1", title: "Finals Week Preparation", path: "/dashboard/planner", category: "Study Plans" },
  { id: "plan-2", title: "Weekend Study Session", path: "/dashboard/planner", category: "Study Plans" },
  { id: "plan-3", title: "Morning Productivity Routine", path: "/dashboard/planner", category: "Study Plans" },
  { id: "plan-4", title: "Group Study Strategy", path: "/dashboard/planner", category: "Study Plans" },
  { id: "plan-5", title: "Spaced Repetition Plan", path: "/dashboard/planner", category: "Study Plans" },
];

export default function SearchDialog() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const navigate = useNavigate();

  // Load recent searches from localStorage on component mount
  useEffect(() => {
    const savedSearches = localStorage.getItem("recentSearches");
    if (savedSearches) {
      setRecentSearches(JSON.parse(savedSearches));
    }
  }, []);

  // Keyboard shortcut handler for Command+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Save recent searches to localStorage
  const saveRecentSearch = (searchTerm: string) => {
    if (!searchTerm.trim()) return;
    
    const updatedSearches = [
      searchTerm,
      ...recentSearches.filter(s => s !== searchTerm)
    ].slice(0, 5); // Keep only the 5 most recent searches
    
    setRecentSearches(updatedSearches);
    localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));
  };

  // Filter search results based on query
  const filteredResults = query === "" 
    ? [] 
    : searchResults.filter(item => 
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase())
      );

  // Group results by category
  const groupedResults = filteredResults.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, SearchResult[]>);

  const handleSelect = (item: SearchResult) => {
    saveRecentSearch(item.title);
    setOpen(false);
    navigate(item.path);
  };

  const handleRecentSearch = (searchTerm: string) => {
    setQuery(searchTerm);
  };

  const getCategoryIcon = (category: string) => {
    switch(category) {
      case "Exams": return <Calendar className="h-4 w-4 text-nu-blue" />;
      case "Study Materials": return <BookOpen className="h-4 w-4 text-amber-500" />;
      case "Study Plans": return <GraduationCap className="h-4 w-4 text-green-500" />;
      default: return null;
    }
  };

  return (
    <>
      <motion.div
        whileHover={{ scale: 1.02 }}
        onClick={() => setOpen(true)}
        className="cursor-pointer"
      >
        <div className="flex items-center px-4 py-2 rounded-full bg-white/80 hover:bg-nu-gold/10 border border-gray-300 shadow-sm transition-all duration-300">
          <Search className="h-5 w-5 mr-2 text-gray-500" />
          <span className="text-gray-600">Search</span>
        </div>
      </motion.div>

      {/* Search Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="p-0 max-w-3xl gap-0 border-none bg-transparent">
          <Command className="rounded-xl border shadow-2xl">
            <div className="flex items-center border-b px-4 py-3">
              <Search className="mr-2 h-5 w-5 shrink-0 text-nu-blue" />
              <CommandInput 
                placeholder="Search NU Academic Hub..." 
                value={query}
                onValueChange={setQuery}
                className="flex h-12 w-full rounded-md bg-transparent py-3 text-base outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
                autoFocus
              />
              {query && (
                <button onClick={() => setQuery("")} className="hover:bg-gray-100 rounded-full p-1">
                  <X className="h-5 w-5 shrink-0 text-gray-400 hover:text-gray-600" />
                </button>
              )}
            </div>
            <CommandList className="max-h-[70vh] overflow-auto p-2">
              {/* Recent searches */}
              {!query && recentSearches.length > 0 && (
                <CommandGroup heading="Recent Searches" className="p-2">
                  {recentSearches.map((searchTerm, index) => (
                    <CommandItem
                      key={`recent-${index}`}
                      value={searchTerm}
                      onSelect={() => handleRecentSearch(searchTerm)}
                      className="flex items-center gap-2 p-2 cursor-pointer rounded-md hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gray-100">
                        <History className="h-4 w-4 text-gray-500" />
                      </div>
                      <span>{searchTerm}</span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}

              {/* No results state */}
              <CommandEmpty className="py-6 text-center">
                {query.length > 0 ? (
                  <>
                    <div className="mb-2">
                      <span className="text-lg font-medium">No results found for "{query}"</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Try adjusting your search query or browse through categories.
                    </p>
                  </>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Start typing to search across all resources.
                  </p>
                )}
              </CommandEmpty>

              {/* Search results grouped by category */}
              {Object.entries(groupedResults).map(([category, items]) => (
                <CommandGroup 
                  key={category} 
                  heading={category}
                  className="p-2"
                >
                  {items.map((item) => (
                    <CommandItem
                      key={item.id}
                      value={item.title}
                      onSelect={() => handleSelect(item)}
                      className="flex items-center gap-3 p-3 cursor-pointer rounded-md hover:bg-nu-blue/10 transition-colors"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-md bg-gray-100">
                        {getCategoryIcon(category)}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-medium">{item.title}</span>
                        <span className="text-xs text-muted-foreground">
                          {category}
                        </span>
                      </div>
                      <ArrowRight className="ml-auto h-4 w-4 text-gray-400" />
                    </CommandItem>
                  ))}
                </CommandGroup>
              ))}

              {/* Quick links when no query */}
              {!query && (
                <div className="p-2 mt-4">
                  <h3 className="mb-2 ml-2 text-xs font-medium text-muted-foreground">QUICK LINKS</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <button 
                      className="flex items-center space-x-2 rounded-md p-3 text-sm hover:bg-gray-100" 
                      onClick={() => {
                        setOpen(false);
                        navigate("/dashboard");
                      }}
                    >
                      <div className="rounded-md bg-gray-100 p-1">
                        <Search className="h-4 w-4 text-nu-blue" />
                      </div>
                      <div className="text-left">
                        <div className="font-medium">Dashboard</div>
                        <div className="text-xs text-muted-foreground">View your personalized dashboard</div>
                      </div>
                    </button>
                    <button 
                      className="flex items-center space-x-2 rounded-md p-3 text-sm hover:bg-gray-100" 
                      onClick={() => {
                        setOpen(false);
                        navigate("/dashboard/exams");
                      }}
                    >
                      <div className="rounded-md bg-gray-100 p-1">
                        <Calendar className="h-4 w-4 text-nu-blue" />
                      </div>
                      <div className="text-left">
                        <div className="font-medium">Exam Schedule</div>
                        <div className="text-xs text-muted-foreground">View upcoming exams</div>
                      </div>
                    </button>
                  </div>
                </div>
              )}
            </CommandList>
            <div className="flex items-center justify-between px-4 py-2 border-t text-xs text-gray-500">
              <div>Press <kbd className="bg-gray-100 px-1.5 py-0.5 rounded">↓</kbd> <kbd className="bg-gray-100 px-1.5 py-0.5 rounded">↑</kbd> to navigate</div>
              <div>Press <kbd className="bg-gray-100 px-1.5 py-0.5 rounded">Enter</kbd> to select</div>
              <div>Press <kbd className="bg-gray-100 px-1.5 py-0.5 rounded">Esc</kbd> to close</div>
            </div>
          </Command>
        </DialogContent>
      </Dialog>
    </>
  );
}
