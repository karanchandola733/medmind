export interface Symptom {
  id: string;
  name: string;
  description: string;
  category: string;
}

export interface Disease {
  name: string;
  confidence: number;
  severity: 'low' | 'medium' | 'high';
  description: string;
}

export interface Prediction {
  id: string;
  symptoms: string[];
  diseases: Disease[];
  remedies: Remedy[];
  precautions: string[];
  date: string;
}

export interface Remedy {
  type: 'medication' | 'lifestyle' | 'home-remedy';
  title: string;
  description: string;
  urgency: 'low' | 'medium' | 'high';
}

export interface UserHistory {
  id: string;
  predictions: Prediction[];
  totalChecks: number;
}