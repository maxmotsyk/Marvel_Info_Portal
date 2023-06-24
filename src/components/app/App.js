import AppHeader from "../appHeader/AppHeader";
import decoration from '../../resources/img/vision.png';
import {Main, ComicsList} from '../../pages'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const App = () => {

    return (
        <Router>
            <div className="app">
                <AppHeader />
                <main>
                    <Switch>
                        <Route exact path="/">
                            <Main/>
                        </Route>

                        <Route exact path="/comics">
                            <ComicsList/>
                        </Route>

                    </Switch>

                    <img className="bg-decoration" src={decoration} alt="vision" />

                </main>

            </div>
        </Router>
    )

}

export default App;