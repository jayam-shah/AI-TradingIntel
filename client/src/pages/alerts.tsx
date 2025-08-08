import { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useLocation } from 'wouter';
import { useToast } from '@/hooks/use-toast';
import { isUnauthorizedError } from '@/lib/authUtils';
import AlertManager from '@/components/AlertManager';
import { useTheme } from '@/hooks/useTheme';
import { Bell } from 'lucide-react';

export default function Alerts() {
  const { toast } = useToast();
  const { isAuthenticated, isLoading } = useAuth();
  const [, setLocation] = useLocation();
  const { currentTheme } = useTheme();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      // Store current path to redirect back after login
      localStorage.setItem('intendedPath', '/alerts');
      
      toast({
        title: "Authentication Required",
        description: "Please sign in to access alerts.",
        variant: "destructive",
      });
      
      setTimeout(() => {
        setLocation('/login');
      }, 500);
      return;
    }
  }, [isAuthenticated, isLoading, toast, setLocation]);

  // Show loading while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
        </div>
      </div>
    );
  }

  // Don't render if not authenticated
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br ${currentTheme.colors.background} text-white transition-all duration-700`}>
      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-lg flex items-center justify-center">
                <Bell className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">Alert Center</h1>
                <p className="text-gray-300">Manage your price and news alerts</p>
              </div>
            </div>
            <p className="text-gray-400 max-w-2xl">
              Set up custom alerts to stay informed about price movements and breaking news for your favorite stocks. 
              Get notified when prices hit your targets or when important news breaks.
            </p>
          </div>

          {/* Alert Manager Component */}
          <div className="glass-card rounded-2xl p-6">
            <AlertManager />
          </div>
        </div>
      </div>
    </div>
  );
}