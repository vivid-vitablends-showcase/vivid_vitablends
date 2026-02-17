import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import HealthPowders from "./pages/HealthPowders";
import PremiumPickles from "./pages/PremiumPickles";


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />

      <HashRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/sys-admin-portal" element={<AdminLogin />} />
          <Route path="/sys-admin-dashboard" element={<AdminDashboard />} />
          <Route path="/health-powders" element={<HealthPowders />} />
          <Route path="/premium-pickles" element={<PremiumPickles />} />



          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </HashRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
