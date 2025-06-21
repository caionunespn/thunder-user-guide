import React, { useState } from 'react';
import { useTheme } from '../../../contexts/ThemeContext';
import { useTranslation } from 'react-i18next';
import { FaChevronDown } from 'react-icons/fa';

export const FAQ = () => {
  const { t } = useTranslation();
  const { mode, theme } = useTheme();
  const colors = theme.colors[mode];
  const shadows = theme.shadows;
  const typography = theme.typography;

  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const faqItems = t('home.faq', { returnObjects: true }) as Array<{ question: string; answer: string }>;

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div
      className="backdrop-blur-lg rounded-2xl p-8 shadow-xl border"
      style={{
        backgroundColor: colors.background.card,
        borderColor: colors.border.light,
        boxShadow: shadows.large
      }}
      role="textbox"
      aria-label={t('home.faqTitle')}
      tabIndex={-1}
    >
      <h2
        className="text-left leading-tight mb-6"
        style={{
          fontSize: typography.h2.size,
          fontWeight: typography.h2.weight,
          lineHeight: typography.h2.lineHeight,
          color: colors.text.primary
        }}
      >
        {t('home.faqTitle')}
      </h2>
      <div className="space-y-4" role="list">
        {faqItems.map((item, index) => (
          <div
            key={index}
            className="border rounded-lg overflow-hidden transition-all duration-300 hover:shadow-md"
            style={{ borderColor: colors.border.light }}
            role="listitem"
          >
            <button
              className="w-full px-6 py-4 text-left flex justify-between items-center transition-colors duration-200 hover:bg-opacity-50"
              onClick={() => toggleFaq(index)}
              style={{
                backgroundColor: colors.background.card,
                color: colors.primary.dark
              }}
              aria-expanded={openFaqIndex === index}
              aria-controls={`faq-answer-${index}`}
              aria-label={item.question}
            >
              <h3
                className="font-semibold"
                style={{
                  fontSize: typography.body.large.size,
                  lineHeight: typography.body.large.lineHeight,
                  color: colors.primary.dark
                }}
              >
                {item.question}
              </h3>
              <FaChevronDown
                className="transform transition-transform duration-200"
                style={{
                  transform: openFaqIndex === index ? 'rotate(180deg)' : 'rotate(0)',
                  color: colors.text.primary
                }}
                aria-hidden="true"
                focusable="false"
              />
            </button>
            <div
              id={`faq-answer-${index}`}
              className="overflow-hidden transition-all duration-300"
              style={{
                maxHeight: openFaqIndex === index ? '500px' : '0',
                opacity: openFaqIndex === index ? 1 : 0
              }}
              role="region"
              aria-label={`Answer to: ${item.question}`}
            >
              <p
                className="px-6 py-4"
                style={{
                  fontSize: typography.body.medium.size,
                  lineHeight: typography.body.medium.lineHeight,
                  color: colors.text.black
                }}
              >
                {item.answer}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};