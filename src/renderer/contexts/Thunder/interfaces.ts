import { STORE_KEYS } from '../../globals/constants';

export type UploadedFile = {
  id: string;
  name: string;
  type: "image" | "video" | "audio";
  url: string;
}
export type EmotionalMap = { number: number, dimension: string }[];
export type EmotionTimeMap = { startTime: string; endTime: string; words: string[] }[];
export type ConclusionCriteria = {
  id: number;
  criteria: string;
  met: boolean;
}
export type FeedbackSession = {
  sessionDate: string;
  goodPoints: string[];
  improvementPoints: string[];
  criteriaMatch: ConclusionCriteria[];
  comments: string;
};
export type FeedbackSessions = {
  [key: string]: FeedbackSession;
};
export type DECIDE = {
  determine: {
    description: string;
    objectives: Array<{
      title: string;
      subitems?: string[];
    }>;
    notes: string;
  };
  explore: {
    description: string;
    questions: Array<{
      title: string;
      subitems?: string[];
    }>;
    notes: string;
  };
  choose: {
    description: string;
    methods: string[];
    notes: string;
  };
  identify: {
    description: string;
    practicalAspects: string[];
    notes: string;
  };
  decide: {
    description: string;
    ethicalConsiderations: string[];
    notes: string;
  };
  evaluate: {
    description: string;
    analysisPoints: string[];
    notes: string;
  };
  resultsSummary: string;
  completionCriteria: Array<{
    criteria: string;
    met: boolean;
  }>;
};

export interface ThunderData {
  conceptualization: {
    musicDecisions: {
      selectedMusic: {
        songName: string;
        youtubeLink: string;
      },
      wordAssociation: string[];
      emotionalMap: EmotionalMap;
      emotionTimeMap: EmotionTimeMap;
    };
    styleDecisions: {
      colorPalette: string[];
      styleChoice: string;
      references: UploadedFile[];
      sketches: UploadedFile[];
    };
  }
  evaluation: {
    feedbackSessions: FeedbackSessions;
    fieldTest: DECIDE;
    laboratoryTest: DECIDE;
    decide: DECIDE;
  }
  prototyping: {
    medium: {
      images: UploadedFile[];
      video: UploadedFile;
      finalVideo: UploadedFile;
    },
    high: {
      images: UploadedFile[];
      video: UploadedFile;
      finalVideo: UploadedFile;
    }
  }
}

export interface ThunderContextType {
  data: ThunderData;
  isLoading: boolean;

  saveData: (key: keyof typeof STORE_KEYS, data: any) => void;
  getData: (key: keyof typeof STORE_KEYS) => Promise<any>;

  saveMusicDecisions: (data: {
    selectedMusic?: {
      songName: string;
      youtubeLink: string;
    };
    wordAssociation?: string[];
    emotionalMap?: EmotionalMap;
    emotionTimeMap?: EmotionTimeMap;
  }) => void;

  saveStyleDecisions: (data: {
    colorPalette?: string[];
    styleChoice?: string;
    references?: UploadedFile[];
    sketches?: UploadedFile[];
  }) => void;

  saveFeedbackSession: (sessionId: string, sessionData: FeedbackSession) => void;
  saveFieldTest: (data: DECIDE) => void;
  saveLaboratoryTest: (data: DECIDE) => void;
  saveDecide: (data: DECIDE) => void;

  saveMediumPrototypingData: (data: {
    images?: UploadedFile[];
    finalVideo?: UploadedFile;
  }) => void;
  saveHighPrototypingData: (data: {
    images?: UploadedFile[];
    finalVideo?: UploadedFile;
  }) => void;

  getStatus: (stepId: string) => "not-started" | "in-progress" | "completed";

  clearStorage: () => Promise<void>;
}