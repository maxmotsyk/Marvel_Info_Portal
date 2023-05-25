import { Component } from "react/cjs/react.production.min";
import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import decoration from '../../resources/img/vision.png';
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

class App extends Component {

    state = {   
        selectedChar : 1011400
    }

    onCharSelected = (id) =>{
        this.setState({selectedChar: id})
    }

    render () {
        
        return (
            <div className="app">
                <AppHeader/>
                <main>

                    <ErrorBoundary>
                        <RandomChar/>
                    </ErrorBoundary>
                   
                    <div className="char__content">

                        <ErrorBoundary>
                            <CharList onCharSelected={this.onCharSelected}/>
                        </ErrorBoundary>
                    

                        <ErrorBoundary>
                            <CharInfo selectedChar={this.state.selectedChar}/>
                        </ErrorBoundary>
                       
                    </div>

                    <img className="bg-decoration" src={decoration} alt="vision"/>

                </main>

            </div>
        )
    }

}

export default App;