import React, {createContext, useContext} from 'react';
import {CssVarsProvider, useColorScheme} from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';

type ThemeMode = 'light' | 'dark';

interface ThemeContextType {
    mode: ThemeMode | undefined;
    resolvedMode: ThemeMode | undefined;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

/**
 * Internal provider to access useColorScheme from Joy UI
 */
const ThemeInnerProvider = ({children}: { children: React.ReactNode }) => {
    const {mode, setMode, systemMode} = useColorScheme();

    const toggleTheme = () => {
        setMode(mode === 'light' ? 'dark' : 'light');
    };

    const resolvedMode = (mode === 'system' ? systemMode : mode) as ThemeMode | undefined;

    return (
        <ThemeContext.Provider value={{
            mode: mode as ThemeMode | undefined,
            resolvedMode,
            toggleTheme
        }}>
            {children}
        </ThemeContext.Provider>
    );
};

/**
 * Main ThemeProvider that wraps Joy UI's CssVarsProvider
 * and provides a custom ThemeContext for child components.
 */
export const ThemeProvider = ({children}: { children: React.ReactNode }) => {
    return (
        <CssVarsProvider defaultMode="dark">
            <CssBaseline/>
            <ThemeInnerProvider>{children}</ThemeInnerProvider>
        </CssVarsProvider>
    );
};

/**
 * Hook to use the theme context
 */
export const useThemeContext = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useThemeContext must be used within a ThemeProvider');
    }
    return context;
};
