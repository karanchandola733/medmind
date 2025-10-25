import React from 'react';
import { ChevronRight, AlertTriangle, CheckCircle, Info, Heart, Pill, Home as HomeIcon, Calendar } from 'lucide-react';
import { Prediction } from '../types';
import { symptoms } from '../data/symptoms';

interface ResultsPageProps {
  prediction: Prediction;
  onBack: () => void;
  onNewCheck: () => void;
}

export const ResultsPage: React.FC<ResultsPageProps> = ({ prediction, onBack, onNewCheck }) => {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'text-green-700 bg-green-100';
      case 'medium': return 'text-yellow-700 bg-yellow-100';
      case 'high': return 'text-red-700 bg-red-100';
      default: return 'text-gray-700 bg-gray-100';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'low': return CheckCircle;
      case 'medium': return Info;
      case 'high': return AlertTriangle;
      default: return Info;
    }
  };

  const getRemedyIcon = (type: string) => {
    switch (type) {
      case 'medication': return Pill;
      case 'home-remedy': return HomeIcon;
      case 'lifestyle': return Heart;
      default: return Info;
    }
  };

  const getSelectedSymptomNames = () => {
    return prediction.symptoms.map(symptomId => {
      const symptom = symptoms.find(s => s.id === symptomId);
      return symptom ? symptom.name : symptomId;
    });
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
            Back to Symptoms
          </button>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Health Prediction</h1>
              <p className="text-gray-600">Based on the symptoms you provided, here's our AI analysis</p>
            </div>
            <div className="flex items-center text-gray-500">
              <Calendar className="w-4 h-4 mr-2" />
              <span className="text-sm">{new Date(prediction.date).toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Results */}
          <div className="lg:col-span-2 space-y-6">
            {/* Your Symptoms */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Symptoms</h2>
              <div className="flex flex-wrap gap-2">
                {getSelectedSymptomNames().map((symptomName, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                  >
                    {symptomName}
                  </span>
                ))}
              </div>
            </div>

            {/* Predicted Diseases */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Possible Conditions</h2>
              <div className="space-y-4">
                {prediction.diseases.map((disease, index) => {
                  const SeverityIcon = getSeverityIcon(disease.severity);
                  const isTopPrediction = index === 0;
                  
                  return (
                    <div
                      key={index}
                      className={`p-4 rounded-lg border-2 ${
                        isTopPrediction ? 'border-blue-200 bg-blue-50' : 'border-gray-200'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center">
                          <div className={`p-2 rounded-lg ${getSeverityColor(disease.severity)} mr-3`}>
                            <SeverityIcon className="w-5 h-5" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">{disease.name}</h3>
                            {isTopPrediction && (
                              <span className="text-xs bg-blue-600 text-white px-2 py-1 rounded-full">
                                Most Likely
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-gray-900">
                            {Math.round(disease.confidence * 100)}%
                          </div>
                          <div className="text-xs text-gray-500">confidence</div>
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm mb-3">{disease.description}</p>
                      <div className="flex items-center justify-between">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(disease.severity)}`}>
                          {disease.severity.charAt(0).toUpperCase() + disease.severity.slice(1)} Severity
                        </span>
                        <div className="w-full bg-gray-200 rounded-full h-2 ml-4">
                          <div
                            className={`h-2 rounded-full ${
                              disease.confidence > 0.8 ? 'bg-green-500' :
                              disease.confidence > 0.6 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${disease.confidence * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Remedies */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Recommended Actions</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {prediction.remedies.map((remedy, index) => {
                  const RemedyIcon = getRemedyIcon(remedy.type);
                  
                  return (
                    <div key={index} className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center mb-3">
                        <div className="p-2 bg-green-100 text-green-700 rounded-lg mr-3">
                          <RemedyIcon className="w-5 h-5" />
                        </div>
                        <h3 className="font-medium text-gray-900">{remedy.title}</h3>
                      </div>
                      <p className="text-gray-600 text-sm mb-2">{remedy.description}</p>
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                        remedy.urgency === 'high' ? 'bg-red-100 text-red-700' :
                        remedy.urgency === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {remedy.urgency} priority
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Actions */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button
                  onClick={onNewCheck}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-200"
                >
                  New Symptom Check
                </button>
                <button className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors">
                  Download Report
                </button>
                <button className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors">
                  Share Results
                </button>
              </div>
            </div>

            {/* Precautions */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Important Precautions</h3>
              <div className="space-y-3">
                {prediction.precautions.map((precaution, index) => (
                  <div key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <p className="text-gray-600 text-sm">{precaution}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Disclaimer */}
            <div className="bg-red-50 border border-red-200 rounded-xl p-6">
              <div className="flex items-start">
                <AlertTriangle className="w-6 h-6 text-red-600 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-red-800 mb-2">Medical Disclaimer</h3>
                  <p className="text-red-700 text-sm">
                    This prediction is for informational purposes only. Please consult a healthcare 
                    professional for proper diagnosis and treatment.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};