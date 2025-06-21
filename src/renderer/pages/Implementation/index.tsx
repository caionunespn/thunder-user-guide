import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../contexts/ThemeContext";
import { RiAlertFill } from "react-icons/ri";

const Implementation = () => {
  const { t } = useTranslation();
  const { mode, theme } = useTheme();
  const modeColors = theme.colors.light;
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
            backgroundColor: modeColors.background.card,
            borderColor: modeColors.border.light,
            boxShadow: shadows.large
          }}
        >
          <h1
            className="text-center leading-tight flex flex-col items-center justify-center"
            style={{
              fontSize: typography.h1.size,
              fontWeight: typography.h1.weight,
              lineHeight: typography.h1.lineHeight,
              color: modeColors.text.primary
            }}
          >
            <span
              className="flex items-center justify-center rounded-full text-white py-2 px-4 mb-4"
              style={{
                fontSize: typography.body.large.size,
                lineHeight: typography.body.large.lineHeight,
                backgroundColor: modeColors.background.button.primary
              }}
            >
              {t('step')} 9
            </span>
            {t('implementation.title')}
          </h1>
        </div>
        <div
          className="flex items-center justify-center p-4 rounded-lg border-l-4"
          style={{
            backgroundColor: modeColors.background.card,
            borderColor: modeColors.status.warning.dark,
          }}
        >
          <div>
            <h3
              className="font-semibold mb-1 flex items-center"
              style={{
                fontSize: typography.body.large.size,
                lineHeight: typography.body.large.lineHeight,
                color: modeColors.status.warning.dark
              }}
            >
              <RiAlertFill
                className="w-5 h-5 mr-2 flex-shrink-0"
                style={{ color: modeColors.status.warning.dark }}
              />
              {t('status.attention')}
            </h3>
            <p
              style={{
                fontSize: typography.body.medium.size,
                lineHeight: typography.body.medium.lineHeight,
                color: modeColors.text.black
              }}
            >
              {t('implementation.description')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Implementation;
