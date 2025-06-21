import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { useTranslation } from 'react-i18next';

export const Footer = () => {
  const { t } = useTranslation();
  const { mode, theme } = useTheme();
  const colors = theme.colors[mode];
  const typography = theme.typography;

  return (
    <p
      className="text-center text-lg py-8"
      style={{
        fontSize: typography.body.medium.size,
        lineHeight: typography.body.medium.lineHeight,
        color: colors.text.primary
      }}
    >
      {t('home.footer')}
    </p>
  );
};
