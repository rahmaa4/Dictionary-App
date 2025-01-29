import { useContext, useEffect } from "react";
import styles from "./ErrorUI.module.scss";
import FontContext from "../../contexts/Font/FontContext";
import ThemeContext from "../../contexts/Theme/ThemeContext";
import { black0, grey3, black2, SERIF, MONO, SERIF_FONT, MONO_FONT, SANS_SERIF_FONT } from "../../library/constants";


type ErrorUIProp = {
    showErrorUI: boolean;
}

const ErrorUI = ({showErrorUI}: ErrorUIProp) => {
    const { font } = useContext(FontContext);
    const { isLight } = useContext(ThemeContext);

    useEffect(() => {
        const errorHeading = document.getElementById("no-def-h1");
        const errorText = document.getElementById("no-def-text")
        if (errorHeading && errorText) {
            switch (font) {
                case SERIF: {
                    errorHeading.style.fontFamily = SERIF_FONT;
                    errorText.style.fontFamily = SERIF_FONT;
                    break;
                };
                case MONO: {
                    errorHeading.style.fontFamily = MONO_FONT;
                    errorText.style.fontFamily = MONO_FONT;
                    break;
                };
                default : {
                    errorHeading.style.fontFamily = SANS_SERIF_FONT;
                    errorText.style.fontFamily = SANS_SERIF_FONT;
                }
            }
        }
        
    }, [font]);

    useEffect(() => {
        const errorWrapper = document.getElementById("error-wrap");
        const errorHeading = document.getElementById("no-def-h1");
        if (errorWrapper && errorHeading) {
            if (!isLight) {
                    errorWrapper.style.backgroundColor = black0
                    errorHeading.style.color = grey3;
            } else {
                errorWrapper.style.backgroundColor = grey3;
                errorHeading.style.color = black2;
                }
        }
    }, [isLight]);


    useEffect(() => {
        const errorWrapper = document.getElementById("error-wrap");
        if (errorWrapper) {
            if (showErrorUI) {
                errorWrapper.style.display = "flex";
            } else {
                errorWrapper.style.display = "none";
            }
        }
    }, [showErrorUI])

    return (
        <section id="error-wrap" className={styles.errorContainer}>
            <h1 id="no-def-h1">No Definitions Found</h1>
            <p id="no-def-text">Sorry pal, we couldn't find definitions for the word you were looking for.
                You can try the search again at a later time or head to the web instead.
            </p>
        </section>
    );
}

export default ErrorUI;