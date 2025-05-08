import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ThemeControls } from "../../components/ThemeControls";
import { useTheme } from "../../contexts/ThemeContext";
import { STORE_KEYS } from "../../globals/constants";
import { useTranslation } from "react-i18next";
import { useThunder } from "../../contexts/Thunder";
import { ConclusionCriteria, FeedbackSession as IFeedbackSession, FeedbackSessions as IFeedbackSessions } from '../../contexts/Thunder/interfaces';
import { MdClose } from 'react-icons/md';

const FeedbackSession = () => {
  const { t } = useTranslation();
  const { mode, theme } = useTheme();
  const { data, saveFeedbackSession } = useThunder();

  const stageColors = theme.colors[mode].stages.evaluation;
  const typography = theme.typography;
  const shadows = theme.shadows;
  const transitions = theme.transitions;
  const modeColors = theme.colors[mode];

  const firstSessionCriteria: ConclusionCriteria[] = [
    {
      id: 1,
      criteria: t('feedbackSession.evaluationCriteria.firstSession.criteria1'),
      met: false,
    },
    {
      id: 2,
      criteria: t('feedbackSession.evaluationCriteria.firstSession.criteria2'),
      met: false,
    },
    {
      id: 3,
      criteria: t('feedbackSession.evaluationCriteria.firstSession.criteria3'),
      met: false,
    }
  ];

  const secondSessionCriteria: ConclusionCriteria[] = [
    {
      id: 1,
      criteria: t('feedbackSession.evaluationCriteria.secondSession.criteria1'),
      met: false,
    },
    {
      id: 2,
      criteria: t('feedbackSession.evaluationCriteria.secondSession.criteria2'),
      met: false,
    },
    {
      id: 3,
      criteria: t('feedbackSession.evaluationCriteria.secondSession.criteria3'),
      met: false,
    }
  ];

  const thirdSessionCriteria: ConclusionCriteria[] = [
    {
      id: 1,
      criteria: t('feedbackSession.evaluationCriteria.thirdSession.criteria1'),
      met: false,
    },
    {
      id: 2,
      criteria: t('feedbackSession.evaluationCriteria.thirdSession.criteria2'),
      met: false,
    },
    {
      id: 3,
      criteria: t('feedbackSession.evaluationCriteria.thirdSession.criteria3'),
      met: false,
    },
    {
      id: 4,
      criteria: t('feedbackSession.evaluationCriteria.thirdSession.criteria4'),
      met: false,
    }
  ];

  const params = useParams();
  const sessionNumber = params.sessionNumber ?? '1';

  const getCriteria = () => {
    if (sessionNumber === "1") return firstSessionCriteria;
    if (sessionNumber === "2") return secondSessionCriteria;
    return thirdSessionCriteria;
  }

  const criteriaToMatch = getCriteria();
  const sessionForm = data.evaluation.feedbackSessions[sessionNumber] || {
    sessionDate: new Date().toISOString(),
    goodPoints: [],
    improvementPoints: [],
    criteriaMatch: criteriaToMatch,
    comments: "",
  };

  const [newGoodPoint, setNewGoodPoint] = useState("");
  const [newImprovementPoint, setNewImprovementPoint] = useState("");

  const handleAddGoodPoint = () => {
    if (newGoodPoint.trim()) {
      saveFeedbackSession(sessionNumber, {
        ...sessionForm,
        goodPoints: [...sessionForm.goodPoints, newGoodPoint.trim()]
      });
      setNewGoodPoint("");
    }
  };

  const handleAddImprovementPoint = () => {
    if (newImprovementPoint.trim()) {
      saveFeedbackSession(sessionNumber, {
        ...sessionForm,
        improvementPoints: [...sessionForm.improvementPoints, newImprovementPoint.trim()]
      });
      setNewImprovementPoint("");
    }
  };

  const handleRemoveGoodPoint = (index: number) => {
    saveFeedbackSession(sessionNumber, {
      ...sessionForm,
      goodPoints: sessionForm.goodPoints.filter((_, i) => i !== index)
    });
  };

  const handleRemoveImprovementPoint = (index: number) => {
    saveFeedbackSession(sessionNumber, {
      ...sessionForm,
      improvementPoints: sessionForm.improvementPoints.filter((_, i) => i !== index)
    });
  };

  const handleCriteriaToggle = (id: number) => {
    saveFeedbackSession(sessionNumber, {
      ...sessionForm,
      criteriaMatch: sessionForm.criteriaMatch.map(criteria =>
        criteria.id === id ? { ...criteria, met: !criteria.met } : criteria
      )
    });
  };

  return (
    <div className="min-h-screen">
      <div className="space-y-8">
        <div
          className="backdrop-blur-lg rounded-2xl p-8 shadow-xl border"
          style={{
            backgroundColor: stageColors.background.card,
            borderColor: stageColors.border.light,
            boxShadow: shadows.large
          }}
        >
          <h1
            className="text-center leading-tight mb-8"
            style={{
              fontSize: typography.h1.size,
              fontWeight: typography.h1.weight,
              lineHeight: typography.h1.lineHeight,
              color: stageColors.text.primary
            }}
          >
            {t('feedbackSession.title')}
          </h1>

          <p
            className="text-center"
            style={{
              fontSize: typography.body.large.size,
              lineHeight: typography.body.large.lineHeight,
              color: modeColors.text.black
            }}
            dangerouslySetInnerHTML={{ __html: t('feedbackSession.description') }}
          />
        </div>
        <div
          className="backdrop-blur-lg rounded-2xl p-8 shadow-xl border"
          style={{
            backgroundColor: stageColors.background.card,
            borderColor: stageColors.border.light,
            boxShadow: shadows.large
          }}
        >
          <h2
            className="mb-2"
            style={{
              fontSize: typography.h2.size,
              fontWeight: typography.h2.weight,
              color: stageColors.text.primary
            }}
          >
            {t('feedbackSession.sessionDate.title')}
          </h2>
          <p
            className="text-md text-black leading-relaxed mb-6"
          >
            {t('feedbackSession.sessionDate.description')}
          </p>
          <div>
            <label htmlFor="sessionDateInput" className="sr-only">
              {t('feedbackSession.sessionDate.title')}
            </label>
            <input
              id="sessionDateInput"
              type="date"
              value={sessionForm.sessionDate.split('T')[0]}
              onChange={(e) => saveFeedbackSession(sessionNumber, {
                ...sessionForm,
                sessionDate: new Date(e.target.value).toISOString()
              })}
              className="w-full p-3 rounded-xl border transition-all duration-300 focus:outline-none focus:ring-2"
              style={{
                backgroundColor: '#fff',
                borderColor: stageColors.border.light,
                color: stageColors.text.primary,
                fontSize: typography.body.medium.size,
                lineHeight: typography.body.medium.lineHeight,
                boxShadow: shadows.small
              }}
            />
          </div>
        </div>

        {/* Good Points Section */}
        <div
          className="backdrop-blur-lg rounded-2xl p-8 shadow-xl border"
          style={{
            backgroundColor: stageColors.background.card,
            borderColor: stageColors.border.light,
            boxShadow: shadows.large
          }}
        >
          <h2
            className="mb-2"
            style={{
              fontSize: typography.h2.size,
              fontWeight: typography.h2.weight,
              color: stageColors.text.primary
            }}
          >
            {t('feedbackSession.goodPoints.title')}
          </h2>
          <p
            className="text-md text-black leading-relaxed mb-6"
          >
            {t('feedbackSession.goodPoints.description')}
          </p>
          <div className="flex gap-2 mb-4">
            <div className="flex-1">
              <label htmlFor="goodPointInput" className="sr-only">
                {t('feedbackSession.goodPoints.placeholder')}
              </label>
              <input
                id="goodPointInput"
                type="text"
                value={newGoodPoint}
                onChange={(e) => setNewGoodPoint(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleAddGoodPoint();
                  }
                }}
                placeholder={t('feedbackSession.goodPoints.placeholder')}
                className="w-full p-3 rounded-xl border transition-all duration-300 focus:outline-none focus:ring-2"
                style={{
                  backgroundColor: '#fff',
                  borderColor: stageColors.border.light,
                  color: stageColors.text.primary,
                  fontSize: typography.body.medium.size,
                  lineHeight: typography.body.medium.lineHeight,
                  boxShadow: shadows.small
                }}
              />
            </div>
            <button
              onClick={handleAddGoodPoint}
              className="px-8 py-3 rounded-xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer"
              style={{
                backgroundColor: stageColors.background.button.primary,
                color: stageColors.background.button.text,
                borderColor: stageColors.border.button,
                transition: transitions.default,
                fontSize: typography.body.medium.size,
                lineHeight: typography.body.medium.lineHeight,
                boxShadow: shadows.medium
              }}
            >
              {t('feedbackSession.goodPoints.addButton')}
            </button>
          </div>
          <ul className="space-y-2">
            {sessionForm.goodPoints.map((point, index) => (
              <li
                key={index}
                className="flex items-center justify-between rounded-xl border mb-2 px-3 py-2 shadow bg-white transition-all duration-300"
                style={{
                  borderColor: stageColors.border.light,
                  color: modeColors.text.black,
                }}
              >
                <span style={{ fontSize: typography.body.medium.size, lineHeight: typography.body.medium.lineHeight }}>{point}</span>
                <button
                  onClick={() => handleRemoveGoodPoint(index)}
                  aria-label="Remover ponto"
                  className="p-1 rounded-full cursor-pointer transition-all duration-300 hover:scale-110 shadow-md"
                  style={{
                    backgroundColor: stageColors.background.button.secondary,
                    color: stageColors.background.button.text,
                    boxShadow: shadows.medium,
                    border: 'none'
                  }}
                >
                  <MdClose size={16} />
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div
          className="backdrop-blur-lg rounded-2xl p-8 shadow-xl border"
          style={{
            backgroundColor: stageColors.background.card,
            borderColor: stageColors.border.light,
            boxShadow: shadows.large
          }}
        >
          <h2
            className="mb-2"
            style={{
              fontSize: typography.h2.size,
              fontWeight: typography.h2.weight,
              color: stageColors.text.primary
            }}
          >
            {t('feedbackSession.improvementPoints.title')}
          </h2>
          <p
            className="text-md text-black leading-relaxed mb-6"
          >
            {t('feedbackSession.improvementPoints.description')}
          </p>
          <div className="flex gap-2 mb-4">
            <div className="flex-1">
              <label htmlFor="improvementPointInput" className="sr-only">
                {t('feedbackSession.improvementPoints.placeholder')}
              </label>
              <input
                id="improvementPointInput"
                type="text"
                value={newImprovementPoint}
                onChange={(e) => setNewImprovementPoint(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleAddImprovementPoint();
                  }
                }}
                placeholder={t('feedbackSession.improvementPoints.placeholder')}
                className="w-full p-3 rounded-xl border transition-all duration-300 focus:outline-none focus:ring-2"
                style={{
                  backgroundColor: '#fff',
                  borderColor: stageColors.border.light,
                  color: stageColors.text.primary,
                  fontSize: typography.body.medium.size,
                  lineHeight: typography.body.medium.lineHeight,
                  boxShadow: shadows.small
                }}
              />
            </div>
            <button
              onClick={handleAddImprovementPoint}
              className="px-8 py-3 rounded-xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer"
              style={{
                backgroundColor: stageColors.background.button.primary,
                color: stageColors.background.button.text,
                borderColor: stageColors.border.button,
                transition: transitions.default,
                fontSize: typography.body.medium.size,
                lineHeight: typography.body.medium.lineHeight,
                boxShadow: shadows.medium
              }}
            >
              {t('feedbackSession.improvementPoints.addButton')}
            </button>
          </div>
          <ul className="space-y-2">
            {sessionForm.improvementPoints.map((point, index) => (
              <li
                key={index}
                className="flex items-center justify-between rounded-xl border mb-2 px-3 py-2 shadow bg-white transition-all duration-300"
                style={{
                  borderColor: stageColors.border.light,
                  color: modeColors.text.black,
                }}
              >
                <span style={{ fontSize: typography.body.medium.size, lineHeight: typography.body.medium.lineHeight }}>{point}</span>
                <button
                  onClick={() => handleRemoveImprovementPoint(index)}
                  aria-label="Remover ponto de melhoria"
                  className="p-1 rounded-full cursor-pointer transition-all duration-300 hover:scale-110 shadow-md"
                  style={{
                    backgroundColor: stageColors.background.button.secondary,
                    color: stageColors.background.button.text,
                    boxShadow: shadows.medium,
                    border: 'none'
                  }}
                >
                  <MdClose size={16} />
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div
          className="backdrop-blur-lg rounded-2xl p-8 shadow-xl border"
          style={{
            backgroundColor: stageColors.background.card,
            borderColor: stageColors.border.light,
            boxShadow: shadows.large
          }}
        >
          <h2
            className="mb-2"
            style={{
              fontSize: typography.h2.size,
              fontWeight: typography.h2.weight,
              color: stageColors.text.primary
            }}
          >
            {t('feedbackSession.comments.title')}
          </h2>
          <p
            className="text-md text-black leading-relaxed mb-6"
          >
            {t('feedbackSession.comments.description')}
          </p>
          <textarea
            value={sessionForm.comments}
            onChange={(e) => saveFeedbackSession(sessionNumber, {
              ...sessionForm,
              comments: e.target.value
            })}
            placeholder={t('feedbackSession.comments.placeholder')}
            className="w-full p-3 rounded-xl border min-h-[100px] transition-all duration-300 focus:outline-none focus:ring-2"
            style={{
              backgroundColor: '#fff',
              borderColor: stageColors.border.light,
              color: stageColors.text.primary,
              fontSize: typography.body.medium.size,
              lineHeight: typography.body.medium.lineHeight,
              boxShadow: shadows.small
            }}
          />
        </div>
        <div
          className="backdrop-blur-lg rounded-2xl p-8 shadow-xl border"
          style={{
            backgroundColor: stageColors.background.card,
            borderColor: stageColors.border.light,
            boxShadow: shadows.large
          }}
        >
          <h2
            className="mb-2"
            style={{
              fontSize: typography.h2.size,
              fontWeight: typography.h2.weight,
              color: stageColors.text.primary
            }}
          >
            {t('feedbackSession.evaluationCriteria.title')}
          </h2>
          <p
            className="text-md text-black leading-relaxed mb-6"
          >
            {t('feedbackSession.evaluationCriteria.description')}
          </p>
          <div className="space-y-4">
            {sessionForm.criteriaMatch.map((criteria) => (
              <div
                key={criteria.id}
                className="flex items-center gap-4 p-3 border rounded-xl mb-2 shadow transition-all duration-300 bg-white"
                style={{
                  borderColor: stageColors.border.light,
                  color: modeColors.text.black,
                  minHeight: 48
                }}
              >
                <input
                  type="checkbox"
                  id={`criteria-${criteria.id}`}
                  checked={criteria.met}
                  onChange={() => handleCriteriaToggle(criteria.id)}
                  className="w-5 h-5 cursor-pointer"
                  style={{ accentColor: stageColors.accent.primary }}
                />
                <label
                  htmlFor={`criteria-${criteria.id}`}
                  className="flex-1 cursor-pointer"
                  style={{ fontSize: typography.body.medium.size, lineHeight: typography.body.medium.lineHeight }}
                >
                  {criteria.criteria}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
      <ThemeControls />
    </div>
  );
};

export default FeedbackSession;
