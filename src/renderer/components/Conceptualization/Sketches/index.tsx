import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { DIRECTORIES, STORE_KEYS } from '../../../globals/constants';
import { useTheme } from '../../../contexts/ThemeContext';
import { useTranslation } from 'react-i18next';
import { useThunder } from '../../../contexts/Thunder';
import { MdAdd, MdDelete } from 'react-icons/md';
import type { ElectronAPI } from '../../../types/electron';

const Sketches = () => {
  const { t } = useTranslation();
  const { mode, theme } = useTheme();
  const { data, saveStyleDecisions } = useThunder();

  const sketches = data.conceptualization.styleDecisions.sketches;
  const modeColors = mode === 'dark' ? theme.colors.dark : theme.colors.light;
  const stageColors = modeColors.stages.conceptualization;
  const typography = theme.typography;
  const shadows = theme.shadows;

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const reader = new FileReader();
      const fileData = await new Promise((resolve) => {
        reader.onload = () => resolve(reader.result);
        reader.readAsDataURL(file);
      });

      const fileName = `${uuidv4()}.${file.name.split('.').pop()}`;
      const savedFilePath = await (window.electron as ElectronAPI).saveFile(fileData, fileName, DIRECTORIES.SKETCHES);

      const newSketch = {
        id: uuidv4(),
        type: 'image' as const,
        url: savedFilePath,
        name: file.name
      };

      const updatedSketches = [...sketches, newSketch];
      saveStyleDecisions({ sketches: updatedSketches });
    } catch (err) {
      console.error('Error uploading sketch:', err);
    }
  };

  const handleDeleteSketch = async (id: string) => {
    const updatedSketches = sketches.filter(sketch => sketch.id !== id);
    saveStyleDecisions({ sketches: updatedSketches });
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
      <h2
        className="text-left leading-tight mb-6"
        style={{
          fontSize: typography.h2.size,
          fontWeight: typography.h2.weight,
          lineHeight: typography.h2.lineHeight,
          color: mode === 'dark' ? modeColors.text.primary : stageColors.text.primary
        }}
      >
        {t('sketches.title')}
      </h2>
      <p
        className="text-md text-black leading-relaxed mb-6"
      >
        {t('sketches.description')}
      </p>

      <div className="flex gap-4 mb-6">
        <div>
          <input
            type="file"
            id="sketch-upload"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
          <label
            htmlFor="sketch-upload"
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
              <MdAdd size={24} />
              <span>{t('sketches.upload')}</span>
              <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">→</span>
            </div>
          </label>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
        {sketches.map((sketch) => (
          <div key={sketch.id} className="relative group">
            <div className="aspect-square rounded-lg overflow-hidden transition-all duration-300 hover:scale-105"
              style={{
                backgroundColor: mode === 'dark' ? modeColors.background.card : stageColors.background.card,
                borderColor: mode === 'dark' ? modeColors.border.light : stageColors.border.light,
                boxShadow: shadows.medium
              }}
            >
              <img
                src={sketch.url}
                alt={sketch.name}
                className="w-full h-full object-cover"
              />
            </div>
            <button
              onClick={() => handleDeleteSketch(sketch.id)}
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
        ))}
      </div>
    </div>
  );
};

export default Sketches;