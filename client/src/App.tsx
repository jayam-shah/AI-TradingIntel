import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import Home from "@/pages/home";
import Landing from "@/pages/landing";
import Login from "@/pages/login";
import Register from "@/pages/register";
import Alerts from "@/pages/alerts";
import NotFound from "@/pages/not-found";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StockComparison from "@/components/StockComparison";
import { useAuth } from "@/hooks/useAuth";

function Router() {
  const { isAuthenticated, isLoading, user, logout } = useAuth();

  console.log('Router state:', { isAuthenticated, isLoading, hasUser: !!user });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      {isAuthenticated && <Header user={user} onLogout={logout} />}
      
      <main className="flex-1">
        <Switch>
          <Route path="/login">
            {isAuthenticated ? <Home /> : <Login />}
          </Route>
          <Route path="/register">
            {isAuthenticated ? <Home /> : <Register />}
          </Route>
          <Route path="/alerts">
            {isAuthenticated ? <Alerts /> : <Landing />}
          </Route>
          <Route path="/compare">
            {isAuthenticated ? <StockComparison /> : <Landing />}
          </Route>
          <Route path="/" component={() => isAuthenticated ? <Home /> : <Landing />} />
          <Route component={NotFound} />
        </Switch>
      </main>
      
      <Footer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
