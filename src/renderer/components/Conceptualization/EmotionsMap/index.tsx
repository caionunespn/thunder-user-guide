import React, { useEffect, useRef, useState } from 'react';
import { STORE_KEYS } from '../../../globals/constants';
import { useTheme } from '../../../contexts/ThemeContext';
import { useThunder } from '../../../contexts/Thunder';
import { useTranslation } from 'react-i18next';
import { pathUtils } from '../../../utils/path';
import { StatusTag } from '../../StatusTag';
import { FaSearchPlus, FaSearchMinus } from 'react-icons/fa';
import { MdEdit, MdCheck, MdCancel } from 'react-icons/md';

const EmotionsMap = ({ fullWidth = false }) => {
  const { t } = useTranslation();
  const { theme, mode } = useTheme();
  const { data, saveMusicDecisions } = useThunder();
  const samples = data.conceptualization.musicDecisions.emotionalMap;

  const stageColors = theme.colors[mode].stages.conceptualization;
  const typography = theme.typography;
  const shadows = theme.shadows;

  const [sampleNumber, setSampleNumber] = useState('');
  const [dimension, setDimension] = useState('');
  const [zoomLevel, setZoomLevel] = useState(0.6);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingNumber, setEditingNumber] = useState('');
  const [editingDimension, setEditingDimension] = useState('');
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleSubmit = () => {
    if (sampleNumber && dimension) {
      const newSamples = [...samples, { number: parseInt(sampleNumber), dimension }];
      saveMusicDecisions({ emotionalMap: newSamples });

      setSampleNumber('');
      setDimension('');
    }
  };

  const handleEnterKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  const removeSample = (index: number) => {
    saveMusicDecisions({ emotionalMap: samples.filter((_, i) => i !== index) });
  };

  const startEditing = (index: number, sample: { number: number; dimension: string }) => {
    setEditingIndex(index);
    setEditingNumber(sample.number.toString());
    setEditingDimension(sample.dimension);
  };

  const saveEdit = () => {
    if (editingNumber && editingDimension && editingIndex !== null) {
      const newSamples = [...samples];
      newSamples[editingIndex] = {
        number: parseInt(editingNumber),
        dimension: editingDimension.trim()
      };
      saveMusicDecisions({ emotionalMap: newSamples });
      setEditingIndex(null);
      setEditingNumber('');
      setEditingDimension('');
    }
  };

  const cancelEdit = () => {
    setEditingIndex(null);
    setEditingNumber('');
    setEditingDimension('');
  };

  const handleEditEnterKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      saveEdit();
    } else if (e.key === 'Escape') {
      cancelEdit();
    }
  };

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.1, 1.5));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.1, 0.3));
  };

  const handleResetZoom = () => {
    setZoomLevel(0.6);
  };

  const getStepStatus = () => {
    if (samples.length > 0) {
      return 'completed';
    }
    return 'not-started';
  };

  const status = getStepStatus();

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
        {t('emotionsMap.title')}
        <StatusTag status={status} />
      </h2>
      <p
        className="text-md text-black leading-relaxed mb-6"
      >
        {t('emotionsMap.description')}
      </p>

      {/* Zoom Controls */}
      <div className="flex items-center justify-start mb-4">
        <div className="flex items-center space-x-2">
          <button
            onClick={handleZoomOut}
            className="p-2 rounded-lg transition-all duration-300 hover:scale-110 cursor-pointer"
            style={{
              backgroundColor: stageColors.background.button.secondary,
              color: stageColors.background.button.text,
              boxShadow: shadows.small
            }}
            title={t('emotionsMap.zoomOut')}
          >
            <FaSearchMinus className="w-4 h-4" />
          </button>
          <button
            onClick={handleResetZoom}
            className="px-3 py-2 rounded-lg transition-all duration-300 hover:scale-110 cursor-pointer text-sm font-medium"
            style={{
              backgroundColor: stageColors.background.button.secondary,
              color: stageColors.background.button.text,
              boxShadow: shadows.small
            }}
          >
            {Math.round(zoomLevel * 100)}%
          </button>
          <button
            onClick={handleZoomIn}
            className="p-2 rounded-lg transition-all duration-300 hover:scale-110 cursor-pointer"
            style={{
              backgroundColor: stageColors.background.button.secondary,
              color: stageColors.background.button.text,
              boxShadow: shadows.small
            }}
            title={t('emotionsMap.zoomIn')}
          >
            <FaSearchPlus className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="relative overflow-auto rounded-lg" style={{ height: '500px' }}>
        <iframe
          ref={iframeRef}
          src="https://www.ocf.berkeley.edu/~acowen/music.html#modal"
          title={t('emotionsMap.iframeTitle')}
          style={{
            width: '166.67%',
            height: '900px',
            transform: `scale(${zoomLevel})`,
            transformOrigin: 'top left',
            border: 'none',
            borderRadius: '0.5rem'
          }}
          className="rounded-lg"
          sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-downloads allow-modals allow-presentation allow-top-navigation"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="no-referrer"
        />
      </div>

      <div className="mt-8">
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
            {t('emotionsMap.selectedSamples')}
          </h3>
          <div>
            {samples.map((sample, index) => (
              <div key={index} className={`flex flex-row items-center justify-between rounded-xl border mb-2${fullWidth ? ' w-full' : ''}`}
                style={{
                  backgroundColor: stageColors.background.card,
                  borderColor: stageColors.border.light,
                  boxShadow: shadows.medium,
                  minHeight: 48,
                  padding: '12px 16px'
                }}
              >
                {editingIndex === index ? (
                  <div className="flex items-center space-x-2 flex-1">
                    <input
                      type="number"
                      value={editingNumber}
                      onChange={(e) => setEditingNumber(e.target.value)}
                      onKeyDown={handleEditEnterKey}
                      className="w-20 bg-transparent border-none outline-none text-center"
                      style={{ color: stageColors.text.primary }}
                      autoFocus
                    />
                    <span style={{ color: stageColors.text.primary }}>-</span>
                    <input
                      type="text"
                      value={editingDimension}
                      onChange={(e) => setEditingDimension(e.target.value)}
                      onKeyDown={handleEditEnterKey}
                      className="flex-1 bg-transparent border-none outline-none"
                      style={{ color: stageColors.text.primary }}
                    />
                  </div>
                ) : (
                  <span style={{ color: stageColors.text.primary, fontWeight: 400 }}>
                    {t('emotionsMap.sampleInfo', { number: sample.number, dimension: sample.dimension })}
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
                        onClick={() => startEditing(index, sample)}
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
                        onClick={() => removeSample(index)}
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
            {samples.length === 0 && (
              <p
                className="text-center py-2"
                style={{ color: stageColors.text.muted }}
              >
                {t('emotionsMap.noSamples')}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <input
              type="number"
              id="sample-number"
              value={sampleNumber}
              onChange={(e) => setSampleNumber(e.target.value)}
              placeholder={t('emotionsMap.sampleNumberPlaceholder')}
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
              type="text"
              id="sample-dimension"
              value={dimension}
              onChange={(e) => setDimension(e.target.value)}
              placeholder={t('emotionsMap.dimensionPlaceholder')}
              className="flex-1 rounded-xl p-4 border transition-all duration-300 focus:outline-none focus:ring-2"
              style={{
                backgroundColor: stageColors.background.card,
                borderColor: stageColors.border.light,
                color: stageColors.text.primary,
                boxShadow: shadows.small
              }}
              onKeyDown={handleEnterKey}
            />
            <button
              onClick={handleSubmit}
              className="px-8 py-4 rounded-xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer"
              style={{
                backgroundColor: stageColors.background.button.primary,
                borderColor: stageColors.border.button,
                color: stageColors.background.button.text,
                boxShadow: shadows.medium,
                transition: theme.transitions.default
              }}
            >
              {t('emotionsMap.addButton')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmotionsMap;