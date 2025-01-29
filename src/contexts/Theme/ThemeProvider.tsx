import { useEffect, useState } from "react"
import ThemeContext from "./ThemeContext"


type ThemeProviderProp = {
    children: React.ReactNode;
}


const ThemeProvider = ({children} : ThemeProviderProp) => {
    const [isLight, setIsLight] = useState(():boolean => {
        const storedTheme = sessionStorage.getItem("isLight");
        if (storedTheme && storedTheme !== "") {
            return JSON.parse(storedTheme);
        } else {
            return true
        }
    });//set initial state to a boolean, based on value 
    //stored in browsers session storage.


    useEffect(() => {
        sessionStorage.setItem("isLight", `${isLight}`);
    }, [isLight])



    return (
        <ThemeContext.Provider value={{ isLight, setIsLight }}>
            {children}
        </ThemeContext.Provider>
    )
}

export default ThemeProvider;