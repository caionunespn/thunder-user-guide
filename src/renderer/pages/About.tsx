import { useState, useEffect } from "react";
import { useTheme } from "../contexts/ThemeContext";
import { useTranslation } from 'react-i18next';
import { ThemeControls } from "../components/ThemeControls";

import AboutThunderImg from '../../../public/assets/refined_thunder_pt.png'
import AboutThunderEngImg from '../../../public/assets/refined_thunder.png'

interface Phase {
  title: string;
  description: string;
}

const About = () => {
  const { mode, theme } = useTheme();
  const { t } = useTranslation();
  const colors = theme.colors[mode];
  const typography = theme.typography;
  const shadows = theme.shadows;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.5, 3));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.5, 1));
  };

  const handleResetZoom = () => {
    setZoomLevel(1);
  };

  return (
    <div className="space-y-8">
      <div
        className="backdrop-blur-lg rounded-2xl p-8 shadow-xl border"
        style={{
          backgroundColor: colors.background.card,
          borderColor: colors.border.light,
          boxShadow: shadows.large
        }}
      >
        <h1
          className="text-center leading-tight mb-8"
          style={{
            fontSize: typography.h1.size,
            fontWeight: typography.h1.weight,
            lineHeight: typography.h1.lineHeight,
            color: colors.text.primary
          }}
        >
          {t('about.title')}
        </h1>

        <div className="prose max-w-none" style={{ color: colors.text.primary }}>
          <p className="mb-6" style={{ fontSize: typography.body.large.size, lineHeight: typography.body.large.lineHeight, color: colors.text.black }}>
            {t('about.description1')}
          </p>
          <p className="mb-6" style={{ fontSize: typography.body.large.size, lineHeight: typography.body.large.lineHeight, color: colors.text.black }}>
            {t('about.description2')}
          </p>
          <p className="mb-6" style={{ fontSize: typography.body.large.size, lineHeight: typography.body.large.lineHeight, color: colors.text.black }}>
            {t('about.description4')}
          </p>
          <h2 className="text-center mb-6" style={{ fontSize: typography.h3.size, fontWeight: typography.h3.weight, lineHeight: typography.h3.lineHeight, color: colors.text.primary }}>{t('about.phasesTitle')}</h2>
          <ol className="list-decimal pl-6 space-y-4 mb-4">
            {(t('about.phases', { returnObjects: true }) as Phase[]).map((phase, index) => (
              <li style={{ fontSize: typography.body.large.size, lineHeight: typography.body.large.lineHeight, color: colors.text.black, fontWeight: 400 }} key={index}>
                <strong>{phase.title}:</strong> {phase.description}
              </li>
            ))}
          </ol>
          <div className="space-y-4">
            <h2 className="text-center mb-6" style={{ fontSize: typography.h3.size, fontWeight: typography.h3.weight, lineHeight: typography.h3.lineHeight, color: colors.text.primary }}>
              {t('about.description6')}
            </h2>
            <p className="mb-4" style={{ fontSize: typography.body.large.size, lineHeight: typography.body.large.lineHeight, color: colors.text.black, fontWeight: 400 }}>
              <a
                href="https://dl.acm.org/doi/10.1145/3702038.3702077"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
                style={{ color: colors.text.secondary }}
              >
                {t('about.description7')}
              </a>
            </p>
            <p className="mb-4" style={{ fontSize: typography.body.large.size, lineHeight: typography.body.large.lineHeight, color: colors.text.black, fontWeight: 400 }}>
              {t('about.description8')}
            </p>
          </div>

          <div className="mt-12">
            <img
              src={t('about.image') === 'refined_thunder_pt.png' ? AboutThunderImg : AboutThunderEngImg}
              alt={t('about.processImageAlt')}
              className="mx-auto max-w-full h-auto rounded-xl shadow-lg cursor-zoom-in"
              onClick={() => setIsModalOpen(true)}
            />
            <p
              className="mt-4 text-center text-sm italic"
              style={{
                color: colors.text.secondary,
                fontSize: typography.body.small.size,
                lineHeight: typography.body.small.lineHeight
              }}
            >
              {t('about.imageCaption')}
            </p>
          </div>
        </div>
      </div>
      <ThemeControls />

      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex flex-col bg-black bg-opacity-50"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="fixed top-4 right-4 z-50"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-black bg-opacity-50 rounded-lg p-2 flex gap-2">
              <button
                onClick={handleZoomIn}
                aria-label="Aumentar zoom"
                className="p-2 rounded-full bg-white bg-opacity-75 hover:bg-opacity-100 transition-all duration-300"
                style={{ boxShadow: shadows.medium }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </button>
              <button
                onClick={handleZoomOut}
                aria-label="Diminuir zoom"
                className="p-2 rounded-full bg-white bg-opacity-75 hover:bg-opacity-100 transition-all duration-300"
                style={{ boxShadow: shadows.medium }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 12H4"
                  />
                </svg>
              </button>
              <button
                onClick={handleResetZoom}
                aria-label="Restaurar zoom"
                className="p-2 rounded-full bg-white bg-opacity-75 hover:bg-opacity-100 transition-all duration-300"
                style={{ boxShadow: shadows.medium }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                aria-label="Fechar modal"
                className="p-2 rounded-full bg-white bg-opacity-75 hover:bg-opacity-100 transition-all duration-300"
                style={{ boxShadow: shadows.medium }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div
            className="flex-1 p-4"
            style={{
              overflow: 'auto',
              width: '100vw',
              height: '100vh',
              background: 'transparent'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={t('about.image') === 'refined_thunder_pt.png' ? AboutThunderImg : AboutThunderEngImg}
              alt={t('about.processImageAlt')}
              className="object-contain rounded-lg shadow-2xl"
              style={{
                transform: `scale(${zoomLevel})`,
                transformOrigin: 'top left',
                transition: 'transform 0.2s ease-in-out',
                display: 'block',
                margin: '0 auto'
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default About; 