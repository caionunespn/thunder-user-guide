import React from 'react';
import { useTheme } from '../../../contexts/ThemeContext';
import { useTranslation } from 'react-i18next';

export const AboutThunder = () => {
  const { t } = useTranslation();
  const { mode, theme } = useTheme();
  const colors = theme.colors[mode];
  const shadows = theme.shadows;
  const typography = theme.typography;

  return (
    <div
      className="backdrop-blur-lg rounded-2xl p-6 shadow-xl border"
      style={{
        backgroundColor: colors.background.card,
        borderColor: colors.border.light,
        boxShadow: shadows.large
      }}
      role="region"
      aria-label={t('home.title')}
    >
      <h1
        className="text-center leading-tight mb-4"
        style={{
          fontSize: typography.h1.size,
          fontWeight: typography.h1.weight,
          lineHeight: typography.h1.lineHeight,
          color: colors.text.primary
        }}
      >
        {t('home.title')}
      </h1>

      <p
        className="text-center mx-auto"
        style={{
          fontSize: typography.body.large.size,
          lineHeight: typography.body.large.lineHeight,
          color: colors.text.black
        }}
      >
        {t('home.description')}
      </p>
    </div>
  );
};