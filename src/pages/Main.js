import { useState } from "react";
import ErrorBoundary from "../components/errorBoundary/ErrorBoundary";
import RandomChar from "../components/randomChar/RandomChar";
import CharList from "../components/charList/CharList";
import CharInfo from "../components/charInfo/CharInfo";

const Main = () => {
    const [selectedChar, setSelectedChar] = useState(1011400)

    const onCharSelected = (id) => {
        setSelectedChar(id);
    }

    return (
        <>
            <ErrorBoundary>
                <RandomChar />
            </ErrorBoundary>

            <div className="char__content">

                <ErrorBoundary>
                    <CharList onCharSelected={onCharSelected} />
                </ErrorBoundary>


                <ErrorBoundary>
                    <CharInfo selectedChar={selectedChar} />
                </ErrorBoundary>

            </div>
        </>
    )

}

export default Main;