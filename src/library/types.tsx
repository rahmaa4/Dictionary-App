export type FontType = "Serif" | "Sans Serif" | "Mono";
export type ThemeContextType = { isLight: boolean; setIsLight: React.Dispatch<React.SetStateAction<boolean>> };
export type FontContextType = {font: FontType, setFont:React.Dispatch<React.SetStateAction<FontType>> }
export type QueryContextType = { query: string, setQuery: React.Dispatch<React.SetStateAction<string>> }
