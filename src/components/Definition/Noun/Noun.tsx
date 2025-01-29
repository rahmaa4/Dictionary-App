import styles from "./Noun.module.scss";
import WordType from "../../../UI/WordType/WordType";
import Meaning from "../../../UI/Meaning/Meaning";
import { useEffect, useState, useContext } from "react";
import FontContext from "../../../contexts/Font/FontContext";
import { MONO, MONO_FONT, SANS_SERIF_FONT, SERIF, SERIF_FONT } from "../../../library/constants";
type NounProp = {
    meanings: Record<string, any>[],
    isLoading: "complete" | "incomplete";

}
const Noun = ({ meanings, isLoading }: NounProp) => {
    const [nounMeanings, setNounMeanings] = useState<Record<string, any>[] | null>(null);
    const [nounSynonyms, setNounSynonyms] = useState<string[]>([]);
    const { font } = useContext(FontContext);



    useEffect(() => {
        if (isLoading === "complete") {
            if (meanings && meanings[0]) {
                setNounMeanings(meanings[0].definitions);
                setNounSynonyms(meanings[0].synonyms);
            }
        }
    }, [meanings])


    useEffect(() => {
        const synonWords = Array.from(document.getElementsByClassName(`${styles.synonWord}`)) as HTMLElement[];
        if (synonWords) {
            switch (font) {
                case SERIF: {
                    synonWords.forEach((el) => {
                        el.style.fontFamily = SERIF_FONT;
                    });
                    break;
                }
                case MONO: {
                    synonWords.forEach((el) => {
                        el.style.fontFamily = MONO_FONT
                    });
                    break;
                }
                default: {
                    synonWords.forEach((el) => {
                        el.style.fontFamily = SANS_SERIF_FONT
                    });
                }
            }
        }
    }, [font]);


    


    return (
        <div className={styles.nounWrapper}>
            <WordType>
                noun
            </WordType>
            <div className={styles.meaningsWrapper}>
                <p className="greyText">Meaning</p>
                <ul className={styles.meaningsList}>
                    {
                        nounMeanings && (
                            nounMeanings.map((nounMeaning, index) => {
                                return (
                                    <li key={`noun-meaning-${index}`} className={styles.meaningListItem}>
                                        <Meaning meaning={nounMeaning.definition} />
                                    </li>
                                )
                            })
                        )
                    }
                </ul>
            </div>
            <div className={styles.synonWrapper}>
                <p className="greyText">Synonyms</p>
                <div className={styles.synonList}>
                    {
                        nounSynonyms && nounSynonyms.map((syn, index) => {
                            return <p className={styles.synonWord} key={`synon-${index}`}>{syn}</p>
                        })
                        
                    }
                </div>
            </div>
        </div>
    )
}

export default Noun;