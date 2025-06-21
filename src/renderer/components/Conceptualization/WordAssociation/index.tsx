import React, { useState } from 'react';
import { useTheme } from "../../../contexts/ThemeContext";
import { MdClose, MdEdit, MdCheck, MdCancel } from 'react-icons/md';
import { useThunder } from '../../../contexts/Thunder';
import { useTranslation } from 'react-i18next';
import { StatusTag } from '../../StatusTag';

const WordAssociation = ({ fullWidth = false }) => {
  const { t } = useTranslation();
  const { mode, theme } = useTheme();
  const { data, saveMusicDecisions } = useThunder();

  const stageColors = theme.colors[mode].stages.conceptualization;
  const modeColors = theme.colors[mode];
  const typography = theme.typography;
  const shadows = theme.shadows;

  const words = data.conceptualization.musicDecisions.wordAssociation;
  const [inputValue, setInputValue] = useState('');
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingValue, setEditingValue] = useState('');

  const addWord = (word: string) => {
    if (word.trim()) {
      const newWords = [...words, word.trim()];
      saveMusicDecisions({ wordAssociation: newWords });
      setInputValue('');
    }
  };

  const handleEnterKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addWord(e.currentTarget.value);
    }
  };

  const removeWord = (index: number) => {
    const newWords = words.filter((_, i) => i !== index);
    saveMusicDecisions({ wordAssociation: newWords });
  };

  const startEditing = (index: number, word: string) => {
    setEditingIndex(index);
    setEditingValue(word);
  };

  const saveEdit = () => {
    if (editingValue.trim() && editingIndex !== null) {
      const newWords = [...words];
      newWords[editingIndex] = editingValue.trim();
      saveMusicDecisions({ wordAssociation: newWords });
      setEditingIndex(null);
      setEditingValue('');
    }
  };

  const cancelEdit = () => {
    setEditingIndex(null);
    setEditingValue('');
  };

  const handleEditEnterKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      saveEdit();
    } else if (e.key === 'Escape') {
      cancelEdit();
    }
  };

  const getStepStatus = () => {
    if (words.length > 0) {
      return 'completed';
    }
    return 'not-started';
  };

  const status = getStepStatus();

  return (
    <div
      className="backdrop-blur-lg rounded-2xl p-8 shadow-xl border"
      style={{
        backgroundColor: mode === 'dark' ? modeColors.background.card : stageColors.background.card,
        borderColor: mode === 'dark' ? modeColors.border.light : stageColors.border.light,
        boxShadow: shadows.large
      }}
    >
      <h2
        className="flex items-end text-left leading-tight mb-6"
        style={{
          fontSize: typography.h2.size,
          fontWeight: typography.h2.weight,
          lineHeight: typography.h2.lineHeight,
          color: mode === 'dark' ? modeColors.text.primary : stageColors.text.primary
        }}
      >
        {t('wordAssociation.title')}
        <StatusTag status={status} />
      </h2>
      <p
        className="text-md text-black leading-relaxed mb-6">
        {t('wordAssociation.description')}
      </p>

      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder={t('wordAssociation.inputPlaceholder')}
            className="flex-1 rounded-xl p-4 border transition-all duration-300 focus:outline-none focus:ring-2"
            style={{
              backgroundColor: mode === 'dark' ? modeColors.background.card : stageColors.background.card,
              borderColor: mode === 'dark' ? modeColors.border.light : stageColors.border.light,
              color: mode === 'dark' ? modeColors.text.primary : stageColors.text.primary,
              boxShadow: shadows.small
            }}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleEnterKey}
          />
          <button
            className="px-8 py-4 rounded-xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer"
            style={{
              backgroundColor: stageColors.background.button.primary,
              borderColor: mode === 'dark' ? modeColors.border.button.primary : stageColors.border.button,
              color: stageColors.background.button.text,
              boxShadow: shadows.medium,
              transition: theme.transitions.default
            }}
            onClick={() => addWord(inputValue)}
          >
            {t('wordAssociation.addButton')}
          </button>
        </div>

        <div className="flex flex-wrap gap-3">
          {words.map((word, index) => (
            <div
              key={index}
              className={`flex flex-row items-center gap-2 justify-between rounded-xl border mb-2${fullWidth ? ' w-full' : ''}`}
              style={{
                backgroundColor: stageColors.background.card,
                borderColor: stageColors.border.light,
                boxShadow: shadows.medium,
                minHeight: 48,
                padding: '12px'
              }}
            >
              {editingIndex === index ? (
                <input
                  type="text"
                  value={editingValue}
                  onChange={(e) => setEditingValue(e.target.value)}
                  onKeyDown={handleEditEnterKey}
                  className="flex-1 bg-transparent border-none outline-none"
                  style={{ color: stageColors.text.primary }}
                  autoFocus
                />
              ) : (
                <span style={{ color: stageColors.text.primary, fontWeight: 400 }}>{word}</span>
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
                      onClick={() => startEditing(index, word)}
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
                      onClick={() => removeWord(index)}
                      className="p-1 rounded-full cursor-pointer transition-all duration-300 hover:scale-110"
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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WordAssociation;