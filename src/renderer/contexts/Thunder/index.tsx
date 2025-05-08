import React, { createContext, useContext, useEffect, useState } from 'react';
import { STORE_KEYS } from '../../globals/constants';
import { DECIDE, EmotionalMap, EmotionTimeMap, FeedbackSession, ThunderContextType, ThunderData, UploadedFile } from './interfaces';
import type { ElectronAPI } from '../../types/electron';

const laboratoryTestCriteria = [
  {
    id: 1,
    criteria: 'laboratoryTest.completionCriteria.criterion1',
    met: false
  },
  {
    id: 2,
    criteria: 'laboratoryTest.completionCriteria.criterion2',
    met: false
  },
  {
    id: 3,
    criteria: 'laboratoryTest.completionCriteria.criterion3',
    met: false
  }
];

const decideInitialState: DECIDE = {
  determine: {
    description: '',
    objectives: [],
    notes: ''
  },
  explore: {
    description: '',
    questions: [],
    notes: ''
  },
  choose: {
    description: '',
    methods: [],
    notes: ''
  },
  identify: {
    description: '',
    practicalAspects: [],
    notes: ''
  },
  decide: {
    description: '',
    ethicalConsiderations: [],
    notes: ''
  },
  evaluate: {
    description: '',
    analysisPoints: [],
    notes: ''
  },
  resultsSummary: '',
  completionCriteria: []
}

const initialData: ThunderData = {
  conceptualization: {
    musicDecisions: {
      selectedMusic: {
        songName: '',
        youtubeLink: ''
      },
      wordAssociation: [],
      emotionalMap: [],
      emotionTimeMap: []
    },
    styleDecisions: {
      colorPalette: [],
      styleChoice: '',
      references: [],
      sketches: []
    }
  },
  evaluation: {
    feedbackSessions: {},
    fieldTest: decideInitialState,
    laboratoryTest: {
      ...decideInitialState,
      completionCriteria: laboratoryTestCriteria
    },
    decide: decideInitialState
  },
  prototyping: {
    medium: {
      images: [],
      video: {
        id: '',
        name: '',
        type: 'video',
        url: ''
      }
    },
    high: {
      images: [],
      video: {
        id: '',
        name: '',
        type: 'video',
        url: ''
      }
    }
  },
};

const ThunderContext = createContext<ThunderContextType | undefined>(undefined);

