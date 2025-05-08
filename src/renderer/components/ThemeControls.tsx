import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { MdSettings, MdDarkMode, MdLightMode, MdFormatSize, MdLanguage, MdDelete } from 'react-icons/md';
import { useTranslation } from 'react-i18next';
import { GiBrazilFlag, GiUsaFlag } from 'react-icons/gi'; // Importing flag icons
import { useThunder } from '../contexts/Thunder';

export function ThemeControls() {
  const [isOpen, setIsOpen] = useState(false);
  const { mode, fontSize, toggleTheme, setFontSize, theme } = useTheme();
  const { clearStorage } = useThunder();
  const colors = theme.colors[mode];
  const shadows = theme.shadows;
  const transitions = theme.transitions;

  const { i18n, t } = useTranslation();

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  const handleClearStorage = async () => {
    if (window.confirm(i18n.t('themeControls.clearStorageConfirm'))) {
      await clearStorage();
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label={t('themeControls.openSettings')}
        className="rounded-full p-3 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2"
        style={{
          backgroundColor: colors.background.card,
          color: colors.text.primary,
          boxShadow: shadows.medium,
          transform: isOpen ? 'rotate(180deg)' : 'rotate(0)',
          transition: transitions.default
        }}
      >
        <MdSettings size={24} aria-hidden="true" focusable="false" />
      </button>

      {isOpen && (
        <div
          className="absolute bottom-14 right-0 flex flex-col gap-2 rounded-lg shadow-lg p-4"
          style={{
            backgroundColor: colors.background.card,
            boxShadow: `${shadows.medium}, 0 0 0 2px ${colors.border.light}`,
          }}
          role="menu"
          aria-label={t('themeControls.settings')}
        >
          {/* <button
            onClick={toggleTheme}
            className="rounded-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-lg flex items-center justify-center gap-2 w-64 h-12"
            style={{
              backgroundColor: colors.background.button.primary,
              color: colors.background.button.text,
              boxShadow: shadows.small,
              borderColor: colors.border.button.primary,
              transition: transitions.default
            }}
          >
            {mode === 'light' ? (
              <>
                <MdDarkMode size={24} />
                <span>{i18n.t('themeControls.darkMode')}</span>
              </>
            ) : (
              <>
                <MdLightMode size={24} />
                <span>{i18n.t('themeControls.lightMode')}</span>
              </>
            )}
          </button> */}

          <div className="flex gap-2 w-64" role="group" aria-label={t('themeControls.fontSize')}>
            <button
              onClick={() => setFontSize('small')}
              className={`flex-1 rounded-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-lg flex items-center justify-center h-12 focus-visible:outline-2 focus-visible:outline-offset-2 ${fontSize === 'small' ? 'ring-2 ring-offset-2' : ''}`}
              style={{
                backgroundColor: colors.background.button.secondary,
                color: colors.background.button.text,
                boxShadow: shadows.small,
                borderColor: colors.border.button.secondary,
                transition: transitions.default
              }}
              aria-pressed={fontSize === 'small'}
              aria-label={t('themeControls.smallFont')}
            >
              <MdFormatSize size={16} aria-hidden="true" focusable="false" />
            </button>
            <button
              onClick={() => setFontSize('medium')}
              className={`flex-1 rounded-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-lg flex items-center justify-center h-12 focus-visible:outline-2 focus-visible:outline-offset-2 ${fontSize === 'medium' ? 'ring-2 ring-offset-2' : ''}`}
              style={{
                backgroundColor: colors.background.button.secondary,
                color: colors.background.button.text,
                boxShadow: shadows.small,
                borderColor: colors.border.button.secondary,
                transition: transitions.default
              }}
              aria-pressed={fontSize === 'medium'}
              aria-label={t('themeControls.mediumFont')}
            >
              <MdFormatSize size={24} aria-hidden="true" focusable="false" />
            </button>
            <button
              onClick={() => setFontSize('large')}
              className={`flex-1 rounded-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-lg flex items-center justify-center h-12 focus-visible:outline-2 focus-visible:outline-offset-2 ${fontSize === 'large' ? 'ring-2 ring-offset-2' : ''}`}
              style={{
                backgroundColor: colors.background.button.secondary,
                color: colors.background.button.text,
                boxShadow: shadows.small,
                borderColor: colors.border.button.secondary,
                transition: transitions.default
              }}
              aria-pressed={fontSize === 'large'}
              aria-label={t('themeControls.largeFont')}
            >
              <MdFormatSize size={32} aria-hidden="true" focusable="false" />
            </button>
          </div>

          <div className="flex gap-2 w-64" role="group" aria-label={t('themeControls.language')}>
            <button
              onClick={() => handleLanguageChange('pt')}
              className={`flex-1 rounded-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-lg flex items-center justify-center h-12 focus-visible:outline-2 focus-visible:outline-offset-2 ${i18n.language === 'pt' ? 'ring-2 ring-offset-2' : ''}`}
              style={{
                backgroundColor: '#009c3b',
                color: '#ffffff',
                boxShadow: shadows.small,
                borderColor: '#009c3b',
                transition: transitions.default
              }}
              aria-pressed={i18n.language === 'pt'}
              aria-label={t('themeControls.portuguese')}
            >
              <GiBrazilFlag size={16} className="mr-2" aria-hidden="true" focusable="false" />
              <span>PT</span>
            </button>
            <button
              onClick={() => handleLanguageChange('en')}
              className={`flex-1 rounded-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-lg flex items-center justify-center h-12 focus-visible:outline-2 focus-visible:outline-offset-2 ${i18n.language === 'en' ? 'ring-2 ring-offset-2' : ''}`}
              style={{
                backgroundColor: '#b22234',
                color: '#ffffff',
                boxShadow: shadows.small,
                borderColor: '#b22234',
                transition: transitions.default
              }}
              aria-pressed={i18n.language === 'en'}
              aria-label={t('themeControls.english')}
            >
              <GiUsaFlag size={16} className="mr-2" aria-hidden="true" focusable="false" />
              <span>EN</span>
            </button>
          </div>

          <button
            onClick={handleClearStorage}
            className="rounded-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-lg flex items-center justify-center gap-2 w-64 h-12 focus-visible:outline-2 focus-visible:outline-offset-2"
            style={{
              backgroundColor: colors.background.button.danger,
              color: colors.background.button.text,
              boxShadow: shadows.small,
              borderColor: colors.border.button.danger,
              transition: transitions.default
            }}
            aria-label={t('themeControls.clearStorage')}
          >
            <MdDelete size={24} aria-hidden="true" focusable="false" />
            <span>{i18n.t('themeControls.clearStorage')}</span>
          </button>
        </div>
      )}
    </div>
  );
}