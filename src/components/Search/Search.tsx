import { useContext, useEffect, useState } from "react";
import styles from "./Search.module.scss";
import FontContext from "../../contexts/Font/FontContext";
import ThemeContext from "../../contexts/Theme/ThemeContext";
import QueryContext from "../../contexts/Query/QueryContext";
import {SERIF, MONO, SERIF_FONT, MONO_FONT, SANS_SERIF_FONT } from "../../library/constants";
import { grey3, black1, black2, grey2 } from "../../library/constants";


type SearchProp = {
    setIsSubmit: React.Dispatch<React.SetStateAction<boolean>>
}


const Search = ({setIsSubmit} : SearchProp) => {
    const [userInput, setUserInput] = useState("");
    const { isLight } = useContext(ThemeContext);
    const { font} = useContext(FontContext);
    const { setQuery } = useContext(QueryContext);


     useEffect(() => {
        const inputEl = document.getElementById("search-input")!;
        switch (font) {
            case SERIF: {
                inputEl.style.fontFamily = SERIF_FONT;
                break;
            }
            case MONO: {
                inputEl.style.fontFamily = MONO_FONT;
                break;
            }
            default: {
                inputEl.style.fontFamily = SANS_SERIF_FONT;
            }
        }
     }, [font]);
               
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setQuery(userInput);
        setIsSubmit(true);
       }


    const handleUserInput = ({target}: React.ChangeEvent<HTMLInputElement>) => {
        setUserInput(target.value)
    }

    useEffect(() => {
        const inputEl = document.getElementById("search-input")!;
        if (!isLight) {
            inputEl.style.backgroundColor = black1;
            inputEl.style.color = grey3;
        } else {
            inputEl.style.backgroundColor = grey2;
            inputEl.style.color = black2;
        }
    }, [isLight]);


    return (
        <>
            <form onSubmit={handleSubmit} action="" method="POST" className={styles.formWrapper}>
                <input onChange={handleUserInput} id="search-input" type="text" name="word-query" placeholder="Search for any word..."/>
            </form>
            <p id="error-message-el" className={styles.inputErrorMessage}>Whoops, can't be empty...</p>
        </> 
    )
}

export default Search;