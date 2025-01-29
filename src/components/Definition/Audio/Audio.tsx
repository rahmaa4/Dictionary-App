import {useEffect, useContext, useState} from "react";
import styles from "./Audio.module.scss";
import FontContext from "../../../contexts/Font/FontContext";
import ThemeContext from "../../../contexts/Theme/ThemeContext";
import PlayButton from "../../../UI/PlayButton/PlayButton";
import { black2, grey3, MONO, MONO_FONT, SANS_SERIF_FONT, SERIF, SERIF_FONT } from "../../../library/constants";


type AudioPropType = {
    word: string,
    phonetics: null | Record<string, any>[]
};

const Audio = ({word, phonetics} : AudioPropType) => {
    const { isLight } = useContext(ThemeContext);
    const { font } = useContext(FontContext);
    const [audioSrc, setAudioSrc] = useState("");
    const [phonetic, setPhonetic] = useState("");
    const [isAudioAvail, setIsAudioAvail] = useState(false);
    const [isPhoneticTextAvail, setIsPhoneticTextAvail] = useState(false);
    
    useEffect(() => {
        const audioH1El = document.getElementById("audio-h1")!;
        const definSup = document.getElementById("defin-sup")!;
        switch (font) {
            case SERIF: {
                audioH1El.style.fontFamily = SERIF_FONT;
                definSup.style.fontFamily = SERIF_FONT;
                break;
            }
            case MONO: {
                audioH1El.style.fontFamily = MONO_FONT;
                definSup.style.fontFamily = MONO_FONT;
                break;
            }
            default: {
                audioH1El.style.fontFamily = SANS_SERIF_FONT;
                definSup.style.fontFamily = SANS_SERIF_FONT;
            }
        }
        
    }, [font]);

    useEffect(() => {
        const audioH1El = document.getElementById("audio-h1")!;
        if (!isLight) {
            audioH1El.style.color = grey3;
        } else {
            audioH1El.style.color = black2;
        }
    }, [isLight]);

   
    useEffect(() => {
        if (phonetics) {
            const checkPhoneticsAudio = phonetics.filter((obj) => obj.audio.length !== 0);
            const checkPhoneticsText = phonetics.filter((obj) => obj.text !== "");
            if (checkPhoneticsAudio.length !== 0) {
                setAudioSrc(checkPhoneticsAudio[0].audio);
                setIsAudioAvail(true);
            } else {
                setIsAudioAvail(false);
            }
            if (checkPhoneticsText.length !== 0) {
                setIsPhoneticTextAvail(true);
                setPhonetic(checkPhoneticsText[0].text);
            } else {
                setIsPhoneticTextAvail(false);
            }
        } 
    }, [phonetics])    


    useEffect(() => {
        if (!isPhoneticTextAvail) {
            setPhonetic("[Phonetic not available]")
        }
    }, [isPhoneticTextAvail])




    
    return (
        <div className={styles.textAudioWrapper}>
            <div className={styles.textWrapper}>
                <h1 id="audio-h1">{word}</h1>
                <p id="defin-sup">{phonetic}</p>
            </div>
            <PlayButton isAudioAvail={isAudioAvail} audioSrc={audioSrc} />
        </div>
    )
};

export default Audio;