export const ThunderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<ThunderData>(initialData);
  const [isLoading, setIsLoading] = useState(true);

  const clearStorage = async () => {
    for (const key of Object.keys(STORE_KEYS)) {
      const keyName = STORE_KEYS[key];
      await (window.electron as ElectronAPI).setStoreKey(keyName, null);
    }
    setData(initialData);
  };

  const fetchData = async () => {
    const data: ThunderData = initialData;
    for (const key of Object.keys(STORE_KEYS)) {
      const keyName = STORE_KEYS[key];
      const storeData = await getData(keyName);
      if (storeData) {
        if (keyName === STORE_KEYS.MUSIC_DECISIONS) {
          data.conceptualization.musicDecisions = storeData;
        } else if (keyName === STORE_KEYS.STYLE_DECISIONS) {
          data.conceptualization.styleDecisions = storeData;
        } else if (keyName === STORE_KEYS.FEEDBACK_SESSIONS) {
          data.evaluation.feedbackSessions = storeData;
        } else if (keyName === STORE_KEYS.FIELD_TEST) {
          data.evaluation.fieldTest = {
            ...decideInitialState,
            ...storeData,
            resultsSummary: storeData.resultsSummary || '',
            completionCriteria: storeData.completionCriteria || []
          };
        } else if (keyName === STORE_KEYS.LABORATORY_TEST) {
          data.evaluation.laboratoryTest = {
            ...decideInitialState,
            ...storeData,
            resultsSummary: storeData.resultsSummary || '',
            completionCriteria: storeData.completionCriteria || []
          };
        } else if (keyName === STORE_KEYS.DECIDE) {
          data.evaluation.decide = {
            ...decideInitialState,
            ...storeData,
            resultsSummary: storeData.resultsSummary || '',
            completionCriteria: storeData.completionCriteria || []
          };
        } else if (keyName === STORE_KEYS.MEDIUM_PROTOTYPE) {
          data.prototyping.medium = storeData;
        } else if (keyName === STORE_KEYS.HIGH_PROTOTYPE) {
          data.prototyping.high = storeData;
        }
      }
    }

    setData(data);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const getData = async (key: string): Promise<any> => {
    return await (window.electron as ElectronAPI).getStoreKey(key);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      saveData();
    }
  }, [data]);

  const saveData = () => {
    for (const key of Object.keys(STORE_KEYS)) {
      const keyName = STORE_KEYS[key];
      let dataToSave: any;

      if (keyName === STORE_KEYS.MUSIC_DECISIONS) {
        dataToSave = data.conceptualization.musicDecisions;
      } else if (keyName === STORE_KEYS.STYLE_DECISIONS) {
        dataToSave = data.conceptualization.styleDecisions;
      } else if (keyName === STORE_KEYS.FEEDBACK_SESSIONS) {
        dataToSave = data.evaluation.feedbackSessions;
      } else if (keyName === STORE_KEYS.FIELD_TEST) {
        dataToSave = data.evaluation.fieldTest;
      } else if (keyName === STORE_KEYS.LABORATORY_TEST) {
        dataToSave = data.evaluation.laboratoryTest;
      } else if (keyName === STORE_KEYS.DECIDE) {
        dataToSave = data.evaluation.decide;
      } else if (keyName === STORE_KEYS.MEDIUM_PROTOTYPE) {
        dataToSave = data.prototyping.medium;
      } else if (keyName === STORE_KEYS.HIGH_PROTOTYPE) {
        dataToSave = data.prototyping.high;
      }

      (window.electron as ElectronAPI).setStoreKey(keyName, dataToSave);
    }
  };

  const saveMusicDecisions = (data: {
    selectedMusic?: {
      songName: string;
      youtubeLink: string;
    },
    wordAssociation?: string[],
    emotionalMap?: EmotionalMap,
    emotionTimeMap?: EmotionTimeMap,
  }) => {
    setData(prevData => ({
      ...prevData,
      conceptualization: {
        ...prevData.conceptualization,
        musicDecisions: {
          ...prevData.conceptualization.musicDecisions,
          ...data
        }
      }
    }));
  };

  const saveStyleDecisions = (data: {
    colorPalette?: string[];
    styleChoice?: string;
    references?: UploadedFile[],
    sketches?: UploadedFile[],
  }) => {
    setData(prevData => ({
      ...prevData,
      conceptualization: {
        ...prevData.conceptualization,
        styleDecisions: { ...prevData.conceptualization.styleDecisions, ...data }
      }
    }));
  }

  const saveFeedbackSession = (sessionId: string, sessionData: FeedbackSession) => {
    setData(prevData => ({
      ...prevData,
      evaluation: { ...prevData.evaluation, feedbackSessions: { ...prevData.evaluation.feedbackSessions, [sessionId]: sessionData } }
    }));
  }

  const saveFieldTest = (data: DECIDE) => {
    setData(prevData => ({
      ...prevData,
      evaluation: { ...prevData.evaluation, fieldTest: data }
    }));
  }

  const saveLaboratoryTest = (data: DECIDE) => {
    setData(prevData => ({
      ...prevData,
      evaluation: { ...prevData.evaluation, laboratoryTest: data }
    }));
  }

  const saveDecide = (data: DECIDE) => {
    setData(prevData => ({
      ...prevData,
      evaluation: { ...prevData.evaluation, decide: data }
    }));
  }

  const saveMediumPrototypingData = (data: {
    images?: UploadedFile[],
    finalVideo?: UploadedFile,
  }) => {
    setData(prevData => ({
      ...prevData,
      prototyping: { ...prevData.prototyping, medium: { ...prevData.prototyping.medium, ...data } }
    }));
  }

  const saveHighPrototypingData = (data: {
    images?: UploadedFile[],
    finalVideo?: UploadedFile,
  }) => {
    setData(prevData => ({
      ...prevData,
      prototyping: { ...prevData.prototyping, high: { ...prevData.prototyping.high, ...data } }
    }));
  }

  const getMusicDecisionsStatus = () => {
    const { selectedMusic, wordAssociation, emotionalMap, emotionTimeMap } = data.conceptualization.musicDecisions;

    const isCompleted = selectedMusic.songName !== ''
      && selectedMusic.youtubeLink !== ''
      && wordAssociation.length > 0
      && emotionalMap.length > 0
      && emotionTimeMap.length > 0;

    const isInProgress = selectedMusic.songName !== ''
      || selectedMusic.youtubeLink !== ''
      || wordAssociation.length > 0
      || emotionalMap.length > 0
      || emotionTimeMap.length > 0;

    return isCompleted ? 'completed' : isInProgress ? 'in-progress' : 'not-started';
  };

  const getStyleDecisionsStatus = () => {
    const { colorPalette, styleChoice, references, sketches } = data.conceptualization.styleDecisions;

    const isCompleted = colorPalette.length > 0
      && styleChoice !== ''
      && references.length > 0
      && sketches.length > 0;

    const isInProgress = colorPalette.length > 0
      || styleChoice !== ''
      || references.length > 0
      || sketches.length > 0;

    return isCompleted ? 'completed' : isInProgress ? 'in-progress' : 'not-started';
  };

  const getFeedbackSessionStatus = (sessionId: string) => {
    const session = data.evaluation.feedbackSessions[sessionId.split('')[1]];

    if (!session) return 'not-started';

    const isCompleted = session.sessionDate !== ''
      && session.goodPoints.length > 0
      && session.improvementPoints.length > 0
      && session.criteriaMatch.length > 0
      && session.criteriaMatch.every(criteria => criteria.met)
      && session.comments !== '';

    const isInProgress = session.sessionDate !== ''
      || session.goodPoints.length > 0
      || session.improvementPoints.length > 0
      || session.criteriaMatch.length > 0
      || session.comments !== '';

    return isCompleted ? 'completed' : isInProgress ? 'in-progress' : 'not-started';
  };

  const getPrototypeStatus = (prototype: 'medium' | 'high') => {
    const { video, images } = data.prototyping[prototype];

    const isCompleted = video.id !== '' && images.length > 0;
    const isInProgress = video.id !== '' || images.length > 0;

    return isCompleted ? 'completed' : isInProgress ? 'in-progress' : 'not-started';
  };

  const getDecideStatus = (decideData: DECIDE) => {
    if (!decideData) return 'not-started';

    const hasContent = decideData.determine.objectives.length > 0
      && decideData.explore.questions.length > 0
      && decideData.choose.methods.length > 0
      && decideData.identify.practicalAspects.length > 0
      && decideData.decide.ethicalConsiderations.length > 0
      && decideData.evaluate.analysisPoints.length > 0;

    const hasInProgress = decideData.determine.objectives.length > 0
      || decideData.explore.questions.length > 0
      || decideData.choose.methods.length > 0
      || decideData.identify.practicalAspects.length > 0
      || decideData.decide.ethicalConsiderations.length > 0
      || decideData.evaluate.analysisPoints.length > 0;

    // Verifica se todos os critérios foram atendidos
    const allCriteriaMet = Array.isArray(decideData.completionCriteria)
      ? decideData.completionCriteria.every(criterion => criterion.met)
      : false;

    // Verifica se há um resumo dos resultados
    const hasResultsSummary = typeof decideData.resultsSummary === 'string'
      ? decideData.resultsSummary.trim().length > 0
      : false;

    // Considera completo apenas se tiver todo o conteúdo, todos os critérios atendidos e resumo dos resultados
    const isCompleted = hasContent && allCriteriaMet && hasResultsSummary;

    return isCompleted ? 'completed' : hasInProgress ? 'in-progress' : 'not-started';
  };

  const getStatus = (stepId: string) => {
    switch (stepId) {
      case 'musicalAndEmotionalDecisions':
        return getMusicDecisionsStatus();
      case 'styleDecisions':
        return getStyleDecisionsStatus();
      case 'feedbackSession01':
        return getFeedbackSessionStatus('01');
      case 'feedbackSession02':
        return getFeedbackSessionStatus('02');
      case 'feedbackSession03':
        return getFeedbackSessionStatus('03');
      case 'mediumFidelityPrototype':
        return getPrototypeStatus('medium');
      case 'highFidelityPrototype':
        return getPrototypeStatus('high');
      case 'laboratoryTest':
        return getDecideStatus(data.evaluation.laboratoryTest);
      case 'fieldTest':
        return getDecideStatus(data.evaluation.fieldTest);
      case 'decide':
        return getDecideStatus(data.evaluation.decide);
      case 'implementation':
        return 'not-started';
      default:
        return 'not-started';
    }
  };

  return (
    <ThunderContext.Provider value={{
      data,
      isLoading,
      getData,
      saveData,
      saveMusicDecisions,
      saveStyleDecisions,
      saveFeedbackSession,
      saveFieldTest,
      saveLaboratoryTest,
      saveDecide,
      saveMediumPrototypingData,
      saveHighPrototypingData,
      getStatus,
      clearStorage,
    }}>
      {children}
    </ThunderContext.Provider>
  );
};

export const useThunder = () => {
  const context = useContext(ThunderContext);
  if (!context) {
    throw new Error('useThunder must be used within a ThunderProvider');
  }
  return context;
};
