import React, { useState, useEffect, useRef } from "react";
import { ThemeControls } from "../../components/ThemeControls";
import { useTheme } from "../../contexts/ThemeContext";
import { useTranslation } from "react-i18next";
import { useThunder } from "../../contexts/Thunder";
import { DECIDE } from "../../contexts/Thunder/interfaces";
import { MdAdd, MdClose, MdHelpOutline } from "react-icons/md";

// Modal component for showing examples
const Modal = ({ open, onClose, children }: { open: boolean; onClose: () => void; children: React.ReactNode }) => {
  const { mode, theme } = useTheme();
  const stageColors = theme.colors[mode].stages.evaluation;
  const modeColors = theme.colors[mode];
  const typography = theme.typography;
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div
        className="rounded-2xl shadow-2xl p-8 max-w-lg w-full relative border"
        style={{
          backgroundColor: mode === 'dark' ? modeColors.background.card : stageColors.background.card,
          borderColor: mode === 'dark' ? modeColors.border.light : stageColors.border.light,
          boxShadow: '0 2px 16px 0 rgba(0,0,0,0.10)'
        }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-red-500 text-2xl"
          aria-label="Fechar"
        >
          ×
        </button>
        {children}
      </div>
    </div>
  );
};

interface LaboratoryTestData {
  determine: {
    description: string;
    objectives: Array<{ title: string; subitems?: string[] }>;
    notes: string;
  };
  explore: {
    description: string;
    questions: Array<{ title: string; subitems?: string[] }>;
    notes: string;
  };
  choose: {
    description: string;
    methods: string[];
    notes: string;
  };
  identify: {
    description: string;
    practicalAspects: string[];
    notes: string;
  };
  decide: {
    description: string;
    ethicalConsiderations: string[];
    notes: string;
  };
  evaluate: {
    description: string;
    analysisPoints: string[];
    notes: string;
  };
  resultsSummary: string;
  completionCriteria: Array<{
    criteria: string;
    met: boolean;
  }>;
}

const criteriaDefault: Array<{
  criteria: string;
  met: boolean;
}> = [
    {
      criteria: 'laboratoryTest.completionCriteria.criterion1',
      met: false
    },
    {
      criteria: 'laboratoryTest.completionCriteria.criterion2',
      met: false
    },
    {
      criteria: 'laboratoryTest.completionCriteria.criterion3',
      met: false
    }
  ];

