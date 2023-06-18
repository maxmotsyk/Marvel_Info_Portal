import { useState } from "react";
import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import decoration from '../../resources/img/vision.png';
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import ComicsList from "../comicsList/ComicsList";

const App = () =>  {
    const [selectedChar, setSelectedChar] = useState(1011400)

    const onCharSelected = (id) =>{
        setSelectedChar(id);
    }

    return (
        <div className="app">
            <AppHeader/>
            <main>

{/*                 <ErrorBoundary>
                    <RandomChar/>
                </ErrorBoundary>
               
                <div className="char__content">

                    <ErrorBoundary>
                        <CharList onCharSelected={onCharSelected}/>
                    </ErrorBoundary>
                

                    <ErrorBoundary>
                        <CharInfo selectedChar={selectedChar}/>
                    </ErrorBoundary>
                   
                </div> */}
                <ComicsList/>

                <img className="bg-decoration" src={decoration} alt="vision"/>

            </main>

        </div>
    )

}

export default App;