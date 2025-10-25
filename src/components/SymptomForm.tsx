import React, { useState, useMemo } from 'react';
import { Search, X, ChevronRight, AlertCircle } from 'lucide-react';
import { symptoms, symptomCategories } from '../data/symptoms';
import { Symptom } from '../types';

interface SymptomFormProps {
  onSubmit: (selectedSymptoms: string[]) => void;
  onBack: () => void;
}

export const SymptomForm: React.FC<SymptomFormProps> = ({ onSubmit, onBack }) => {
  const [selectedSymptoms, setSelectedSymptoms] = useState<Set<string>>(new Set());
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const filteredSymptoms = useMemo(() => {
    let filtered = symptoms;
    
    if (searchTerm) {
      filtered = filtered.filter(symptom =>
        symptom.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        symptom.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (activeCategory) {
      filtered = filtered.filter(symptom => symptom.category === activeCategory);
    }
    
    return filtered;
  }, [searchTerm, activeCategory]);

  const handleSymptomToggle = (symptomId: string) => {
    const newSelected = new Set(selectedSymptoms);
    if (newSelected.has(symptomId)) {
      newSelected.delete(symptomId);
    } else {
      newSelected.add(symptomId);
    }
    setSelectedSymptoms(newSelected);
  };

  const handleSubmit = async () => {
    if (selectedSymptoms.size === 0) return;
    
    setIsLoading(true);
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    onSubmit(Array.from(selectedSymptoms));
    setIsLoading(false);
  };

  const selectedSymptomsArray = Array.from(selectedSymptoms);

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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Select Your Symptoms</h1>
          <p className="text-gray-600">Choose all symptoms you're currently experiencing. The more accurate your selection, the better our prediction.</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Search */}
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search symptoms..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Categories */}
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="font-semibold text-gray-900 mb-4">Categories</h3>
              <div className="space-y-2">
                <button
                  onClick={() => setActiveCategory(null)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                    activeCategory === null
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  All Categories
                </button>
                {symptomCategories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      activeCategory === category
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Selected Count */}
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="font-semibold text-gray-900 mb-2">Selected Symptoms</h3>
              <div className="text-2xl font-bold text-blue-600 mb-1">{selectedSymptoms.size}</div>
              <p className="text-gray-500 text-sm">symptoms selected</p>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Selected Symptoms */}
            {selectedSymptomsArray.length > 0 && (
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="font-semibold text-gray-900 mb-4">Your Selected Symptoms</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedSymptomsArray.map((symptomId) => {
                    const symptom = symptoms.find(s => s.id === symptomId);
                    return (
                      <div
                        key={symptomId}
                        className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                      >
                        <span>{symptom?.name}</span>
                        <button
                          onClick={() => handleSymptomToggle(symptomId)}
                          className="ml-2 hover:bg-blue-200 rounded-full p-1"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Symptoms Grid */}
            <div className="bg-white rounded-xl shadow-md">
              <div className="p-6 border-b border-gray-200">
                <h3 className="font-semibold text-gray-900">Available Symptoms</h3>
                <p className="text-gray-500 text-sm mt-1">
                  {filteredSymptoms.length} symptoms found
                  {activeCategory && ` in ${activeCategory}`}
                </p>
              </div>
              <div className="p-6">
                <div className="grid md:grid-cols-2 gap-4">
                  {filteredSymptoms.map((symptom: Symptom) => (
                    <div
                      key={symptom.id}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                        selectedSymptoms.has(symptom.id)
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                      onClick={() => handleSymptomToggle(symptom.id)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 mb-1">{symptom.name}</h4>
                          <p className="text-gray-600 text-sm">{symptom.description}</p>
                          <span className="inline-block mt-2 px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                            {symptom.category}
                          </span>
                        </div>
                        <div className={`w-5 h-5 rounded border-2 flex-shrink-0 mt-1 ml-3 ${
                          selectedSymptoms.has(symptom.id)
                            ? 'bg-blue-500 border-blue-500'
                            : 'border-gray-300'
                        }`}>
                          {selectedSymptoms.has(symptom.id) && (
                            <div className="w-full h-full flex items-center justify-center">
                              <div className="w-2 h-2 bg-white rounded-full"></div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="bg-white p-6 rounded-xl shadow-md">
              {selectedSymptoms.size === 0 ? (
                <div className="flex items-center text-gray-500 mb-4">
                  <AlertCircle className="w-5 h-5 mr-2" />
                  <span>Please select at least one symptom to continue</span>
                </div>
              ) : null}
              <button
                onClick={handleSubmit}
                disabled={selectedSymptoms.size === 0 || isLoading}
                className={`w-full py-4 rounded-lg font-semibold text-lg transition-all duration-200 ${
                  selectedSymptoms.size > 0 && !isLoading
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl transform hover:scale-[1.02]'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-2"></div>
                    Analyzing Symptoms...
                  </div>
                ) : (
                  `Get Prediction (${selectedSymptoms.size} symptoms)`
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};