const LaboratoryTest = () => {
  const { t } = useTranslation();
  const { mode, theme } = useTheme();
  const { data, saveLaboratoryTest } = useThunder();
  const stageColors = theme.colors[mode].stages.evaluation;
  const modeColors = theme.colors[mode];
  const typography = theme.typography;
  const shadows = theme.shadows;
  const transitions = theme.transitions;

  const testData = data.evaluation.laboratoryTest as LaboratoryTestData;
  const [visibleExamples, setVisibleExamples] = useState<Record<string, boolean>>({
    determine: false,
    explore: false,
    choose: false,
    identify: false,
    decide: false,
    evaluate: false
  });
  const [modalSection, setModalSection] = useState<string | null>(null);
  const [addingItem, setAddingItem] = useState(false);
  const [addingSubitem, setAddingSubitem] = useState<{ [key: string]: boolean }>({});

  const toggleExample = (section: string) => {
    setVisibleExamples(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleAddItem = (section: keyof DECIDE, type: string) => {
    if (addingItem) return;
    setAddingItem(true);

    const newData = {
      ...testData,
      resultsSummary: testData.resultsSummary || '',
      completionCriteria: testData.completionCriteria || criteriaDefault
    };
    if (type === 'objective') {
      newData.determine = {
        ...newData.determine,
        description: newData.determine.description || '',
        objectives: [
          ...(newData.determine.objectives || []),
          { title: t('laboratoryTest.sections.determine.newObjective'), subitems: [] }
        ],
        notes: newData.determine.notes || ''
      };
    } else if (type === 'question') {
      newData.explore = {
        ...newData.explore,
        description: newData.explore.description || '',
        questions: [
          ...(newData.explore.questions || []),
          { title: t('laboratoryTest.sections.explore.newQuestion'), subitems: [] }
        ],
        notes: newData.explore.notes || ''
      };
    } else if (type === 'method') {
      newData.choose = {
        ...newData.choose,
        description: newData.choose.description || '',
        methods: [
          ...(newData.choose.methods || []),
          t('laboratoryTest.sections.choose.newMethod')
        ],
        notes: newData.choose.notes || ''
      };
    } else if (type === 'practicalAspect') {
      newData.identify = {
        ...newData.identify,
        description: newData.identify.description || '',
        practicalAspects: [
          ...(newData.identify.practicalAspects || []),
          t('laboratoryTest.sections.identify.newAspect')
        ],
        notes: newData.identify.notes || ''
      };
    } else if (type === 'ethicalConsideration') {
      newData.decide = {
        ...newData.decide,
        description: newData.decide.description || '',
        ethicalConsiderations: [
          ...(newData.decide.ethicalConsiderations || []),
          t('laboratoryTest.sections.decide.newConsideration')
        ],
        notes: newData.decide.notes || ''
      };
    } else if (type === 'analysisPoint') {
      newData.evaluate = {
        ...newData.evaluate,
        description: newData.evaluate.description || '',
        analysisPoints: [
          ...(newData.evaluate.analysisPoints || []),
          t('laboratoryTest.sections.evaluate.newPoint')
        ],
        notes: newData.evaluate.notes || ''
      };
    }
    saveLaboratoryTest(newData);

    setTimeout(() => setAddingItem(false), 300);
  };

  const handleUpdateItem = (
    section: keyof DECIDE,
    type: string,
    index: number,
    value: string | { title: string; subitems: string[] }
  ) => {
    const newData = {
      ...testData,
      resultsSummary: testData.resultsSummary || '',
      completionCriteria: testData.completionCriteria || criteriaDefault
    };
    if (type === 'objective') {
      newData.determine.objectives[index] = value as { title: string; subitems: string[] };
    } else if (type === 'question') {
      newData.explore.questions[index] = value as { title: string; subitems: string[] };
    } else if (type === 'method') {
      newData.choose.methods[index] = value as string;
    } else if (type === 'practicalAspect') {
      newData.identify.practicalAspects[index] = value as string;
    } else if (type === 'ethicalConsideration') {
      newData.decide.ethicalConsiderations[index] = value as string;
    } else if (type === 'analysisPoint') {
      newData.evaluate.analysisPoints[index] = value as string;
    }
    saveLaboratoryTest(newData);
  };

  const handleAddSubitem = (section: 'determine' | 'explore', index: number) => {
    const key = `${section}-${index}`;
    if (addingSubitem[key]) return;
    setAddingSubitem(prev => ({ ...prev, [key]: true }));
    const newData = {
      ...testData,
      resultsSummary: testData.resultsSummary || '',
      completionCriteria: testData.completionCriteria || criteriaDefault
    };
    if (section === 'determine') {
      const objectives = [...newData.determine.objectives];
      const subitems = [...(objectives[index].subitems || []), t('laboratoryTest.sections.determine.newSubitem')];
      objectives[index] = { ...objectives[index], subitems };
      newData.determine.objectives = objectives;
    } else {
      const questions = [...newData.explore.questions];
      const subitems = [...(questions[index].subitems || []), t('laboratoryTest.sections.explore.newSubitem')];
      questions[index] = { ...questions[index], subitems };
      newData.explore.questions = questions;
    }
    saveLaboratoryTest(newData);
    setTimeout(() => setAddingSubitem(prev => ({ ...prev, [key]: false })), 300);
  };

  const handleUpdateSubitem = (
    section: 'determine' | 'explore',
    itemIndex: number,
    subitemIndex: number,
    value: string
  ) => {
    const newData = {
      ...testData,
      resultsSummary: testData.resultsSummary || '',
      completionCriteria: testData.completionCriteria || criteriaDefault
    };
    if (section === 'determine') {
      if (newData.determine.objectives[itemIndex]?.subitems) {
        newData.determine.objectives[itemIndex].subitems[subitemIndex] = value;
      }
    } else {
      if (newData.explore.questions[itemIndex]?.subitems) {
        newData.explore.questions[itemIndex].subitems[subitemIndex] = value;
      }
    }
    saveLaboratoryTest(newData);
  };

  const handleDeleteItem = (section: keyof DECIDE, type: string, index: number) => {
    const newData = {
      ...testData,
      resultsSummary: testData.resultsSummary || '',
      completionCriteria: testData.completionCriteria || criteriaDefault
    };
    if (type === 'objective') {
      newData.determine.objectives = newData.determine.objectives.filter((_, i) => i !== index);
    } else if (type === 'question') {
      newData.explore.questions = newData.explore.questions.filter((_, i) => i !== index);
    } else if (type === 'method') {
      newData.choose.methods = newData.choose.methods.filter((_, i) => i !== index);
    } else if (type === 'practicalAspect') {
      newData.identify.practicalAspects = newData.identify.practicalAspects.filter((_, i) => i !== index);
    } else if (type === 'ethicalConsideration') {
      newData.decide.ethicalConsiderations = newData.decide.ethicalConsiderations.filter((_, i) => i !== index);
    } else if (type === 'analysisPoint') {
      newData.evaluate.analysisPoints = newData.evaluate.analysisPoints.filter((_, i) => i !== index);
    }
    saveLaboratoryTest(newData);
  };

  const handleDeleteSubitem = (
    section: 'determine' | 'explore',
    itemIndex: number,
    subitemIndex: number
  ) => {
    const newData = {
      ...testData,
      resultsSummary: testData.resultsSummary || '',
      completionCriteria: testData.completionCriteria || criteriaDefault
    };
    if (section === 'determine') {
      if (newData.determine.objectives[itemIndex]?.subitems) {
        newData.determine.objectives[itemIndex].subitems =
          newData.determine.objectives[itemIndex].subitems.filter((_, i) => i !== subitemIndex);
      }
    } else {
      if (newData.explore.questions[itemIndex]?.subitems) {
        newData.explore.questions[itemIndex].subitems =
          newData.explore.questions[itemIndex].subitems.filter((_, i) => i !== subitemIndex);
      }
    }
    saveLaboratoryTest(newData);
  };

  const renderSectionItems = (section: keyof DECIDE, typedValue: DECIDE[keyof DECIDE]) => {
    if (typeof typedValue === 'undefined' || typedValue === null) return null;
    const items = typedValue[getSectionItemsKey(section)];
    if (!items) return null;

    return items.map((item: any, idx: number) => {
      const isComplexItem = typeof item === 'object' && 'title' in item;

      return (
        <div key={idx} className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 w-full">
              <span className="text-sm font-medium" style={{ color: mode === 'dark' ? modeColors.text.primary : stageColors.text.primary }}>
                {idx + 1}.
              </span>
              <textarea
                value={isComplexItem ? item.title : item}
                onChange={(e) => handleUpdateItem(section, getItemType(section), idx, isComplexItem ? { ...item, title: e.target.value } : e.target.value)}
                className="flex-1 px-3 py-1.5 rounded-lg border resize-y h-[48px] overflow-hidden"
                style={{
                  backgroundColor: mode === 'dark' ? modeColors.background.input : stageColors.background.input,
                  borderColor: mode === 'dark' ? modeColors.border.light : stageColors.border.light,
                  color: mode === 'dark' ? modeColors.text.primary : stageColors.text.primary,
                  fontSize: typography.body.medium.size,
                  lineHeight: typography.body.medium.lineHeight
                }}
                placeholder={t(`laboratoryTest.sections.${section}.new${getAddButtonText(section)}`)}
              />
            </div>
            <div className="flex items-center gap-2">
              {isComplexItem && (
                <button
                  onClick={() => handleAddSubitem(section as 'determine' | 'explore', idx)}
                  className="p-2 rounded-full border transition-all duration-300 flex items-center justify-center hover:scale-105 hover:bg-opacity-80"
                  style={{
                    backgroundColor: mode === 'dark' ? modeColors.background.button.primary : stageColors.background.button.primary,
                    borderColor: mode === 'dark' ? modeColors.border.button.primary : stageColors.border.button,
                    color: mode === 'dark' ? modeColors.background.button.text : stageColors.background.button.text,
                    width: 40, height: 40, minWidth: 40, minHeight: 40, maxWidth: 40, maxHeight: 40
                  }}
                  aria-label={t(`laboratoryTest.sections.${section}.addSubitem`)}
                  disabled={addingSubitem[`${section}-${idx}`]}
                >
                  <MdAdd size={20} />
                </button>
              )}
              <button
                onClick={() => handleDeleteItem(section, getItemType(section), idx)}
                className="p-2 rounded-full border transition-all duration-300 flex items-center justify-center hover:bg-red-500 hover:text-white hover:scale-105"
                style={{
                  backgroundColor: mode === 'dark' ? modeColors.background.button.secondary : stageColors.background.button.secondary,
                  borderColor: mode === 'dark' ? modeColors.border.button.secondary : stageColors.border.button,
                  color: mode === 'dark' ? modeColors.background.button.text : stageColors.background.button.text,
                  width: 40, height: 40, minWidth: 40, minHeight: 40, maxWidth: 40, maxHeight: 40
                }}
                aria-label={t('common.remove')}
              >
                <MdClose size={20} />
              </button>
            </div>
          </div>

          {isComplexItem && (
            <div className="ml-6 space-y-2">
              {item.subitems.map((subitem: string, subIdx: number) => (
                <div key={subIdx} className="flex items-center gap-2">
                  <span className="text-sm font-medium" style={{ color: mode === 'dark' ? modeColors.text.primary : stageColors.text.primary }}>
                    {idx + 1}.{subIdx + 1}.
                  </span>
                  <textarea
                    value={subitem}
                    onChange={(e) => handleUpdateSubitem(section as 'determine' | 'explore', idx, subIdx, e.target.value)}
                    className="flex-1 px-3 py-1.5 rounded-lg border resize-y h-[38px] overflow-hidden"
                    style={{
                      backgroundColor: mode === 'dark' ? modeColors.background.input : stageColors.background.input,
                      borderColor: mode === 'dark' ? modeColors.border.light : stageColors.border.light,
                      color: mode === 'dark' ? modeColors.text.primary : stageColors.text.primary,
                      fontSize: typography.body.medium.size,
                      lineHeight: typography.body.medium.lineHeight
                    }}
                    placeholder={t(`laboratoryTest.sections.${section}.newSubitem`)}
                  />
                  <button
                    onClick={() => handleDeleteSubitem(section as 'determine' | 'explore', idx, subIdx)}
                    className="p-2 rounded-full border transition-all duration-300 hover:bg-red-500 hover:text-white hover:scale-105"
                    style={{
                      backgroundColor: mode === 'dark' ? modeColors.background.button.secondary : stageColors.background.button.secondary,
                      borderColor: mode === 'dark' ? modeColors.border.button.secondary : stageColors.border.button,
                      color: mode === 'dark' ? modeColors.background.button.text : stageColors.background.button.text
                    }}
                  >
                    <MdClose size={18} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      );
    });
  };

  const handleResultsSummaryChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    const newData = { ...testData, resultsSummary: value };
    saveLaboratoryTest(newData);
  };

  const handleCriteriaToggle = (criteria: string) => {
    const criteriaList = (testData.completionCriteria && testData.completionCriteria.length > 0 ? testData.completionCriteria : criteriaDefault).map(c =>
      c.criteria === criteria ? { ...c, met: !c.met } : c
    );
    const newData = { ...testData, completionCriteria: criteriaList };
    saveLaboratoryTest(newData);
  };

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div
        className="backdrop-blur-lg rounded-2xl p-8 shadow-xl border"
        style={{
          backgroundColor: mode === 'dark' ? modeColors.background.card : stageColors.background.card,
          borderColor: mode === 'dark' ? modeColors.border.light : stageColors.border.light,
          boxShadow: shadows.large
        }}
      >
        <h1
          className="text-center leading-tight mb-8"
          style={{
            fontSize: typography.h1.size,
            fontWeight: typography.h1.weight,
            lineHeight: typography.h1.lineHeight,
            color: mode === 'dark' ? modeColors.text.primary : stageColors.text.primary
          }}
        >
          {t('laboratoryTest.title')}
        </h1>
        <p
          className="text-center"
          style={{
            fontSize: typography.body.large.size,
            lineHeight: typography.body.large.lineHeight,
            color: modeColors.text.black
          }}
        >
          {t('laboratoryTest.description')}
        </p>
      </div>

      {/* Main Content Sections */}
      {Object.entries(testData).map(([key, value], idx) => {
        const section = key as keyof DECIDE;
        const typedValue = value as DECIDE[keyof DECIDE];
        if (
          typeof typedValue !== 'object' ||
          Array.isArray(typedValue) ||
          key === 'completionCriteria' ||
          key === 'resultsSummary' ||
          typeof typedValue === 'undefined'
        ) {
          return null;
        }
        const isDetermine = section === 'determine' && 'objectives' in typedValue;
        const isExplore = section === 'explore' && 'questions' in typedValue;
        const isChoose = section === 'choose' && 'methods' in typedValue;
        const isIdentify = section === 'identify' && 'practicalAspects' in typedValue;
        const isDecide = section === 'decide' && 'ethicalConsiderations' in typedValue;
        const isEvaluate = section === 'evaluate' && 'analysisPoints' in typedValue;

        const sectionExamples: Record<string, string[]> = {
          determine: t('laboratoryTest.sections.determine.examples', { returnObjects: true }) as string[],
          explore: t('laboratoryTest.sections.explore.examples', { returnObjects: true }) as string[],
          choose: t('laboratoryTest.sections.choose.examples', { returnObjects: true }) as string[],
          identify: t('laboratoryTest.sections.identify.examples', { returnObjects: true }) as string[],
          decide: t('laboratoryTest.sections.decide.examples', { returnObjects: true }) as string[],
          evaluate: t('laboratoryTest.sections.evaluate.examples', { returnObjects: true }) as string[]
        };

        // Descrições curtas para cada seção
        const sectionShortDescriptions: Record<string, string> = {
          determine: t('laboratoryTest.sections.determine.description'),
          explore: t('laboratoryTest.sections.explore.description'),
          choose: t('laboratoryTest.sections.choose.description'),
          identify: t('laboratoryTest.sections.identify.description'),
          decide: t('laboratoryTest.sections.decide.description'),
          evaluate: t('laboratoryTest.sections.evaluate.description')
        };

        if (isDetermine) {
          return (
            <div
              key={key}
              className="rounded-2xl p-6 shadow-lg border-0 mb-8 bg-white dark:bg-gray-900"
              style={{
                boxShadow: '0 2px 16px 0 rgba(0,0,0,0.06)',
              }}
            >
              <div className="flex items-center gap-1 mb-1">
                <h2
                  className="capitalize"
                  style={{
                    fontSize: typography.h2.size,
                    fontWeight: typography.h2.weight,
                    color: mode === 'dark' ? modeColors.text.primary : stageColors.text.primary
                  }}
                >
                  {t(`laboratoryTest.sections.${key}.title`)}
                </h2>
                <button
                  onClick={() => setModalSection(key)}
                  className="p-1 text-cyan-600 dark:text-cyan-300 hover:opacity-80 transition-all"
                  aria-label={t('laboratoryTest.example.show')}
                >
                  <MdHelpOutline size={24} />
                </button>
              </div>
              <p className="mb-6 text-md text-black leading-relaxed">
                {sectionShortDescriptions[key]}
              </p>
              <Modal open={modalSection === key} onClose={() => setModalSection(null)}>
                <h3
                  className="text-xl font-bold mb-2"
                  style={{
                    color: mode === 'dark' ? modeColors.text.primary : stageColors.text.primary,
                    fontSize: typography.h3.size,
                    lineHeight: typography.h3.lineHeight
                  }}
                >
                  {t('laboratoryTest.example.title', { section: t(`laboratoryTest.sections.${key}.title`) })}
                </h3>
                <p className="mb-4 text-sm" style={{ color: modeColors.text.black }}>{t('laboratoryTest.example.instructions')}</p>
                <ul className="list-disc pl-6 space-y-2">
                  {sectionExamples[key as keyof typeof sectionExamples].map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </Modal>
              <div className="space-y-4 mb-6">
                {(
                  typeof typedValue !== 'undefined' &&
                  typeof typedValue === 'object' &&
                  !Array.isArray(typedValue) &&
                  typedValue !== null &&
                  Object.keys(typedValue).length > 0
                ) ? renderSectionItems(section, typedValue) : null}
              </div>
              <button
                onClick={() => handleAddItem(section, getItemType(section))}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 hover:opacity-90 rounded-full border-0 font-medium text-white shadow-sm transition-all"
                style={{
                  backgroundColor: stageColors.background.button.primary, fontSize: typography.body.medium.size
                }}
                disabled={addingItem}
              >
                <MdAdd size={20} />
                {t(`laboratoryTest.sections.${key}.add${getAddButtonText(section)}`)}
              </button>
            </div>
          );
        }

        return (
          <div
            key={key}
            className="rounded-2xl p-6 shadow-lg border-0 mb-8 bg-white dark:bg-gray-900"
            style={{
              boxShadow: '0 2px 16px 0 rgba(0,0,0,0.06)',
            }}
          >
            <div className="flex items-center gap-1 mb-1">
              <h2
                className="capitalize"
                style={{
                  fontSize: typography.h2.size,
                  fontWeight: typography.h2.weight,
                  color: mode === 'dark' ? modeColors.text.primary : stageColors.text.primary
                }}
              >
                {t(`laboratoryTest.sections.${key}.title`)}
              </h2>
              <button
                onClick={() => setModalSection(key)}
                className="p-1 text-cyan-600 dark:text-cyan-300 hover:opacity-80 transition-all"
                aria-label={t('laboratoryTest.example.show')}
              >
                <MdHelpOutline size={24} />
              </button>
            </div>
            <p className="mb-6 text-md text-black leading-relaxed">
              {sectionShortDescriptions[key]}
            </p>
            <Modal open={modalSection === key} onClose={() => setModalSection(null)}>
              <h3
                className="text-xl font-bold mb-2"
                style={{
                  color: mode === 'dark' ? modeColors.text.primary : stageColors.text.primary,
                  fontSize: typography.h3.size,
                  lineHeight: typography.h3.lineHeight
                }}
              >
                {t('laboratoryTest.example.title', { section: t(`laboratoryTest.sections.${key}.title`) })}
              </h3>
              <p className="mb-4 text-sm" style={{ color: modeColors.text.black }}>{t('laboratoryTest.example.instructions')}</p>
              <ul className="list-disc pl-6 space-y-2">
                {sectionExamples[key as keyof typeof sectionExamples].map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </Modal>
            <div className="space-y-4 mb-6">
              {(
                typeof typedValue !== 'undefined' &&
                typeof typedValue === 'object' &&
                !Array.isArray(typedValue) &&
                typedValue !== null &&
                Object.keys(typedValue).length > 0
              ) ? renderSectionItems(section, typedValue) : null}
            </div>
            <button
              onClick={() => handleAddItem(section, getItemType(section))}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 hover:opacity-90 rounded-full border-0 font-medium text-white shadow-sm transition-all"
              style={{
                backgroundColor: stageColors.background.button.primary, fontSize: typography.body.medium.size
              }}
              disabled={addingItem}
            >
              <MdAdd size={20} />
              {t(`laboratoryTest.sections.${key}.add${getAddButtonText(section)}`)}
            </button>
          </div>
        );
      })}

      {/* Divider visual entre DECIDE e resultados/criterios */}
      <div className="w-full flex items-center my-12">
        <hr className="flex-1 border-t-2 border-gray-200 dark:border-gray-700" />
        <span className="mx-4 text-gray-400 dark:text-gray-500 font-semibold uppercase tracking-wider" style={{ fontSize: 14 }}>
          {t('laboratoryTest.resultsAndCriteriaDivider')}
        </span>
        <hr className="flex-1 border-t-2 border-gray-200 dark:border-gray-700" />
      </div>

      {/* Results Summary Section */}
      <div className="rounded-2xl p-6 shadow-lg border-0 mb-8 bg-white dark:bg-gray-900">
        <h2 className="capitalize mb-2" style={{
          fontSize: typography.h2.size,
          fontWeight: typography.h2.weight,
          color: mode === 'dark' ? modeColors.text.primary : stageColors.text.primary
        }}>
          {t('laboratoryTest.resultsSummary.title')}
        </h2>
        <p className="mb-6 text-md text-black leading-relaxed">
          {t('laboratoryTest.resultsSummary.description')}
        </p>
        <textarea
          value={testData.resultsSummary || ''}
          onChange={handleResultsSummaryChange}
          className="w-full px-4 py-3 rounded-lg border resize-y min-h-[120px]"
          style={{
            backgroundColor: mode === 'dark' ? modeColors.background.input : stageColors.background.input,
            borderColor: mode === 'dark' ? modeColors.border.light : stageColors.border.light,
            color: mode === 'dark' ? modeColors.text.primary : stageColors.text.primary,
            fontSize: typography.body.medium.size,
            lineHeight: typography.body.medium.lineHeight
          }}
          placeholder={t('laboratoryTest.resultsSummary.placeholder')}
        />
      </div>

      {/* Completion Criteria Section */}
      <div className="rounded-2xl p-6 shadow-lg border-0 mb-8 bg-white dark:bg-gray-900">
        <h2 className="capitalize mb-2" style={{
          fontSize: typography.h2.size,
          fontWeight: typography.h2.weight,
          color: mode === 'dark' ? modeColors.text.primary : stageColors.text.primary
        }}>
          {t('laboratoryTest.completionCriteria.title')}
        </h2>
        <p className="mb-6 text-md text-black leading-relaxed">
          {t('laboratoryTest.completionCriteria.description')}
        </p>
        <div className="space-y-4">
          {(testData.completionCriteria && testData.completionCriteria.length > 0 ? testData.completionCriteria : criteriaDefault).map((criterion) => (
            <div
              key={criterion.criteria}
              className={`flex items-center gap-4 p-3 border rounded-xl mb-2 shadow transition-all duration-300 bg-white cursor-pointer hover:shadow-lg`}
              style={{
                borderColor: mode === 'dark' ? modeColors.border.light : stageColors.border.light,
                color: mode === 'dark' ? modeColors.text.primary : stageColors.text.primary,
                minHeight: 48
              }}
              onClick={() => handleCriteriaToggle(criterion.criteria)}
              tabIndex={0}
              role="button"
              onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') handleCriteriaToggle(criterion.criteria); }}
            >
              <input
                type="checkbox"
                checked={criterion.met}
                onChange={() => handleCriteriaToggle(criterion.criteria)}
                className="w-5 h-5 cursor-pointer"
                style={{ accentColor: stageColors.background.button.primary }}
                onClick={e => e.stopPropagation()}
              />
              <span style={{ fontSize: typography.body.medium.size, lineHeight: typography.body.medium.lineHeight }}>
                {t(`${criterion.criteria}`)}
              </span>
            </div>
          ))}
        </div>
      </div>

      <ThemeControls />
    </div>
  );
};

// Helper functions for section rendering
const getSectionItemsKey = (section: string): string => {
  const keys: Record<string, string> = {
    determine: 'objectives',
    explore: 'questions',
    choose: 'methods',
    identify: 'practicalAspects',
    decide: 'ethicalConsiderations',
    evaluate: 'analysisPoints'
  };
  return keys[section] || '';
};

const getItemType = (section: string): string => {
  const types: Record<string, string> = {
    determine: 'objective',
    explore: 'question',
    choose: 'method',
    identify: 'practicalAspect',
    decide: 'ethicalConsideration',
    evaluate: 'analysisPoint'
  };
  return types[section] || '';
};

const getAddButtonText = (section: string): string => {
  const texts: Record<string, string> = {
    determine: 'Objective',
    explore: 'Question',
    choose: 'Method',
    identify: 'Aspect',
    decide: 'Consideration',
    evaluate: 'Point'
  };
  return texts[section] || '';
};

export default LaboratoryTest;
