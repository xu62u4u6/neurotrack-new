// Function 1: Cognitive Test
export interface CognitiveTestInput {
  test_id: string;
  test_name: string;
  instructions: string;
  expected_duration: number;
  previous_score?: number;
}

export interface CognitiveTestOutput {
  user_id: string;
  test_id: string;
  score: number;
  response_time: number;
  timestamp: string;
}

// Function 2: Speech Recording
export interface SpeechInput {
  script_text: string;
  max_duration: number;
  example_audio_url?: string;
}

export interface SpeechOutput {
  user_id: string;
  task_type: string;
  audio_url: string; // Mocked URL
  duration: number;
  timestamp: string;
}

// Function 3: Sleep Log
export interface SleepInput {
  default_sleep_time: string;
  default_wake_time: string;
}

export interface SleepOutput {
  user_id: string;
  sleep_start: string;
  sleep_end: string;
  sleep_hours: number;
  sleep_quality: 'poor' | 'fair' | 'good' | 'excellent';
  timestamp: string;
}

// Function 4: AI Assistant (Formerly Education)
export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

// Function 5: Medication
export type TimePeriod = 'morning' | 'noon' | 'evening' | 'bedtime';

export interface Drug {
  id: string;
  name: string;
  dosage: string;
  period: TimePeriod; // New: Categorize by time
  taken: boolean;
}

export interface MedicationInput {
  drug_list: Drug[];
  show_time: string;
}

export interface MedicationOutput {
  user_id: string;
  drug_id: string;
  taken: boolean;
  timestamp: string;
}

// Function 6: Dashboard & Reports
export interface DashboardData {
  cognitive_trend: { date: string; score: number }[];
  speech_features: { date: string; pause_duration: number; speech_rate: number }[];
  sleep_trend: { date: string; hours: number }[];
  score_trend: { date: string; score: number }[]; // New: Game score trend
  risk_prediction: {
    year_1: number;
    year_3: number;
    year_5: number;
    analysis_text?: string;
  };
}

export interface DashboardOutput {
  user_id: string;
  action: 'view_report';
  timestamp: string;
}

export enum AppScreen {
  DASHBOARD = 'DASHBOARD', // Gamified Home
  DATA_REPORT = 'DATA_REPORT', // Doctor's View
  COGNITIVE = 'COGNITIVE',
  SPEECH = 'SPEECH',
  SLEEP = 'SLEEP',
  MEDICATION = 'MEDICATION',
  AI_CHAT = 'AI_CHAT', // Formerly Education
  MONTHLY_ASSESSMENT = 'MONTHLY_ASSESSMENT', // New: Monthly high score task
}
