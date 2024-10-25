import { useState, useEffect, useRef } from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import MarvelService from '../../services/MarvelService';
import './charList.scss';

const CharList = (props) => {

    const [charList, setCharList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [charEnded, setCharEnded] = useState(false);

    const marvelService = new MarvelService();

    useEffect(() => { // эмуляция componentDidMount 
        onRequest(); // функция может запуститься выше ее объявления потому что useEffect запускается после рендера компонента
    }, [])

    const onRequest = (offset) => { // запрос новых char в list
        onCharListLoading();
        marvelService.getAllCharacters(offset) // получение данных
            .then(onCharListLoaded) // данные загружены (список объектов получен, индикатор загрузки удален)
            .catch(onError) // рендер ошибки при неуспешном запросе
    }

    const onCharListLoading = () => {
        setNewItemLoading(true);
    }

    const onCharListLoaded = (newCharList) => { // загрузка массива объектов
        let ended = false;
        if (newCharList.length < 9) {
            ended = true;
        }

        setCharList(charList => [...charList, ...newCharList]); // новый state (массив объектов)
        setLoading(loading => false);
        setNewItemLoading(newItemLoading => false);
        setOffset(offset => offset + 9);
        setCharEnded(charEnded => ended);
    }

    const onError = () => { // функция отрисовки error заглушки
        setLoading(false);
        setError(true);
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
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error) ? items : null;

    return (
        <div className="char__list">
            {errorMessage}
            {spinner}
            {content}
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

export default CharList;