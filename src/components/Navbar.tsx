import { Waves, Home, BarChart3, Map, Fish, BookOpen, MessageCircle, Download, LogIn, User } from 'lucide-react';
import { Button } from './ui/button';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  isAuthenticated: boolean;
  onAuthClick: () => void;
}

export function Navbar({ currentPage, onNavigate, isAuthenticated, onAuthClick }: NavbarProps) {
  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'map', label: 'Map View', icon: Map },
    { id: 'predict', label: 'Species Predict', icon: Fish },
    { id: 'encyclopedia', label: 'Encyclopedia', icon: BookOpen },
    { id: 'chatbot', label: 'AI Assistant', icon: MessageCircle },
    { id: 'export', label: 'Export', icon: Download }
  ];

  return (
    <nav className="bg-gradient-to-r from-blue-900 via-blue-800 to-cyan-800 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('home')}>
            <Waves className="w-8 h-8 text-cyan-300" />
            <div>
              <h1 className="tracking-tight">OceanIQ</h1>
              <p className="text-xs text-cyan-200">Marine Intelligence Platform</p>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'text-blue-100 hover:bg-white/10'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm">{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Auth Button */}
          <Button
            onClick={onAuthClick}
            variant="outline"
            className="bg-white/10 border-white/20 text-white hover:bg-white/20"
          >
            {isAuthenticated ? (
              <>
                <User className="w-4 h-4 mr-2" />
                Profile
              </>
            ) : (
              <>
                <LogIn className="w-4 h-4 mr-2" />
                Sign In
              </>
            )}
          </Button>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex overflow-x-auto gap-2 pb-3 -mx-4 px-4 scrollbar-hide">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg whitespace-nowrap ${
                  isActive
                    ? 'bg-white/20 text-white'
                    : 'text-blue-100'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
