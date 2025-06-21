import React, { useState, useRef, useEffect } from "react";
import { ChromePicker } from 'react-color';
import { useTheme } from "../../../contexts/ThemeContext";
import { useTranslation } from "react-i18next";
import { useThunder } from "../../../contexts/Thunder";
import { MdAdd, MdClose } from 'react-icons/md';
import { StatusTag } from "../../StatusTag";

export const PalleteChoice = () => {
  const { t } = useTranslation();
  const { mode, theme } = useTheme();
  const { data, saveStyleDecisions } = useThunder();

  const modeColors = mode === 'dark' ? theme.colors.dark : theme.colors.light;
  const stageColors = modeColors.stages.conceptualization;
  const typography = theme.typography;
  const shadows = theme.shadows;

  const colors = data.conceptualization.styleDecisions.colorPalette;
  const [showPicker, setShowPicker] = useState<number | null>(null);
  const pickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        setShowPicker(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleColorChange = (index: number, color: any) => {
    const newColors = [...colors];
    newColors[index] = color.hex;
    saveStyleDecisions({ colorPalette: newColors });
  };

  const addColor = () => {
    saveStyleDecisions({ colorPalette: [...colors, '#000000'] });
  };

  const removeColor = (index: number) => {
    if (colors.length > 1) {
      const newColors = colors.filter((_, i) => i !== index);
      saveStyleDecisions({ colorPalette: newColors });
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
          {t('palleteChoice.title')}
        </h2>
        <StatusTag status={colors.length > 1 ? 'completed' : 'not-started'} />
      </div>
      <p
        className="text-md text-black leading-relaxed mb-6">
        {t('palleteChoice.description')}
      </p>

      <div className="space-y-6 mt-8">
        <div className="flex flex-wrap gap-4">
          {colors.map((color, index) => (
            <div key={index} className="flex flex-col items-center space-y-2">
              <div
                className="w-12 h-12 rounded-lg cursor-pointer border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                style={{
                  backgroundColor: color,
                  borderColor: mode === 'dark' ? modeColors.border.light : stageColors.border.light,
                  boxShadow: shadows.medium
                }}
                onClick={() => setShowPicker(showPicker === index ? null : index)}
              />
              <button
                onClick={() => removeColor(index)}
                className="p-2 rounded-full transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                style={{
                  backgroundColor: stageColors.background.button.secondary,
                  borderColor: stageColors.border.button,
                  color: stageColors.background.button.text,
                  boxShadow: shadows.medium
                }}
              >
                <MdClose size={20} />
              </button>
              {showPicker === index && (
                <div ref={pickerRef} className="fixed z-50" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                  <ChromePicker
                    color={color}
                    onChange={(color) => handleColorChange(index, color)}
                  />
                </div>
              )}
            </div>
          ))}
          <button
            onClick={addColor}
            className="flex items-center justify-center px-6 py-3 rounded-xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer"
            style={{
              backgroundColor: stageColors.background.button.primary,
              borderColor: stageColors.border.button,
              color: stageColors.background.button.text,
              boxShadow: shadows.medium,
              transition: theme.transitions.default,
              height: '48px',
              minWidth: 'auto'
            }}
          >
            <MdAdd size={20} className="mr-2" />
            <span>{t('palleteChoice.add')}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
