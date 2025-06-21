import React, { useEffect, useState } from 'react';
import Slider, { Settings } from 'react-slick';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { StepCard, Step } from '../StepCard';
import { useTheme } from '../../../contexts/ThemeContext';
import { useTranslation } from 'react-i18next';
import { useThunder } from '../../../contexts/Thunder';

import MusicDecisionsImg from '../../../../../public/assets/steps/music-and-emotions-decisions.png'
import StyleDecisionsImg from '../../../../../public/assets/steps/style-decisions.png'
import FeedbackSessionImg from '../../../../../public/assets/steps/feedback-session.png'
import MediumFidelityImg from '../../../../../public/assets/steps/medium-fidelity.png'
import HighFidelityImg from '../../../../../public/assets/steps/high-fidelity.png'
import LaboratoryTestImg from '../../../../../public/assets/steps/lab-testing.png'
import ImplementationImg from '../../../../../public/assets/steps/implementation.png'
import FieldTestImg from '../../../../../public/assets/steps/field-testing.png'


type StepStatus = 'not-started' | 'in-progress' | 'completed';

const CustomArrow = ({ onClick, direction, disabled }: { onClick?: () => void; direction: 'left' | 'right'; disabled?: boolean }) => {
  const { mode, theme } = useTheme();
  const colors = theme.colors[mode];
  const { t } = useTranslation();

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === 'left' ? t('carousel.previous') : t('carousel.next')}
      className={`absolute top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 z-10 ${direction === 'left' ? '-left-8' : '-right-8'} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      style={{
        backgroundColor: colors.background.button.primary,
        color: colors.background.button.text,
        boxShadow: theme.shadows.medium,
      }}
    >
      <span aria-hidden="true">
        {direction === 'left' ? (
          <FaChevronLeft aria-hidden="true" focusable="false" />
        ) : (
          <FaChevronRight aria-hidden="true" focusable="false" />
        )}
      </span>
    </button>
  );
};

export const StepCarousel = () => {
  const { t } = useTranslation();
  const { mode, theme } = useTheme();
  const { data, getStatus, isLoading } = useThunder();
  const typography = theme.typography;
  const colors = theme.colors[mode];
  const shadows = theme.shadows;
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [stepStatuses, setStepStatuses] = useState<Record<string, StepStatus>>({});
  const [openPopoverId, setOpenPopoverId] = useState<string | null>(null);

  const handlePopoverChange = (id: string | null) => {
    setOpenPopoverId(id);
  };

  useEffect(() => {
    const loadStepStatuses = async () => {
      const statuses: Record<string, StepStatus> = {};
      const stepIds = [
        'musicalAndEmotionalDecisions',
        'styleDecisions',
        'feedbackSession01',
        'mediumFidelityPrototype',
        'feedbackSession02',
        'highFidelityPrototype',
        'feedbackSession03',
        'laboratoryTest',
        'implementation',
        'fieldTest'
      ];

      for (const stepId of stepIds) {
        statuses[stepId] = getStatus(stepId);
      }

      setStepStatuses(statuses);
    };

    loadStepStatuses();
  }, [data, isLoading]);

  const steps: Step[] = [
    {
      id: 'musicalAndEmotionalDecisions',
      title: t('home.steps.musicalAndEmotionalDecisions.title'),
      description: t('home.steps.musicalAndEmotionalDecisions.description'),
      status: stepStatuses['musicalAndEmotionalDecisions'] || 'not-started',
      icon: MusicDecisionsImg,
      category: 'conceptualization',
      page: '/conceptualization/musical-and-emotional-decisions'
    },
    {
      id: 'styleDecisions',
      title: t('home.steps.styleDecisions.title'),
      description: t('home.steps.styleDecisions.description'),
      status: stepStatuses['styleDecisions'] || 'not-started',
      icon: StyleDecisionsImg,
      category: 'conceptualization',
      page: '/conceptualization/style-decisions'
    },
    {
      id: 'feedbackSession01',
      title: t('home.steps.feedbackSession01.title'),
      description: t('home.steps.feedbackSession01.description'),
      status: stepStatuses['feedbackSession01'] || 'not-started',
      icon: FeedbackSessionImg,
      category: 'evaluation',
      page: '/evaluation/feedback-session/1'
    },
    {
      id: 'mediumFidelityPrototype',
      title: t('home.steps.mediumFidelityPrototype.title'),
      description: t('home.steps.mediumFidelityPrototype.description'),
      status: stepStatuses['mediumFidelityPrototype'] || 'not-started',
      icon: MediumFidelityImg,
      category: 'prototyping',
      page: '/prototyping/medium'
    },
    {
      id: 'feedbackSession02',
      title: t('home.steps.feedbackSession02.title'),
      description: t('home.steps.feedbackSession02.description'),
      status: stepStatuses['feedbackSession02'] || 'not-started',
      icon: FeedbackSessionImg,
      category: 'evaluation',
      page: '/evaluation/feedback-session/2'
    },
    {
      id: 'highFidelityPrototype',
      title: t('home.steps.highFidelityPrototype.title'),
      description: t('home.steps.highFidelityPrototype.description'),
      status: stepStatuses['highFidelityPrototype'] || 'not-started',
      icon: HighFidelityImg,
      category: 'prototyping',
      page: '/prototyping/high'
    },
    {
      id: 'feedbackSession03',
      title: t('home.steps.feedbackSession03.title'),
      description: t('home.steps.feedbackSession03.description'),
      status: stepStatuses['feedbackSession03'] || 'not-started',
      icon: FeedbackSessionImg,
      category: 'evaluation',
      page: '/evaluation/feedback-session/3'
    },
    {
      id: 'laboratoryTest',
      title: t('home.steps.laboratoryTest.title'),
      description: t('home.steps.laboratoryTest.description'),
      status: stepStatuses['laboratoryTest'] || 'not-started',
      icon: LaboratoryTestImg,
      category: 'evaluation',
      page: '/evaluation/laboratory-test'
    },
    {
      id: 'implementation',
      title: t('home.steps.implementation.title'),
      description: t('home.steps.implementation.description'),
      status: stepStatuses['implementation'] || 'not-started',
      icon: ImplementationImg,
      category: 'implementation',
      isExternal: true,
      page: ''
    },
    {
      id: 'fieldTest',
      title: t('home.steps.fieldTest.title'),
      description: t('home.steps.fieldTest.description'),
      status: stepStatuses['fieldTest'] || 'not-started',
      icon: FieldTestImg,
      category: 'evaluation',
      page: '/evaluation/field-test'
    }
  ];

  const settings: Settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2,
    className: "py-4",
    nextArrow: <CustomArrow direction="right" />,
    prevArrow: <CustomArrow direction="left" />,
    beforeChange: (_, next) => setCurrentSlide(next),
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div
      className="backdrop-blur-lg rounded-2xl p-12 shadow-xl border"
      style={{
        backgroundColor: colors.background.card,
        borderColor: colors.border.light,
        boxShadow: shadows.large
      }}
      role="region"
      aria-label={t('home.steps.title')}
    >
      <div className="mb-12">
        <h2
          className="text-4xl font-bold mb-4"
          style={{ color: colors.text.primary }}
        >
          {t('home.stepsTitle')}
        </h2>
        <p
          className="text-md text-black leading-relaxed mb-[-40px]"
        >
          {t('home.stepsSubtitle')}
        </p>
      </div>
      <Slider {...settings}>
        {steps.map((step, index) => (
          <div key={step.id} aria-label={`${t('home.step')} ${index + 1}: ${step.title}`} className="px-4 min-h-[450px]" role="group" tabIndex={0}>
            <StepCard
              {...step}
              stepNumber={index + 1}
              totalSteps={steps.length}
              openPopoverId={openPopoverId}
              onPopoverChange={handlePopoverChange}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};