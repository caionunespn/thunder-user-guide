import React, { useState, useEffect, useRef, useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { DIRECTORIES, STORE_KEYS } from '../../../globals/constants';
import { useTheme } from '../../../contexts/ThemeContext';
import { useTranslation } from 'react-i18next';
import { useThunder } from '../../../contexts/Thunder';
import { MdAdd, MdDelete, MdPlayArrow, MdPause, MdImage, MdVideoLibrary, MdMusicNote } from 'react-icons/md';
import type { ElectronAPI } from '../../../types/electron';
import { StatusTag } from '../../StatusTag';

interface ReferenceItem {
  id: string;
  type: 'image' | 'video' | 'audio';
  url: string;
  name: string;
}

const ReferencesMoodboard = () => {
  const { t } = useTranslation();
  const { mode, theme } = useTheme();
  const { data, saveStyleDecisions } = useThunder();

  const references = data.conceptualization.styleDecisions.references;
  const [playingAudio, setPlayingAudio] = useState<string | null>(null);
  const [audioProgress, setAudioProgress] = useState<{ [key: string]: number }>({});
  const [audioDuration, setAudioDuration] = useState<{ [key: string]: number }>({});
  const audioRefs = useRef<{ [key: string]: HTMLAudioElement }>({});
  const modeColors = mode === 'dark' ? theme.colors.dark : theme.colors.light;
  const stageColors = modeColors.stages.conceptualization;
  const typography = theme.typography;
  const shadows = theme.shadows;

  const gridSize = useMemo(() => {
    const itemCount = references.length;
    if (itemCount <= 4) return { rows: 2, cols: 2 };
    if (itemCount <= 9) return { rows: 3, cols: 3 };
    if (itemCount <= 16) return { rows: 4, cols: 4 };
    return { rows: Math.ceil(Math.sqrt(itemCount)), cols: Math.ceil(Math.sqrt(itemCount)) };
  }, [references.length]);

  const containerHeight = useMemo(() => {
    const baseHeight = 400; // Minimum height
    const additionalHeight = Math.max(0, gridSize.rows - 2) * 200;
    return baseHeight + additionalHeight;
  }, [gridSize.rows]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: 'image' | 'video' | 'audio') => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const reader = new FileReader();
      const fileData = await new Promise((resolve) => {
        reader.onload = () => resolve(reader.result);
        reader.readAsDataURL(file);
      });

      const fileName = `${uuidv4()}.${file.name.split('.').pop()}`;
      const dirName = type === 'image' ? DIRECTORIES.IMAGES :
        type === 'video' ? DIRECTORIES.VIDEOS :
          DIRECTORIES.MUSIC;

      const savedFilePath = await (window.electron as ElectronAPI).saveFile(fileData, fileName, dirName);

      const newReference: ReferenceItem = {
        id: uuidv4(),
        type,
        url: savedFilePath,
        name: file.name
      };

      const updatedReferences = [...references, newReference];
      saveStyleDecisions({ references: updatedReferences });
    } catch (err) {
      console.error('Error uploading file:', err);
    }
  };

  const handleDeleteReference = async (id: string) => {
    const updatedReferences = references.filter(ref => ref.id !== id);
    saveStyleDecisions({ references: updatedReferences });
  };

  const toggleAudioPlay = (id: string) => {
    const audio = audioRefs.current[id];
    if (!audio) return;

    if (playingAudio === id) {
      audio.pause();
      setPlayingAudio(null);
    } else {
      if (playingAudio) {
        const previousAudio = audioRefs.current[playingAudio];
        if (previousAudio) {
          previousAudio.pause();
        }
      }
      audio.play();
      setPlayingAudio(id);
    }
  };

  const handleTimeUpdate = (id: string) => {
    const audio = audioRefs.current[id];
    if (audio) {
      setAudioProgress(prev => ({
        ...prev,
        [id]: (audio.currentTime / audio.duration) * 100
      }));
    }
  };

  const handleLoadedMetadata = (id: string) => {
    const audio = audioRefs.current[id];
    if (audio) {
      setAudioDuration(prev => ({
        ...prev,
        [id]: audio.duration
      }));
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const renderReference = (reference: ReferenceItem) => {
    switch (reference.type) {
      case 'image':
        return (
          <div className="w-full h-full rounded-lg overflow-hidden transition-all duration-300 hover:scale-105"
            style={{
              backgroundColor: mode === 'dark' ? modeColors.background.card : stageColors.background.card,
              borderColor: mode === 'dark' ? modeColors.border.light : stageColors.border.light,
              boxShadow: shadows.medium
            }}
          >
            <img
              src={reference.url}
              alt={reference.name}
              className="w-full h-full object-cover"
            />
          </div>
        );
      case 'video':
        return (
          <div className="w-full h-full rounded-lg overflow-hidden transition-all duration-300 hover:scale-105"
            style={{
              backgroundColor: mode === 'dark' ? modeColors.background.card : stageColors.background.card,
              borderColor: mode === 'dark' ? modeColors.border.light : stageColors.border.light,
              boxShadow: shadows.medium
            }}
          >
            <video
              src={reference.url}
              controls
              className="w-full h-full object-cover"
            />
          </div>
        );
      case 'audio':
        return (
          <div className="relative w-full h-full flex flex-col items-center justify-center rounded-lg p-4 transition-all duration-300 hover:scale-105"
            style={{
              backgroundColor: mode === 'dark' ? modeColors.background.card : stageColors.background.card,
              borderColor: mode === 'dark' ? modeColors.border.light : stageColors.border.light,
              boxShadow: shadows.medium
            }}
          >
            <audio
              ref={(el) => {
                if (el) {
                  audioRefs.current[reference.id] = el;
                  el.addEventListener('timeupdate', () => handleTimeUpdate(reference.id));
                  el.addEventListener('loadedmetadata', () => handleLoadedMetadata(reference.id));
                }
              }}
              src={reference.url}
              className="hidden"
            />
            <div className="flex items-center justify-center w-full h-full">
              <button
                onClick={() => toggleAudioPlay(reference.id)}
                className="relative w-24 h-24 rounded-full flex items-center justify-center group hover:scale-105 transition-all duration-300"
                style={{
                  backgroundColor: stageColors.background.button.primary,
                  borderColor: stageColors.border.button,
                  color: stageColors.background.button.text,
                  boxShadow: shadows.medium
                }}
              >
                {playingAudio === reference.id ? (
                  <MdPause size={40} />
                ) : (
                  <MdPlayArrow size={40} />
                )}
              </button>
            </div>
            <div className="w-full mt-6">
              <div className="h-1.5 rounded-full overflow-hidden"
                style={{
                  backgroundColor: mode === 'dark' ? modeColors.background.card : stageColors.background.card,
                  borderColor: mode === 'dark' ? modeColors.border.light : stageColors.border.light,
                }}
              >
                <div
                  className="h-full transition-all duration-300"
                  style={{
                    width: `${audioProgress[reference.id] || 0}%`,
                    backgroundColor: stageColors.accent.primary
                  }}
                />
              </div>
              <div className="flex justify-between text-xs mt-2"
                style={{
                  color: mode === 'dark' ? modeColors.text.secondary : stageColors.text.secondary
                }}
              >
                <span>{formatTime((audioProgress[reference.id] || 0) * (audioDuration[reference.id] || 0) / 100)}</span>
                <span>{formatTime(audioDuration[reference.id] || 0)}</span>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className="backdrop-blur-lg rounded-2xl p-8 shadow-xl border"
      style={{
        backgroundColor: mode === 'dark' ? modeColors.background.card : stageColors.background.card,
        borderColor: mode === 'dark' ? modeColors.border.light : stageColors.border.light,
        boxShadow: shadows.large
      }}
    >
      <div className="flex items-end mb-3">
        <h2
          className="text-left leading-tight"
          style={{
            fontSize: typography.h2.size,
            fontWeight: typography.h2.weight,
            lineHeight: typography.h2.lineHeight,
            color: mode === 'dark' ? modeColors.text.primary : stageColors.text.primary
          }}
        >
          {t('referencesMoodboard.title')}
        </h2>
        <StatusTag status={references.length > 0 ? 'completed' : 'not-started'} />
      </div>
      <p
        className="text-md text-black leading-relaxed mb-6"
      >
        {t('referencesMoodboard.description')}
      </p>

      <div className="flex gap-4 mb-6">
        <div>
          <input
            type="file"
            id="image-upload"
            accept="image/*"
            onChange={(e) => handleFileUpload(e, 'image')}
            className="hidden"
          />
          <label
            htmlFor="image-upload"
            className="group block w-full backdrop-blur-md rounded-xl text-center border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer"
            style={{
              backgroundColor: stageColors.background.button.primary,
              padding: '0.75rem',
              boxShadow: shadows.medium,
              borderColor: stageColors.border.button,
              color: mode === 'dark' ? modeColors.background.button.text : stageColors.background.button.text,
              transition: theme.transitions.default
            }}
          >
            <div className="flex items-center justify-center space-x-4">
              <MdImage size={24} />
              <span>{t('referencesMoodboard.addImage')}</span>
              <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">→</span>
            </div>
          </label>
        </div>

        <div>
          <input
            type="file"
            id="video-upload"
            accept="video/*"
            onChange={(e) => handleFileUpload(e, 'video')}
            className="hidden"
          />
          <label
            htmlFor="video-upload"
            className="group block w-full backdrop-blur-md rounded-xl text-center border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer"
            style={{
              backgroundColor: stageColors.background.button.primary,
              padding: '0.75rem',
              boxShadow: shadows.medium,
              borderColor: stageColors.border.button,
              color: mode === 'dark' ? modeColors.background.button.text : stageColors.background.button.text,
              transition: theme.transitions.default
            }}
          >
            <div className="flex items-center justify-center space-x-4">
              <MdVideoLibrary size={24} />
              <span>{t('referencesMoodboard.addVideo')}</span>
              <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">→</span>
            </div>
          </label>
        </div>

        <div>
          <input
            type="file"
            id="audio-upload"
            accept="audio/*"
            onChange={(e) => handleFileUpload(e, 'audio')}
            className="hidden"
          />
          <label
            htmlFor="audio-upload"
            className="group block w-full backdrop-blur-md rounded-xl text-center border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer"
            style={{
              backgroundColor: stageColors.background.button.primary,
              padding: '0.75rem',
              boxShadow: shadows.medium,
              borderColor: stageColors.border.button,
              color: mode === 'dark' ? modeColors.background.button.text : stageColors.background.button.text,
              transition: theme.transitions.default
            }}
          >
            <div className="flex items-center justify-center space-x-4">
              <MdMusicNote size={24} />
              <span>{t('referencesMoodboard.addAudio')}</span>
              <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">→</span>
            </div>
          </label>
        </div>
      </div>

      <div
        className="relative w-full overflow-hidden rounded-xl mt-8"
        style={{
          backgroundColor: mode === 'dark' ? modeColors.background.card : stageColors.background.card,
          borderColor: mode === 'dark' ? modeColors.border.light : stageColors.border.light,
          boxShadow: shadows.medium,
          height: `${containerHeight}px`
        }}
      >
        {references.map((reference, index) => {
          const row = Math.floor(index / gridSize.cols);
          const col = index % gridSize.cols;
          const rowHeight = 100 / gridSize.rows;
          const colWidth = 100 / gridSize.cols;

          return (
            <div
              key={reference.id}
              className="absolute transition-all duration-300 hover:z-10"
              style={{
                top: `${row * rowHeight}%`,
                left: `${col * colWidth}%`,
                width: `${colWidth}%`,
                height: `${rowHeight}%`,
                padding: '8px'
              }}
            >
              <div className="relative w-full h-full group">
                {renderReference(reference)}
                <button
                  onClick={() => handleDeleteReference(reference.id)}
                  className="absolute top-2 right-2 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    backgroundColor: stageColors.background.button.secondary,
                    borderColor: stageColors.border.button,
                    color: stageColors.background.button.text,
                    boxShadow: shadows.medium
                  }}
                >
                  <MdDelete size={20} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ReferencesMoodboard;
