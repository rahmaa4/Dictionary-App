import { useEffect, useState } from "react";
import QueryContext from "./QueryContext";

type QueryProviderProp = {
    children: React.ReactNode;
}

const QueryProvider = ({ children }: QueryProviderProp) => {
    const [query, setQuery] = useState<string>((): string => {
        const storedQuery = sessionStorage.getItem("query");
        if (storedQuery && storedQuery !== "") {
            return storedQuery;
        } else {
            return "keyboard";
        }
    })

    useEffect(() => {
        sessionStorage.setItem("query", query)
    }, [query]) //to persist state.

    return (
        <QueryContext.Provider value={{ query, setQuery}}>
            {children}
        </QueryContext.Provider>
    )
};


export default QueryProvider;