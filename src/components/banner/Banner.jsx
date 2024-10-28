import avengers from '../../resources/img/Avengers.png';
import avengersLogo from '../../resources/img/Avengers_logo.png';
import './banner.scss';

const Banner = () => {
    return (
        <div className="banner">
            <img className='banner__img' src={avengers} alt="avengers" />
            <h2 className="banner__title">
                New comics every week!
                <br />
                Stay tuned!
            </h2>
            <img className='banner__img-logo' src={avengersLogo} alt="avengers logo" />
        </div>
    )
}

export default Banner;