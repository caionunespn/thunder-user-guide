import React, { useState, useEffect } from 'react';
import { FaCheckCircle, FaSpinner, FaCircle, FaChevronDown, FaRegCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useTheme } from '../../../contexts/ThemeContext';
import { useTranslation } from 'react-i18next';
import { useThunder } from '../../../contexts/Thunder';
import { createPortal } from 'react-dom';
import * as Popover from '@radix-ui/react-popover';

export interface Step {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'in-progress' | 'not-started';
  icon: string;
  category: 'conceptualization' | 'prototyping' | 'evaluation' | 'implementation';
  isExternal?: boolean;
  page: string;
}

interface StepCardProps extends Step {
  stepNumber: number;
  totalSteps: number;
  openPopoverId: string | null;
  onPopoverChange: (id: string | null) => void;
}

interface StatusBadgeProps {
  status: Step['status'];
  shadows: any;
  stepId: string;
  stageColors: {
    main: string;
    light: string;
    dark: string;
    background: string;
  };
  openPopoverId?: string | null;
  onPopoverChange?: (id: string | null) => void;
}

let expandedBadgeId: string | null = null;
const badgeListeners: ((id: string | null) => void)[] = [];

const subscribeToBadgeExpansion = (listener: (id: string | null) => void) => {
  badgeListeners.push(listener);
  return () => {
    const index = badgeListeners.indexOf(listener);
    if (index > -1) {
      badgeListeners.splice(index, 1);
    }
  };
};

