import React, { useState, useRef, useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../contexts/ThemeContext';
import { ExportButton } from './ExportButton';
import { FaChevronDown, FaBars, FaTimes } from 'react-icons/fa';

export const Menu = () => {
  const { t } = useTranslation();
  const { mode, theme } = useTheme();
  const colors = theme.colors[mode];
  const shadows = theme.shadows;
  const [isStepsOpen, setIsStepsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 });
  const stepsButtonRef = useRef<HTMLButtonElement>(null);

  const steps = [
    { path: '/conceptualization/musical-and-emotional-decisions', label: t('home.steps.musicalAndEmotionalDecisions.title') },
    { path: '/conceptualization/style-decisions', label: t('home.steps.styleDecisions.title') },
    { path: '/evaluation/feedback-session/1', label: t('home.steps.feedbackSession01.title') },
    { path: '/prototyping/medium', label: t('home.steps.mediumFidelityPrototype.title') },
    { path: '/evaluation/feedback-session/2', label: t('home.steps.feedbackSession02.title') },
    { path: '/prototyping/high', label: t('home.steps.highFidelityPrototype.title') },
    { path: '/evaluation/feedback-session/3', label: t('home.steps.feedbackSession03.title') },
    { path: '/evaluation/laboratory-test', label: t('home.steps.laboratoryTest.title') },
    { path: null, label: t('home.steps.implementation.title') },
    { path: '/evaluation/field-test', label: t('home.steps.fieldTest.title') },
  ];

  const updateDropdownPosition = useCallback(() => {
    if (stepsButtonRef.current) {
      const rect = stepsButtonRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width,
      });
    }
  }, []);

  useEffect(() => {
    if (isStepsOpen) {
      updateDropdownPosition();
      window.addEventListener('resize', updateDropdownPosition);
      window.addEventListener('scroll', updateDropdownPosition, true);
      return () => {
        window.removeEventListener('resize', updateDropdownPosition);
        window.removeEventListener('scroll', updateDropdownPosition, true);
      };
    }
  }, [isStepsOpen, updateDropdownPosition]);

  return (
    <nav
      className="backdrop-blur-lg rounded-2xl p-4 shadow-xl border"
      style={{
        backgroundColor: colors.background.card,
        borderColor: colors.border.light,
        boxShadow: shadows.large
      }}
    >
      <div className="flex items-center justify-between">
        {/* Mobile menu button */}
        <button
          className="lg:hidden p-2 focus-visible:outline-2 focus-visible:outline-offset-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={t('menu.toggle')}
          aria-expanded={isMobileMenuOpen}
          style={{ color: colors.text.primary }}
        >
          {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>

        {/* Desktop menu */}
        <div className="hidden lg:flex items-center space-x-6" role="navigation" aria-label={t('menu.main')}>
          <Link
            to="/"
            className="text-lg font-medium hover:opacity-80 transition-opacity focus-visible:outline-2 focus-visible:outline-offset-2"
            style={{ color: colors.text.primary }}
            aria-label={t('home.homeTitle')}
          >
            {t('home.homeTitle')}
          </Link>

          <Link
            to="/about"
            className="text-lg font-medium hover:opacity-80 transition-opacity focus-visible:outline-2 focus-visible:outline-offset-2"
            style={{ color: colors.text.primary }}
            aria-label={t('home.aboutThunder')}
          >
            {t('home.aboutThunder')}
          </Link>

          <div className="relative">
            <button
              ref={stepsButtonRef}
              onClick={() => setIsStepsOpen(!isStepsOpen)}
              className="flex items-center space-x-2 text-lg font-medium hover:opacity-80 transition-opacity focus-visible:outline-2 focus-visible:outline-offset-2"
              style={{ color: colors.text.primary }}
              aria-expanded={isStepsOpen}
              aria-haspopup="menu"
              aria-label={t('home.menu.steps')}
            >
              <span>{t('home.menu.steps')}</span>
              <FaChevronDown
                className={`transition-transform duration-200 ${isStepsOpen ? 'rotate-180' : ''}`}
                aria-hidden="true"
                focusable="false"
              />
            </button>

            {isStepsOpen && ReactDOM.createPortal(
              <div
                id="steps-menu"
                className="mt-2 py-2 w-78 rounded-lg shadow-lg border"
                style={{
                  backgroundColor: colors.background.card,
                  borderColor: colors.border.light,
                  boxShadow: shadows.large,
                  zIndex: 999,
                  position: 'absolute',
                  top: dropdownPosition.top,
                  left: dropdownPosition.left,
                }}
                role="menu"
                aria-label={t('home.menu.steps')}
              >
                {steps.map((step, idx) => (
                  <Link
                    key={step.path || `step-${idx}`}
                    to={step.path || '#'}
                    className="block px-4 py-2 hover:bg-gray-100 cursor-pointer transition-opacity focus-visible:outline-2 focus-visible:outline-offset-2"
                    style={{ color: colors.text.primary }}
                    onClick={() => setIsStepsOpen(false)}
                    role="menuitem"
                    aria-label={`${idx + 1} - ${step.label}`}
                  >
                    {idx + 1} - {step.label}
                  </Link>
                ))}
              </div>,
              document.body
            )}
          </div>
          <Link
            to="/references"
            className="text-lg font-medium hover:opacity-80 transition-opacity focus-visible:outline-2 focus-visible:outline-offset-2"
            style={{ color: colors.text.primary }}
            aria-label={t('home.references')}
          >
            {t('home.references')}
          </Link>
        </div>

        <ExportButton />

        {/* Mobile menu */}
        {isMobileMenuOpen && ReactDOM.createPortal(
          <div
            className="lg:hidden fixed inset-0 flex flex-col z-[2000]"
            style={{
              backgroundColor: 'rgba(255,255,255,0.97)',
              boxShadow: shadows.large,
            }}
            role="navigation"
            aria-label={t('menu.mobile')}
          >
            <div className="flex justify-between items-center px-4 py-3 border-b" style={{ borderColor: colors.border.light }}>
              <button
                className="p-1 focus-visible:outline-2 focus-visible:outline-offset-2"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label={t('menu.close')}
                style={{ color: colors.text.primary }}
              >
                <FaTimes size={28} />
              </button>
              <ExportButton />
            </div>
            <div className="flex flex-col items-start px-12 py-4 space-y-8 w-full">
              <Link
                to="/"
                className="text-lg font-medium hover:opacity-80 transition-opacity w-full text-left focus-visible:outline-2 focus-visible:outline-offset-2"
                style={{ color: colors.text.primary }}
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label={t('home.homeTitle')}
              >
                {t('home.homeTitle')}
              </Link>

              <Link
                to="/about"
                className="text-lg font-medium hover:opacity-80 transition-opacity w-full text-left focus-visible:outline-2 focus-visible:outline-offset-2"
                style={{ color: colors.text.primary }}
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label={t('home.aboutThunder')}
              >
                {t('home.aboutThunder')}
              </Link>

              <div className="flex flex-col w-full">
                <button
                  onClick={() => setIsStepsOpen(!isStepsOpen)}
                  className="flex items-center space-x-2 text-lg font-medium hover:opacity-80 transition-opacity w-full text-left py-2 focus-visible:outline-2 focus-visible:outline-offset-2"
                  style={{ backgroundColor: 'transparent', color: colors.text.primary }}
                  aria-expanded={isStepsOpen}
                  aria-haspopup="menu"
                  aria-label={t('home.stepsTitle')}
                >
                  <span>{t('home.stepsTitle')}</span>
                  <FaChevronDown
                    className={`transition-transform duration-200 ${isStepsOpen ? 'rotate-180' : ''}`}
                    aria-hidden="true"
                    focusable="false"
                  />
                </button>

                {isStepsOpen && (
                  <div
                    id="mobile-steps-menu"
                    className="pl-8 flex flex-col space-y-4"
                    role="menu"
                    aria-label={t('home.menu.steps')}
                  >
                    {steps.map((step, idx) => (
                      <Link
                        key={step.path || `step-${idx}`}
                        to={step.path || '#'}
                        className="block py-1 hover:opacity-80 transition-opacity text-base focus-visible:outline-2 focus-visible:outline-offset-2"
                        style={{
                          color: colors.text.primary,
                          fontSize: 14
                        }}
                        onClick={() => {
                          setIsStepsOpen(false);
                          setIsMobileMenuOpen(false);
                        }}
                        role="menuitem"
                        aria-label={`${idx + 1} - ${step.label}`}
                      >
                        {idx + 1} - {step.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link
                to="/references"
                className="text-lg font-medium hover:opacity-80 transition-opacity w-full text-left focus-visible:outline-2 focus-visible:outline-offset-2"
                style={{ color: colors.text.primary }}
                aria-label={t('home.references')}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t('home.references')}
              </Link>
            </div>
          </div>,
          document.body
        )}
      </div>
    </nav>
  );
}; 