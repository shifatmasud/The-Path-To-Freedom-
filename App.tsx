import React, { useState, useMemo, createContext, useContext, useEffect } from 'react';
import { motion } from 'framer-motion';
import HomePage from './components/Page/HomePage';
import { tokens, DesignTokens } from './design-tokens';

type Theme = 'light' | 'dark';

interface DesignSystemContextType {
  theme: Theme;
  toggleTheme: () => void;
  tokens: DesignTokens;
  themeTokens: DesignTokens['themes']['light' | 'dark'];
}

const DesignSystemContext = createContext<DesignSystemContextType | undefined>(undefined);

export const useDesignSystem = () => {
  const context = useContext(DesignSystemContext);
  if (!context) {
    throw new Error('useDesignSystem must be used within a DesignSystemProvider');
  }
  return context;
};

const App: React.FC = () => {
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    document.body.style.backgroundColor = tokens.themes[theme].Color.Base.Surface[1];
    document.body.style.color = tokens.themes[theme].Color.Base.Content[1];
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const themeTokens = useMemo(() => tokens.themes[theme], [theme]);
  const designSystemValue = useMemo(() => ({ theme, toggleTheme, tokens, themeTokens }), [theme, themeTokens]);
  
  const appStyle: React.CSSProperties = {
      minHeight: '100vh',
      transition: 'background-color 0.5s, color 0.5s',
      backgroundColor: themeTokens.Color.Base.Surface[1],
      color: themeTokens.Color.Base.Content[2],
  };

  return (
    <DesignSystemContext.Provider value={designSystemValue}>
        <motion.div 
            key={theme}
            style={appStyle}
        >
            <HomePage />
        </motion.div>
    </DesignSystemContext.Provider>
  );
};

export default App;
