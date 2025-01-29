import { useContext, useEffect } from "react";
import ThemeContext from "../../../contexts/Theme/ThemeContext";
import styles from "./ToggleTheme.module.scss";
import { purple, grey0 } from "../../../library/constants";

const moon = (
    <svg id="moonIcon" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22">
                <path fill="none" stroke="#838383" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
                d="M1 10.449a10.544 10.544 0 0 0 19.993 4.686C11.544 15.135 6.858 10.448 6.858 1A10.545 10.545 0 0 0 1 10.449Z" />
    </svg>
)

const ToggleTheme = () => {
    const {isLight, setIsLight} = useContext(ThemeContext);

    const handleClick = () => {
        setIsLight((prev) => !prev);
    }

    useEffect(() => {
        const toggleButton = document.getElementById("toggleButton");
        const toggleCont = document.querySelector(`.${styles.toggleContainer}`)! as HTMLElement;
        const moonIcon = document.getElementById("moonIcon")!.children[0] as HTMLElement;
        if (!isLight) {
            toggleButton!.style.transform = "translateX(20px)";
            toggleCont.style.backgroundColor = purple;
            moonIcon.setAttribute("stroke", purple);
        } else {
            toggleButton!.style.transform = "none";
            toggleCont.style.backgroundColor = grey0;
            moonIcon.setAttribute("stroke", grey0);
        }
    }, [isLight]);
    

    return (
        <div className={styles.toggleWrapper}>
            <div className={styles.toggleContainer}>
                <button onClick={handleClick} className={styles.toggle} id="toggleButton"></button>
            </div>
            {moon}
        </div>
    )
}

export default ToggleTheme;