import { Disease, Remedy, Prediction } from '../types';

export const mockDiseases: Disease[] = [
  {
    name: 'Common Cold',
    confidence: 0.85,
    severity: 'low',
    description: 'A viral infection of the upper respiratory tract'
  },
  {
    name: 'Influenza (Flu)',
    confidence: 0.72,
    severity: 'medium',
    description: 'A viral infection that attacks the respiratory system'
  },
  {
    name: 'Migraine',
    confidence: 0.68,
    severity: 'medium',
    description: 'A type of headache characterized by severe throbbing pain'
  }
];

export const mockRemedies: Remedy[] = [
  {
    type: 'home-remedy',
    title: 'Rest and Hydration',
    description: 'Get plenty of sleep and drink lots of fluids',
    urgency: 'low'
  },
  {
    type: 'medication',
    title: 'Over-the-Counter Pain Relief',
    description: 'Consider acetaminophen or ibuprofen for symptom relief',
    urgency: 'medium'
  },
  {
    type: 'lifestyle',
    title: 'Avoid Triggers',
    description: 'Stay away from known triggers and maintain regular sleep schedule',
    urgency: 'low'
  }
];

export const mockPrediction: Prediction = {
  id: '1',
  symptoms: ['fever', 'cough', 'fatigue', 'headache'],
  diseases: mockDiseases,
  remedies: mockRemedies,
  precautions: [
    'Monitor symptoms for worsening',
    'Stay hydrated and get plenty of rest',
    'Avoid close contact with others to prevent spread',
    'Seek medical attention if symptoms persist beyond 7-10 days'
  ],
  date: new Date().toISOString()
};