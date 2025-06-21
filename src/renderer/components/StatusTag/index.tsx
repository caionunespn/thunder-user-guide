import { useTranslation } from "react-i18next";
import { useTheme } from "../../contexts/ThemeContext";
import { FaCheckCircle, FaRegCircle, FaSpinner } from "react-icons/fa";

interface StatusTagProps {
  status: 'completed' | 'in-progress' | 'not-started';
}

export const StatusTag = ({ status }: StatusTagProps) => {
  const { t } = useTranslation();
  const { mode, theme } = useTheme();
  const colors = theme.colors[mode];

  const getStatusStyles = () => {
    switch (status) {
      case 'completed':
        return {
          background: colors.status.success.main,
          text: '#FFFFFF',
          icon: '#FFFFFF',
        };
      case 'in-progress':
        return {
          background: colors.status.warning.light,
          text: colors.status.warning.dark,
          icon: colors.status.warning.main,
        };
      default:
        return {
          background: colors.status.neutral.light,
          text: colors.status.neutral.dark,
          icon: colors.status.neutral.main,
        };
    }
  };
  const statusStyles = getStatusStyles();

  return (
    <div
      className="flex w-fit items-center gap-3 py-1 px-2 rounded-full mb-2 ml-4"
      style={{
        background: statusStyles.background,
        fontSize: theme.typography.body.small.size,
        lineHeight: theme.typography.body.small.lineHeight,
        color: statusStyles.text,
      }}
    >
      {status === 'completed' ? (
        <>
          <FaCheckCircle className="text-lg" style={{ color: statusStyles.icon }} aria-hidden="true" focusable="false" />
          <span className="font-medium">{t('home.status.completed')}</span>
        </>
      ) : status === 'in-progress' ? (
        <>
          <FaSpinner
            className="animate-spin text-lg"
            style={{ color: statusStyles.icon }}
            aria-hidden="true"
            focusable="false"
          />
          <span className="font-medium">{t('home.status.inProgress')}</span>
        </>
      ) : (
        <>
          <FaRegCircle className="text-lg" style={{ color: statusStyles.icon }} aria-hidden="true" focusable="false" />
          <span className="font-medium">{t('home.status.notStarted')}</span>
        </>
      )}
    </div>
  );
};