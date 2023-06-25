import AppHeader from "../appHeader/AppHeader";
import decoration from '../../resources/img/vision.png';
import {Main, ComicsList} from '../../pages'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const App = () => {

    return (
        <Router>
            <div className="app">
                <AppHeader />
                <main>
                    <Routes>
                        <Route  path="/" element={<Main/>}/>
                        <Route  path="/comics" element={<ComicsList/>}/>
                    </Routes>

                    <img className="bg-decoration" src={decoration} alt="vision" />

                </main>

            </div>
        </Router>
    )

}

export default App;