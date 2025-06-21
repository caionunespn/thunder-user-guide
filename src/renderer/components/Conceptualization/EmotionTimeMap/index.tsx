import React, { useState } from 'react';
import { useThunder } from '../../../contexts/Thunder';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../../contexts/ThemeContext';
import { EmotionTimeMap as IEmotionTimeMap } from '../../../contexts/Thunder/interfaces';
import { StatusTag } from '../../StatusTag';
import { MdEdit, MdCheck, MdCancel } from 'react-icons/md';

const EmotionTimeMap = () => {
  const { mode, theme } = useTheme();
  const { t } = useTranslation();
  const { data, saveMusicDecisions } = useThunder();

  const stageColors = theme.colors[mode].stages.conceptualization;
  const typography = theme.typography;
  const shadows = theme.shadows;

  const timeSegments: IEmotionTimeMap = data.conceptualization.musicDecisions.emotionTimeMap;

  const wordAssociations = data.conceptualization.musicDecisions.wordAssociation;
  const emotionsMap = data.conceptualization.musicDecisions.emotionalMap.map(item => item.dimension);

  const [startTime, setStartTime] = useState<string>('');
  const [endTime, setEndTime] = useState<string>('');
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingStartTime, setEditingStartTime] = useState<string>('');
  const [editingEndTime, setEditingEndTime] = useState<string>('');
  const [editingSelectedWords, setEditingSelectedWords] = useState<string[]>([]);

  const getStepStatus = () => {
    if (timeSegments.length > 0) {
      return 'completed';
    }
    return 'not-started';
  };

  const status = getStepStatus();

  const handleAddSegment = async () => {
    if (startTime && endTime && selectedWords.length > 0) {
      const newSegments = [...timeSegments, { startTime, endTime, words: selectedWords }];

      saveMusicDecisions({ emotionTimeMap: newSegments });

      setStartTime('');
      setEndTime('');
      setSelectedWords([]);
    } else {
      alert(t('emotionTimeMap.alert'));
    }
  };

  const handleWordSelection = (word: string) => {
    setSelectedWords(prev =>
      prev.includes(word) ? prev.filter(w => w !== word) : [...prev, word]
    );
  };

  const removeSegment = async (index: number) => {
    const newSegments = timeSegments.filter((_, i) => i !== index);
    saveMusicDecisions({ emotionTimeMap: newSegments });
  };

  const startEditing = (index: number, segment: { startTime: string; endTime: string; words: string[] }) => {
    setEditingIndex(index);
    setEditingStartTime(segment.startTime);
    setEditingEndTime(segment.endTime);
    setEditingSelectedWords([...segment.words]);
  };

  const saveEdit = () => {
    if (editingStartTime && editingEndTime && editingSelectedWords.length > 0 && editingIndex !== null) {
      const newSegments = [...timeSegments];
      newSegments[editingIndex] = {
        startTime: editingStartTime,
        endTime: editingEndTime,
        words: editingSelectedWords
      };
      saveMusicDecisions({ emotionTimeMap: newSegments });
      setEditingIndex(null);
      setEditingStartTime('');
      setEditingEndTime('');
      setEditingSelectedWords([]);
    }
  };

  const cancelEdit = () => {
    setEditingIndex(null);
    setEditingStartTime('');
    setEditingEndTime('');
    setEditingSelectedWords([]);
  };

  const handleEditWordSelection = (word: string) => {
    setEditingSelectedWords(prev =>
      prev.includes(word) ? prev.filter(w => w !== word) : [...prev, word]
    );
  };

  const handleEnterKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAddSegment();
    }
  };

  const handleEditEnterKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      saveEdit();
    } else if (e.key === 'Escape') {
      cancelEdit();
    }
  };

  return (
    <div
      className="backdrop-blur-lg rounded-2xl p-8 shadow-xl border"
      style={{
        backgroundColor: stageColors.background.card,
        borderColor: stageColors.border.light,
        boxShadow: shadows.large
      }}
    >
      <h2
        className="flex items-end text-left leading-tight mb-4"
        style={{
          fontSize: typography.h2.size,
          fontWeight: typography.h2.weight,
          lineHeight: typography.h2.lineHeight,
          color: stageColors.text.primary
        }}
      >
        {t('emotionTimeMap.title')}
        <StatusTag status={status} />
      </h2>
      <p
        className="text-md text-black leading-relaxed mb-6">
        {t('emotionTimeMap.description')}
      </p>
      <div className="mb-6">
        <h3
          className="text-left mb-4"
          style={{
            fontSize: typography.h3.size,
            fontWeight: typography.h3.weight,
            lineHeight: typography.h3.lineHeight,
            color: stageColors.text.primary
          }}
        >
          {t('emotionTimeMap.insertedSegments')}
        </h3>
        <div>
          {timeSegments.map((segment, index) => (
            <div key={index} className="flex flex-row items-center justify-between rounded-xl border mb-2"
              style={{
                backgroundColor: stageColors.background.card,
                borderColor: stageColors.border.light,
                boxShadow: shadows.medium,
                minWidth: 120,
                minHeight: 48,
                padding: '12px 16px'
              }}
            >
              {editingIndex === index ? (
                <div className="flex-1 space-y-2">
                  <div className="flex items-center space-x-2">
                    <input
                      type="time"
                      value={editingStartTime}
                      onChange={(e) => setEditingStartTime(e.target.value)}
                      onKeyDown={handleEditEnterKey}
                      className="bg-transparent border-none outline-none"
                      style={{ color: stageColors.text.primary }}
                      autoFocus
                    />
                    <span style={{ color: stageColors.text.primary }}>{t('emotionTimeMap.to')}</span>
                    <input
                      type="time"
                      value={editingEndTime}
                      onChange={(e) => setEditingEndTime(e.target.value)}
                      onKeyDown={handleEditEnterKey}
                      className="bg-transparent border-none outline-none"
                      style={{ color: stageColors.text.primary }}
                    />
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {[...wordAssociations, ...emotionsMap].map((word, wordIndex) => (
                      <button
                        key={wordIndex}
                        onClick={() => handleEditWordSelection(word)}
                        className={`rounded px-2 py-1 text-xs transition-all duration-300`}
                        style={{
                          backgroundColor: editingSelectedWords.includes(word) ? stageColors.background.button.secondary : stageColors.background.card,
                          color: editingSelectedWords.includes(word) ? stageColors.background.button.text : stageColors.text.primary,
                          borderColor: editingSelectedWords.includes(word) ? stageColors.border.button : stageColors.border.light,
                          borderWidth: '1px',
                          borderStyle: 'solid',
                        }}
                      >
                        {word}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <span style={{ color: stageColors.text.primary, fontWeight: 400 }}>
                  {`${t('emotionTimeMap.from')} ${segment.startTime} ${t('emotionTimeMap.to')} ${segment.endTime}: ${segment.words.join(', ')}`}
                </span>
              )}
              <div className="flex items-center gap-1">
                {editingIndex === index ? (
                  <>
                    <button
                      onClick={saveEdit}
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
                      onClick={cancelEdit}
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
                      onClick={() => startEditing(index, segment)}
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
                      onClick={() => removeSegment(index)}
                      className="p-1 rounded-full cursor-pointer transition-all duration-300 hover:scale-110"
                      style={{
                        backgroundColor: stageColors.background.button.secondary,
                        color: stageColors.background.button.text,
                        boxShadow: shadows.medium,
                        border: 'none'
                      }}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
          {timeSegments.length === 0 && (
            <p className="text-center py-2" style={{ color: stageColors.text.muted }}>
              {t('emotionTimeMap.noSegments')}
            </p>
          )}
        </div>
      </div>
      <div style={{ borderTop: `1px solid ${stageColors.border.light}`, margin: '32px 0' }} />
      <div className="space-y-6">
        <h3
          className="text-left mb-4"
          style={{
            fontSize: typography.h3.size,
            fontWeight: typography.h3.weight,
            lineHeight: typography.h3.lineHeight,
            color: stageColors.text.primary
          }}
        >
          {t('emotionTimeMap.newSegment')}
        </h3>
        <div className="flex items-center space-x-4">
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            placeholder={t('emotionTimeMap.startTime')}
            className="flex-1 rounded-xl p-4 border transition-all duration-300 focus:outline-none focus:ring-2"
            style={{
              backgroundColor: stageColors.background.card,
              borderColor: stageColors.border.light,
              color: stageColors.text.primary,
              boxShadow: shadows.small
            }}
            onKeyDown={handleEnterKey}
          />
          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            placeholder={t('emotionTimeMap.endTime')}
            className="flex-1 rounded-xl p-4 border transition-all duration-300 focus:outline-none focus:ring-2"
            style={{
              backgroundColor: stageColors.background.card,
              borderColor: stageColors.border.light,
              color: stageColors.text.primary,
              boxShadow: shadows.small
            }}
            onKeyDown={handleEnterKey}
          />
        </div>
        <div>
          <h4
            className="text-left mb-4"
            style={{
              fontSize: typography.body.large.size,
              lineHeight: typography.body.large.lineHeight,
              fontWeight: 500,
              color: stageColors.text.primary
            }}
          >
            {t('emotionTimeMap.selectedWordsLabel')}
          </h4>
          <div className="flex flex-wrap gap-2">
            {[...wordAssociations, ...emotionsMap].map((word, index) => (
              <button
                key={index}
                onClick={() => handleWordSelection(word)}
                className={`rounded-lg px-4 py-2 transition-all duration-300`}
                style={{
                  backgroundColor: selectedWords.includes(word) ? stageColors.background.button.secondary : stageColors.background.card,
                  color: selectedWords.includes(word) ? stageColors.background.button.text : stageColors.text.primary,
                  borderColor: selectedWords.includes(word) ? stageColors.border.button : stageColors.border.light,
                  borderWidth: '1px',
                  borderStyle: 'solid',
                }}
              >
                {word}
              </button>
            ))}
          </div>
        </div>
        <button
          onClick={handleAddSegment}
          className="w-full px-8 py-4 rounded-xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer"
          style={{
            backgroundColor: stageColors.background.button.primary,
            borderColor: stageColors.border.button,
            color: stageColors.background.button.text,
            boxShadow: shadows.medium,
            transition: theme.transitions.default
          }}
        >
          {t('emotionTimeMap.addSegment')}
        </button>
      </div>
    </div>
  );
};

export default EmotionTimeMap;
