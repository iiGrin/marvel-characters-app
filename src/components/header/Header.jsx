import { Link, NavLink } from 'react-router-dom';
import './header.scss';

const Header = () => {
    return (
        <header className="header">
            <h1 className="header__title">
                <Link to="/">
                    <span>Marvel</span> information portal
                </Link>
            </h1>
            <nav className="header__menu">
                <ul>
                    <li><NavLink exact activeStyle={{'color': '#9f0012'}} to="/">Characters</NavLink></li>
                    /
                    <li><NavLink exact activeStyle={{'color': '#9f0012'}} to="/comics">Comics</NavLink></li>
                </ul>
            </nav>
        </header>
    )
}

export default Header;