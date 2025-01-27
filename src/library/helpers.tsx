//handle ButtonIconStyle grey3 Update
import { grey3, purple, red } from "./constants";

 export const handleIconStyleGrey3 = () => {
        const playIconSVGEl = document.getElementById("play-icon");
        const pauseIconSVGEl = document.getElementById("pause-icon");
        if (playIconSVGEl) {
            const playIconPathEl = playIconSVGEl.children[0] as HTMLElement;
            playIconPathEl.setAttribute("fill", grey3);
        } if(pauseIconSVGEl){
            const pauseIconPathEl = pauseIconSVGEl.children[0] as HTMLElement;
            pauseIconPathEl.setAttribute("fill", grey3);
        }
}

export const handleIconStylePurple = () => {
    const playIconSVGEl = document.getElementById("play-icon");
    const pauseIconSVGEl = document.getElementById("pause-icon");
    if (playIconSVGEl) {
        const playIconPathEl = playIconSVGEl.children[0] as HTMLElement;
        playIconPathEl.setAttribute("fill", purple);
    } if(pauseIconSVGEl){
        const pauseIconPathEl = pauseIconSVGEl.children[0] as HTMLElement;
        pauseIconPathEl.setAttribute("fill", purple);
    }
}



export const handleHideInputError = () => {
    const errorMessage = document.getElementById("error-message-el")!
    const inputEl = document.getElementById("search-input")!
    inputEl.style.border = "none";
    errorMessage.style.visibility = "hidden";
}

export const handleDisplayInputError = () => {
    const errorMessage = document.getElementById("error-message-el")!
    const inputEl = document.getElementById("search-input")!
    inputEl.style.border = `1px solid ${red}`;
    errorMessage.style.visibility = "visible";
}
