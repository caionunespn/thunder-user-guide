import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import MusicChoice from "../../../components/Conceptualization/MusicChoice";
import WordAssociation from "../../../components/Conceptualization/WordAssociation";
import EmotionsMap from "../../../components/Conceptualization/EmotionsMap";
import { useTheme } from "../../../contexts/ThemeContext";
import { ThemeControls } from "../../../components/ThemeControls";
import EmotionTimeMap from "../../../components/Conceptualization/EmotionTimeMap";

const MusicDecisions = () => {
  const { t } = useTranslation();
  const { mode, theme } = useTheme();
  const modeColors = mode === 'dark' ? theme.colors.dark : theme.colors.light;
  const stageColors = modeColors.stages.conceptualization;
  const typography = theme.typography;
  const shadows = theme.shadows;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <div className="space-y-8">
        <div
          className="backdrop-blur-lg rounded-2xl p-8 shadow-xl border"
          style={{
            backgroundColor: stageColors.background.card,
            borderColor: stageColors.border.light,
            boxShadow: shadows.large
          }}
        >
          <h1
            className="text-center leading-tight mb-8 flex flex-col items-center justify-center"
            style={{
              fontSize: typography.h1.size,
              fontWeight: typography.h1.weight,
              lineHeight: typography.h1.lineHeight,
              color: stageColors.text.primary
            }}
          >
            <span
              className="flex items-center justify-center rounded-full text-white py-2 px-4 mb-4"
              style={{
                fontSize: typography.body.large.size,
                lineHeight: typography.body.large.lineHeight,
                backgroundColor: stageColors.text.primary
              }}
            >
              {t('step')} 1
            </span>
            {t('musicDecisions.title')}
          </h1>

          <p
            className="text-center"
            style={{
              fontSize: typography.body.large.size,
              lineHeight: typography.body.large.lineHeight,
              color: modeColors.text.black
            }}
          >
            {t('musicDecisions.description')}
          </p>
        </div>

        <MusicChoice />
        <WordAssociation />
        <EmotionsMap />
        <EmotionTimeMap />
      </div>

      <ThemeControls />
    </div>
  );
};

export default MusicDecisions;
