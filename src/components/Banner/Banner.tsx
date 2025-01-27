import SelectFont from "./SelectFont/SelectFont";
import ToggleTheme from "./ToggleTheme/ToggleTheme";
import styles from "./Banner.module.scss";
const logo = "src/assets/icons/logo.svg";

const Banner = () => {
    
    return (
        <div className={styles.bannerWrapper}>
            <div className={styles.logoWrapper}>
                <img src={logo} alt="Book Logo" />
            </div>
            <div className={styles.bannerToggles}>
                <SelectFont />
                <div className={styles.toggleSep}></div>
                <ToggleTheme/>
            </div>
        </div>
    )
}

export default Banner;