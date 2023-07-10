import { useState } from "react";
import ErrorBoundary from "../components/errorBoundary/ErrorBoundary";
import RandomChar from "../components/randomChar/RandomChar";
import CharList from "../components/charList/CharList";
import CharInfo from "../components/charInfo/CharInfo";
import decoration from '../resources/img/vision.png';


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

            <img className="bg-decoration" src={decoration} alt="vision" />
        </>
    )

}

export default Main;