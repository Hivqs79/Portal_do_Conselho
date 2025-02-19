import { createContext, useContext, useState } from "react";

interface ThemeContextValue {
    mode: "light" | "dark";
    setMode: React.Dispatch<React.SetStateAction<"light" | "dark">>;
    pallete: string;
    setPallete: React.Dispatch<React.SetStateAction<string>>;
}
  
const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

  
export const ThemeProviderContext = ({children}: Readonly<{children: React.ReactNode}>) => {
    const [mode, setMode] = useState<"light" | "dark">("light");
    const [pallete, setPallete] = useState<string>("blue");
    return (
      <ThemeContext.Provider value={{mode, setMode, pallete, setPallete}}>
        {children}
      </ThemeContext.Provider>
    );
  };

  
export const useThemeContext = () => {
    const themeContext = useContext(ThemeContext);
    if (themeContext === undefined) {
      throw new Error('useThemeContext must be inside a ThemeProvider');
    }
    return themeContext;
  };