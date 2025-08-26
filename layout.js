import React, { createContext, useContext, useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

export default function Layout({ children }) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDark(savedTheme === 'dark' || (!savedTheme && prefersDark));
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      <style>{`
        :root {
          --bg-primary: ${isDark ? '#0a0a0a' : '#ffffff'};
          --bg-secondary: ${isDark ? '#111111' : '#f8fafc'};
          --bg-tertiary: ${isDark ? '#1a1a1a' : '#f1f5f9'};
          --text-primary: ${isDark ? '#f8fafc' : '#0f172a'};
          --text-secondary: ${isDark ? '#cbd5e1' : '#475569'};
          --text-muted: ${isDark ? '#94a3b8' : '#64748b'};
          --border: ${isDark ? '#27272a' : '#e2e8f0'};
          --accent: ${isDark ? '#3b82f6' : '#2563eb'};
          --accent-hover: ${isDark ? '#1d4ed8' : '#1e40af'};
          --gradient: ${isDark ? 
            'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)' : 
            'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)'
          };
        }
        
        html {
          scroll-behavior: smooth;
        }
        
        body {
          background: var(--bg-primary);
          color: var(--text-primary);
          transition: background-color 0.3s ease, color 0.3s ease;
        }
        
        .animate-fade-up {
          animation: fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        
        .animate-fade-in {
          animation: fadeIn 1s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        
        .animate-slide-right {
          animation: slideRight 0.8s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideRight {
          from {
            opacity: 0;
            transform: translateX(-40px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .glass-morphism {
          background: ${isDark ? 
            'rgba(17, 17, 17, 0.8)' : 
            'rgba(255, 255, 255, 0.8)'
          };
          backdrop-filter: blur(20px);
          border: 1px solid ${isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
        }
        
        .gradient-text {
          background: linear-gradient(135deg, var(--accent), #8b5cf6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>
      
      <div className="min-h-screen relative">
        {/* Theme Toggle */}
        <div className="fixed top-8 right-8 z-50">
          <Button
            variant="outline"
            size="icon"
            onClick={toggleTheme}
            className="glass-morphism hover:scale-110 transition-all duration-300"
          >
            {isDark ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>
        </div>
        
        {/* Background Pattern */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className={`absolute -top-40 -right-40 w-80 h-80 rounded-full opacity-20 blur-3xl ${
            isDark ? 'bg-blue-500' : 'bg-purple-300'
          }`} />
          <div className={`absolute -bottom-40 -left-40 w-80 h-80 rounded-full opacity-20 blur-3xl ${
            isDark ? 'bg-purple-500' : 'bg-blue-300'
          }`} />
        </div>
        
        <main className="relative">
          {children}
        </main>
      </div>
    </ThemeContext.Provider>
  );
}