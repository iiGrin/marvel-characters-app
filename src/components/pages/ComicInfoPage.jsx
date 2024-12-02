import { Link } from "react-router-dom";

import "./comicInfoPage.scss";

const ComicInfoPage = ({ data }) => {

    const { title, description, pageCount, price, thumbnail, language } = data;

    return (
        <div className="comic">
            <div className="comic__item">
                <img src={thumbnail} alt={title} className="comic__img" />
                <div className="comic__info">
                    <h3 className="comic__info-title">{title}</h3>
                    <p className="comic__info-description">{description}</p>
                    <div className="comic__info-pages">{pageCount}</div>
                    <div className="comic__info-language">Language: {language}</div>
                    <div className="comic__info-price">{price}</div>
                </div>
            </div>
            <Link to="/comics" className="comic__back">Back to all</Link>
        </div>
    )
}

export default ComicInfoPage;