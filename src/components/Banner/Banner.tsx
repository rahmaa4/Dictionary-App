import SelectFont from "./SelectFont/SelectFont";
import ToggleTheme from "./ToggleTheme/ToggleTheme";
import styles from "./Banner.module.scss";

const logo = "/logo.svg";

const Banner = () => {
    
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