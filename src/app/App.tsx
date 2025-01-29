import {useState } from "react";
import Banner from "../components/Banner/Banner";
import Search from "../components/Search/Search";
import Definition from "../components/Definition/Definition";
import AppProvider from "../contexts/AppProvider";


const App = () => {
    const [isSubmit, setIsSubmit] = useState(false);
    return (
        <AppProvider>
            <Banner/>
            <Search setIsSubmit={setIsSubmit} />
            <Definition isSubmit={isSubmit} setIsSubmit={setIsSubmit} />
        </AppProvider>
    )
}

export default App;