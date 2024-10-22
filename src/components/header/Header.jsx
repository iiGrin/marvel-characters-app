import './header.scss';

const Header = () => {
    return (
        <header className="header">
            <h1 className="header__title">
                <a href="#">
                    <span>Marvel</span> information portal
                </a>
            </h1>
            <nav className="header__menu">
                <ul>
                    <li><a href="#">Characters</a></li>
                    /
                    <li><a href="#">Comics</a></li>
                </ul>
            </nav>
        </header>
    )
}

export default Header;