import styles from "./Definition.module.scss";
import Audio from "./Audio/Audio.tsx";
import Noun from "./Noun/Noun.tsx";
import Verb from "./Verb/Verb.tsx";
import ErrorUI from "../../UI/ErrorUI/ErrorUI.tsx";
import { useContext, useEffect, useState } from "react";
import { FontContext, QueryContext, ThemeContext } from "../../app/App.tsx";
import {SERIF, MONO, SERIF_FONT, MONO_FONT, SANS_SERIF_FONT} from "../../library/constants.tsx";
import { black2, grey3 } from "../../library/constants.tsx";
import { handleDisplayInputError, handleHideInputError } from "../../library/helpers.tsx";

const iconNewWindow = "src/assets/icons/icon-new-window.svg";

type DefinitionProp = {
    isSubmit: boolean;
    setIsSubmit: React.Dispatch<React.SetStateAction<boolean>>
}

const Definition = ({ isSubmit, setIsSubmit }: DefinitionProp) => {
    
    const { isLight } = useContext(ThemeContext);
    const { font } = useContext(FontContext);
    const { query } = useContext(QueryContext);
    const [definitionData, setDefinitionData] = useState<Record<string, any>>({});
    const [word, setWord] = useState<string>("");
    const [sourceURLs, setSourceURLs] = useState<string[]>([]);
    const [meanings, setMeanings] = useState<Record<string, any>[]>([{}]);
    const [phonetics, setPhonetics] = useState<null | Record<string,any>[]>(null);
    const [showErrorUI, setShowErrorUI] = useState(false);
    const [isLoading, setIsLoading] = useState<"complete"|"incomplete">("incomplete");


    useEffect(() => {
        const greyTextEls = Array.from(document.getElementsByClassName("greyText")) as HTMLElement[]
        const sourceLink = Array.from(document.getElementsByClassName(`${styles.sourceText}`)) as HTMLElement[];
        const sourceText = document.getElementById("source-label")!;

        switch(font) {
            case SERIF: {
                greyTextEls.forEach((el) => {
                    el.style.fontFamily = SERIF_FONT;
                })
                sourceLink.forEach((el) => {
                    el.style.fontFamily = SERIF_FONT
                })
                sourceText.style.fontFamily = SERIF_FONT;
                break;
            }
            case MONO: {
                greyTextEls.forEach((el) => {
                    el.style.fontFamily = MONO_FONT;
                })
                sourceLink.forEach((el) => {
                    el.style.fontFamily = MONO_FONT;
                })
                sourceText.style.fontFamily = MONO_FONT;
                break;
            }
            default: {
                greyTextEls.forEach((el) => {
                    el.style.fontFamily = SANS_SERIF_FONT;
                })
                sourceLink.forEach((el) => {
                    el.style.fontFamily = SANS_SERIF_FONT;
                });
                sourceText.style.fontFamily = SANS_SERIF_FONT;
            }
        }
    }, [font]);


    useEffect(() => {
        const sourceLink = Array.from(document.getElementsByClassName(`${styles.sourceText}`)) as HTMLElement[];
        if (sourceLink) {
            if (!isLight) {
                sourceLink.forEach((el) => el.style.color = grey3);
            } else {
                sourceLink.forEach((el) => el.style.color = black2);
            }
        }
      
    }, [isLight]);


    const getDefintion = async (query:string) => {
        try {
            const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${query}`);
            if (response.ok) {
                const definition = await response.json();
                return definition[0];
            } 
        } catch (e) {
            console.log(e);
        }
    }


    const handleGetDefin = async (query:string) => {
        const definition = await getDefintion(query);
        setDefinitionData(definition);
        setIsLoading("complete");
    }


    useEffect(() => {
        if (isSubmit) {
            if (query === "" || !query) {
                handleDisplayInputError();
                setIsSubmit(false);
            } else {
                handleHideInputError();
                handleGetDefin(query);
                setIsSubmit(false);
            }
        }
    }, [isSubmit])//cs-validation
    

    useEffect(() => {
        handleGetDefin(query);
    }, []) //on first render only, use def values 

    useEffect(() => {
        if (definitionData) {
            setShowErrorUI(false);
            setWord(definitionData.word);
            setMeanings(definitionData.meanings);
            setSourceURLs(definitionData.sourceUrls);
            setPhonetics(definitionData.phonetics);
        } else {
            setShowErrorUI(true);
        }
    }, [definitionData]);

    useEffect(() => {
        const definWrapper = document.querySelector(`.${styles.defWrapper}`) as HTMLElement;
        if (definWrapper) {
            if (showErrorUI) {
                definWrapper.style.display = "none";
            } else {
                definWrapper.style.display = "flex";
            }
        }
    }, [showErrorUI]);





    return (
        <>
            <div className={styles.defWrapper}>
            <Audio word={word} phonetics={phonetics} />
            <Noun isLoading={isLoading} meanings= {meanings} />
            <Verb isLoading={isLoading} meanings={meanings} />
            <div className={styles.sourceWrapper}>
                <p id="source-label">Source</p>
                <div className={styles.sourceContainer}>
                    {
                        sourceURLs && <a target="_blank" href={sourceURLs[0]} className={styles.sourceText}>{sourceURLs[0]}</a>
                    }
                </div>
                <img src={iconNewWindow} alt="" />
            </div>
        </div>  
        <ErrorUI showErrorUI={showErrorUI} />
        </>
    )
}

export default Definition;