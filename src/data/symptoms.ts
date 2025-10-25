import { Symptom } from '../types';

export const symptomCategories = [
  'General',
  'Respiratory',
  'Digestive',
  'Neurological',
  'Musculoskeletal',
  'Cardiovascular',
  'Skin',
  'Mental Health'
];

export const symptoms: Symptom[] = [
  // General
  { id: 'fever', name: 'Fever', description: 'Body temperature above normal', category: 'General' },
  { id: 'fatigue', name: 'Fatigue', description: 'Feeling tired or exhausted', category: 'General' },
  { id: 'chills', name: 'Chills', description: 'Feeling cold with shivering', category: 'General' },
  { id: 'sweating', name: 'Excessive Sweating', description: 'More sweating than usual', category: 'General' },
  { id: 'weakness', name: 'Weakness', description: 'Feeling physically weak', category: 'General' },
  
  // Respiratory
  { id: 'cough', name: 'Cough', description: 'Persistent coughing', category: 'Respiratory' },
  { id: 'shortness_breath', name: 'Shortness of Breath', description: 'Difficulty breathing', category: 'Respiratory' },
  { id: 'chest_pain', name: 'Chest Pain', description: 'Pain in chest area', category: 'Respiratory' },
  { id: 'sore_throat', name: 'Sore Throat', description: 'Throat pain or irritation', category: 'Respiratory' },
  { id: 'runny_nose', name: 'Runny Nose', description: 'Nasal discharge', category: 'Respiratory' },
  { id: 'congestion', name: 'Nasal Congestion', description: 'Blocked or stuffy nose', category: 'Respiratory' },
  
  // Digestive
  { id: 'nausea', name: 'Nausea', description: 'Feeling sick to stomach', category: 'Digestive' },
  { id: 'vomiting', name: 'Vomiting', description: 'Throwing up', category: 'Digestive' },
  { id: 'diarrhea', name: 'Diarrhea', description: 'Loose or watery stools', category: 'Digestive' },
  { id: 'constipation', name: 'Constipation', description: 'Difficulty passing stools', category: 'Digestive' },
  { id: 'abdominal_pain', name: 'Abdominal Pain', description: 'Stomach or belly pain', category: 'Digestive' },
  { id: 'loss_appetite', name: 'Loss of Appetite', description: 'Not feeling hungry', category: 'Digestive' },
  
  // Neurological
  { id: 'headache', name: 'Headache', description: 'Pain in head or neck area', category: 'Neurological' },
  { id: 'dizziness', name: 'Dizziness', description: 'Feeling lightheaded or unsteady', category: 'Neurological' },
  { id: 'confusion', name: 'Confusion', description: 'Difficulty thinking clearly', category: 'Neurological' },
  { id: 'memory_loss', name: 'Memory Problems', description: 'Trouble remembering things', category: 'Neurological' },
  { id: 'seizures', name: 'Seizures', description: 'Uncontrolled electrical activity in brain', category: 'Neurological' },
  
  // Musculoskeletal
  { id: 'joint_pain', name: 'Joint Pain', description: 'Pain in joints', category: 'Musculoskeletal' },
  { id: 'muscle_aches', name: 'Muscle Aches', description: 'Muscle pain or soreness', category: 'Musculoskeletal' },
  { id: 'back_pain', name: 'Back Pain', description: 'Pain in back area', category: 'Musculoskeletal' },
  { id: 'stiffness', name: 'Joint Stiffness', description: 'Difficulty moving joints', category: 'Musculoskeletal' },
  
  // Cardiovascular
  { id: 'palpitations', name: 'Heart Palpitations', description: 'Feeling heart beating fast or irregularly', category: 'Cardiovascular' },
  { id: 'high_bp', name: 'High Blood Pressure', description: 'Elevated blood pressure readings', category: 'Cardiovascular' },
  { id: 'swollen_feet', name: 'Swollen Feet/Legs', description: 'Fluid retention in lower extremities', category: 'Cardiovascular' },
  
  // Skin
  { id: 'rash', name: 'Skin Rash', description: 'Red, irritated skin', category: 'Skin' },
  { id: 'itching', name: 'Itching', description: 'Urge to scratch skin', category: 'Skin' },
  { id: 'bruising', name: 'Easy Bruising', description: 'Bruises appearing easily', category: 'Skin' },
  
  // Mental Health
  { id: 'anxiety', name: 'Anxiety', description: 'Feeling worried or nervous', category: 'Mental Health' },
  { id: 'depression', name: 'Sadness/Depression', description: 'Persistent sad feelings', category: 'Mental Health' },
  { id: 'insomnia', name: 'Sleep Problems', description: 'Trouble sleeping', category: 'Mental Health' }
];