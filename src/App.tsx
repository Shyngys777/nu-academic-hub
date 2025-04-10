
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MotionConfig } from "framer-motion";

import Dashboard from "./pages/Dashboard";
import ExamSchedule from "./pages/ExamSchedule";
import StudyPlanner from "./pages/StudyPlanner";
import Materials from "./pages/Materials";
import SmartMind from "./pages/SmartMind";
import Layout from "./components/Layout";
import NotFound from "./pages/NotFound";
import Index from "./pages/Index";
import Settings from "./pages/Settings";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <MotionConfig reducedMotion="user">
      <TooltipProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/dashboard" element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="exams" element={<ExamSchedule />} />
              <Route path="planner" element={<StudyPlanner />} />
              <Route path="materials" element={<Materials />} />
              <Route path="smartmind" element={<SmartMind />} />
              <Route path="settings" element={<Settings />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        <Sonner />
      </TooltipProvider>
    </MotionConfig>
  </QueryClientProvider>
);

export default App;
