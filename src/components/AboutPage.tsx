import React from 'react';
import { Activity, MessageCircle, Shield, Brain, Users, Heart, ChevronRight, Download, Trash2, Search, BarChart3, Clock, CheckCircle } from 'lucide-react';

interface AboutPageProps {
  onBack: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onBack }) => {
  const features = [
    {
      icon: Activity,
      title: 'Symptom Checker',
      description: 'Our intelligent symptom checker allows you to select from a comprehensive database of medical symptoms organized by categories.',
      details: [
        'Browse symptoms by medical categories (General, Respiratory, Digestive, etc.)',
        'Search functionality to quickly find specific symptoms',
        'Detailed descriptions for each symptom to ensure accurate selection',
        'Multi-select interface for comprehensive symptom reporting'
      ]
    },
    {
      icon: Brain,
      title: 'AI-Powered Predictions',
      description: 'Advanced machine learning algorithms analyze your symptoms to provide accurate health predictions with confidence scores.',
      details: [
        'Machine learning model trained on medical datasets',
        'Multiple disease predictions with confidence percentages',
        'Severity assessment (Low, Medium, High) for each condition',
        'Evidence-based predictions using validated medical data'
      ]
    },
    {
      icon: Heart,
      title: 'Personalized Remedies',
      description: 'Receive tailored treatment recommendations and precautions based on your predicted conditions.',
      details: [
        'Home remedies for mild conditions',
        'Lifestyle modifications and preventive measures',
        'Medication suggestions (over-the-counter)',
        'Priority-based recommendations (Low, Medium, High urgency)'
      ]
    },
    {
      icon: MessageCircle,
      title: 'Health Chat Assistant',
      description: 'Interactive chat interface where you can ask health-related questions and get instant, informative responses.',
      details: [
        'Real-time conversation with AI health assistant',
        'Context-aware responses for common health concerns',
        'Emergency guidance and when to seek medical help',
        'Download chat history for personal records'
      ]
    }
  ];

  const pages = [
    {
      name: 'Home Page',
      icon: Activity,
      description: 'Welcome page introducing the platform',
      features: [
        'Overview of AI-powered health prediction system',
        'Key features and benefits highlighted',
        'Step-by-step guide on how the system works',
        'Medical disclaimer and safety information'
      ]
    },
    {
      name: 'Symptom Checker',
      icon: Search,
      description: 'Interactive symptom selection interface',
      features: [
        'Categorized symptom database with 35+ symptoms',
        'Advanced search and filtering capabilities',
        'Real-time symptom counter and selection tracking',
        'Detailed symptom descriptions for accurate reporting'
      ]
    },
    {
      name: 'Results Dashboard',
      icon: BarChart3,
      description: 'Comprehensive health prediction results',
      features: [
        'Top disease predictions with confidence scores',
        'Severity assessment and risk indicators',
        'Personalized remedy recommendations',
        'Important precautions and next steps'
      ]
    },
    {
      name: 'Health Chat',
      icon: MessageCircle,
      description: 'Conversational health assistant',
      features: [
        'Real-time chat with AI health assistant',
        'Privacy-focused with chat deletion options',
        'Download conversations for personal records',
        'Emergency guidance and medical advice'
      ]
    }
  ];

  const privacyFeatures = [
    {
      icon: Shield,
      title: 'Privacy First',
      description: 'No persistent data storage - your health information stays private'
    },
    {
      icon: Download,
      title: 'Export Control',
      description: 'Download your chat history and results for personal record-keeping'
    },
    {
      icon: Trash2,
      title: 'Data Control',
      description: 'Delete conversations and clear data whenever you want'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
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
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Activity className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">About MedPredict</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Your intelligent health companion powered by artificial intelligence. 
              We help you understand your symptoms and make informed health decisions.
            </p>
          </div>
        </div>

        {/* Mission Statement */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-6">Our Mission</h2>
          <p className="text-lg text-gray-700 text-center max-w-4xl mx-auto leading-relaxed">
            To democratize healthcare information by providing accessible, AI-powered health predictions 
            that help individuals make informed decisions about their wellbeing. We believe everyone 
            deserves quick access to reliable health insights while maintaining complete privacy and control 
            over their personal health data.
          </p>
        </div>

        {/* Core Features */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Core Features</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                    <feature.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
                </div>
                <p className="text-gray-600 mb-4">{feature.description}</p>
                <ul className="space-y-2">
                  {feature.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-1 mr-2 flex-shrink-0" />
                      <span className="text-sm text-gray-600">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Page Breakdown */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Platform Pages</h2>
          <div className="grid lg:grid-cols-2 gap-6">
            {pages.map((page, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center mr-3">
                    <page.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{page.name}</h3>
                    <p className="text-sm text-gray-600">{page.description}</p>
                  </div>
                </div>
                <ul className="space-y-2">
                  {page.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-sm text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Privacy & Security */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Privacy & Security</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {privacyFeatures.map((feature, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md p-6 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* How It Works */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Select Symptoms</h3>
              <p className="text-gray-600 text-sm">Browse our comprehensive symptom database and select all symptoms you're experiencing.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">AI Analysis</h3>
              <p className="text-gray-600 text-sm">Our machine learning model analyzes your symptoms using validated medical datasets.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Get Predictions</h3>
              <p className="text-gray-600 text-sm">Receive detailed predictions with confidence scores and severity assessments.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                4
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Take Action</h3>
              <p className="text-gray-600 text-sm">Follow personalized recommendations and precautions for your health condition.</p>
            </div>
          </div>
        </div>

        {/* Technology Stack */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Technology Stack</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Activity className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Frontend</h3>
              <p className="text-sm text-gray-600">React, TypeScript, Tailwind CSS</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Brain className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">AI/ML</h3>
              <p className="text-sm text-gray-600">Machine Learning, Pattern Recognition</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Shield className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Security</h3>
              <p className="text-sm text-gray-600">Privacy-first, No data storage</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Users className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">UX/UI</h3>
              <p className="text-sm text-gray-600">Responsive, Accessible Design</p>
            </div>
          </div>
        </div>

        {/* Important Disclaimer */}
        <div className="bg-red-50 border border-red-200 rounded-2xl p-8">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Shield className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-red-800 mb-3">Important Medical Disclaimer</h3>
              <div className="space-y-2 text-red-700">
                <p>
                  <strong>MedPredict is for informational purposes only</strong> and should never replace professional medical advice, 
                  diagnosis, or treatment. Our AI predictions are based on general medical knowledge and should not be considered 
                  as definitive medical diagnoses.
                </p>
                <p>
                  <strong>Always consult with qualified healthcare professionals</strong> for proper medical evaluation and treatment. 
                  In case of medical emergencies, contact your local emergency services immediately.
                </p>
                <p>
                  <strong>We do not store your personal health information</strong> - all data processing happens locally, 
                  and you have complete control over your information through our download and delete features.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};