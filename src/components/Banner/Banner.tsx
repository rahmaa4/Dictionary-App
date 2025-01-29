import { useContext, useEffect } from "react";
import ThemeContext from "../../contexts/Theme/ThemeContext";
import SelectFont from "./SelectFont/SelectFont";
import ToggleTheme from "./ToggleTheme/ToggleTheme";
import styles from "./Banner.module.scss";
import logo from "/logo.svg";
import { black0, grey3 } from "../../library/constants";


const Banner = () => {
    const { isLight } = useContext(ThemeContext);

    useEffect(() => {
        const mainEl = document.querySelector("body");
        if (!isLight) {
            mainEl!.style.backgroundColor = black0;
        } else {
            mainEl!.style.backgroundColor = grey3;
        }
    }, [isLight]);
    
    return (
        <div className={styles.bannerWrapper}>
            <a href="/" className={styles.logoWrapper}>
                <img src={logo} alt="Book Logo" />
            </a>
            <div className={styles.bannerToggles}>
                <SelectFont />
                <div className={styles.toggleSep}></div>
                <ToggleTheme/>
            </div>
        </div>
    )
}

export default Banner;