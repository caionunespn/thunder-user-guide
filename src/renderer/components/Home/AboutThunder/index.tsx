import React from 'react';
import { useTheme } from '../../../contexts/ThemeContext';
import { useTranslation } from 'react-i18next';
import { IoIosAlert } from "react-icons/io";

export const AboutThunder = () => {
  const { t } = useTranslation();
  const { mode, theme } = useTheme();
  const colors = theme.colors[mode];
  const shadows = theme.shadows;
  const typography = theme.typography;

  return (
    <>
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
        <style>
          {`
          .about-thunder .disclaimer strong {
            color: ${colors.status.warning.main} !important;
          }
        `}
        </style>

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

        <div className="about-thunder">
          <p
            className="text-center"
            style={{
              fontSize: typography.body.medium.size,
              lineHeight: typography.body.medium.lineHeight,
              color: colors.text.black
            }}
            dangerouslySetInnerHTML={{
              __html: t('home.description1')
            }}
          />
        </div>
      </div>

      <div
        className="flex items-center p-4 rounded-lg border-l-4"
        style={{
          backgroundColor: colors.background.card,
          borderColor: colors.primary.main
        }}
      >
        <div>
          <h3
            className="font-semibold mb-1 flex items-center"
            style={{
              fontSize: typography.body.large.size,
              lineHeight: typography.body.large.lineHeight,
              color: colors.primary.dark
            }}
          >
            <IoIosAlert
              className="w-5 h-5 mr-2 flex-shrink-0"
              style={{ color: colors.primary.dark }}
            />
            {t('status.information')}
          </h3>
          <p
            style={{
              fontSize: typography.body.medium.size,
              lineHeight: typography.body.medium.lineHeight,
              color: colors.status.neutral.dark,
              fontStyle: 'italic'
            }}
            dangerouslySetInnerHTML={{
              __html: t('home.description3')
            }}
          />
        </div>
      </div>
    </>
  );
};