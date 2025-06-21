import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../../contexts/ThemeContext";

const previousStepLink = {
  '/conceptualization/musical-and-emotional-decisions': '',
  '/conceptualization/style-decisions': '/conceptualization/musical-and-emotional-decisions',
  '/evaluation/feedback-session/1': '/conceptualization/style-decisions',
  '/prototyping/medium': '/evaluation/feedback-session/1',
  '/evaluation/feedback-session/2': '/prototyping/medium',
  '/prototyping/high': '/evaluation/feedback-session/2',
  '/evaluation/feedback-session/3': '/prototyping/high',
  '/evaluation/laboratory-test': '/evaluation/feedback-session/3',
  '/implementation': '/evaluation/laboratory-test',
  '/evaluation/field-test': '/implementation',
}

const nextStepLink = {
  '/conceptualization/musical-and-emotional-decisions': '/conceptualization/style-decisions',
  '/conceptualization/style-decisions': '/evaluation/feedback-session/1',
  '/evaluation/feedback-session/1': '/prototyping/medium',
  '/prototyping/medium': '/evaluation/feedback-session/2',
  '/evaluation/feedback-session/2': '/prototyping/high',
  '/prototyping/high': '/evaluation/feedback-session/3',
  '/evaluation/feedback-session/3': '/evaluation/laboratory-test',
  '/evaluation/laboratory-test': '/implementation',
  '/implementation': '/evaluation/field-test',
  '/evaluation/field-test': '',
}

export const StepSkip = () => {
  const { t } = useTranslation();
  const { mode, theme } = useTheme();
  const route = useLocation();
  const path = route.pathname;

  const previousStep = previousStepLink[path];
  const nextStep = nextStepLink[path];

  const isStep = path.includes('conceptualization') || path.includes('prototyping') || path.includes('evaluation') || path.includes('implementation');

  if (!isStep) return null;

  const colors = theme.colors[mode];
  const shadows = theme.shadows;
  const transitions = theme.transitions;

  return (
    <div>
      <div className="flex justify-between items-center">
        <div>
          {previousStep && (
            <Link
              to={previousStep}
              className="inline-flex items-center px-4 py-2 rounded-lg transition-all duration-300 hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-2"
              style={{
                color: colors.text.primary,
                transition: transitions.default
              }}
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              {t('stepSkip.previous')}: {t(`stepSkip.${previousStep}`)}
            </Link>
          )}
        </div>
        <div>
          {nextStep && (
            <Link
              to={nextStep}
              className="inline-flex items-center px-4 py-2 rounded-lg transition-all duration-300 hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-2"
              style={{
                color: colors.text.primary,
                transition: transitions.default
              }}
            >
              {t('stepSkip.next')}: {t(`stepSkip.${nextStep}`)}
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
