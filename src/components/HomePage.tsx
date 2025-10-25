import React from 'react';
import { Activity, Shield, Clock, Users } from 'lucide-react';

interface HomePageProps {
  onStartCheck: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onStartCheck }) => {
  const features = [
    {
      icon: Activity,
      title: 'AI-Powered Analysis',
      description: 'Advanced machine learning algorithms analyze your symptoms to provide accurate health predictions.'
    },
    {
      icon: Shield,
      title: 'Reliable & Safe',
      description: 'Our predictions are based on medical research and validated datasets for your safety.'
    },
    {
      icon: Clock,
      title: 'Instant Results',
      description: 'Get immediate health insights and recommendations within seconds of symptom input.'
    },
    {
      icon: Users,
      title: 'Track History',
      description: 'Monitor your health patterns over time with comprehensive history tracking.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl flex items-center justify-center mx-auto mb-8">
            <Activity className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            AI-Powered Health
            <span className="text-blue-600 block">Prediction System</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Enter your symptoms and get instant, AI-driven health predictions with personalized 
            remedies and precautions. Take charge of your health today.
          </p>
          <button
            onClick={onStartCheck}
            className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Check My Symptoms
          </button>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map(({ icon: Icon, title, description }, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Icon className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
              <p className="text-gray-600 text-sm">{description}</p>
            </div>
          ))}
        </div>

        {/* How It Works */}
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Select Symptoms</h3>
              <p className="text-gray-600">Choose from our comprehensive list of symptoms or search for specific ones.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">AI Analysis</h3>
              <p className="text-gray-600">Our machine learning model analyzes your symptoms using medical data.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Get Results</h3>
              <p className="text-gray-600">Receive predictions, remedies, and precautions for your health condition.</p>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-12 bg-amber-50 border border-amber-200 rounded-xl p-6">
          <div className="flex items-start space-x-3">
            <Shield className="w-6 h-6 text-amber-600 mt-1 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-semibold text-amber-800 mb-2">Medical Disclaimer</h3>
              <p className="text-amber-700 text-sm">
                This tool is for informational purposes only and should not replace professional medical advice. 
                Always consult with a healthcare provider for proper diagnosis and treatment. In case of emergency, 
                call your local emergency services immediately.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};