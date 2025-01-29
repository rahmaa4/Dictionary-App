import {useContext, useEffect, useState } from "react";
import styles from "./SelectFont.module.scss";
import FontContext from "../../../contexts/Font/FontContext";
import ThemeContext from "../../../contexts/Theme/ThemeContext";
import { grey3, black2, black0, SERIF_FONT, MONO_FONT, SANS_SERIF_FONT, purple } from "../../../library/constants";
import { SERIF, SANS_SERIF, MONO } from "../../../library/constants";
import { FontType } from "../../../library/types";

const SelectFont = () => {
    const { isLight } = useContext(ThemeContext);
    const {font, setFont} = useContext(FontContext);
    const [selectedFont, setSelectedFont] = useState<FontType>(SANS_SERIF);
    const [isDisplayOptions, setIsDisplayOptions] = useState(false);

    useEffect(() => {
        const optionEls = Array.from(document.getElementsByClassName(`${styles.option}`))! as HTMLElement[];
        optionEls.forEach((el) => {
            el.addEventListener("mouseover", () => {
                el.style.color = purple;
            })
            el.addEventListener("mouseleave", () => {
                if (isLight) {
                    el.style.color = black2;
                } else {
                    el.style.color = grey3;
                }

            })
        })


        return () => {
            optionEls.forEach((el) => {
                el.removeEventListener("mouseover", () => {
                    el.style.color = purple;
                })
                el.removeEventListener("mouseleave", () => {
                    if (isLight) {
                        el.style.color = black2;
                    } else {
                        el.style.color = grey3;
                    }
    
                })
            })
        }
    }, [isLight]);


    
    useEffect(() => {
        const selectButton = document.getElementById("select-font-bttn")! as HTMLElement;
        const optionsCont = document.getElementById("options-cont")
        const optionEls = Array.from(document.getElementsByClassName(`${styles.option}`))! as HTMLElement[];
        if (selectButton) {
            if (!isLight) {
                selectButton.style.color = grey3;
            } else {
                selectButton.style.color = black2;
            }
        }
        if (optionsCont && optionEls) {
            if (!isLight) {
                optionEls.forEach((el) => {
                    el.style.color = grey3;
                });
                optionsCont.style.backgroundColor = black0;
                optionsCont.style.boxShadow = `0px 1px 10px ${purple}`
            } else {
                optionEls.forEach((el) => {
                    el.style.color = black2;
                });
                optionsCont.style.backgroundColor = grey3;
                optionsCont.style.boxShadow = ` 0px 1px 30px hsla(0, 0%, 0%, 10%)`;
            }
        } 
    }, [isLight]);


    useEffect(() => {
        const selectButton = document.querySelector(`.${styles.fontOptionsButton}`) as HTMLElement;
        if (selectButton) {
            switch (font) {
                case SERIF: {
                    selectButton.style.fontFamily = SERIF_FONT;
                    break;
                }
                case MONO: {
                    selectButton.style.fontFamily = MONO_FONT;
                    break;
                }
                default: {
                    selectButton.style.fontFamily = SANS_SERIF_FONT;
                }
            }
        }
    }, [font])


    useEffect(() => {
        setFont(selectedFont);
    }, [selectedFont]);

    useEffect(() => {
        const optionsCont = document.getElementById("options-cont")!;
        if (!isDisplayOptions) {
            optionsCont.style.display = "none";
        } else {
            optionsCont.style.display = "flex";
        }

    }, [isDisplayOptions])


    const handleSelectFont = ({target} : React.MouseEvent<HTMLLIElement, MouseEvent>) => {
        const fontSelectEl = target as HTMLElement;
        setSelectedFont(fontSelectEl.innerHTML as FontType)
        setIsDisplayOptions((prev) => !prev);
    }

    return (
        <div className={styles.fontOptionsWrapper}>
            <button onClick={ () =>{ setIsDisplayOptions((prev) => !prev)}} id="select-font-bttn" className={styles.fontOptionsButton}>{selectedFont}</button>
            <ul id="options-cont" className={styles.optionsContainer}>
                <li key={`font-opt-1`} id={SANS_SERIF} className={styles.option} onClick={handleSelectFont}>Sans Serif</li>
                <li key={`font-opt-2`} id={SERIF} className={styles.option}  onClick={handleSelectFont}>Serif</li>
                <li key={`font-opt-3`} id={MONO} className={styles.option}  onClick={handleSelectFont}>Mono</li>
            </ul>
        </div>
    )
}

export default SelectFont;

