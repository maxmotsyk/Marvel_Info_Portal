import AppHeader from "../appHeader/AppHeader";
import {Main, ComicsList, ComicPage, Page404} from '../../pages'
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
                        <Route path="/comics/:comicId" element={<ComicPage/>}/>
                        <Route path="*" element={<Page404/>}/>
                    </Routes>

                </main>

            </div>
        </Router>
    )

}

export default App;