import FontProvider from "./Font/FontProvider";
import QueryProvider from "./Query/QueryProvider";
import ThemeProvider from "./Theme/ThemeProvider";

type AppProviderProp = {
    children: React.ReactNode;
}
const AppProvider = ({children} : AppProviderProp) => {
    return (
        <ThemeProvider>
            <FontProvider>
                <QueryProvider>
                    {children}
                </QueryProvider>
            </FontProvider>
        </ThemeProvider>

    )
}

export default AppProvider;