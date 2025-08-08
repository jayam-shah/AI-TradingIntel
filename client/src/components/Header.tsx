import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  BarChart3, 
  DollarSign, 
  Zap, 
  Bell, 
  User,
  LogOut,
  Settings,
  ChevronDown,
  Menu,
  X,
  Search,
  Globe
} from 'lucide-react';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import { useTheme } from '@/hooks/useTheme';

interface HeaderProps {
  user?: any;
  onLogout?: () => void;
}

export default function Header({ user, onLogout }: HeaderProps) {
  const [location] = useLocation();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [marketStatus, setMarketStatus] = useState<'open' | 'closed' | 'pre-market'>('open');
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { currentTheme } = useTheme();
  
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);
      
      // Simple market status logic (Eastern Time approximation)
      const hour = now.getHours();
      if (hour >= 9 && hour < 16) {
        setMarketStatus('open');
      } else if (hour >= 4 && hour < 9) {
        setMarketStatus('pre-market');
      } else {
        setMarketStatus('closed');
      }
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  const mockIndices = [
    { name: 'S&P 500', value: '5,738.17', change: '+0.28%', positive: true },
    { name: 'NASDAQ', value: '18,352.76', change: '+0.15%', positive: true },
    { name: 'DOW', value: '42,840.26', change: '-0.12%', positive: false },
    { name: 'VIX', value: '12.45', change: '-2.15%', positive: false },
    { name: 'GOLD', value: '2,085.40', change: '+0.45%', positive: true },
  ];

  const navigationItems = [
    { name: 'Dashboard', href: '/', icon: BarChart3 },
    { name: 'Markets', href: '/markets', icon: TrendingUp },
    { name: 'Compare', href: '/compare', icon: Activity },
    { name: 'Alerts', href: '/alerts', icon: Bell },
    { name: 'Portfolio', href: '/portfolio', icon: DollarSign },
  ];

  return (
    <header className={`sticky top-0 z-50 bg-gradient-to-r ${currentTheme.colors.background} border-b border-white/10 backdrop-blur-xl transition-all duration-700`}>
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.08),transparent_70%)]"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-emerald-500/10 to-transparent rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-blue-500/10 to-transparent rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Bar - Market Status & Quick Info */}
        <div className="flex items-center justify-between py-2 border-b border-white/5 overflow-hidden">
          <div className="flex items-center space-x-3 min-w-0 flex-1">
            <div className="flex items-center space-x-2 flex-shrink-0">
              <div className={`w-2 h-2 rounded-full ${marketStatus === 'open' ? 'bg-emerald-400 animate-pulse' : marketStatus === 'pre-market' ? 'bg-yellow-400' : 'bg-red-400'}`}></div>
              <span className="text-xs text-gray-300 font-medium whitespace-nowrap">
                Market {marketStatus === 'open' ? 'Open' : marketStatus === 'pre-market' ? 'Pre-Market' : 'Closed'}
              </span>
            </div>
            
            {/* Responsive Market Ticker */}
            <div className="hidden md:flex items-center space-x-3 text-xs overflow-x-auto scrollbar-hide min-w-0">
              {mockIndices.slice(0, 3).map((index) => (
                <div key={index.name} className="flex items-center space-x-1 whitespace-nowrap flex-shrink-0">
                  <span className="text-gray-300 font-medium">{index.name}</span>
                  <span className="text-white font-semibold">{index.value}</span>
                  <span className={`flex items-center font-medium ${index.positive ? 'text-emerald-400' : 'text-red-400'}`}>
                    {index.positive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    {index.change}
                  </span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex items-center space-x-2 text-xs text-gray-400 flex-shrink-0">
            <div className="hidden sm:flex items-center space-x-1">
              <Globe className="w-3 h-3" />
              <span>EST</span>
            </div>
            <span className="font-mono text-xs">{currentTime.toLocaleTimeString()}</span>
          </div>
        </div>

        {/* Main Header */}
        <div className="flex items-center justify-between py-3 gap-2">
          {/* Enhanced Logo & Brand */}
          <div className="flex items-center space-x-3 min-w-0 flex-shrink-0">
            <div className="relative group">
              <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center animate-pulse">
                <Zap className="w-1.5 h-1.5 text-white" />
              </div>
            </div>
            
            <div className="min-w-0">
              <h1 className="text-xl font-bold bg-gradient-to-r from-white via-blue-100 to-emerald-100 bg-clip-text text-transparent">
                StockSense AI
              </h1>
              <p className="text-xs text-gray-400 font-medium hidden sm:block">Advanced Trading Intelligence</p>
            </div>
          </div>

          {/* Enhanced Navigation */}
          <nav className="hidden md:flex items-center space-x-1 flex-1 justify-center max-w-2xl">
            {navigationItems.map((item) => {
              const IconComponent = item.icon;
              const isActive = location === item.href;
              
              return (
                <Link 
                  key={item.name}
                  href={item.href}
                  className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-white/15 text-white shadow-lg border border-white/20' 
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  <span className="font-medium text-sm">{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Enhanced User Actions */}
          <div className="flex items-center space-x-2 flex-shrink-0">
            {/* Theme Switcher */}
            <div className="hidden lg:block">
              <ThemeSwitcher />
            </div>
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 p-1.5 rounded-lg hover:bg-white/10 transition-all duration-200"
                >
                  <div className="flex items-center space-x-2">
                    <div 
                      className="w-8 h-8 rounded-full flex items-center justify-center ring-2 ring-white/20"
                      style={{ background: currentTheme.colors.gradient }}
                    >
                      <span className="text-white text-xs font-semibold">
                        {user.firstName?.charAt(0) || user.email?.charAt(0) || 'U'}
                      </span>
                    </div>
                    <div className="hidden lg:block text-left">
                      <p className="text-white text-sm font-medium">
                        {user.firstName || user.email?.split('@')[0] || 'User'}
                      </p>
                      <p className="text-gray-400 text-xs">
                        Premium Account
                      </p>
                    </div>
                  </div>
                  <ChevronDown className="w-3 h-3 text-gray-400 hidden lg:block" />
                </button>

                {/* User Dropdown Menu */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-gray-800/95 backdrop-blur-lg rounded-lg shadow-xl border border-white/10 py-2 z-50">
                    <div className="px-4 py-3 border-b border-white/10">
                      <p className="text-white font-medium">{user.firstName || 'User'}</p>
                      <p className="text-gray-400 text-sm">{user.email}</p>
                    </div>
                    
                    <Link href="/profile" className="flex items-center px-4 py-2 text-gray-300 hover:text-white hover:bg-white/10 transition-colors">
                      <User className="w-4 h-4 mr-3" />
                      Profile Settings
                    </Link>
                    
                    <Link href="/preferences" className="flex items-center px-4 py-2 text-gray-300 hover:text-white hover:bg-white/10 transition-colors">
                      <Settings className="w-4 h-4 mr-3" />
                      Preferences
                    </Link>
                    
                    <div className="border-t border-white/10 mt-2 pt-2">
                      <button
                        onClick={() => {
                          setIsUserMenuOpen(false);
                          onLogout?.();
                        }}
                        className="flex items-center w-full px-4 py-2 text-gray-300 hover:text-red-400 hover:bg-white/10 transition-colors"
                      >
                        <LogOut className="w-4 h-4 mr-3" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link 
                  href="/login"
                  className="px-3 py-1.5 text-gray-300 hover:text-white transition-colors duration-200 font-medium text-sm"
                >
                  Sign In
                </Link>
                <Link 
                  href="/register"
                  className="px-4 py-1.5 bg-gradient-to-r from-emerald-500 to-blue-500 text-white rounded-lg font-medium hover:from-emerald-600 hover:to-blue-600 transition-all duration-200 shadow-lg hover:shadow-xl text-sm"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-gray-800/95 backdrop-blur-lg border-t border-white/10">
          <div className="px-4 py-4 space-y-2">
            {navigationItems.map((item) => {
              const IconComponent = item.icon;
              const isActive = location === item.href;
              
              return (
                <Link 
                  key={item.name}
                  href={item.href}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-white/15 text-white' 
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <IconComponent className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              );
            })}
            
            <div className="pt-4 border-t border-white/10">
              <ThemeSwitcher />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}