const StatusBadge = ({ status, shadows, stepId, stageColors, openPopoverId, onPopoverChange }: StatusBadgeProps) => {
  const { t } = useTranslation();
  const { mode, theme } = useTheme();
  const { data } = useThunder();
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

  const getRequirements = () => {
    switch (stepId) {
      case 'musicalAndEmotionalDecisions':
        const musicData = data.conceptualization.musicDecisions;
        return [
          { text: t('home.requirements.music.songName'), met: !!musicData.selectedMusic.songName },
          { text: t('home.requirements.music.youtubeLink'), met: !!musicData.selectedMusic.youtubeLink },
          { text: t('home.requirements.music.wordAssociation'), met: musicData.wordAssociation.length > 0 },
          { text: t('home.requirements.music.emotionalMap'), met: musicData.emotionalMap.length > 0 },
          { text: t('home.requirements.music.emotionTimeMap'), met: musicData.emotionTimeMap.length > 0 }
        ];

      case 'styleDecisions':
        const styleData = data.conceptualization.styleDecisions;
        return [
          { text: t('home.requirements.style.colorPalette'), met: styleData.colorPalette.length > 0 },
          { text: t('home.requirements.style.styleChoice'), met: !!styleData.styleChoice },
          { text: t('home.requirements.style.references'), met: styleData.references.length > 0 },
          { text: t('home.requirements.style.sketches'), met: styleData.sketches.length > 0 }
        ];

      case 'feedbackSession01':
      case 'feedbackSession02':
      case 'feedbackSession03':
        const sessionNumber = stepId.split('').pop() || '1';
        const session = data.evaluation.feedbackSessions[sessionNumber];
        return [
          { text: t('home.requirements.feedback.startSession'), met: !!session },
          { text: t('home.requirements.feedback.sessionDate'), met: !!session?.sessionDate },
          { text: t('home.requirements.feedback.goodPoints'), met: !!session?.goodPoints?.length },
          { text: t('home.requirements.feedback.improvementPoints'), met: !!session?.improvementPoints?.length },
          { text: t('home.requirements.feedback.comments'), met: !!session?.comments },
          { text: t('home.requirements.feedback.criteria'), met: session?.criteriaMatch?.every(c => c.met) }
        ];

      case 'mediumFidelityPrototype':
      case 'highFidelityPrototype':
        const prototypeType = stepId.includes('medium') ? 'medium' : 'high';
        const prototype = data.prototyping[prototypeType];

        return [
          { text: t('home.requirements.prototype.video'), met: !!prototype?.finalVideo?.id },
          { text: t('home.requirements.prototype.images'), met: prototype.images.length > 0 }
        ];

      case 'laboratoryTest':
      case 'fieldTest':
        const testType = stepId === 'laboratoryTest' ? 'laboratoryTest' : 'fieldTest';
        const testData = data.evaluation[testType];
        return [
          { text: t('home.requirements.decide.determine'), met: testData.determine.objectives.length > 0 },
          { text: t('home.requirements.decide.explore'), met: testData.explore.questions.length > 0 },
          { text: t('home.requirements.decide.choose'), met: testData.choose.methods.length > 0 },
          { text: t('home.requirements.decide.identify'), met: testData.identify.practicalAspects.length > 0 },
          { text: t('home.requirements.decide.decide'), met: testData.decide.ethicalConsiderations.length > 0 },
          { text: t('home.requirements.decide.evaluate'), met: testData.evaluate.analysisPoints.length > 0 },
          { text: t('home.requirements.decide.resultsSummary'), met: !!testData.resultsSummary },
          { text: t('home.requirements.decide.criteria'), met: testData.completionCriteria?.every(c => c.met) }
        ];

      case 'decide':
        const decideData = data.evaluation.decide;
        return [
          { text: t('home.requirements.decide.determine'), met: decideData.determine.objectives.length > 0 },
          { text: t('home.requirements.decide.explore'), met: decideData.explore.questions.length > 0 },
          { text: t('home.requirements.decide.choose'), met: decideData.choose.methods.length > 0 },
          { text: t('home.requirements.decide.identify'), met: decideData.identify.practicalAspects.length > 0 },
          { text: t('home.requirements.decide.decide'), met: decideData.decide.ethicalConsiderations.length > 0 },
          { text: t('home.requirements.decide.evaluate'), met: decideData.evaluate.analysisPoints.length > 0 },
          { text: t('home.requirements.decide.resultsSummary'), met: !!decideData.resultsSummary },
          { text: t('home.requirements.decide.criteria'), met: decideData.completionCriteria?.every(c => c.met) }
        ];

      default:
        return [];
    }
  };

  const statusStyles = getStatusStyles();
  const requirements = getRequirements();

  const handleOpenChange = (open: boolean) => {
    onPopoverChange?.(open ? stepId : null);
  };

  return (
    <Popover.Root aria-controls={undefined} open={openPopoverId === stepId} onOpenChange={handleOpenChange}>
      <Popover.Trigger aria-controls={undefined} asChild>
        <button
          className="flex items-center justify-between gap-3 px-4 py-3 rounded-lg transition-all duration-300 w-full text-left"
          style={{
            backgroundColor: statusStyles.background,
            color: statusStyles.text,
            boxShadow: shadows.small,
          }}
          aria-expanded={expandedBadgeId === stepId}
          aria-haspopup="dialog"
          data-radix-trigger-id={stepId}
        >
          <div className="flex items-center gap-3">
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
          <FaChevronDown className="text-lg transition-transform duration-300" style={{ color: statusStyles.icon }} aria-hidden="true" focusable="false" />
        </button>
      </Popover.Trigger>
      <Popover.Portal aria-controls={undefined}>
        <Popover.Content
          aria-controls={undefined}
          className="z-50 p-4 rounded-lg shadow-lg border"
          style={{
            backgroundColor: colors.background.card,
            borderColor: colors.border.light,
            boxShadow: shadows.large,
          }}
          sideOffset={5}
          role="dialog"
          aria-labelledby={`popover-title-${stepId}`}
          onOpenAutoFocus={(e) => {
            e.preventDefault();
          }}
          onCloseAutoFocus={(e) => {
            e.preventDefault();
            const trigger = document.querySelector(`[data-radix-trigger-id="${stepId}"]`);
            if (trigger instanceof HTMLElement) {
              trigger.focus();
            }
          }}
          onEscapeKeyDown={(e) => {
            e.preventDefault();
            const trigger = document.querySelector(`[data-radix-trigger-id="${stepId}"]`);
            if (trigger instanceof HTMLElement) {
              trigger.focus();
            }
          }}
          onInteractOutside={(e) => {
            e.preventDefault();
            const trigger = document.querySelector(`[data-radix-trigger-id="${stepId}"]`);
            if (trigger instanceof HTMLElement) {
              trigger.focus();
            }
          }}
        >
          <h3 id={`popover-title-${stepId}`} className="sr-only">{t('home.requirements.title')}</h3>
          <div className="space-y-2">
            {requirements.map((req, index) => (
              <div key={index} className="flex items-center gap-2">
                {req.met ? (
                  <FaCheckCircle className="text-green-500" aria-hidden="true" focusable="false" />
                ) : (
                  <FaCircle className="text-gray-300" aria-hidden="true" focusable="false" />
                )}
                <span>{req.text}</span>
              </div>
            ))}
          </div>
          <Popover.Arrow aria-controls={undefined} style={{ fill: colors.background.card }} aria-hidden="true" focusable="false" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

export const StepCard = ({ id, title, description, status, icon, category, isExternal, page, stepNumber, openPopoverId, onPopoverChange }: StepCardProps) => {
  const { t } = useTranslation();
  const { mode, theme, fontSize } = useTheme();
  const colors = theme.colors[mode];
  const typography = theme.typography;
  const shadows = theme.shadows;

  const cardMinHeight = fontSize === 'small' ? 480 : fontSize === 'medium' ? 600 : 700;

  const getStageColors = () => {
    switch (category) {
      case 'conceptualization':
        return {
          main: colors.stages.conceptualization.main,
          light: colors.stages.conceptualization.light,
          dark: colors.stages.conceptualization.dark,
          background: colors.stages.conceptualization.background.card,
        };
      case 'prototyping':
        return {
          main: colors.stages.prototyping.main,
          light: colors.stages.prototyping.light,
          dark: colors.stages.prototyping.dark,
          background: colors.stages.prototyping.background.card,
        };
      case 'evaluation':
        return {
          main: colors.stages.evaluation.main,
          light: colors.stages.evaluation.light,
          dark: colors.stages.evaluation.dark,
          background: colors.stages.evaluation.background.card,
        };
      default:
        return {
          main: colors.primary.main,
          light: colors.primary.light,
          dark: colors.primary.dark,
          background: colors.background.card,
        };
    }
  };

  const stageColors = getStageColors();

  const CardContent = () => (
    <>
      <div className="flex items-center justify-between mb-4">
        <div
          className="text-3xl font-bold"
          style={{
            color: stageColors.main,
            WebkitTextStroke: `1px ${stageColors.dark}`,
          }}
        >
          {stepNumber}
        </div>

        <div
          className="flex items-center gap-2 px-3 py-1 rounded-full"
          style={{
            backgroundColor: stageColors.main,
            border: `1px solid ${stageColors.main}`,
          }}
        >
          <div
            className="w-2 h-2 rounded-full"
            style={{
              backgroundColor: '#FFF',
            }}
          />
          <span
            className="text-sm font-medium capitalize"
            style={{
              color: '#FFF',
            }}
          >
            {t(`home.categories.${category}`)}
          </span>
        </div>
      </div>

      <div className="flex flex-col items-center gap-4">
        <div
          className={`w-48 h-48 bg-white rounded-2xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${category === 'implementation' ? '' : 'group-hover:scale-110'}`}
          style={{
            border: `1px solid ${stageColors.main}`,
          }}
        >
          <img src={icon} alt={title} className="w-44 h-44" aria-label={title} />
        </div>

        <h3
          className="w-full flex items-center justify-center font-bold text-center min-h-[3rem]"
          style={{
            fontSize: typography.body.large.size,
            fontWeight: typography.h3.weight,
            color: stageColors.dark,
          }}
        >
          {title}
        </h3>
      </div>

      <p
        className="flex-grow"
        style={{
          fontSize: category === 'implementation' ? '0.9rem' : typography.body.medium.size,
          lineHeight: typography.body.medium.lineHeight,
          color: colors.text.black,
          opacity: 0.8,
          fontStyle: category === 'implementation' ? 'italic' : 'normal',
        }}
      >
        {description}
      </p>
    </>
  );

  const CardWrapper = ({ children }: { children: React.ReactNode }) => (
    <div
      className={`group rounded-2xl p-6 mt-2 mb-4 transition-all duration-300 flex flex-col justify-between relative overflow-hidden ${category === 'implementation' ? '' : 'hover:-translate-y-1'} hover:shadow-xl`}
      style={{
        backgroundColor: stageColors.background,
        border: `1px ${category === 'implementation' ? 'dashed' : 'solid'} ${stageColors.main}`,
        boxShadow: shadows.medium,
        minHeight: cardMinHeight,
      }}
    >
      {children}
    </div>
  );

  if (isExternal) {
    return (
      <div className="h-full">
        <CardWrapper>
          <CardContent />
          {category !== 'implementation' && <StatusBadge status={status} shadows={shadows} stepId={id} stageColors={stageColors} />}
        </CardWrapper>
      </div>
    );
  }

  return (
    <div className="h-full">
      <CardWrapper>
        <Link
          to={page}
          className="block flex-grow"
          style={{
            textDecoration: 'none',
            cursor: 'pointer',
          }}
        >
          <CardContent />
        </Link>
        {category !== 'implementation' && <StatusBadge status={status} shadows={shadows} stepId={id} stageColors={stageColors} openPopoverId={openPopoverId} onPopoverChange={onPopoverChange} />}
      </CardWrapper>
    </div>
  );
};
