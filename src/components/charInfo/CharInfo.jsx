import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useMarvelService from '../../services/MarvelService';
import './charInfo.scss';

import setContent from '../../utils/setContent';

const CharInfo = (props) => {

    const [char, setChar] = useState(null);

    const { getCharacter, process, setProcess } = useMarvelService();

    useEffect(() => { // эмуляция componentDidMount
        updateChar(); // получение данных (случайный char по id)
        // eslint-disable-next-line
    }, [props.charId])

    const updateChar = () => { // обновляем state новым id
        const { charId } = props
        if (!charId) {
            return;
        }

        getCharacter(charId) // обновляем char в charInfo
            .then(onCharLoaded)
            .then(() => setProcess('confirmed')) // fsm
    }

    const onCharLoaded = (char) => { // загрузка char в charInfo
        setChar(char);
    }

    // finite-state machine principle
    return (
        <div className="char__info">
            {setContent(process, View, char)} 
        </div>
    )
}

const View = ({ data }) => {
    const { name, description, thumbnail, homepage, wiki, comics } = data;

    let baseImgStyle = { 'objectFit': 'cover' };
    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        baseImgStyle = { 'objectFit': 'contain' };
    }

    return (
        <>
            <div className="char__basics">
                <img style={baseImgStyle} src={thumbnail} alt={name} />
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comics.length > 0 ? null : 'There is no comics with this character'}
                {
                    comics.map((item, index) => {
                        // eslint-disable-next-line array-callback-return
                        if (index > 9) return;
                        return (
                            <li
                                key={index}
                                className="char__comics-item" >
                                <Link to={`/comics/${item["resourceURI"].split('/').at(-1)}`}>
                                    {item.name}
                                </Link>
                            </li>
                        );
                    })
                }
            </ul>
        </>
    )
}

export default CharInfo;