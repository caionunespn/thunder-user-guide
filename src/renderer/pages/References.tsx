import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useTranslation } from 'react-i18next';
import { ThemeControls } from '../components/ThemeControls';

const References: React.FC = () => {
  const { mode, theme } = useTheme();
  const { t } = useTranslation();
  const colors = theme.colors[mode];
  const typography = theme.typography;
  const shadows = theme.shadows;
  const transitions = theme.transitions;

  const sections = [
    {
      id: 'musicVisualization',
      title: t('references.sections.musicVisualization.title'),
      description: t('references.sections.musicVisualization.description'),
      items: [
        {
          title: 'Thunder: A Design Process to Build Emotionally Engaging Music Visualizations',
          authors: 'Nunes, C., Reinbold, I., Castro, M., & Darin, T.',
          year: '2024',
          publisher: 'Proceedings of the XXIII Brazilian Symposium on Human Factors in Computing Systems',
          link: 'https://dl.acm.org/doi/abs/10.1145/3702038.3702077',
          linkText: t('references.common.accessHere')
        },
        {
          title: 'The Sonification Handbook',
          authors: 'Hermann, T., Hunt, A., & Neuhoff, J. G.',
          year: '2011',
          publisher: 'Logos Verlag Berlin',
          link: 'https://sonification.de/handbook/',
          linkText: t('references.common.accessHere')
        },
        {
          title: 'Visualizing Music',
          authors: 'Isaacson, E.',
          year: '2023',
          publisher: 'Indiana University Press',
          link: 'https://iupress.org/9780253064738/visualizing-music/',
          linkText: 'Acessar aqui'
        },
        {
          title: 'A Survey of Music Visualization Techniques',
          authors: 'Lima, H. B., Santos, C. G. R. dos, & Meiguins, B. S.',
          year: '2021',
          publisher: 'Federal University of Pará',
          link: 'https://www.audiolabs-erlangen.de/content/05_fau/professor/00_mueller/02_teaching/2024s_sarntal/04_group_VIS/2021_LimaEtAl_MusicVisSurvey_ACM.pdf',
          linkText: 'Acessar aqui'
        },
        {
          title: 'Synesthesia: Audio-Visual Interactive Sound and Music Visualization in Virtual Reality',
          authors: 'Kubelka, O.',
          year: '2016',
          publisher: 'ResearchGate',
          link: 'https://www.researchgate.net/publication/313869775_Synesthesia_audio-visual_interactive-sound_and_music_visualization_in_virtual_reality_with_orbital_observation_and_navigation',
          linkText: 'Acessar aqui'
        },
        {
          title: 'Music Learning Through Visualization',
          authors: 'Hiraga, R & Watanabe, F. & Fujishiro, I.',
          year: '2003',
          publisher: 'ResearchGate',
          link: 'https://www.researchgate.net/publication/4001317_Music_learning_through_visualization',
          linkText: 'Acessar aqui'
        },
        {
          title: 'Coloring the Future: Visualizing Music in the Digital Era',
          authors: 'Lochhead, J.',
          year: '2019',
          publisher: 'Intégral',
          link: 'https://www.esm.rochester.edu/integral/33-2019/lochhead/',
          linkText: 'Acessar aqui'
        },
        {
          title: 'A Survey on Visualizations for Musical Data',
          authors: 'Khulusi, R., Kusnick, J., Meinecke, C., Gillmann, C., Focht, J., & Jänicke, S.',
          year: '2020',
          publisher: 'Wiley Online Library',
          link: 'https://onlinelibrary.wiley.com/doi/10.1111/cgf.13905',
          linkText: 'Acessar aqui'
        }
      ]
    },
    {
      id: 'designProcess',
      title: t('references.sections.designProcess.title'),
      description: t('references.sections.designProcess.description'),
      items: [
        {
          title: 'Design Thinking: Understanding How Designers Think and Work',
          authors: 'Cross, N.',
          year: '2011',
          publisher: 'Berg Publishers',
          link: 'https://www.bloomsbury.com/uk/design-thinking-9781847886361/',
          linkText: t('references.common.accessHere')
        },
        {
          title: 'The Design Process: A Visual Guide to Producing Better Graphics',
          authors: 'Ambrose, G., & Harris, P.',
          year: '2019',
          publisher: 'Bloomsbury Visual Arts',
          link: 'https://www.bloomsbury.com/uk/design-process-9781350090132/',
          linkText: t('references.common.accessHere')
        },
        {
          title: 'Designing for Interaction: Creating Smart Applications and Clever Devices',
          authors: 'Saffer, D.',
          year: '2009',
          publisher: 'New Riders',
          link: 'https://www.pearson.com/us/higher-education/program/Saffer-Designing-for-Interaction-Creating-Smart-Applications-and-Clever-Devices-2nd-Edition/PGM173349.html',
          linkText: t('references.common.accessHere')
        }
      ]
    },
    {
      id: 'hci',
      title: t('references.sections.hci.title'),
      description: t('references.sections.hci.description'),
      items: [
        {
          title: 'Interação humano-computador e experiência do usuario',
          authors: 'Barbosa, S. D. J., Silva, B. D., Silveira, M. S., Gasparini, I., Darin, T., & Barbosa, G. D. J.',
          year: '2021',
          publisher: 'Auto publicação',
          link: 'https://leanpub.com/ihc-ux',
          linkText: t('references.common.accessHere')
        },
        {
          title: 'Research Methods in Human-Computer Interaction',
          authors: 'Lazar, J., Feng, J. H., & Hochheiser, H.',
          year: '2017',
          publisher: 'Morgan Kaufmann',
          link: 'https://www.sciencedirect.com/book/9780128053904/research-methods-in-human-computer-interaction',
          linkText: 'Acessar aqui'
        },
        {
          title: 'Interaction Design: Beyond Human-Computer Interaction',
          authors: 'Rogers, Y., Sharp, H., & Preece, J.',
          year: '2019',
          publisher: 'Wiley',
          link: 'https://www.wiley.com/en-us/Interaction%2BDesign%3A%2BBeyond%2BHuman%2BComputer%2BInteraction%2C%2B6th%2BEdition-p-9781119901099',
          linkText: 'Acessar aqui'
        },
        {
          title: 'A Systematic Review About User Experience Evaluation',
          authors: 'Maia, C. L. B., & Furtado, E. S.',
          year: '2016',
          publisher: 'ResearchGate',
          link: 'https://www.researchgate.net/publication/304358305_A_Systematic_Review_About_User_Experience_Evaluation',
          linkText: 'Acessar aqui'
        },
        {
          title: 'GranDIHC-BR: Grand Research Challenges in Human-Computer Interaction in Brazil',
          authors: 'Barbosa, S. D. J., et al.',
          year: '2024',
          publisher: 'ACM Digital Library',
          link: 'https://dl.acm.org/doi/10.1145/3702038.3702061',
          linkText: 'Acessar aqui'
        },
        {
          title: 'Usability and User Experience Evaluation in Intelligent Environments: A Review and Reappraisal',
          authors: 'Ntoa, S.',
          year: '2024',
          publisher: 'International Journal of Human-Computer Interaction',
          link: 'https://www.researchgate.net/publication/384008802_Usability_and_User_Experience_Evaluation_in_Intelligent_Environments_A_Review_and_Reappraisal',
          linkText: 'Acessar aqui'
        },
      ]
    },
    {
      id: 'hciMethods',
      title: t('references.sections.hciMethods.title'),
      description: t('references.sections.hciMethods.description'),
      items: [
        {
          title: 'Cross-cultural adaptation of the Intrinsic Motivation Inventory Task Evaluation Questionnaire into Brazilian Portuguese',
          authors: 'Pereira Nunes, C. E., & Darin, T. G. R.',
          year: '2024',
          publisher: 'ResearchGate',
          link: 'https://www.researchgate.net/publication/377672513_Cross-cultural_adaptation_of_the_Intrinsic_Motivation_Inventory_Task_Evaluation_Questionnaire_into_Brazilian_Portuguese',
          linkText: 'Acessar aqui'
        },
        {
          title: 'Brazilian Portuguese Version of Intrinsic Motivation Inventory (IMI-Teq Br): Towards a Digital Well-Being Culture in Brazil.',
          authors: 'Nunes, C., & Darin, T.',
          year: '2024',
          publisher: 'Journal of the Brazilian Computer Society',
          link: 'https://journals-sol.sbc.org.br/index.php/jbcs/article/view/4305',
          linkText: 'Acessar aqui'
        },
        {
          title: 'UES-Br: Translation and Cross-Cultural Adaptation of the User Engagement Scale for Brazilian Portuguese',
          authors: 'Miranda, D., Li, C., & Darin, T.',
          year: '2021',
          publisher: 'Proceedings of the ACM on Human-Computer Interaction',
          link: 'https://dblp.org/rec/journals/pacmhci/MirandaLD21',
          linkText: 'Acessar aqui'
        },
        {
          title: 'PrEmo: Measuring Emotion – Development and Application of an Instrument to Measure Emotional Responses to Products',
          authors: 'Desmet, P. M. A.',
          year: '2003',
          publisher: 'Funology',
          link: 'https://diopd.org/premo/',
          linkText: 'Acessar aqui'
        },
        {
          title: 'User Experience Questionnaire (UEQ)',
          authors: 'Laugwitz, B., Schrepp, M., & Held, T.',
          year: '2008',
          publisher: 'Springer',
          link: 'https://www.ueq-online.org/',
          linkText: 'Acessar aqui'
        },
        {
          title: 'Self-Assessment Manikin (SAM)',
          authors: 'Bradley, M. M., & Lang, P. J.',
          year: '1994',
          publisher: 'Journal of Behavior Therapy and Experimental Psychiatry',
          link: 'https://www.sciencedirect.com/science/article/pii/0005791694900639',
          linkText: 'Acessar aqui'
        },
        {
          title: 'Positive and Negative Affect Schedule (PANAS)',
          authors: 'Watson, D., Clark, L. A., & Tellegen, A.',
          year: '1988',
          publisher: 'Journal of Personality and Social Psychology',
          link: 'https://www.researchgate.net/publication/235726247_Development_and_Validation_of_Brief_Measures_of_Positive_and_Negative_Affect_The_PANAS_Scales',
          linkText: 'Acessar aqui'
        },
        {
          title: 'AttrakDiff: A Questionnaire to Measure Perceived Hedonic and Pragmatic Quality',
          authors: 'Hassenzahl, M., Burmester, M., & Koller, F.',
          year: '2003',
          publisher: 'Funology',
          link: 'https://www.attrakdiff.de/index-en.html',
          linkText: 'Acessar aqui'
        },
        {
          title: 'EASE-Ux: Escala de Avaliação de Serviços de Educação a Distância pela Experiência do Usuário',
          authors: 'Bertagnolli, B., & Mager, G. B.',
          year: '2024',
          publisher: 'EaD em Foco',
          link: 'https://eademfoco.cecierj.edu.br/index.php/Revista/article/view/2214',
          linkText: 'Acessar aqui'
        }
      ]
    },
    {
      id: 'designTools',
      title: t('references.sections.designTools.title'),
      description: t('references.sections.designTools.description'),
      items: [
        {
          title: 'Figma',
          authors: 'Figma Inc.',
          year: '2024',
          publisher: 'Figma',
          link: 'https://www.figma.com/',
          linkText: t('references.common.accessHere')
        },
        {
          title: 'Adobe XD',
          authors: 'Adobe Inc.',
          year: '2024',
          publisher: 'Adobe',
          link: 'https://www.adobe.com/products/xd.html',
          linkText: t('references.common.accessHere')
        },
        {
          title: 'Sketch',
          authors: 'Sketch B.V.',
          year: '2024',
          publisher: 'Sketch',
          link: 'https://www.sketch.com/',
          linkText: t('references.common.accessHere')
        },
        {
          title: 'InVision',
          authors: 'InVision App Inc.',
          year: '2024',
          publisher: 'InVision',
          link: 'https://www.invisionapp.com/',
          linkText: t('references.common.accessHere')
        }
      ]
    },
    {
      id: 'animationTools',
      title: t('references.sections.animationTools.title'),
      description: t('references.sections.animationTools.description'),
      items: [
        {
          title: 'Adobe After Effects',
          authors: 'Adobe Inc.',
          year: '2024',
          publisher: 'Adobe',
          link: 'https://www.adobe.com/products/aftereffects.html',
          linkText: t('references.common.accessHere')
        },
        {
          title: 'Blender',
          authors: 'Blender Foundation',
          year: '2024',
          publisher: 'Blender',
          link: 'https://www.blender.org/',
          linkText: t('references.common.accessHere')
        },
        {
          title: 'Cinema 4D',
          authors: 'Maxon Computer GmbH',
          year: '2024',
          publisher: 'Maxon',
          link: 'https://www.maxon.net/en/cinema-4d',
          linkText: t('references.common.accessHere')
        },
      ]
    },
    {
      id: 'prototypingTools',
      title: t('references.sections.prototypingTools.title'),
      description: t('references.sections.prototypingTools.description'),
      items: [
        {
          title: 'Processing',
          authors: 'Reas, C., & Fry, B.',
          year: '2020',
          publisher: 'Processing Foundation',
          link: 'https://processing.org/',
          linkText: 'Acessar aqui'
        },
        {
          title: 'Three.js',
          authors: 'Cabello, R.',
          year: '2023',
          publisher: 'Three.js Documentation',
          link: 'https://threejs.org/',
          linkText: 'Acessar aqui'
        },
        {
          title: 'Web Audio API',
          authors: 'W3C Audio Working Group',
          year: '2023',
          publisher: 'W3C Specification',
          link: 'https://www.w3.org/TR/webaudio/',
          linkText: 'Acessar aqui'
        },
        {
          title: 'Tone.js',
          authors: 'Mann, Y.',
          year: '2023',
          publisher: 'Tone.js Documentation',
          link: 'https://tonejs.github.io/',
          linkText: 'Acessar aqui'
        },
        {
          title: 'D3.js',
          authors: 'Bostock, M.',
          year: '2023',
          publisher: 'D3.js Documentation',
          link: 'https://d3js.org/',
          linkText: 'Acessar aqui'
        },
        {
          title: 'p5.js',
          authors: 'Lauren McCarthy et al.',
          year: '2023',
          publisher: 'p5.js Documentation',
          link: 'https://p5js.org/',
          linkText: 'Acessar aqui'
        },
        {
          title: 'Max/MSP',
          authors: "Cycling '74",
          year: '2023',
          publisher: "Cycling '74",
          link: 'https://cycling74.com/products/max',
          linkText: t('references.common.accessHere')
        },
        {
          title: 'OpenFrameworks',
          authors: 'Zach Lieberman et al.',
          year: '2023',
          publisher: 'OpenFrameworks',
          link: 'https://openframeworks.cc/',
          linkText: 'Acessar aqui'
        }
      ]
    },
    {
      id: 'videoTutorials',
      title: t('references.sections.videoTutorials.title'),
      description: t('references.sections.videoTutorials.description'),
      items: [

        {
          title: t('references.sections.videoTutorials.items.designProcess.title'),
          type: 'video',
          embedUrl: 'https://www.youtube.com/embed/6lmvCqvmjfE',
          description: t('references.sections.videoTutorials.items.designProcess.description')
        },
        {
          title: t('references.sections.videoTutorials.items.musicVisualization.title'),
          type: 'video',
          embedUrl: 'https://www.youtube.com/embed/llnm4x7Zf30',
          description: t('references.sections.videoTutorials.items.musicVisualization.description')
        },
        {
          title: t('references.sections.videoTutorials.items.processing.title'),
          type: 'video',
          embedUrl: 'https://www.youtube.com/embed/XS62cBK9E7w',
          description: t('references.sections.videoTutorials.items.processing.description')
        },
        {
          title: t('references.sections.videoTutorials.items.webAudio.title'),
          type: 'video',
          embedUrl: 'https://www.youtube.com/embed/sb6C1XNqJzA',
          description: t('references.sections.videoTutorials.items.webAudio.description')
        },
        {
          title: t('references.sections.videoTutorials.items.threejs.title'),
          type: 'video',
          embedUrl: 'https://www.youtube.com/embed/qDIF2z_VtHs',
          description: t('references.sections.videoTutorials.items.threejs.description')
        },
      ]
    },
    {
      id: 'additionalResources',
      title: t('references.sections.additionalResources.title'),
      description: t('references.sections.additionalResources.description'),
      items: [
        {
          title: t('references.sections.additionalResources.blogs'),
          links: [
            {
              text: 'Interaction Design Foundation',
              url: 'https://www.interaction-design.org/'
            },
            {
              text: 'Nielsen Norman Group',
              url: 'https://www.nngroup.com/'
            },
            {
              text: 'Music Technology Blog',
              url: 'https://musictech.blog/'
            },
            {
              text: 'Design Week',
              url: 'https://www.designweek.co.uk/'
            },
          ]
        },
        {
          title: t('references.sections.additionalResources.courses'),
          links: [
            {
              text: 'HCI - University of California San Diego',
              url: 'https://www.coursera.org/learn/human-computer-interaction'
            },
            {
              text: 'Design Thinking for Innovation',
              url: 'https://www.coursera.org/learn/uva-darden-design-thinking-innovation'
            },
            {
              text: 'Motion Design School',
              url: 'https://motiondesign.school/'
            }
          ]
        }
      ]
    }
  ];

  return (
    <div
      className="min-h-screen"
      style={{
        background: `linear-gradient(to bottom right, ${colors.background.gradient.from}, ${colors.background.gradient.via}, ${colors.background.gradient.to})`
      }}
    >
      <div
        className="backdrop-blur-lg rounded-2xl p-8 shadow-xl border mb-8"
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
          {t('references.title')}
        </h1>
        <p
          className="text-center"
          style={{
            fontSize: typography.body.large.size,
            lineHeight: typography.body.large.lineHeight,
            color: colors.text.black
          }}
        >
          {t('references.description')}
        </p>
      </div>

      <div className="space-y-8">
        {sections.map((section) => (
          <div
            key={section.id}
            className="backdrop-blur-lg rounded-2xl p-8 shadow-xl border transition-all duration-300 hover:shadow-2xl"
            style={{
              backgroundColor: colors.background.card,
              borderColor: colors.border.light,
              boxShadow: shadows.large,
              transition: transitions.default
            }}
          >
            <h2
              className="text-center leading-tight mb-6"
              style={{
                fontSize: typography.h2.size,
                fontWeight: typography.h2.weight,
                lineHeight: typography.h2.lineHeight,
                color: colors.text.primary
              }}
            >
              {section.title}
            </h2>
            {section.description && (
              <p
                className="text-center mb-8"
                style={{
                  fontSize: typography.body.large.size,
                  lineHeight: typography.body.large.lineHeight,
                  color: colors.text.black
                }}
              >
                {section.description}
              </p>
            )}

            {section.id === 'videoTutorials' ? (
              <div className="space-y-8">
                {section.items.map((item, index) => (
                  <div
                    key={index}
                    className={`border-b pb-8 ${mode === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}
                  >
                    <h3
                      className="text-lg font-medium mb-4"
                      style={{ color: colors.text.primary }}
                    >
                      {item.title}
                    </h3>
                    <p
                      className="mb-6"
                      style={{
                        fontSize: typography.body.medium.size,
                        color: colors.text.black
                      }}
                    >
                      {item.description}
                    </p>
                    <div className="aspect-w-16 aspect-h-16 rounded-xl overflow-hidden shadow-lg">
                      <iframe
                        src={item.embedUrl}
                        title={item.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full min-h-[400px]"
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : section.id === 'additionalResources' ? (
              <div className="space-y-8">
                {section.items.map((item, index) => (
                  <div
                    key={index}
                    className={`border-b pb-8 ${mode === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}
                  >
                    <h3
                      className="text-lg font-medium mb-4"
                      style={{ color: colors.text.primary }}
                    >
                      {item.title}
                    </h3>
                    <div className="space-y-3">
                      {item.links?.map((link, linkIndex) => (
                        <a
                          key={linkIndex}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block transition-all duration-300 hover:translate-x-2"
                          style={{
                            color: colors.text.secondary,
                            fontSize: typography.body.medium.size
                          }}
                        >
                          {link.text}
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <ul className="space-y-8">
                {section.items.map((item, index) => (
                  <li
                    key={index}
                    className={`border-b pb-8 ${mode === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}
                  >
                    <h3
                      className="text-lg font-medium mb-4"
                      style={{ color: colors.text.primary }}
                    >
                      {item.title}
                    </h3>
                    <p
                      className="mb-4"
                      style={{
                        fontSize: typography.body.medium.size,
                        lineHeight: typography.body.medium.lineHeight,
                        color: colors.text.black
                      }}
                    >
                      {item.authors} ({item.year}). {item.publisher}
                    </p>
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block transition-all duration-300 hover:translate-x-2"
                      style={{
                        color: colors.text.secondary,
                        fontSize: typography.body.medium.size
                      }}
                    >
                      {item.linkText}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
      <ThemeControls />
    </div>
  );
};

export default References;
