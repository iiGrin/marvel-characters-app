import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService';
import './charList.scss';

const CharList = (props) => {

    const [charList, setCharList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [charEnded, setCharEnded] = useState(false);

    const { loading, error, getAllCharacters } = useMarvelService(); // полученные данные вместе со spinner и гифкой ошибки

    useEffect(() => { // эмуляция componentDidMount 
        onRequest(offset, true); // функция может запуститься выше ее объявления потому что useEffect запускается после рендера компонента
    }, [])

    const onRequest = (offset, initial) => { // запрос новых char в list
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllCharacters(offset) // получение данных
            .then(onCharListLoaded) // данные загружены (список объектов получен, индикатор загрузки удален)
    }

    const onCharListLoaded = (newCharList) => { // загрузка массива объектов
        let ended = false;
        if (newCharList.length < 9) {
            ended = true;
        }

        setCharList(charList => [...charList, ...newCharList]); // новый state (массив объектов)
        setNewItemLoading(newItemLoading => false);
        setOffset(offset => offset + 9);
        setCharEnded(charEnded => ended);
    }

    const itemRefs = useRef([]);

    // Ref 
    const focusOnItem = (id) => {
        itemRefs.current.forEach(item => item.classList.remove('char__item_selected'));
        itemRefs.current[id].classList.add('char__item_selected');
        itemRefs.current[id].focus();
    }

    function renderItems(arr) { // функция отрисовки массива объектов
        const items = arr.map((item, i) => { // новый массив (каждый item )
            let imgStyle = { 'objectFit': 'cover' }; // если картинка заглушка
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = { 'objectFit': 'unset' };
            }
            return ( // верстка для каждого полученного объекта (результат map функции)
                <li
                    className="char__item"
                    tabIndex={0}
                    ref={el => itemRefs.current[i] = el}
                    key={item.id}
                    onClick={() => {
                        props.onCharSelected(item.id);
                        focusOnItem(i);
                    }}
                    onKeyPress={(e) => {
                        if (e.key === ' ' || e.key === "Enter") {
                            props.onCharSelected(item.id);
                            focusOnItem(i);
                        }
                    }}> {/* получаем id по функции из app.js */}
                    <img style={imgStyle} src={item.thumbnail} alt={item.name} />
                    <div className="char__name">{item.name}</div>
                </li>
            )
        });

        return ( // результат предыдущей колл-бэк функции (items(return)) помещаем в результат renderItems
            <ul className="char__grid">
                {items}
            </ul>
        )
    }

    const items = renderItems(charList)
    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading && !newItemLoading ? <Spinner /> : null;

    return (
        <div className="char__list">
            {errorMessage}
            {spinner}
            {items}
            <button
                disabled={newItemLoading}
                style={{ 'display': charEnded ? 'none' : 'block' }}
                onClick={() => onRequest(offset)}
                className="button button__main button__long">
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired
}

export default CharList;