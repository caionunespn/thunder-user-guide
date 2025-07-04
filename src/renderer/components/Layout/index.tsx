import React from 'react';
import { Menu } from '../Menu';
import { Footer } from '../Footer';
import { useTheme } from '../../contexts/ThemeContext';
import { StepSkip } from '../StepSkip';
export const Layout = ({ children }: { children: React.ReactNode }) => {
  const { mode, theme } = useTheme();
  const colors = theme.colors[mode];

  return (
    <div
      className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-8"
      style={{
        background: `linear-gradient(to bottom right, ${colors.background.gradient.from}, ${colors.background.gradient.via}, ${colors.background.gradient.to})`
      }}
    >
      <Menu />
      <StepSkip />
      {children}
      <StepSkip />
      <Footer />
    </div>
  );
};