import React, { useState, useEffect } from 'react';
import { useThunder } from '../../contexts/Thunder';
import type { ThunderData } from '../../contexts/Thunder/interfaces';
import { useTranslation } from 'react-i18next';
import { Document, Page, Text, View, StyleSheet, Image, PDFViewer, Font } from '@react-pdf/renderer';
import { format } from 'date-fns';

import PoppinsRegular from '../../../../public/assets/fonts/Poppins/Poppins-Regular.ttf?url';
import PoppinsBold from '../../../../public/assets/fonts/Poppins/Poppins-Bold.ttf?url';

Font.register({
  family: 'Poppins',
  fonts: [
    {
      src: PoppinsRegular,
      fontWeight: 'normal',
    },
    {
      src: PoppinsBold,
      fontWeight: 'bold',
    },
  ],
});

interface MyDocumentProps {
  data: ThunderData;
  t: (key: string, options?: { [key: string]: any }) => string;
}

const MyDocument: React.FC<MyDocumentProps> = ({ data, t }) => {
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      return format(date, 'dd/MM/yyyy');
    } catch {
      return dateString;
    }
  };

  return (
    <>
      {/* Cabeçalho */}
      <Text style={styles.mainTitle}>{t('report.title')}</Text>

      <View style={styles.sectionGrid}>
        {/* 1. Music Decisions Section */}
        <View style={[styles.card, styles.conceptualizationSectionThunder]}>
          <Text style={[styles.sectionTitle, styles.conceptualizationTitleThunder]}>1. {t('report.musicDecisions.title')}</Text>
          {/* Selected Music */}
          {data.conceptualization.musicDecisions.selectedMusic && (
            <View style={styles.subsection}>
              <Text style={styles.subsectionTitle}>{t('report.musicDecisions.selectedMusic')}</Text>
              <Text style={styles.text}>{t('report.musicDecisions.songName')}: {data.conceptualization.musicDecisions.selectedMusic.songName}</Text>
              <Text style={styles.text}>{t('report.musicDecisions.youtubeLink')}: <Text style={styles.link}>{data.conceptualization.musicDecisions.selectedMusic.youtubeLink}</Text></Text>
            </View>
          )}
          {/* Word Associations */}
          {data.conceptualization.musicDecisions.wordAssociation && data.conceptualization.musicDecisions.wordAssociation.length > 0 && (
            <View style={styles.subsection}>
              <Text style={styles.subsectionTitle}>{t('report.musicDecisions.wordAssociations')}</Text>
              <View style={styles.listSection}>
                {data.conceptualization.musicDecisions.wordAssociation.map((word, index) => (
                  <Text key={index} style={styles.listItem}>• {word}</Text>
                ))}
              </View>
            </View>
          )}
          {/* Emotions Map */}
          {data.conceptualization.musicDecisions.emotionalMap && data.conceptualization.musicDecisions.emotionalMap.length > 0 && (
            <View style={styles.subsection}>
              <Text style={styles.subsectionTitle}>{t('report.musicDecisions.emotionsMap')}</Text>
              <View style={styles.listSection}>
                {data.conceptualization.musicDecisions.emotionalMap.map((sample, index) => {
                  const sampleInfo = t('emotionsMap.sampleInfo', { number: sample.number, dimension: sample.dimension });
                  return (
                    <Text key={index} style={styles.listItem}>• {sampleInfo}</Text>
                  );
                })}
              </View>
            </View>
          )}
          {/* Emotion Time Map */}
          {data.conceptualization.musicDecisions.emotionTimeMap && data.conceptualization.musicDecisions.emotionTimeMap.length > 0 && (
            <View style={styles.subsection}>
              <Text style={styles.subsectionTitle}>{t('report.musicDecisions.emotionTimeMap')}</Text>
              <View style={styles.listSection}>
                {data.conceptualization.musicDecisions.emotionTimeMap.map((segment, index) => (
                  <View key={index} style={styles.segmentBlock}>
                    <Text style={styles.listItem}>• {t('report.musicDecisions.segments')} {index + 1}</Text>
                    <Text style={styles.subListItem}>  {t('emotionTimeMap.from')}: {segment.startTime} {t('emotionTimeMap.minutes')}</Text>
                    <Text style={styles.subListItem}>  {t('emotionTimeMap.to')}: {segment.endTime} {t('emotionTimeMap.minutes')}</Text>
                    <Text style={styles.subListItem}>  {t('emotionTimeMap.selectWords')}: {segment.words.join(', ')}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}
        </View>

        {/* 2. Style Decisions Section */}
        <View style={[styles.card, styles.conceptualizationSectionThunder]}>
          <Text style={[styles.sectionTitle, styles.conceptualizationTitleThunder]}>2. {t('report.styleDecisions.title')}</Text>
          {/* Style Choice */}
          {data.conceptualization.styleDecisions.styleChoice && (
            <View style={styles.subsection}>
              <Text style={styles.subsectionTitle}>{t('report.styleDecisions.styleChoice')}</Text>
              <Text style={styles.text}>{data.conceptualization.styleDecisions.styleChoice}</Text>
            </View>
          )}
          {/* Color Palette */}
          {data.conceptualization.styleDecisions.colorPalette && data.conceptualization.styleDecisions.colorPalette.length > 0 && (
            <View style={styles.subsection}>
              <Text style={styles.subsectionTitle}>{t('report.styleDecisions.colorPalette')}</Text>
              <View style={styles.colorPalette}>
                {data.conceptualization.styleDecisions.colorPalette.map((color, index) => (
                  <View key={index} style={[styles.colorBox, { backgroundColor: color }]} />
                ))}
              </View>
            </View>
          )}
          {/* References */}
          {data.conceptualization.styleDecisions.references && data.conceptualization.styleDecisions.references.length > 0 && (
            <View style={styles.subsection}>
              <Text style={styles.subsectionTitle}>{t('report.styleDecisions.references')}</Text>
              <View style={styles.imageGrid}>
                {data.conceptualization.styleDecisions.references.filter((reference) => reference.type === 'image').map((reference, index) => (
                  <Image key={index} src={reference.url} style={styles.largeImage} />
                ))}
              </View>
            </View>
          )}
          {/* Sketches */}
          {data.conceptualization.styleDecisions.sketches && data.conceptualization.styleDecisions.sketches.length > 0 && (
            <View style={styles.subsection}>
              <Text style={styles.subsectionTitle}>{t('report.styleDecisions.sketches')}</Text>
              <View style={styles.imageGrid}>
                {data.conceptualization.styleDecisions.sketches.map((sketch, index) => (
                  <Image key={index} src={sketch.url} style={styles.largeImage} />
                ))}
              </View>
            </View>
          )}
        </View>

        {/* 3. Feedback Session 01 */}
        {data.evaluation.feedbackSessions && data.evaluation.feedbackSessions["1"] && (
          <View style={[styles.card, styles.evaluationSectionThunder]}>
            <Text style={[styles.sectionTitle, styles.evaluationTitleThunder, styles.feedbackSessionTitleThunder]}>3. {t('report.evaluation.feedbackSessions')} 01</Text>
            <View style={styles.feedbackSection}>
              <View style={styles.sessionDateRow}>
                <Text style={styles.sessionDateLabel}>{t('report.evaluation.sessionDate')}:</Text>
                <Text style={styles.sessionDateValue}>{formatDate(data.evaluation.feedbackSessions["1"].sessionDate)}</Text>
              </View>
              {/* Good Points */}
              {data.evaluation.feedbackSessions["1"].goodPoints && (
                <View style={styles.subsection}>
                  <Text style={styles.subsectionTitle}>{t('report.evaluation.goodPoints')}</Text>
                  <View style={styles.listSection}>
                    {data.evaluation.feedbackSessions["1"].goodPoints.map((point, index) => (
                      <Text key={index} style={styles.listItem}>• {point}</Text>
                    ))}
                  </View>
                </View>
              )}
              {/* Improvement Points */}
              {data.evaluation.feedbackSessions["1"].improvementPoints && (
                <View style={styles.subsection}>
                  <Text style={styles.subsectionTitle}>{t('report.evaluation.improvementPoints')}</Text>
                  <View style={styles.listSection}>
                    {data.evaluation.feedbackSessions["1"].improvementPoints.map((point, index) => (
                      <Text key={index} style={styles.listItem}>• {point}</Text>
                    ))}
                  </View>
                </View>
              )}
              {/* Comments */}
              {data.evaluation.feedbackSessions["1"].comments && (
                <View style={styles.subsection}>
                  <Text style={styles.subsectionTitle}>{t('report.evaluation.comments')}</Text>
                  <Text style={styles.text}>{data.evaluation.feedbackSessions["1"].comments}</Text>
                </View>
              )}
              {/* Completion Criteria */}
              {data.evaluation.feedbackSessions["1"].criteriaMatch && data.evaluation.feedbackSessions["1"].criteriaMatch.length > 0 && (
                <View style={styles.subsection}>
                  <Text style={styles.subsectionTitle}>{t('report.evaluation.completionCriteria')}</Text>
                  <View style={styles.listSection}>
                    {data.evaluation.feedbackSessions["1"].criteriaMatch.map((criteria, index) => (
                      <Text key={index} style={styles.listItem}>• {t(criteria.criteria)}: {criteria.met ? '✓' : '✗'}</Text>
                    ))}
                  </View>
                </View>
              )}
            </View>
          </View>
        )}

        {/* 4. Medium Fidelity Prototype */}
        {data.prototyping.medium && (
          <View style={[styles.card, styles.prototypingSectionThunder]}>
            <Text style={[styles.sectionTitle, styles.prototypingTitleThunder]}>4. {t('report.prototyping.mediumFidelity')}</Text>
            {data.prototyping.medium.images && data.prototyping.medium.images.length > 0 && (
              <View style={styles.imageGrid}>
                {data.prototyping.medium.images.map((image, index) => (
                  <Image key={index} src={image.url} style={styles.largeImage} />
                ))}
              </View>
            )}
          </View>
        )}

        {/* 5. Feedback Session 02 */}
        {data.evaluation.feedbackSessions && data.evaluation.feedbackSessions["2"] && (
          <View style={[styles.card, styles.evaluationSectionThunder]}>
            <Text style={[styles.sectionTitle, styles.evaluationTitleThunder, styles.feedbackSessionTitleThunder]}>5. {t('report.evaluation.feedbackSessions')} 02</Text>
            <View style={styles.feedbackSection}>
              <View style={styles.sessionDateRow}>
                <Text style={styles.sessionDateLabel}>{t('report.evaluation.sessionDate')}:</Text>
                <Text style={styles.sessionDateValue}>{formatDate(data.evaluation.feedbackSessions["2"].sessionDate)}</Text>
              </View>
              {/* Good Points */}
              {data.evaluation.feedbackSessions["2"].goodPoints && (
                <View style={styles.subsection}>
                  <Text style={styles.subsectionTitle}>{t('report.evaluation.goodPoints')}</Text>
                  <View style={styles.listSection}>
                    {data.evaluation.feedbackSessions["2"].goodPoints.map((point, index) => (
                      <Text key={index} style={styles.listItem}>• {point}</Text>
                    ))}
                  </View>
                </View>
              )}
              {/* Improvement Points */}
              {data.evaluation.feedbackSessions["2"].improvementPoints && (
                <View style={styles.subsection}>
                  <Text style={styles.subsectionTitle}>{t('report.evaluation.improvementPoints')}</Text>
                  <View style={styles.listSection}>
                    {data.evaluation.feedbackSessions["2"].improvementPoints.map((point, index) => (
                      <Text key={index} style={styles.listItem}>• {point}</Text>
                    ))}
                  </View>
                </View>
              )}
              {/* Comments */}
              {data.evaluation.feedbackSessions["2"].comments && (
                <View style={styles.subsection}>
                  <Text style={styles.subsectionTitle}>{t('report.evaluation.comments')}</Text>
                  <Text style={styles.text}>{data.evaluation.feedbackSessions["2"].comments}</Text>
                </View>
              )}
              {/* Completion Criteria */}
              {data.evaluation.feedbackSessions["2"].criteriaMatch && data.evaluation.feedbackSessions["2"].criteriaMatch.length > 0 && (
                <View style={styles.subsection}>
                  <Text style={styles.subsectionTitle}>{t('report.evaluation.completionCriteria')}</Text>
                  <View style={styles.listSection}>
                    {data.evaluation.feedbackSessions["2"].criteriaMatch.map((criteria, index) => (
                      <Text key={index} style={styles.listItem}>• {t(criteria.criteria)}: {criteria.met ? '✓' : '✗'}</Text>
                    ))}
                  </View>
                </View>
              )}
            </View>
          </View>
        )}

        {/* 6. High Fidelity Prototype */}
        {data.prototyping.high && (
          <View style={[styles.card, styles.prototypingSectionThunder]}>
            <Text style={[styles.sectionTitle, styles.prototypingTitleThunder]}>6. {t('report.prototyping.highFidelity')}</Text>
            {data.prototyping.high.images && data.prototyping.high.images.length > 0 && (
              <View style={styles.imageGrid}>
                {data.prototyping.high.images.map((image, index) => (
                  <Image key={index} src={image.url} style={styles.largeImage} />
                ))}
              </View>
            )}
          </View>
        )}

        {/* 7. Feedback Session 03 */}
        {data.evaluation.feedbackSessions && data.evaluation.feedbackSessions["3"] && (
          <View style={[styles.card, styles.evaluationSectionThunder]}>
            <Text style={[styles.sectionTitle, styles.evaluationTitleThunder, styles.feedbackSessionTitleThunder]}>7. {t('report.evaluation.feedbackSessions')} 03</Text>
            <View style={styles.feedbackSection}>
              <View style={styles.sessionDateRow}>
                <Text style={styles.sessionDateLabel}>{t('report.evaluation.sessionDate')}:</Text>
                <Text style={styles.sessionDateValue}>{formatDate(data.evaluation.feedbackSessions["3"].sessionDate)}</Text>
              </View>
              {/* Good Points */}
              {data.evaluation.feedbackSessions["3"].goodPoints && (
                <View style={styles.subsection}>
                  <Text style={styles.subsectionTitle}>{t('report.evaluation.goodPoints')}</Text>
                  <View style={styles.listSection}>
                    {data.evaluation.feedbackSessions["3"].goodPoints.map((point, index) => (
                      <Text key={index} style={styles.listItem}>• {point}</Text>
                    ))}
                  </View>
                </View>
              )}
              {/* Improvement Points */}
              {data.evaluation.feedbackSessions["3"].improvementPoints && (
                <View style={styles.subsection}>
                  <Text style={styles.subsectionTitle}>{t('report.evaluation.improvementPoints')}</Text>
                  <View style={styles.listSection}>
                    {data.evaluation.feedbackSessions["3"].improvementPoints.map((point, index) => (
                      <Text key={index} style={styles.listItem}>• {point}</Text>
                    ))}
                  </View>
                </View>
              )}
              {/* Comments */}
              {data.evaluation.feedbackSessions["3"].comments && (
                <View style={styles.subsection}>
                  <Text style={styles.subsectionTitle}>{t('report.evaluation.comments')}</Text>
                  <Text style={styles.text}>{data.evaluation.feedbackSessions["3"].comments}</Text>
                </View>
              )}
              {/* Completion Criteria */}
              {data.evaluation.feedbackSessions["3"].criteriaMatch && data.evaluation.feedbackSessions["3"].criteriaMatch.length > 0 && (
                <View style={styles.subsection}>
                  <Text style={styles.subsectionTitle}>{t('report.evaluation.completionCriteria')}</Text>
                  <View style={styles.listSection}>
                    {data.evaluation.feedbackSessions["3"].criteriaMatch.map((criteria, index) => (
                      <Text key={index} style={styles.listItem}>• {t(criteria.criteria)}: {criteria.met ? '✓' : '✗'}</Text>
                    ))}
                  </View>
                </View>
              )}
            </View>
          </View>
        )}

        {/* 8. Laboratory Test */}
        {data.evaluation.laboratoryTest && (
          <View style={[styles.card, styles.evaluationSectionThunder]}>
            <Text style={[styles.sectionTitle, styles.evaluationTitleThunder]}>8. {t('report.evaluation.laboratoryTest')}</Text>
            {/* Determine */}
            {data.evaluation.laboratoryTest.determine.objectives && data.evaluation.laboratoryTest.determine.objectives.length > 0 && (
              <View style={styles.subsection}>
                <Text style={styles.subsectionTitle}>{t('laboratoryTest.sections.determine.title')}</Text>
                <View style={styles.listSection}>
                  {data.evaluation.laboratoryTest.determine.objectives.map((item, index) => (
                    <View key={index}>
                      <Text style={styles.listItem}>• {item.title}</Text>
                      {item.subitems && item.subitems.map((subitem, subIndex) => (
                        <Text key={subIndex} style={styles.subListItem}>  - {subitem}</Text>
                      ))}
                    </View>
                  ))}
                </View>
              </View>
            )}
            {/* Explore */}
            {data.evaluation.laboratoryTest.explore.questions && data.evaluation.laboratoryTest.explore.questions.length > 0 && (
              <View style={styles.subsection}>
                <Text style={styles.subsectionTitle}>{t('laboratoryTest.sections.explore.title')}</Text>
                <View style={styles.listSection}>
                  {data.evaluation.laboratoryTest.explore.questions.map((item, index) => (
                    <View key={index}>
                      <Text style={styles.listItem}>• {item.title}</Text>
                      {item.subitems && item.subitems.map((subitem, subIndex) => (
                        <Text key={subIndex} style={styles.subListItem}>  - {subitem}</Text>
                      ))}
                    </View>
                  ))}
                </View>
              </View>
            )}
            {/* Choose */}
            {data.evaluation.laboratoryTest.choose.methods && data.evaluation.laboratoryTest.choose.methods.length > 0 && (
              <View style={styles.subsection}>
                <Text style={styles.subsectionTitle}>{t('laboratoryTest.sections.choose.title')}</Text>
                <View style={styles.listSection}>
                  {data.evaluation.laboratoryTest.choose.methods.map((method, index) => (
                    <Text key={index} style={styles.listItem}>• {method}</Text>
                  ))}
                </View>
              </View>
            )}
            {/* Identify */}
            {data.evaluation.laboratoryTest.identify.practicalAspects && data.evaluation.laboratoryTest.identify.practicalAspects.length > 0 && (
              <View style={styles.subsection}>
                <Text style={styles.subsectionTitle}>{t('laboratoryTest.sections.identify.title')}</Text>
                <View style={styles.listSection}>
                  {data.evaluation.laboratoryTest.identify.practicalAspects.map((aspect, index) => (
                    <Text key={index} style={styles.listItem}>• {aspect}</Text>
                  ))}
                </View>
              </View>
            )}
            {/* Decide */}
            {data.evaluation.laboratoryTest.decide.ethicalConsiderations && data.evaluation.laboratoryTest.decide.ethicalConsiderations.length > 0 && (
              <View style={styles.subsection}>
                <Text style={styles.subsectionTitle}>{t('laboratoryTest.sections.decide.title')}</Text>
                <View style={styles.listSection}>
                  {data.evaluation.laboratoryTest.decide.ethicalConsiderations.map((consideration, index) => (
                    <Text key={index} style={styles.listItem}>• {consideration}</Text>
                  ))}
                </View>
              </View>
            )}
            {/* Evaluate */}
            {data.evaluation.laboratoryTest.evaluate.analysisPoints && data.evaluation.laboratoryTest.evaluate.analysisPoints.length > 0 && (
              <View style={styles.subsection}>
                <Text style={styles.subsectionTitle}>{t('laboratoryTest.sections.evaluate.title')}</Text>
                <View style={styles.listSection}>
                  {data.evaluation.laboratoryTest.evaluate.analysisPoints.map((point, index) => (
                    <Text key={index} style={styles.listItem}>• {point}</Text>
                  ))}
                </View>
              </View>
            )}
            {/* Results Summary */}
            {data.evaluation.laboratoryTest.resultsSummary && (
              <View style={styles.subsection}>
                <Text style={styles.subsectionTitle}>{t('report.evaluation.resultsSummary')}</Text>
                <Text style={styles.text}>{data.evaluation.laboratoryTest.resultsSummary}</Text>
              </View>
            )}
            {/* Completion Criteria */}
            {data.evaluation.laboratoryTest.completionCriteria && data.evaluation.laboratoryTest.completionCriteria.length > 0 && (
              <View style={styles.subsection}>
                <Text style={styles.subsectionTitle}>{t('report.evaluation.completionCriteria')}</Text>
                <View style={styles.listSection}>
                  {data.evaluation.laboratoryTest.completionCriteria.map((criteria, index) => (
                    <Text key={index} style={styles.listItem}>• {t(criteria.criteria)}: {criteria.met ? '✓' : '✗'}</Text>
                  ))}
                </View>
              </View>
            )}
          </View>
        )}

        {/* 9. Field Test */}
        {data.evaluation.fieldTest && (
          <View style={[styles.card, styles.evaluationSectionThunder]}>
            <Text style={[styles.sectionTitle, styles.evaluationTitleThunder]}>9. {t('report.evaluation.fieldTest')}</Text>
            {/* Determine */}
            {data.evaluation.fieldTest.determine.objectives && data.evaluation.fieldTest.determine.objectives.length > 0 && (
              <View style={styles.subsection}>
                <Text style={styles.subsectionTitle}>{t('fieldTest.sections.determine.title')}</Text>
                <View style={styles.listSection}>
                  {data.evaluation.fieldTest.determine.objectives.map((item, index) => (
                    <View key={index}>
                      <Text style={styles.listItem}>• {item.title}</Text>
                      {item.subitems && item.subitems.map((subitem, subIndex) => (
                        <Text key={subIndex} style={styles.subListItem}>  - {subitem}</Text>
                      ))}
                    </View>
                  ))}
                </View>
              </View>
            )}
            {/* Explore */}
            {data.evaluation.fieldTest.explore.questions && data.evaluation.fieldTest.explore.questions.length > 0 && (
              <View style={styles.subsection}>
                <Text style={styles.subsectionTitle}>{t('fieldTest.sections.explore.title')}</Text>
                <View style={styles.listSection}>
                  {data.evaluation.fieldTest.explore.questions.map((item, index) => (
                    <View key={index}>
                      <Text style={styles.listItem}>• {item.title}</Text>
                      {item.subitems && item.subitems.map((subitem, subIndex) => (
                        <Text key={subIndex} style={styles.subListItem}>  - {subitem}</Text>
                      ))}
                    </View>
                  ))}
                </View>
              </View>
            )}
            {/* Choose */}
            {data.evaluation.fieldTest.choose.methods && data.evaluation.fieldTest.choose.methods.length > 0 && (
              <View style={styles.subsection}>
                <Text style={styles.subsectionTitle}>{t('fieldTest.sections.choose.title')}</Text>
                <View style={styles.listSection}>
                  {data.evaluation.fieldTest.choose.methods.map((method, index) => (
                    <Text key={index} style={styles.listItem}>• {method}</Text>
                  ))}
                </View>
              </View>
            )}
            {/* Identify */}
            {data.evaluation.fieldTest.identify.practicalAspects && data.evaluation.fieldTest.identify.practicalAspects.length > 0 && (
              <View style={styles.subsection}>
                <Text style={styles.subsectionTitle}>{t('fieldTest.sections.identify.title')}</Text>
                <View style={styles.listSection}>
                  {data.evaluation.fieldTest.identify.practicalAspects.map((aspect, index) => (
                    <Text key={index} style={styles.listItem}>• {aspect}</Text>
                  ))}
                </View>
              </View>
            )}
            {/* Decide */}
            {data.evaluation.fieldTest.decide.ethicalConsiderations && data.evaluation.fieldTest.decide.ethicalConsiderations.length > 0 && (
              <View style={styles.subsection}>
                <Text style={styles.subsectionTitle}>{t('fieldTest.sections.decide.title')}</Text>
                <View style={styles.listSection}>
                  {data.evaluation.fieldTest.decide.ethicalConsiderations.map((consideration, index) => (
                    <Text key={index} style={styles.listItem}>• {consideration}</Text>
                  ))}
                </View>
              </View>
            )}
            {/* Evaluate */}
            {data.evaluation.fieldTest.evaluate.analysisPoints && data.evaluation.fieldTest.evaluate.analysisPoints.length > 0 && (
              <View style={styles.subsection}>
                <Text style={styles.subsectionTitle}>{t('fieldTest.sections.evaluate.title')}</Text>
                <View style={styles.listSection}>
                  {data.evaluation.fieldTest.evaluate.analysisPoints.map((point, index) => (
                    <Text key={index} style={styles.listItem}>• {point}</Text>
                  ))}
                </View>
              </View>
            )}
            {/* Results Summary */}
            {data.evaluation.fieldTest.resultsSummary && (
              <View style={styles.subsection}>
                <Text style={styles.subsectionTitle}>{t('report.evaluation.resultsSummary')}</Text>
                <Text style={styles.text}>{data.evaluation.fieldTest.resultsSummary}</Text>
              </View>
            )}
            {/* Completion Criteria */}
            {data.evaluation.fieldTest.completionCriteria && data.evaluation.fieldTest.completionCriteria.length > 0 && (
              <View style={styles.subsection}>
                <Text style={styles.subsectionTitle}>{t('report.evaluation.completionCriteria')}</Text>
                <View style={styles.listSection}>
                  {data.evaluation.fieldTest.completionCriteria.map((criteria, index) => (
                    <Text key={index} style={styles.listItem}>• {t(criteria.criteria)}: {criteria.met ? '✓' : '✗'}</Text>
                  ))}
                </View>
              </View>
            )}
          </View>
        )}
      </View>
    </>
  );
};

export default function Report() {
  const { t } = useTranslation();
  const { data } = useThunder();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadResources = async () => {
      try {
        // Aguarda um pequeno delay para garantir que os recursos estejam carregados
        await new Promise(resolve => setTimeout(resolve, 500));
        setIsLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao carregar o relatório');
        setIsLoading(false);
      }
    };

    loadResources();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando relatório...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center text-red-500">
          <p>Erro ao carregar o relatório: {error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Tentar novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen">
      <PDFViewer style={{ width: '100%', height: '100%' }}>
        <Document>
          <Page size="A4" style={styles.page}>
            <MyDocument data={data} t={t} />
          </Page>
        </Document>
      </PDFViewer>
    </div>
  );
}

const styles = StyleSheet.create({
  page: {
    padding: 40,
    backgroundColor: '#ffffff',
    fontFamily: 'Poppins'
  },
  mainTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 32,
    color: '#E91E63',
    textAlign: 'center',
    borderBottom: '3px solid #E91E63',
    paddingBottom: 12,
    letterSpacing: 0.5
  },
  sectionGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: 24,
  },
  card: {
    marginBottom: 24,
    padding: 18,
    backgroundColor: '#fff',
    borderRadius: 0,
    border: '1.5px solid #e0e0e0',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
  },
  conceptualizationSectionThunder: {
    borderColor: '#1565C0',
    backgroundColor: '#F0F7FF',
  },
  conceptualizationTitleThunder: {
    color: '#1565C0',
    borderBottom: '2px solid #1565C0',
  },
  prototypingSectionThunder: {
    borderColor: '#C62828',
    backgroundColor: '#FFF5F3',
  },
  prototypingTitleThunder: {
    color: '#C62828',
    borderBottom: '2px solid #C62828',
  },
  evaluationSectionThunder: {
    borderColor: '#00838F',
    backgroundColor: '#F5FAFC',
  },
  evaluationTitleThunder: {
    color: '#00838F',
    borderBottom: '2px solid #00838F',
  },
  feedbackSessionTitleThunder: {
    color: 'inherit',
    backgroundColor: 'transparent',
    borderRadius: 0,
    padding: 0,
    marginBottom: 18,
  },
  sectionTitle: {
    fontSize: 24,
    marginBottom: 16,
    fontWeight: 'bold',
    paddingBottom: 8,
    letterSpacing: 0.3,
    color: 'inherit',
  },
  subsection: {
    marginTop: 12,
    marginBottom: 12,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 0,
    border: '1px solid #e0e0e0',
    boxShadow: '0 1px 2px rgba(0,0,0,0.03)'
  },
  subsectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2c3e50',
    letterSpacing: 0.2
  },
  text: {
    fontSize: 12,
    color: '#2c3e50',
    marginBottom: 6,
    lineHeight: 1.6,
    letterSpacing: 0.1
  },
  listSection: {
    marginTop: 8,
    marginBottom: 8
  },
  listItem: {
    fontSize: 12,
    color: '#2c3e50',
    marginBottom: 6,
    lineHeight: 1.6,
    letterSpacing: 0.1
  },
  subListItem: {
    fontSize: 11,
    color: '#34495e',
    marginBottom: 4,
    marginLeft: 16,
    lineHeight: 1.5,
    letterSpacing: 0.1
  },
  bold: {
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  link: {
    color: '#C62828',
    textDecoration: 'underline',
  },
  imageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
    gap: 10
  },
  largeImage: {
    width: 180,
    height: 180,
    borderRadius: 0,
    border: '1px solid #e0e0e0',
    objectFit: 'cover',
    boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
  },
  colorPalette: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 8
  },
  colorBox: {
    width: 50,
    height: 50,
    borderRadius: 0,
    border: '1px solid #e0e0e0',
    boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
  },
  feedbackSection: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 0,
    boxShadow: '0 1px 2px rgba(0,0,0,0.03)'
  },
  sessionDateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 2,
  },
  sessionDateLabel: {
    fontSize: 13,
    color: '#607D8B',
    fontWeight: 'bold',
    marginRight: 6,
  },
  sessionDateValue: {
    fontSize: 13,
    color: '#37474F',
    backgroundColor: '#F1F8E9',
    borderRadius: 0,
    padding: '2px 8px',
    fontWeight: 'bold',
  },
  segmentBlock: {
    marginBottom: 10,
    paddingLeft: 8,
    borderLeft: '3px solid #1565C0',
  },
});