import { Link } from 'react-router-dom';
import './appHeader.scss';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';

const AppHeader = () => {
    return (
        <header className="app__header">
            <h1 className="app__title">
                <Link to='/'>
                    <span>Marvel</span> information portal
                </Link>
            </h1>
            <nav className="app__menu">
                <ul>
                    <li><NavLink exact activeClassName="active__link" to='/'>Characters</NavLink></li>
                    /
                    <li><NavLink exact activeClassName="active__link" to='/comics'>Comics</NavLink></li>
                </ul>
            </nav>
        </header>
    )
}

export default AppHeader;