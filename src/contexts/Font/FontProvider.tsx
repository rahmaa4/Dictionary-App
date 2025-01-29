import { useEffect, useState } from "react";
import { FontType } from "../../library/types";
import FontContext from "./FontContext";
import { MONO, SANS_SERIF, SERIF } from "../../library/constants";

type FontProviderProp = {
    children: React.ReactNode;
}

const FontProvider = ({ children }: FontProviderProp) => {
    const [font, setFont] = useState<FontType>(():FontType => {
        const storedFont = sessionStorage.getItem("font");
        if (storedFont && (storedFont === SERIF || storedFont === MONO)) {
            return storedFont as FontType ;
        } else {
            return SANS_SERIF;
        }
    });

    useEffect(() => {
        sessionStorage.setItem("font", font)
        console.log(font);
    },[font])


    return (
        <FontContext.Provider value={{font, setFont}}>
            {children}
        </FontContext.Provider>
    )
}

export default FontProvider;