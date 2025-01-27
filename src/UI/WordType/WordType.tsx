import { useContext, useEffect } from "react";
import styles from "./WordType.module.scss";
import { FontContext, ThemeContext } from "../../app/App";
import { black2, grey3, MONO, MONO_FONT, SANS_SERIF_FONT, SERIF, SERIF_FONT } from "../../library/constants";

type wordTypeProp = {
    children: React.ReactNode;
}

const WordType = ({ children }: wordTypeProp) => {
    const { isLight } = useContext(ThemeContext);
    const { font } = useContext(FontContext);

    useEffect(() => {
        const wordTypeText = Array.from(document.getElementsByClassName(`${styles.wordType}`)) as HTMLElement[];
        switch (font) {
            case SERIF: {
                wordTypeText.forEach((el) => {
                    el.style.fontFamily = SERIF_FONT;
                })
                break;
            }
            case MONO: {
                wordTypeText.forEach((el) => {
                    el.style.fontFamily = MONO_FONT;
                })
                break;
            }
            default: {
                wordTypeText.forEach((el) => {
                    el.style.fontFamily = SANS_SERIF_FONT;
                })
            }
        }
        
    }, [font])

    useEffect(() => {
        const wordTypeText = Array.from(document.getElementsByClassName(`${styles.wordType}`)) as HTMLElement[];
        if (!isLight) {
            wordTypeText.forEach((el) => {
                el.style.color = grey3;
            })
        } else {
            wordTypeText.forEach((el) => {
                el.style.color = black2;
            })
        }
    }, [isLight])



    return (
        <div className={styles.wordTypeTitle}>
            <p id="word-type-text" className={styles.wordType}>{children}</p>
            <div className={styles.greyLine}>
            </div>
        </div>   
      
    )
}

export default WordType;