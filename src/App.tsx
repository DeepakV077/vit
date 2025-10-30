import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Home } from './components/Home';
import Dashboard from './components/Dashboard';
import MapView from './components/MapView';
import { SpeciesPredict } from './components/SpeciesPredictClean';
import { Encyclopedia } from './components/Encyclopedia';
import { Chatbot } from './components/Chatbot';
import { ReportExport } from './components/ReportExport';
import Login from './components/Login';
import Register from './components/Register';
import { AuthDialog } from './components/AuthDialog';
import Profile from './components/Profile';
import { onAuthChange, signOut } from './firebase';
import { getGoogleRedirectResult } from './firebase';
import { Toaster } from './components/ui/sonner';
import { motion } from 'framer-motion';

type Page = 'home' | 'dashboard' | 'map' | 'predict' | 'encyclopedia' | 'chatbot' | 'export' | 'login' | 'register' | 'profile';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [showAuthDialog, setShowAuthDialog] = useState(false);

  const handleNavigate = (page: string) => {
    setCurrentPage(page as Page);
  };

  const handleAuthClick = () => {
    if (isAuthenticated) {
      // When already authenticated, navigate to the profile page
      setCurrentPage('profile');
    } else {
      setShowAuthDialog(true);
    }
  };

  const handleAuthenticate = (email: string) => {
    setIsAuthenticated(true);
    setUserEmail(email);
    // navigate to dashboard after successful authentication for better UX
    setCurrentPage('dashboard');
  };

  useEffect(() => {
    // Subscribe to Firebase auth state changes and keep App state in sync
    const unsub = onAuthChange((user) => {
      if (user) {
        setIsAuthenticated(true);
        setUserEmail(user.email ?? '');
      } else {
        setIsAuthenticated(false);
        setUserEmail('');
      }
    });
    // Also check for a redirect result (when signInWithRedirect was used)
    getGoogleRedirectResult().then((user) => {
      if (user) {
        setIsAuthenticated(true);
        setUserEmail(user.email ?? '');
      }
    });

    return () => unsub();
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={handleNavigate} />;
      case 'dashboard':
        return <Dashboard />;
      case 'map':
        return <MapView />;
      case 'predict':
        return <SpeciesPredict />;
      case 'encyclopedia':
        return <Encyclopedia />;
      case 'chatbot':
        return <Chatbot />;
      case 'login':
        return <Login onAuthenticate={handleAuthenticate} onNavigate={handleNavigate} />;
      case 'register':
        return <Register onAuthenticate={handleAuthenticate} onNavigate={handleNavigate} />;
      case 'profile':
        return (
          <Profile
            email={userEmail}
            onSignedOut={() => {
              // ensure app state is cleared when the Profile component signals sign-out
              setIsAuthenticated(false);
              setUserEmail('');
              setCurrentPage('home');
            }}
          />
        );
      case 'export':
        return <ReportExport />;
      default:
        return <Home onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        isAuthenticated={isAuthenticated}
        onAuthClick={handleAuthClick}
        userEmail={userEmail}
      />
      
      <main>{renderPage()}</main>

      <AuthDialog
        open={showAuthDialog}
        onOpenChange={setShowAuthDialog}
        onAuthenticate={handleAuthenticate}
      />

      <Toaster />

      {/* Footer: clean, professional OceanIQ footer */}
      <footer className="bg-[#021a2b] text-sky-100 py-12 mt-12">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col md:flex-row md:justify-between gap-8"
          >
            <div className="md:w-1/3">
              <div className="flex items-center gap-3">
                <motion.div
                  className="w-10 h-10 rounded-full bg-linear-to-r from-cyan-400 to-blue-500 flex items-center justify-center text-blue-900 font-bold"
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                >
                  OQ
                </motion.div>

                <div>
                  <div className="text-lg font-semibold">OceanIQ</div>
                  <div className="text-sm text-sky-200">AI for resilient oceans</div>
                </div>
              </div>
              <p className="mt-3 text-sm text-sky-300 max-w-sm">Translating data into conservation action — satellite, in‑situ and model data powered by machine learning.</p>
            </div>

            
          
          </motion.div>

          <div className="mt-8 border-t border-sky-800 pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-sky-300">
            <div>© {new Date().getFullYear()} OceanIQ — Open science friendly</div>
            <div className="text-xs">Built for resilience • Data-driven conservation</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
