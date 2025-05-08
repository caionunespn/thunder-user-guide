import React from 'react';
import { MdFileDownload } from 'react-icons/md';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';

export const ExportButton = () => {
  const { t } = useTranslation();
  const { mode, theme } = useTheme();
  const colors = theme.colors[mode];
  const shadows = theme.shadows;

  return (
    <Link
      to="/report"
      className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer"
      style={{
        borderWidth: 2,
        borderColor: colors.brand.main,
        color: colors.text.primary,
        boxShadow: shadows.small,
      }}
    >
      <MdFileDownload size={20} aria-hidden="true" focusable="false" aria-label="Download report" />
      <span className="text-sm">{t('home.exportReport')}</span>
    </Link>
  );
}; 