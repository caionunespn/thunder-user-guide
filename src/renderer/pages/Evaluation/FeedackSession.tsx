import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { ThemeControls } from "../../components/ThemeControls";
import { useTheme } from "../../contexts/ThemeContext";
import { useTranslation } from "react-i18next";
import { useThunder } from "../../contexts/Thunder";
import { ConclusionCriteria } from '../../contexts/Thunder/interfaces';
import { MdClose, MdEdit, MdCheck, MdCancel } from 'react-icons/md';
import { IoIosAlert } from "react-icons/io";
import { StatusTag } from "../../components/StatusTag";

const stepNumber = {
  "1": "3",
  "2": "5",
  "3": "7"
}

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
  const [editingGoodPointIndex, setEditingGoodPointIndex] = useState<number | null>(null);
  const [editingGoodPointValue, setEditingGoodPointValue] = useState("");
  const [editingImprovementPointIndex, setEditingImprovementPointIndex] = useState<number | null>(null);
  const [editingImprovementPointValue, setEditingImprovementPointValue] = useState("");

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

  const startEditingGoodPoint = (index: number, value: string) => {
    setEditingGoodPointIndex(index);
    setEditingGoodPointValue(value);
  };

  const saveGoodPointEdit = () => {
    if (editingGoodPointValue.trim() && editingGoodPointIndex !== null) {
      const newGoodPoints = [...sessionForm.goodPoints];
      newGoodPoints[editingGoodPointIndex] = editingGoodPointValue.trim();
      saveFeedbackSession(sessionNumber, {
        ...sessionForm,
        goodPoints: newGoodPoints
      });
      setEditingGoodPointIndex(null);
      setEditingGoodPointValue("");
    }
  };

  const cancelGoodPointEdit = () => {
    setEditingGoodPointIndex(null);
    setEditingGoodPointValue("");
  };

  const startEditingImprovementPoint = (index: number, value: string) => {
    setEditingImprovementPointIndex(index);
    setEditingImprovementPointValue(value);
  };

  const saveImprovementPointEdit = () => {
    if (editingImprovementPointValue.trim() && editingImprovementPointIndex !== null) {
      const newImprovementPoints = [...sessionForm.improvementPoints];
      newImprovementPoints[editingImprovementPointIndex] = editingImprovementPointValue.trim();
      saveFeedbackSession(sessionNumber, {
        ...sessionForm,
        improvementPoints: newImprovementPoints
      });
      setEditingImprovementPointIndex(null);
      setEditingImprovementPointValue("");
    }
  };

  const cancelImprovementPointEdit = () => {
    setEditingImprovementPointIndex(null);
    setEditingImprovementPointValue("");
  };

  const handleEditEnterKey = (e: React.KeyboardEvent<HTMLInputElement>, saveFunction: () => void, cancelFunction: () => void) => {
    if (e.key === 'Enter') {
      saveFunction();
    } else if (e.key === 'Escape') {
      cancelFunction();
    }
  };

  const handleCriteriaToggle = (id: number) => {
    saveFeedbackSession(sessionNumber, {
      ...sessionForm,
      criteriaMatch: sessionForm.criteriaMatch.map(criteria =>
        criteria.id === id ? { ...criteria, met: !criteria.met } : criteria
      )
    });
  };

  // Funções para determinar o status de cada campo
  const getSessionDateStatus = () => {
    return sessionForm.sessionDate ? 'completed' : 'not-started';
  };

  const getGoodPointsStatus = () => {
    if (sessionForm.goodPoints.length > 0) {
      return 'completed';
    }
    return 'not-started';
  };

  const getImprovementPointsStatus = () => {
    if (sessionForm.improvementPoints.length > 0) {
      return 'completed';
    }
    return 'not-started';
  };

  const getCommentsStatus = () => {
    return sessionForm.comments.trim() ? 'completed' : 'not-started';
  };

  const getCriteriaStatus = () => {
    if (sessionForm.criteriaMatch.length === 0) {
      return 'not-started';
    }
    const completedCriteria = sessionForm.criteriaMatch.filter(criteria => criteria.met).length;
    if (completedCriteria === 0) {
      return 'not-started';
    } else if (completedCriteria === sessionForm.criteriaMatch.length) {
      return 'completed';
    } else {
      return 'in-progress';
    }
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
            className="text-center leading-tight mb-8 flex flex-col items-center justify-center"
            style={{
              fontSize: typography.h1.size,
              fontWeight: typography.h1.weight,
              lineHeight: typography.h1.lineHeight,
              color: stageColors.text.primary
            }}
          >
            <span
              className="flex items-center justify-center rounded-full text-white py-2 px-4 mb-4"
              style={{
                fontSize: typography.body.large.size,
                lineHeight: typography.body.large.lineHeight,
                backgroundColor: stageColors.text.primary
              }}
            >
              {t('step')} {stepNumber[sessionNumber]}
            </span>
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
          className="flex items-center justify-center p-4 rounded-lg border-l-4"
          style={{
            backgroundColor: modeColors.background.card,
            borderColor: modeColors.primary.main
          }}
        >
          <div>
            <h3
              className="font-semibold mb-1 flex items-center"
              style={{
                fontSize: typography.body.large.size,
                lineHeight: typography.body.large.lineHeight,
                color: modeColors.primary.dark
              }}
            >
              <IoIosAlert
                className="w-5 h-5 mr-2 flex-shrink-0"
                style={{ color: modeColors.primary.dark }}
              />
              {t('status.information')}
            </h3>
            <p
              style={{
                fontSize: typography.body.medium.size,
                lineHeight: typography.body.medium.lineHeight,
                color: modeColors.status.neutral.dark,
                fontStyle: 'italic'
              }}
              dangerouslySetInnerHTML={{
                __html: t('evaluation.didYouKnow1')
              }}
            />
          </div>
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
            className="flex items-end text-left leading-tight mb-2"
            style={{
              fontSize: typography.h2.size,
              fontWeight: typography.h2.weight,
              color: stageColors.text.primary
            }}
          >
            {t('feedbackSession.sessionDate.title')}
            <StatusTag status={getSessionDateStatus()} />
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

        <div
          className="backdrop-blur-lg rounded-2xl p-8 shadow-xl border"
          style={{
            backgroundColor: stageColors.background.card,
            borderColor: stageColors.border.light,
            boxShadow: shadows.large
          }}
        >
          <h2
            className="flex items-end text-left leading-tight mb-2"
            style={{
              fontSize: typography.h2.size,
              fontWeight: typography.h2.weight,
              color: stageColors.text.primary
            }}
          >
            {t('feedbackSession.goodPoints.title')}
            <StatusTag status={getGoodPointsStatus()} />
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
                {editingGoodPointIndex === index ? (
                  <input
                    type="text"
                    value={editingGoodPointValue}
                    onChange={(e) => setEditingGoodPointValue(e.target.value)}
                    onKeyDown={(e) => handleEditEnterKey(e, saveGoodPointEdit, cancelGoodPointEdit)}
                    className="flex-1 bg-transparent border-none outline-none"
                    style={{
                      color: stageColors.text.primary,
                      fontSize: typography.body.medium.size,
                      lineHeight: typography.body.medium.lineHeight
                    }}
                    autoFocus
                  />
                ) : (
                  <span style={{
                    fontSize: typography.body.medium.size,
                    lineHeight: typography.body.medium.lineHeight
                  }}>
                    {point}
                  </span>
                )}
                <div className="flex items-center gap-1">
                  {editingGoodPointIndex === index ? (
                    <>
                      <button
                        onClick={saveGoodPointEdit}
                        className="p-1 rounded-full cursor-pointer transition-all duration-300 hover:scale-110"
                        style={{
                          backgroundColor: stageColors.background.button.primary,
                          color: stageColors.background.button.text,
                          boxShadow: shadows.medium,
                          border: 'none'
                        }}
                      >
                        <MdCheck size={16} />
                      </button>
                      <button
                        onClick={cancelGoodPointEdit}
                        className="p-1 rounded-full cursor-pointer transition-all duration-300 hover:scale-110"
                        style={{
                          backgroundColor: stageColors.background.button.secondary,
                          color: stageColors.background.button.text,
                          boxShadow: shadows.medium,
                          border: 'none'
                        }}
                      >
                        <MdCancel size={16} />
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => startEditingGoodPoint(index, point)}
                        className="p-1 rounded-full cursor-pointer transition-all duration-300 hover:scale-110"
                        style={{
                          backgroundColor: stageColors.background.button.secondary,
                          color: stageColors.background.button.text,
                          boxShadow: shadows.medium,
                          border: 'none'
                        }}
                      >
                        <MdEdit size={16} />
                      </button>
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
                    </>
                  )}
                </div>
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
            className="flex items-end text-left leading-tight mb-2"
            style={{
              fontSize: typography.h2.size,
              fontWeight: typography.h2.weight,
              color: stageColors.text.primary
            }}
          >
            {t('feedbackSession.improvementPoints.title')}
            <StatusTag status={getImprovementPointsStatus()} />
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
                {editingImprovementPointIndex === index ? (
                  <input
                    type="text"
                    value={editingImprovementPointValue}
                    onChange={(e) => setEditingImprovementPointValue(e.target.value)}
                    onKeyDown={(e) => handleEditEnterKey(e, saveImprovementPointEdit, cancelImprovementPointEdit)}
                    className="flex-1 bg-transparent border-none outline-none"
                    style={{
                      color: stageColors.text.primary,
                      fontSize: typography.body.medium.size,
                      lineHeight: typography.body.medium.lineHeight
                    }}
                    autoFocus
                  />
                ) : (
                  <span style={{
                    fontSize: typography.body.medium.size,
                    lineHeight: typography.body.medium.lineHeight
                  }}>
                    {point}
                  </span>
                )}
                <div className="flex items-center gap-1">
                  {editingImprovementPointIndex === index ? (
                    <>
                      <button
                        onClick={saveImprovementPointEdit}
                        className="p-1 rounded-full cursor-pointer transition-all duration-300 hover:scale-110"
                        style={{
                          backgroundColor: stageColors.background.button.primary,
                          color: stageColors.background.button.text,
                          boxShadow: shadows.medium,
                          border: 'none'
                        }}
                      >
                        <MdCheck size={16} />
                      </button>
                      <button
                        onClick={cancelImprovementPointEdit}
                        className="p-1 rounded-full cursor-pointer transition-all duration-300 hover:scale-110"
                        style={{
                          backgroundColor: stageColors.background.button.secondary,
                          color: stageColors.background.button.text,
                          boxShadow: shadows.medium,
                          border: 'none'
                        }}
                      >
                        <MdCancel size={16} />
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => startEditingImprovementPoint(index, point)}
                        className="p-1 rounded-full cursor-pointer transition-all duration-300 hover:scale-110"
                        style={{
                          backgroundColor: stageColors.background.button.secondary,
                          color: stageColors.background.button.text,
                          boxShadow: shadows.medium,
                          border: 'none'
                        }}
                      >
                        <MdEdit size={16} />
                      </button>
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
                    </>
                  )}
                </div>
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
            className="flex items-end text-left leading-tight mb-2"
            style={{
              fontSize: typography.h2.size,
              fontWeight: typography.h2.weight,
              color: stageColors.text.primary
            }}
          >
            {t('feedbackSession.comments.title')}
            <StatusTag status={getCommentsStatus()} />
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
            className="flex items-end text-left leading-tight mb-2"
            style={{
              fontSize: typography.h2.size,
              fontWeight: typography.h2.weight,
              color: stageColors.text.primary
            }}
          >
            {t('feedbackSession.evaluationCriteria.title')}
            <StatusTag status={getCriteriaStatus()} />
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
