import { useState, useEffect } from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import MarvelService from '../../services/MarvelService';

import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';

const RandomChar = () => {

    const [char, setChar] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const marvelService = new MarvelService();

    useEffect(() => { // эмуляция componentDidMount
        updateChar(); // получение данных (случайный char по id)
    }, [])


    const onCharLoaded = (char) => { // загрузка char
        setLoading(false)
        setChar(char); // новый state (объект)
    }

    const onCharLoading = () => { // функция отрисовки spinner
        setLoading(true);
        setError(false);
    }

    const onError = () => { // функция отрисовки error
        setLoading(false);
        setError(true);
    }

    const updateChar = () => { // получение объекта случайного char
        const id = Math.floor(Math.random() * (1010789 - 1009146) + 1009146); // случайный id
        onCharLoading(); // отрисовка spinner
        marvelService // экземпляр класса
            .getCharacter(id) // получение данных по случайному id
            .then(onCharLoaded) // (успех) замена старого state на новый 
            .catch(onError) // (ошибка) замена старого state на error 
    }

    const errorMessage = error ? <ErrorMessage /> : null; //если не ошибка - null
    const spinner = loading ? <Spinner /> : null; // если не загрузка - null
    const content = !(errorMessage || spinner) ? <View char={char} /> : null; // если не ошибка и не загрузка - контент : null
    // добавление компонент в верстку
    return (
        <div className="randomchar">
            {errorMessage}
            {spinner}
            {content}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br />
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button onClick={updateChar} className="button button__main">
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
            </div>
        </div>
    )
}

const View = ({ char }) => { // компонент контента (передается char из api)
    const { name, description, thumbnail, homepage, wiki } = char; // деструктуризация свойств объекта
    let baseImgStyle = { 'objectFit': 'cover' };
    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        baseImgStyle = { 'objectFit': 'contain' };
    }

    return (
        <div className="randomchar__block">
            <img style={baseImgStyle} src={thumbnail} alt="Random character" className="randomchar__img" />
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">
                    {description}
                </p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default RandomChar;