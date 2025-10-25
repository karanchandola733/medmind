import React, { useState } from 'react';
import { Calendar, TrendingUp, Activity, ChevronRight, Filter } from 'lucide-react';
import { Prediction } from '../types';
import { mockPrediction } from '../data/mockData';
import { symptoms } from '../data/symptoms';

interface HistoryPageProps {
  onBack: () => void;
  onViewPrediction: (prediction: Prediction) => void;
}

export const HistoryPage: React.FC<HistoryPageProps> = ({ onBack, onViewPrediction }) => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'recent' | 'high-confidence'>('all');

  // Mock history data - in real app, this would come from your backend
  const mockHistory: Prediction[] = [
    {
      ...mockPrediction,
      id: '1',
      date: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // Yesterday
      symptoms: ['fever', 'cough', 'fatigue'],
      diseases: [
        { name: 'Common Cold', confidence: 0.85, severity: 'low', description: 'Viral infection' }
      ]
    },
    {
      ...mockPrediction,
      id: '2',
      date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
      symptoms: ['headache', 'dizziness', 'nausea'],
      diseases: [
        { name: 'Migraine', confidence: 0.78, severity: 'medium', description: 'Severe headache condition' }
      ]
    },
    {
      ...mockPrediction,
      id: '3',
      date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 1 week ago
      symptoms: ['muscle_aches', 'fatigue', 'joint_pain'],
      diseases: [
        { name: 'Flu', confidence: 0.72, severity: 'medium', description: 'Influenza virus infection' }
      ]
    }
  ];

  const getSelectedSymptomNames = (symptomIds: string[]) => {
    return symptomIds.map(symptomId => {
      const symptom = symptoms.find(s => s.id === symptomId);
      return symptom ? symptom.name : symptomId;
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) return 'Today';
    if (diffInDays === 1) return 'Yesterday';
    if (diffInDays < 7) return `${diffInDays} days ago`;
    return date.toLocaleDateString();
  };

  const filteredHistory = mockHistory.filter(prediction => {
    switch (selectedFilter) {
      case 'recent':
        const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
        return new Date(prediction.date) > weekAgo;
      case 'high-confidence':
        return prediction.diseases.some(disease => disease.confidence > 0.8);
      default:
        return true;
    }
  });

  const stats = {
    totalChecks: mockHistory.length,
    mostCommon: 'Common Cold',
    averageConfidence: Math.round(
      mockHistory.reduce((sum, pred) => sum + pred.diseases[0].confidence, 0) / mockHistory.length * 100
    )
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={onBack}
            className="flex items-center text-gray-600 hover:text-gray-800 mb-4 transition-colors"
          >
            <ChevronRight className="w-4 h-4 rotate-180 mr-1" />
            Back to Home
          </button>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Health History</h1>
          <p className="text-gray-600">Track your health patterns and previous symptom checks</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Stats */}
          <div className="lg:col-span-1 space-y-6">
            {/* Quick Stats */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Quick Stats</h3>
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{stats.totalChecks}</div>
                  <div className="text-sm text-gray-500">Total Checks</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{stats.averageConfidence}%</div>
                  <div className="text-sm text-gray-500">Avg. Confidence</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-medium text-gray-900">{stats.mostCommon}</div>
                  <div className="text-sm text-gray-500">Most Common</div>
                </div>
              </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center mb-4">
                <Filter className="w-5 h-5 text-gray-600 mr-2" />
                <h3 className="font-semibold text-gray-900">Filter History</h3>
              </div>
              <div className="space-y-2">
                {[
                  { id: 'all', label: 'All Checks' },
                  { id: 'recent', label: 'Recent (7 days)' },
                  { id: 'high-confidence', label: 'High Confidence' }
                ].map((filter) => (
                  <button
                    key={filter.id}
                    onClick={() => setSelectedFilter(filter.id as any)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      selectedFilter === filter.id
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-md">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Previous Symptom Checks ({filteredHistory.length})
                  </h2>
                  <div className="flex items-center text-gray-500">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    <span className="text-sm">Sorted by date</span>
                  </div>
                </div>
              </div>

              <div className="divide-y divide-gray-200">
                {filteredHistory.length > 0 ? (
                  filteredHistory.map((prediction) => (
                    <div
                      key={prediction.id}
                      className="p-6 hover:bg-gray-50 transition-colors cursor-pointer"
                      onClick={() => onViewPrediction(prediction)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center mb-2">
                            <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                            <span className="text-sm text-gray-500">{formatDate(prediction.date)}</span>
                            <span className="ml-4 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                              {prediction.diseases[0]?.confidence ? 
                                `${Math.round(prediction.diseases[0].confidence * 100)}% confidence` : 
                                'N/A'}
                            </span>
                          </div>
                          
                          <h3 className="text-lg font-medium text-gray-900 mb-2">
                            {prediction.diseases[0]?.name || 'Unknown Condition'}
                          </h3>
                          
                          <div className="mb-3">
                            <span className="text-sm text-gray-600 mr-2">Symptoms:</span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {getSelectedSymptomNames(prediction.symptoms).map((symptomName, index) => (
                                <span
                                  key={index}
                                  className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                                >
                                  {symptomName}
                                </span>
                              ))}
                            </div>
                          </div>
                          
                          <p className="text-gray-600 text-sm">
                            {prediction.diseases[0]?.description || 'No description available'}
                          </p>
                        </div>
                        
                        <div className="ml-4 flex flex-col items-end">
                          <div className="flex items-center">
                            <Activity className="w-4 h-4 text-gray-400 mr-1" />
                            <span className="text-sm text-gray-500">
                              {prediction.symptoms.length} symptoms
                            </span>
                          </div>
                          <ChevronRight className="w-5 h-5 text-gray-400 mt-2" />
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-12 text-center">
                    <Activity className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No history found</h3>
                    <p className="text-gray-600 mb-4">
                      {selectedFilter === 'all' 
                        ? "You haven't performed any symptom checks yet."
                        : "No symptom checks match your current filter."}
                    </p>
                    {selectedFilter !== 'all' && (
                      <button
                        onClick={() => setSelectedFilter('all')}
                        className="text-blue-600 hover:text-blue-700 font-medium"
                      >
                        Show all history
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};