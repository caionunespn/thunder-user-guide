import React from "react";
import { Link } from "react-router-dom";
import { ThemeControls } from "../../components/ThemeControls";
import { useTheme } from "../../contexts/ThemeContext";

const Evaluation = () => {
  const { mode, theme } = useTheme();
  const stageColors = theme.colors[mode].stages.evaluation;
  const typography = theme.typography;
  const shadows = theme.shadows;
  const transitions = theme.transitions;

  return (
    <div
      className="min-h-screen py-12 px-4 sm:px-6 lg:px-8"
      style={{
        background: `linear-gradient(to bottom right, ${stageColors.background.gradient.from}, ${stageColors.background.gradient.via}, ${stageColors.background.gradient.to})`
      }}
    >
      <div className="max-w-6xl mx-auto">
        <div
          className="backdrop-blur-lg rounded-2xl p-8 shadow-xl border"
          style={{
            backgroundColor: stageColors.background.card,
            borderColor: stageColors.border.light,
            boxShadow: shadows.large
          }}
        >
          <Link
            to="/"
            className="inline-flex items-center mb-8"
            style={{
              color: stageColors.text.secondary
            }}
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Voltar
          </Link>
          <h1
            className="text-center leading-tight mb-8"
            style={{
              fontSize: typography.h1.size,
              fontWeight: typography.h1.weight,
              lineHeight: typography.h1.lineHeight,
              color: stageColors.text.primary
            }}
          >
            Avaliação
          </h1>
          <p
            className="text-center mb-12"
            style={{
              fontSize: typography.body.large.size,
              lineHeight: typography.body.large.lineHeight,
              color: stageColors.text.primary
            }}
          >
            A fase de avaliação é a terceira etapa do processo Thunder. Nela, são realizados testes com usuários para avaliar a usabilidade e a eficiência dos designs.
          </p>
          <p
            className="text-center mb-12"
            style={{
              fontSize: typography.body.large.size,
              lineHeight: typography.body.large.lineHeight,
              color: stageColors.text.primary
            }}
          >
            Abaixo, acesse os links para guardar os resultados dos testes realizados nesta fase.
          </p>
          <div className="space-y-6">
            <Link
              to="/evaluation/laboratory-test"
              className="group block w-full backdrop-blur-md rounded-xl text-center border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              style={{
                backgroundColor: stageColors.background.button.primary,
                padding: theme.spacing.button.padding,
                boxShadow: shadows.medium,
                borderColor: stageColors.border.button,
                color: stageColors.background.button.text,
                transition: transitions.default
              }}
            >
              <div className="flex items-center justify-center space-x-4">
                <span className="text-2xl">🔬</span>
                <span>Teste Laboratório</span>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">→</span>
              </div>
            </Link>
            <Link
              to="/evaluation/field-test"
              className="group block w-full backdrop-blur-md rounded-xl text-center border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              style={{
                backgroundColor: stageColors.background.button.secondary,
                padding: theme.spacing.button.padding,
                boxShadow: shadows.medium,
                borderColor: stageColors.border.button,
                color: stageColors.background.button.text,
                transition: transitions.default
              }}
            >
              <div className="flex items-center justify-center space-x-4">
                <span className="text-2xl">🌍</span>
                <span>Teste de Campo</span>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">→</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <ThemeControls />
    </div>
  );
};

export default Evaluation;
