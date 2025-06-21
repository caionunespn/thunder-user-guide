import { ThemeControls } from "../../components/ThemeControls";
import { useTheme } from "../../contexts/ThemeContext";
import { useTranslation } from "react-i18next";
import { useThunder } from "../../contexts/Thunder";
import { DECIDE } from "../../contexts/Thunder/interfaces";
import { MdAdd, MdClose, MdHelpOutline } from "react-icons/md";
import { IoIosAlert } from "react-icons/io";
import { StatusTag } from "../../components/StatusTag";
import { useState } from "react";

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
          backgroundColor: stageColors.background.card,
          borderColor: stageColors.border.light,
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

const criteriaDefault = [
  {
    criteria: 'fieldTest.completionCriteria.criterion1',
    met: false
  },
  {
    criteria: 'fieldTest.completionCriteria.criterion2',
    met: false
  },
  {
    criteria: 'fieldTest.completionCriteria.criterion3',
    met: false
  },
  {
    criteria: 'fieldTest.completionCriteria.criterion4',
    met: false
  }
];

const FieldTest = () => {
  const { t } = useTranslation();
  const { mode, theme } = useTheme();
  const { data, saveFieldTest } = useThunder();
  const stageColors = theme.colors[mode].stages.evaluation;
  const modeColors = theme.colors[mode];
  const typography = theme.typography;
  const shadows = theme.shadows;
  const transitions = theme.transitions;

  const testData = data.evaluation.fieldTest;
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
      newData.determine.objectives = [
        ...(newData.determine.objectives || []),
        { title: t('fieldTest.sections.determine.newObjective'), subitems: [] }
      ];
    } else if (type === 'question') {
      newData.explore.questions = [
        ...(newData.explore.questions || []),
        { title: t('fieldTest.sections.explore.newQuestion'), subitems: [] }
      ];
    } else if (type === 'method') {
      newData.choose.methods = [
        ...(newData.choose.methods || []),
        t('fieldTest.sections.choose.newMethod')
      ];
    } else if (type === 'practicalAspect') {
      newData.identify.practicalAspects = [
        ...(newData.identify.practicalAspects || []),
        t('fieldTest.sections.identify.newAspect')
      ];
    } else if (type === 'ethicalConsideration') {
      newData.decide.ethicalConsiderations = [
        ...(newData.decide.ethicalConsiderations || []),
        t('fieldTest.sections.decide.newConsideration')
      ];
    } else if (type === 'analysisPoint') {
      newData.evaluate.analysisPoints = [
        ...(newData.evaluate.analysisPoints || []),
        t('fieldTest.sections.evaluate.newPoint')
      ];
    }
    saveFieldTest(newData);

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
    saveFieldTest(newData);
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
      const subitems = [...(objectives[index].subitems || []), t('fieldTest.sections.determine.newSubitem')];
      objectives[index] = { ...objectives[index], subitems };
      newData.determine.objectives = objectives;
    } else {
      const questions = [...newData.explore.questions];
      const subitems = [...(questions[index].subitems || []), t('fieldTest.sections.explore.newSubitem')];
      questions[index] = { ...questions[index], subitems };
      newData.explore.questions = questions;
    }
    saveFieldTest(newData);
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
      const objectives = newData.determine.objectives[itemIndex];
      if (objectives?.subitems) {
        objectives.subitems[subitemIndex] = value;
      }
    } else {
      const questions = newData.explore.questions[itemIndex];
      if (questions?.subitems) {
        questions.subitems[subitemIndex] = value;
      }
    }
    saveFieldTest(newData);
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
    saveFieldTest(newData);
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
      const objectives = newData.determine.objectives[itemIndex];
      if (objectives?.subitems) {
        objectives.subitems = objectives.subitems.filter((_, i) => i !== subitemIndex);
      }
    } else {
      const questions = newData.explore.questions[itemIndex];
      if (questions?.subitems) {
        questions.subitems = questions.subitems.filter((_, i) => i !== subitemIndex);
      }
    }
    saveFieldTest(newData);
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
              <span className="text-sm font-medium" style={{ color: stageColors.text.primary }}>
                {idx + 1}.
              </span>
              <textarea
                value={isComplexItem ? item.title : item}
                onChange={(e) => handleUpdateItem(section, getItemType(section), idx, isComplexItem ? { ...item, title: e.target.value } : e.target.value)}
                className="flex-1 px-3 py-1.5 rounded-lg border resize-y h-[48px] overflow-hidden"
                style={{
                  backgroundColor: stageColors.background.input,
                  borderColor: stageColors.border.light,
                  color: stageColors.text.primary,
                  fontSize: typography.body.medium.size,
                  lineHeight: typography.body.medium.lineHeight
                }}
                placeholder={t(`fieldTest.sections.${section}.new${getAddButtonText(section)}`)}
              />
            </div>
            <div className="flex items-center gap-2">
              {isComplexItem && (
                <button
                  onClick={() => handleAddSubitem(section as 'determine' | 'explore', idx)}
                  className="p-2 rounded-full border transition-all duration-300 flex items-center justify-center hover:scale-105 hover:bg-opacity-80"
                  style={{
                    backgroundColor: stageColors.background.button.primary,
                    borderColor: stageColors.border.button,
                    color: stageColors.background.button.text,
                    width: 40, height: 40, minWidth: 40, minHeight: 40, maxWidth: 40, maxHeight: 40
                  }}
                  aria-label={t(`fieldTest.sections.${section}.addSubitem`)}
                  disabled={addingSubitem[`${section}-${idx}`]}
                >
                  <MdAdd size={20} />
                </button>
              )}
              <button
                onClick={() => handleDeleteItem(section, getItemType(section), idx)}
                className="p-2 rounded-full border transition-all duration-300 flex items-center justify-center hover:bg-red-500 hover:text-white hover:scale-105"
                style={{
                  backgroundColor: stageColors.background.button.secondary,
                  borderColor: stageColors.border.button,
                  color: stageColors.background.button.text,
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
                  <span className="text-sm font-medium" style={{ color: stageColors.text.primary }}>
                    {idx + 1}.{subIdx + 1}.
                  </span>
                  <textarea
                    value={subitem}
                    onChange={(e) => handleUpdateSubitem(section as 'determine' | 'explore', idx, subIdx, e.target.value)}
                    className="flex-1 px-3 py-1.5 rounded-lg border resize-y h-[38px] overflow-hidden"
                    style={{
                      backgroundColor: stageColors.background.input,
                      borderColor: stageColors.border.light,
                      color: stageColors.text.primary,
                      fontSize: typography.body.medium.size,
                      lineHeight: typography.body.medium.lineHeight
                    }}
                    placeholder={t(`fieldTest.sections.${section}.newSubitem`)}
                  />
                  <button
                    onClick={() => handleDeleteSubitem(section as 'determine' | 'explore', idx, subIdx)}
                    className="p-2 rounded-full border transition-all duration-300 hover:bg-red-500 hover:text-white hover:scale-105"
                    style={{
                      backgroundColor: stageColors.background.button.secondary,
                      borderColor: stageColors.border.button,
                      color: stageColors.background.button.text
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
    saveFieldTest(newData);
  };

  const handleCriteriaToggle = (criteriaKey: string) => {
    const criteria = (testData.completionCriteria && testData.completionCriteria.length > 0 ? testData.completionCriteria : criteriaDefault).map(c =>
      c.criteria === criteriaKey ? { ...c, met: !c.met } : c
    );
    const newData = { ...testData, completionCriteria: criteria };
    saveFieldTest(newData);
  };

  // Funções para determinar o status de cada seção
  const getSectionStatus = (section: keyof DECIDE) => {
    const sectionData = testData[section];
    if (!sectionData || typeof sectionData !== 'object') {
      return 'not-started';
    }

    const itemsKey = getSectionItemsKey(section);
    const items = sectionData[itemsKey];

    if (!items || items.length === 0) {
      return 'not-started';
    }

    return items.length > 0 ? 'completed' : 'not-started';
  };

  const getResultsSummaryStatus = () => {
    return testData.resultsSummary && testData.resultsSummary.trim() ? 'completed' : 'not-started';
  };

  const getCompletionCriteriaStatus = () => {
    const criteria = testData.completionCriteria && testData.completionCriteria.length > 0
      ? testData.completionCriteria
      : criteriaDefault;

    if (criteria.length === 0) {
      return 'not-started';
    }

    const completedCriteria = criteria.filter(c => c.met).length;
    if (completedCriteria === 0) {
      return 'not-started';
    } else if (completedCriteria === criteria.length) {
      return 'completed';
    } else {
      return 'in-progress';
    }
  };

  return (
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
            {t('step')} 10
          </span>
          {t('fieldTest.title')}
        </h1>
        <p
          className="text-center"
          style={{
            fontSize: typography.body.large.size,
            lineHeight: typography.body.large.lineHeight,
            color: modeColors.text.black
          }}
        >
          {t('fieldTest.description')}
        </p>
      </div>

      <div
        className="flex items-center justify-center p-4 rounded-lg border-l-4"
        style={{
          backgroundColor: modeColors.background.card,
          borderColor: modeColors.primary.main
        }}
      >
        <div>
          <h3
            className="font-semibold mb-1 flex items-center"
            style={{
              fontSize: typography.body.large.size,
              lineHeight: typography.body.large.lineHeight,
              color: modeColors.primary.dark
            }}
          >
            <IoIosAlert
              className="w-5 h-5 mr-2 flex-shrink-0"
              style={{ color: modeColors.primary.dark }}
            />
            {t('status.information')}
          </h3>
          <p
            style={{
              fontSize: typography.body.medium.size,
              lineHeight: typography.body.medium.lineHeight,
              color: modeColors.status.neutral.dark,
              fontStyle: 'italic'
            }}
            dangerouslySetInnerHTML={{
              __html: t('evaluation.didYouKnow1')
            }}
          />
        </div>
      </div>

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

        const sectionExamples: Record<string, string[]> = {
          determine: t('fieldTest.sections.determine.examples', { returnObjects: true }) as string[],
          explore: t('fieldTest.sections.explore.examples', { returnObjects: true }) as string[],
          choose: t('fieldTest.sections.choose.examples', { returnObjects: true }) as string[],
          identify: t('fieldTest.sections.identify.examples', { returnObjects: true }) as string[],
          decide: t('fieldTest.sections.decide.examples', { returnObjects: true }) as string[],
          evaluate: t('fieldTest.sections.evaluate.examples', { returnObjects: true }) as string[]
        };

        const sectionShortDescriptions: Record<string, string> = {
          determine: t('fieldTest.sections.determine.description'),
          explore: t('fieldTest.sections.explore.description'),
          choose: t('fieldTest.sections.choose.description'),
          identify: t('fieldTest.sections.identify.description'),
          decide: t('fieldTest.sections.decide.description'),
          evaluate: t('fieldTest.sections.evaluate.description')
        };

        return (
          <div
            key={key}
            className="rounded-2xl p-6 shadow-lg border-0 mb-8 bg-white"
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
                  color: stageColors.text.primary
                }}
              >
                {t(`fieldTest.sections.${key}.title`)}
              </h2>
              <button
                onClick={() => setModalSection(key)}
                className="p-1 text-cyan-600 hover:opacity-80 transition-all"
                aria-label={t('fieldTest.example.show')}
              >
                <MdHelpOutline size={24} />
              </button>
              <StatusTag status={getSectionStatus(section)} />
            </div>
            <p className="mb-6 text-md text-black leading-relaxed">
              {sectionShortDescriptions[key]}
            </p>
            <Modal open={modalSection === key} onClose={() => setModalSection(null)}>
              <h3
                className="text-xl font-bold mb-2"
                style={{
                  color: stageColors.text.primary,
                  fontSize: typography.h3.size,
                  lineHeight: typography.h3.lineHeight
                }}
              >
                {t('fieldTest.example.title', { section: t(`fieldTest.sections.${key}.title`) })}
              </h3>
              <p className="mb-4 text-sm" style={{ color: modeColors.text.black }}>{t('fieldTest.example.instructions')}</p>
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
              {t(`fieldTest.sections.${key}.add${getAddButtonText(section)}`)}
            </button>
          </div>
        );
      })}

      <div className="w-full flex items-center my-12">
        <hr className="flex-1 border-t-2 border-gray-200" />
        <span className="mx-4 text-gray-400 font-semibold uppercase tracking-wider" style={{ fontSize: 14 }}>
          {t('fieldTest.resultsAndCriteriaDivider')}
        </span>
        <hr className="flex-1 border-t-2 border-gray-200" />
      </div>

      <div className="rounded-2xl p-6 shadow-lg border-0 mb-8 bg-white">
        <h2 className="flex items-end text-left leading-tight mb-2" style={{
          fontSize: typography.h2.size,
          fontWeight: typography.h2.weight,
          color: stageColors.text.primary
        }}>
          {t('fieldTest.resultsSummary.title')}
          <StatusTag status={getResultsSummaryStatus()} />
        </h2>
        <p className="mb-6 text-md text-black leading-relaxed">
          {t('fieldTest.resultsSummary.description')}
        </p>
        <textarea
          value={testData.resultsSummary || ''}
          onChange={handleResultsSummaryChange}
          className="w-full px-4 py-3 rounded-lg border resize-y min-h-[120px]"
          style={{
            backgroundColor: stageColors.background.input,
            borderColor: stageColors.border.light,
            color: stageColors.text.primary,
            fontSize: typography.body.medium.size,
            lineHeight: typography.body.medium.lineHeight
          }}
          placeholder={t('fieldTest.resultsSummary.placeholder')}
        />
      </div>

      <div className="rounded-2xl p-6 shadow-lg border-0 mb-8 bg-white">
        <h2 className="flex items-end text-left leading-tight mb-2" style={{
          fontSize: typography.h2.size,
          fontWeight: typography.h2.weight,
          color: stageColors.text.primary
        }}>
          {t('fieldTest.completionCriteria.title')}
          <StatusTag status={getCompletionCriteriaStatus()} />
        </h2>
        <p className="mb-6 text-md text-black leading-relaxed">
          {t('fieldTest.completionCriteria.description')}
        </p>
        <div className="space-y-4">
          {(testData.completionCriteria && testData.completionCriteria.length > 0 ? testData.completionCriteria : criteriaDefault).map((criterion, index) => (
            <div
              key={criterion.criteria}
              className={`flex items-center gap-4 p-3 border rounded-xl mb-2 shadow transition-all duration-300 bg-white cursor-pointer hover:shadow-lg`}
              style={{
                borderColor: stageColors.border.light,
                color: stageColors.text.primary,
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
                {t(`fieldTest.completionCriteria.criterion${index + 1}`)}
              </span>
            </div>
          ))}
        </div>
      </div>

      <ThemeControls />
    </div>
  );
};

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

export default FieldTest;