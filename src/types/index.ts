export interface Problem {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  topics: string[];
  description: string;
  youtubeUrl?: string;
  externalUrl?: string;
  starterCode?: string;
  solutionCode?: string;
  solutionExplanation?: string;
  timeComplexity?: string;
  spaceComplexity?: string;
  examples?: {
    input: string;
    output: string;
    explanation?: string;
  }[];
  constraints?: string[];
}

export interface Interview {
  id: string;
  title: string;
  participant: string;
  scheduledAt: string;
  durationMinutes: number;
  description: string;
  status: 'pending' | 'accepted' | 'completed' | 'cancelled';
  isIncoming: boolean;
  topics?: string[];
  inviteeEmail?: string;
}

export interface Message {
  id: string;
  sender: 'user' | 'interviewer';
  text: string;
  timestamp: Date;
}