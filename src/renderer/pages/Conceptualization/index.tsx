import React from "react";
import { Link } from "react-router-dom";
import { ThemeControls } from "../../components/ThemeControls";
import { useTheme } from "../../contexts/ThemeContext";
import { useTranslation } from "react-i18next";

const Conceptualization = () => {
  const { mode, theme } = useTheme();
  const { t } = useTranslation();
  const stageColors = theme.colors[mode].stages.conceptualization;
  const modeColors = theme.colors[mode];
  const typography = theme.typography;
  const shadows = theme.shadows;
  const transitions = theme.transitions;

  return (
    <div
      className="min-h-screen py-12 px-4 sm:px-6 lg:px-8"
      style={{
        background: mode === 'dark'
          ? `linear-gradient(to bottom right, ${modeColors.background.gradient.from}, ${modeColors.background.gradient.via}, ${modeColors.background.gradient.to})`
          : `linear-gradient(to bottom right, ${stageColors.background.gradient.from}, ${stageColors.background.gradient.via}, ${stageColors.background.gradient.to})`
      }}
    >
      <div className="max-w-6xl mx-auto">
        <div
          className="backdrop-blur-lg rounded-2xl p-8 shadow-xl border"
          style={{
            backgroundColor: mode === 'dark' ? modeColors.background.card : stageColors.background.card,
            borderColor: mode === 'dark' ? modeColors.border.light : stageColors.border.light,
            boxShadow: shadows.large
          }}
        >
          <Link
            to="/"
            className="inline-flex items-center mb-8"
            style={{
              color: mode === 'dark' ? modeColors.text.secondary : stageColors.text.secondary
            }}
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            {t('conceptualization.back')}
          </Link>

          <h1
            className="text-center leading-tight mb-8"
            style={{
              fontSize: typography.h1.size,
              fontWeight: typography.h1.weight,
              lineHeight: typography.h1.lineHeight,
              color: mode === 'dark' ? modeColors.text.primary : stageColors.text.primary
            }}
          >
            {t('conceptualization.title')}
          </h1>

          <p
            className="text-center mb-12"
            style={{
              fontSize: typography.body.large.size,
              lineHeight: typography.body.large.lineHeight,
              color: mode === 'dark' ? modeColors.text.primary : stageColors.text.primary
            }}
          >
            {t('conceptualization.description')}
          </p>

          <div className="space-y-6">
            <Link
              to="/conceptualization/music-decisions"
              className="group block w-full backdrop-blur-md rounded-xl text-center border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              style={{
                backgroundColor: mode === 'dark' ? modeColors.background.button.primary : stageColors.background.button.primary,
                padding: theme.spacing.button.padding,
                boxShadow: shadows.medium,
                borderColor: mode === 'dark' ? modeColors.border.button.primary : stageColors.border.button,
                color: mode === 'dark' ? modeColors.background.button.text : stageColors.background.button.text,
                transition: transitions.default
              }}
            >
              <div className="flex items-center justify-center space-x-4">
                <span className="text-2xl">🎵</span>
                <span>{t('conceptualization.musicAndInteractionDecisions')}</span>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">→</span>
              </div>
            </Link>

            <Link
              to="/conceptualization/style-decisions"
              className="group block w-full backdrop-blur-md rounded-xl text-center border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              style={{
                backgroundColor: mode === 'dark' ? modeColors.background.button.secondary : stageColors.background.button.secondary,
                padding: theme.spacing.button.padding,
                boxShadow: shadows.medium,
                borderColor: mode === 'dark' ? modeColors.border.button.secondary : stageColors.border.button,
                color: mode === 'dark' ? modeColors.background.button.text : stageColors.background.button.text,
                transition: transitions.default
              }}
            >
              <div className="flex items-center justify-center space-x-4">
                <span className="text-2xl">🎨</span>
                <span>{t('conceptualization.styleDecisions')}</span>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">→</span>
              </div>
            </Link>
          </div>

          <p
            className="mt-12 text-center"
            style={{
              fontSize: typography.body.medium.size,
              lineHeight: typography.body.medium.lineHeight,
              color: mode === 'dark' ? modeColors.text.muted : stageColors.text.muted
            }}
          >
            {t('conceptualization.additionalInfo')}
          </p>
        </div>
      </div>
      <ThemeControls />
    </div>
  );
};

export default Conceptualization;
