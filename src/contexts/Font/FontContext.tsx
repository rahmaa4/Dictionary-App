import { createContext } from "react"; // to create a context
import { FontContextType } from "../../library/types"; //to type the initial context
import { SANS_SERIF } from "../../library/constants"; //for the default value.

const FontContext = createContext<FontContextType>({ font: SANS_SERIF, setFont: () => { } }); 
export default FontContext;