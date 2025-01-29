import styles from "./Verb.module.scss";
import WordType from "../../../UI/WordType/WordType"
import Meaning from "../../../UI/Meaning/Meaning";
import Example from "../../../UI/Example/Example";
import { useState, useEffect} from "react";

type VerbProp = {
    meanings: Record<string, any>[]
    isLoading: "complete" | "incomplete";
}

const Verb = ({ meanings, isLoading }: VerbProp) => {
    const [verbMeanings, setVerbMeanings] = useState<Record<string,any>[] | null>(null)
   

    useEffect(() => {
        const verbWrapper = document.getElementsByClassName(`${styles.verbWrapper}`)![0] as HTMLElement;
        if (isLoading === "complete") {
            if (meanings.length !== 0 && meanings[1]) {
                setVerbMeanings(meanings[1].definitions);
                verbWrapper.style.display = "flex";
            } else {
                verbWrapper.style.display = "none";
            }
        }
    }, [meanings])



    
    return (
        <div className={styles.verbWrapper}>
            <WordType>
                verb
            </WordType>
            <div className={styles.verbMeanings}>
                <p className={`greyText ${styles.verbMLabel}`}>Meaning</p>
                {
                    verbMeanings && 
                        verbMeanings.map((verbDef, index) => {
                            return <div className={styles.verbMeaningWrapper} key={`ver-wrapper-${index}`}> 
                                        <ul className={styles.verbMeaningCont}>
                                            <li key={`verb-meaning-${index}`} className={styles.meaningListItem}><Meaning meaning={verbDef.definition} /></li>
                                        </ul>
                                        <div className={styles.verbExampleWrapper}>
                                            {verbDef.example && <Example key={`verb-example-${index}`}>{verbDef.example}</Example>}
                                         </div>
                                      
                                   </div>
                        })
                }
            </div>
        </div>
    )
}

export default Verb;