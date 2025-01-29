import { createContext } from "react";

type ThemeContextType = {
    isLight: boolean,
    setIsLight: React.Dispatch<React.SetStateAction<boolean>>
}

const ThemeContext = createContext<ThemeContextType>({ isLight: true, setIsLight: () => { } })

export default ThemeContext;