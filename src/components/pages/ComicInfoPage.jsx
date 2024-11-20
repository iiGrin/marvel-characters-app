import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import useMarvelService from "../../services/MarvelService";
import Banner from "../banner/Banner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";

import "./comicInfoPage.scss";

const ComicInfoPage = () => {

    const { comicId } = useParams();
    const [comic, setComic] = useState(null);
    const { loading, error, getComic, getCharacter, clearError } = useMarvelService();

    const location = useLocation();
    const pageType = location.pathname.split('/').at(-2);
    const pageId = location.pathname.split('/').at(-1);
    const navigate = useNavigate();

    useEffect(() => {
        updateComic(pageId);
    // eslint-disable-next-line
    }, [comicId])

    const updateComic = (comicId) => {
        clearError();

        if (!comicId) return;

        switch(pageType) {
            case 'comics':
                getComic(comicId).then(onComicLoaded);
                break;
            case 'characters':
                getCharacter(comicId).then(onComicLoaded);
                break;
            default: break    
        }
    }

    const handleBackBtn = (e) => {
        if( e.keyCode === 32 ) {
            navigate(-1);
        }
    }

    const back = () => ( // кнопка назад
        <div 
            tabIndex='0' 
            onClick={() => navigate(-1)} 
            onKeyDown={(e) => handleBackBtn(e)}
            className="comic__back">
            Back to all
        </div>
    );

    const onComicLoaded = (comic) => {
        setComic(comic);
    }

    const errorMessage = error ? <ErrorMessage /> : null; //если не ошибка - null
    const spinner = loading ? <Spinner /> : null; // если не загрузка - null
    const content = !(loading || error || !comic) ? 
        <div className="comic">
            <View comic={comic} />
            {back()}
        </div> :
        null; // если не ошибка и не загрузка - контент : null

    return (
        <>
            <Banner />
            {errorMessage}
            {spinner}
            {content}
        </>
    )
}

const View = ({ comic }, props) => {
    const { title, description, pageCount, price, thumbnail, language } = comic;

    return (
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
    )
}

export default ComicInfoPage;