import { useContext, useEffect } from "react";
import styles from "./Example.module.scss";
import { FontContext } from "../../app/App";
import { MONO, MONO_FONT, SANS_SERIF_FONT, SERIF, SERIF_FONT } from "../../library/constants";
type ExampleProp = {
    children: React.ReactNode;
}

const Example = ({ children }: ExampleProp) => {
    const { font } = useContext(FontContext);

    useEffect(() => {
        const verbExampleEls = Array.from(document.getElementsByClassName(`${styles.verbExample}`)) as HTMLElement[];
        if (verbExampleEls) {
            switch (font) {
                case SERIF: {
                    verbExampleEls.forEach((el) => {
                        el.style.fontFamily = SERIF_FONT;
                    });
                    break;
                }
                case MONO: {
                    verbExampleEls.forEach((el) => {
                        el.style.fontFamily = MONO_FONT;
                    });
                    break;
                }
                default: {
                    verbExampleEls.forEach((el) => {
                        el.style.fontFamily = SANS_SERIF_FONT;
                    });
                }
            }
        }
    }, [font])


    return <p className={styles.verbExample}>"{children}"</p>
}

export default Example;