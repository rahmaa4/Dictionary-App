import { createContext, useEffect, useState } from "react";
//components
import Banner from "../components/Banner/Banner";
import Search from "../components/Search/Search";
import Definition from "../components/Definition/Definition";
//types
import { ThemeContextType, FontContextType, QueryContextType, FontType } from "../library/types";
//constants
import { grey3, black0 } from "../library/constants";
import {SANS_SERIF} from "../library/constants";

export const ThemeContext = createContext<ThemeContextType>({ isLight: true, setIsLight: () => {} }); //default values specified
export const FontContext = createContext<FontContextType>({ font: SANS_SERIF, setFont: () =>{}}); //default values have been specified
export const QueryContext = createContext<QueryContextType>({ query: "keyboard", setQuery: () => {}});

const App = () => {
    const [isLight, setIsLight] = useState(true);
    const [font, setFont] = useState<FontType>(SANS_SERIF);
    const [query, setQuery] = useState("keyboard");
    const [isSubmit, setIsSubmit] = useState(false);
    useEffect(() => {
        const mainEl = document.querySelector("body");
        if (!isLight) {
            mainEl!.style.backgroundColor = black0;
        } else {
            mainEl!.style.backgroundColor = grey3;
        }
    }, [isLight]);



    return (
        <ThemeContext.Provider value={{ isLight, setIsLight }}>
            <FontContext.Provider value={{ font, setFont }}>
                <QueryContext.Provider value={{query, setQuery}}>
                    <Banner/>
                    <Search setIsSubmit={setIsSubmit} />
                    <Definition isSubmit={isSubmit} setIsSubmit={setIsSubmit} />
                </QueryContext.Provider>
            </FontContext.Provider>
        </ThemeContext.Provider>
    )
}

export default App;