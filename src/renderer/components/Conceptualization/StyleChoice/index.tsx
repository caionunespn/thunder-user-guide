import React from "react";
import { useTheme } from "../../../contexts/ThemeContext";
import { useTranslation } from "react-i18next";
import { useThunder } from "../../../contexts/Thunder";

export const StyleChoice = () => {
  const { t } = useTranslation();
  const { mode, theme } = useTheme();
  const modeColors = mode === 'dark' ? theme.colors.dark : theme.colors.light;
  const stageColors = modeColors.stages.conceptualization;
  const typography = theme.typography;
  const shadows = theme.shadows;

  const { data, saveStyleDecisions } = useThunder();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    saveStyleDecisions({ styleChoice: value });
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
        {t('styleChoice.title')}
      </h2>
      <p
        className="text-md text-black leading-relaxed mb-6"
      >
        {t('styleChoice.description')}
      </p>

      <form className="space-y-6 mt-8 w-full">
        <div className="w-full">
          <input
            type="text"
            id="style-choice"
            value={data.conceptualization.styleDecisions.styleChoice}
            onChange={handleInputChange}
            placeholder={t('styleChoice.inputPlaceholder')}
            className="w-full rounded-xl p-4 border transition-all duration-300 focus:outline-none focus:ring-2"
            style={{
              backgroundColor: mode === 'dark' ? modeColors.background.card : stageColors.background.card,
              borderColor: mode === 'dark' ? modeColors.border.light : stageColors.border.light,
              color: mode === 'dark' ? modeColors.text.primary : stageColors.text.primary,
              boxShadow: shadows.small
            }}
          />
        </div>
      </form>
    </div>
  );
};
