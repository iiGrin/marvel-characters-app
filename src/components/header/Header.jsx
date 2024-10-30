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
                    <li><NavLink
                        end
                        style={({ isActive }) => ({ color: isActive ? '#9f0013' : 'inherit' })}
                        to="/">Characters</NavLink></li>
                    /
                    <li><NavLink
                        end
                        style={({ isActive }) => ({ color: isActive ? '#9f0013' : 'inherit' })}
                        to="/comics">Comics</NavLink></li>
                </ul>
            </nav>
        </header>
    )
}

export default Header;