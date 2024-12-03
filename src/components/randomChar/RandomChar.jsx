import { useState, useEffect } from 'react';
import useMarvelService from '../../services/MarvelService';
import setContent from '../../utils/setContent';

import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';

const RandomChar = () => {

    const [char, setChar] = useState({});
    const { getCharacter, clearError, process, setProcess } = useMarvelService();

    useEffect(() => { // эмуляция componentDidMount
        updateChar(); // получение данных (случайный char по id)
        // eslint-disable-next-line
    }, [])


    const onCharLoaded = (char) => { // загрузка char
        setChar(char); // новый state (объект)
    }

    const updateChar = () => { // получение объекта случайного char
        clearError();
        const id = Math.floor(Math.random() * (1010789 - 1009146) + 1009146); // случайный id
        getCharacter(id) // получение данных по случайному id
            .then(onCharLoaded) // (успех) замена старого state на новый
            .then(() => setProcess('confirmed'))
    }

    return (
        <>
            <div className="randomchar">
                {setContent(process, View, char)}
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
        </>
    )
}

const View = ({ data }) => { // компонент контента (передается char из api)
    const { name, description, thumbnail, homepage, wiki } = data; // деструктуризация свойств объекта
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