import { createContext } from "react";
import { QueryContextType } from "../../library/types";

type QueryContext = {
    query: string,
    setQuery : React.Dispatch<React.SetStateAction<string>>
}

const QueryContext = createContext<QueryContextType>({ query: "keyboard", setQuery:() => {}});

export default QueryContext;