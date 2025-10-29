import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Home } from './components/Home';
import { Dashboard } from './components/Dashboard';
import { MapView } from './components/MapView';
import { SpeciesPredict } from './components/SpeciesPredict';
import { Encyclopedia } from './components/Encyclopedia';
import { Chatbot } from './components/Chatbot';
import { ReportExport } from './components/ReportExport';
import { AuthDialog } from './components/AuthDialog';
import { onAuthChange, signOut } from './firebase';
import { getGoogleRedirectResult } from './firebase';
import { Toaster } from './components/ui/sonner';

type Page = 'home' | 'dashboard' | 'map' | 'predict' | 'encyclopedia' | 'chatbot' | 'export';

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
      // Sign out via Firebase helper
      signOut().then(() => {
        setIsAuthenticated(false);
        setUserEmail('');
      }).catch(() => {
        // still clear local state on error
        setIsAuthenticated(false);
        setUserEmail('');
      });
    } else {
      setShowAuthDialog(true);
    }
  };

  const handleAuthenticate = (email: string) => {
    setIsAuthenticated(true);
    setUserEmail(email);
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
      />
      
      <main>{renderPage()}</main>

      <AuthDialog
        open={showAuthDialog}
        onOpenChange={setShowAuthDialog}
        onAuthenticate={handleAuthenticate}
      />

      <Toaster />

      {/* Footer */}
      <footer className="bg-gradient-to-r from-blue-900 via-blue-800 to-cyan-800 text-white py-12 mt-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg mb-4">OceanIQ</h3>
              <p className="text-blue-200 text-sm">
                AI-Powered Marine Intelligence & Biodiversity Prediction Platform
              </p>
            </div>
            <div>
              <h4 className="mb-4">Features</h4>
              <ul className="space-y-2 text-sm text-blue-200">
                <li>Data Analytics</li>
                <li>AI Predictions</li>
                <li>Interactive Maps</li>
                <li>Species Encyclopedia</li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-blue-200">
                <li>Documentation</li>
                <li>API Reference</li>
                <li>Research Papers</li>
                <li>Conservation Guides</li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4">Connect</h4>
              <ul className="space-y-2 text-sm text-blue-200">
                <li>Contact Us</li>
                <li>GitHub</li>
                <li>Twitter</li>
                <li>Newsletter</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-blue-700 mt-8 pt-8 text-center text-sm text-blue-200">
            <p>© 2025 OceanIQ. Built with React, TypeScript, and Supabase. Empowering marine conservation through AI.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
