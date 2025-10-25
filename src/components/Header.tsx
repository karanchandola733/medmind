import React from 'react';
import { Activity, History, Home } from 'lucide-react';

interface HeaderProps {
  currentPage: 'home' | 'symptoms' | 'results' | 'history';
  onNavigate: (page: 'home' | 'symptoms' | 'results' | 'history') => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPage, onNavigate }) => {
  const navItems = [
    { id: 'home' as const, label: 'Home', icon: Home },
    { id: 'symptoms' as const, label: 'Check Symptoms', icon: Activity },
    { id: 'history' as const, label: 'History', icon: History }
  ];

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">MedPredict</h1>
              <p className="text-xs text-gray-500">AI Health Assistant</p>
            </div>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            {navItems.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => onNavigate(id)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentPage === id
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{label}</span>
              </button>
            ))}
          </nav>
          
          <div className="md:hidden">
            <button className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100">
              <Activity className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};