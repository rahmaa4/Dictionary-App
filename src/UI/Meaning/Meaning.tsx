import { useContext, useEffect } from "react";
import styles from "./Meaning.module.scss";
import FontContext from "../../contexts/Font/FontContext";
import ThemeContext from "../../contexts/Theme/ThemeContext";
import { black2, grey3, MONO,  MONO_FONT, SANS_SERIF_FONT,  SERIF,  SERIF_FONT } from "../../library/constants";

type MeaningProp = {
    meaning: string;
}
const Meaning = ({meaning} : MeaningProp) => {
    const { isLight } = useContext(ThemeContext);
    const { font } = useContext(FontContext);

    
    useEffect(() => {
        const meaningTextEls = Array.from(document.getElementsByClassName(`${styles.meaningText}`)) as HTMLElement[]
        switch (font) {
            case SERIF: {
                meaningTextEls.forEach((el) => {
                    el.style.fontFamily = SERIF_FONT;
                })
                break;
            }
            case MONO: {
                meaningTextEls.forEach((el) => {
                    el.style.fontFamily = MONO_FONT;
                })
                break;
            }
            default: {
                meaningTextEls.forEach((el) => {
                    el.style.fontFamily = SANS_SERIF_FONT;
                })
                break;
            }
        }
        
    }, [font]);

    useEffect(() => {
        const meaningTextEls = Array.from(document.getElementsByClassName(`${styles.meaningText}`)) as HTMLElement[]
        if (!isLight) {
            meaningTextEls.forEach((el) => {
                el.style.color = grey3;
            })
        } else {
            meaningTextEls.forEach((el) => {
                el.style.color = black2
            })
        }
    }, [isLight]);


    return (
        <p className={styles.meaningText}>{meaning}</p>
    )
}

export default Meaning;