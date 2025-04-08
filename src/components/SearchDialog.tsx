
import { useState } from "react";
import { Search, X, BookOpen, Calendar, GraduationCap } from "lucide-react";
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

const searchResults = [
  {
    category: "Exams",
    items: [
      { id: "exam-1", title: "CSCI151 Final Exam", path: "/dashboard/exams" },
      { id: "exam-2", title: "MATH273 Linear Algebra II Exam", path: "/dashboard/exams" },
      { id: "exam-3", title: "PHYS162 Physics II Midterm", path: "/dashboard/exams" },
    ]
  },
  {
    category: "Study Materials",
    items: [
      { id: "mat-1", title: "Programming Fundamentals Notes", path: "/dashboard/materials" },
      { id: "mat-2", title: "Calculus Cheat Sheet", path: "/dashboard/materials" },
      { id: "mat-3", title: "Physics Formulas Collection", path: "/dashboard/materials" },
    ]
  },
  {
    category: "Study Plans",
    items: [
      { id: "plan-1", title: "Finals Week Preparation", path: "/dashboard/planner" },
      { id: "plan-2", title: "Weekend Study Session", path: "/dashboard/planner" },
      { id: "plan-3", title: "Morning Productivity Routine", path: "/dashboard/planner" },
    ]
  }
];

export default function SearchDialog() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const filteredResults = query === "" 
    ? searchResults 
    : searchResults.map(category => ({
        category: category.category,
        items: category.items.filter(item => 
          item.title.toLowerCase().includes(query.toLowerCase())
        )
      })).filter(category => category.items.length > 0);

  const handleSelect = (path: string) => {
    setOpen(false);
    navigate(path);
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
      <button 
        onClick={() => setOpen(true)}
        className="flex items-center w-full md:w-80 gap-2 px-4 py-3 bg-white rounded-full border shadow-md hover:shadow-lg transition-all duration-300"
      >
        <Search className="h-4 w-4 text-gray-400" />
        <span className="text-gray-400">Search for exams, materials, and more...</span>
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="p-0 max-w-2xl gap-0 border-none bg-transparent">
          <Command className="rounded-xl border shadow-lg">
            <div className="flex items-center border-b px-3">
              <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
              <CommandInput 
                placeholder="Search NU Academic Hub..." 
                value={query}
                onValueChange={setQuery}
                className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
              />
              {query && (
                <button onClick={() => setQuery("")}>
                  <X className="h-4 w-4 shrink-0 opacity-50" />
                </button>
              )}
            </div>
            <CommandList className="max-h-[80vh] overflow-auto">
              <CommandEmpty className="py-6 text-center">
                <div className="mb-2">
                  <span className="text-lg">No results found</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Try adjusting your search query.
                </p>
              </CommandEmpty>
              {filteredResults.map((category) => (
                <CommandGroup 
                  key={category.category} 
                  heading={category.category}
                  className="p-2"
                >
                  {category.items.map((item) => (
                    <CommandItem
                      key={item.id}
                      value={item.title}
                      onSelect={() => handleSelect(item.path)}
                      className="flex items-center gap-2 p-2 cursor-pointer rounded-md hover:bg-nu-blue/10 transition-colors"
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-md bg-muted">
                        {getCategoryIcon(category.category)}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-medium">{item.title}</span>
                        <span className="text-xs text-muted-foreground">
                          {category.category}
                        </span>
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              ))}
            </CommandList>
          </Command>
        </DialogContent>
      </Dialog>
    </>
  );
}
