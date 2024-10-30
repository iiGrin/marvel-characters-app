import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import useMarvelService from "../../services/MarvelService";
import Banner from "../banner/Banner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";

import "./comicInfoPage.scss";

const ComicInfoPage = () => {

    const { comicId } = useParams();
    const [comic, setComic] = useState(null);
    const { loading, error, getComic, clearError } = useMarvelService();

    useEffect(() => {
        updateComic();
    }, [comicId])

    const updateComic = () => {
        clearError();
        getComic(comicId)
            .then(onComicLoaded)
    }

    const onComicLoaded = (comic) => {
        setComic(comic);
    }

    const errorMessage = error ? <ErrorMessage /> : null; //если не ошибка - null
    const spinner = loading ? <Spinner /> : null; // если не загрузка - null
    const content = !(loading || error || !comic) ? <View comic={comic} /> : null; // если не ошибка и не загрузка - контент : null

    return (
        <>
            <Banner />
            {errorMessage}
            {spinner}
            {/* <View /> */}
            {content}
        </>
    )
}

const View = ({ comic }) => {
    const { title, description, pageCount, price, thumbnail, language } = comic;

    return (
        <div className="comic">
            <img src={thumbnail} alt={title} className="comic__img" />
            <div className="comic__info">
                <h3 className="comic__info-title">{title}</h3>
                <p className="comic__info-description">{description}</p>
                <div className="comic__info-pages">{pageCount}</div>
                <div className="comic__info-language">Language: {language}</div>
                <div className="comic__info-price">{price}</div>
            </div>
            <Link to="/comics" className="comic__back">Back to all</Link>
        </div>
    )
}

export default ComicInfoPage;