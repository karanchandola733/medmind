import React, { useState } from 'react';
import { Header } from './components/Header';
import { HomePage } from './components/HomePage';
import { SymptomForm } from './components/SymptomForm';
import { ResultsPage } from './components/ResultsPage';
import { HistoryPage } from './components/HistoryPage';
import { mockPrediction } from './data/mockData';
import { Prediction } from './types';

type AppPage = 'home' | 'symptoms' | 'results' | 'history';

function App() {
  const [currentPage, setCurrentPage] = useState<AppPage>('home');
  const [currentPrediction, setCurrentPrediction] = useState<Prediction | null>(null);

  const handleStartCheck = () => {
    setCurrentPage('symptoms');
  };

  const handleSymptomSubmit = (symptoms: string[]) => {
    // In a real app, you would call your backend API here
    const prediction: Prediction = {
      ...mockPrediction,
      symptoms,
      id: Date.now().toString(),
      date: new Date().toISOString()
    };
    setCurrentPrediction(prediction);
    setCurrentPage('results');
  };

  const handleNavigate = (page: AppPage) => {
    setCurrentPage(page);
  };

  const handleViewPrediction = (prediction: Prediction) => {
    setCurrentPrediction(prediction);
    setCurrentPage('results');
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onStartCheck={handleStartCheck} />;
      case 'symptoms':
        return (
          <SymptomForm
            onSubmit={handleSymptomSubmit}
            onBack={() => setCurrentPage('home')}
          />
        );
      case 'results':
        return currentPrediction ? (
          <ResultsPage
            prediction={currentPrediction}
            onBack={() => setCurrentPage('symptoms')}
            onNewCheck={handleStartCheck}
          />
        ) : (
          <HomePage onStartCheck={handleStartCheck} />
        );
      case 'history':
        return (
          <HistoryPage
            onBack={() => setCurrentPage('home')}
            onViewPrediction={handleViewPrediction}
          />
        );
      default:
        return <HomePage onStartCheck={handleStartCheck} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentPage={currentPage} onNavigate={handleNavigate} />
      {renderCurrentPage()}
    </div>
  );
}

export default App;