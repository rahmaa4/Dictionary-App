import { useRef, useEffect, useState } from "react";
import styles from "./PlayButton.module.scss";
import { purple, purpleLight, playIcon, pauseIcon} from "../../library/constants";
import { handleIconStylePurple, handleIconStyleGrey3} from "../../library/helpers";

type PlayButton = {
    audioSrc: string, 
    isAudioAvail: boolean;
}


const PlayButton = ({ audioSrc, isAudioAvail }: PlayButton) => {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlay, setIsPlay] = useState(false);
    const [iconToDisplay, setIconToDisplay] = useState(playIcon);

    useEffect(() => {
        if (audioRef.current) {
            if (isAudioAvail) {
                audioRef.current.load();
                if (isPlay) {
                    setIconToDisplay(pauseIcon);
                    audioRef.current.play();   
                } else {
                    setIconToDisplay(playIcon);
                    audioRef.current.pause();
                    audioRef.current.currentTime = 0;
                }
            } else { 
                audioRef.current.removeAttribute("controls");
            }
       }
    }, [isPlay, isAudioAvail]) //to load the new audio
    

    
    //when audio ends
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.addEventListener("ended", () => setIsPlay(false))
        }
        return () => {
            if (audioRef.current) {
                audioRef.current.removeEventListener("ended", () => setIsPlay(false))
            }
        }
    }, [])


    useEffect(() => {
        const audioButton = document.getElementById("audio-button");
        if (audioButton) {
            audioButton.addEventListener("mouseover", () => {
                audioButton.style.backgroundColor = purple;
                handleIconStyleGrey3()
            })
            audioButton.addEventListener("mouseleave", () => {
                audioButton.style.backgroundColor = purpleLight;
                handleIconStylePurple()
            })
        }

        return () => {
            if (audioButton) {
                audioButton.removeEventListener("mouseover", () => {
                    audioButton.style.backgroundColor = purple;
                    handleIconStyleGrey3();
                })
                audioButton.removeEventListener("mouseleave", () => {
                    audioButton.style.backgroundColor = purpleLight;
                    handleIconStylePurple();
                })
            }
        }
    
    }, []);


    return (
        <button id="audio-button" onClick={() => setIsPlay((prev) => !prev)} className={styles.audioWrapper}>
            <div className={styles.audioButtonIcon}>
                {iconToDisplay}
            </div>
            <audio ref={audioRef} id="def-audio" controls ><source type="audio/mp3" src={audioSrc} /></audio>
        </button>
    )
};

export default PlayButton;