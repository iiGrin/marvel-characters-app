import { useState, useEffect, useRef, useMemo } from 'react';
import { Transition, TransitionGroup } from 'react-transition-group';
import PropTypes from 'prop-types';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService';
import './charList.scss';

const setContent = (process, Component, newItemLoading) => { // FSM principle
    switch (process) {
        case 'waiting':
            return <Spinner />;
        case 'loading':
            return newItemLoading ? <Component /> : <Spinner />;
        case 'confirmed':
            return <Component />;
        case 'error':
            return <ErrorMessage />;
        default:
            throw new Error('Unexpected process state');
    }
}

const CharList = (props) => {

    const [charList, setCharList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [charEnded, setCharEnded] = useState(false);

    const { getAllCharacters, process, setProcess } = useMarvelService(); // полученные данные вместе со spinner и гифкой ошибки

    useEffect(() => { // эмуляция componentDidMount 
        onRequest(offset, true); // функция может запуститься выше ее объявления потому что useEffect запускается после рендера компонента
        // eslint-disable-next-line
    }, [])

    const onRequest = (offset, initial) => { // запрос новых char в list
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllCharacters(offset) // получение данных
            .then(onCharListLoaded) // данные загружены (список объектов получен, индикатор загрузки удален)
            .then(() => setProcess('confirmed'))
    }

    const onCharListLoaded = async (newCharList) => { // загрузка массива объектов
        let ended = false;
        if (newCharList.length < 9) {
            ended = true;
        }

        setCharList([...charList, ...newCharList]); // новый state (массив объектов)
        setNewItemLoading(false);
        setOffset(offset + 9);
        setCharEnded(ended);
    }

    const itemRefs = useRef([]);
    const nodeRef = useRef(null);

    // Ref 
    const focusOnItem = (id) => {
        itemRefs.current.forEach(item => item.classList.remove('char__item_selected'));
        itemRefs.current[id].classList.add('char__item_selected');
        itemRefs.current[id].focus();
    }

    function renderItems(arr) { // функция отрисовки массива объектов
        // let delay = 0;
        const items = arr.map((item, i) => { // новый массив (каждый item )
            let imgStyle = { 'objectFit': 'cover' }; // если картинка заглушка
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = { 'objectFit': 'unset' };
            }

            const defaultStyle = {
                transition: `opacity 300ms ease-in-out ${i % 9 * 0.18}s, transform 300ms ease-in-out`,
                opacity: 0,
            };
            const transitionStyles = {
                entering: { opacity: 0 },
                entered: { opacity: 1 },
                exiting: { opacity: 0 },
                exited: { opacity: 0 },
            };

            const { id, name, thumbnail } = item;

            return ( // верстка для каждого полученного объекта (результат map функции)
                <Transition
                    key={id}
                    timeout={600}
                    nodeRef={nodeRef}
                    mountOnEnter
                    unmountOnExit>
                    {state => (
                        <li
                            style={{
                                ...defaultStyle,
                                ...transitionStyles[state]
                            }}
                            className="char__item"
                            tabIndex={0}
                            ref={el => itemRefs.current[i] = el}
                            onClick={() => {
                                props.onCharSelected(id);
                                focusOnItem(i);
                            }}
                            onKeyDown={(e) => {
                                if (e.key === ' ' || e.key === "Enter") {
                                    props.onCharSelected(id);
                                    focusOnItem(i);
                                }
                            }}> {/* получаем id по функции из app.js */}
                            <img style={imgStyle} src={thumbnail} alt={name} />
                            <div className="char__name">{name}</div>
                        </li>
                    )}
                </Transition>
            )
        });

        return ( // результат предыдущей колл-бэк функции (items(return)) помещаем в результат renderItems
            <ul className={"char__grid"}>
                <TransitionGroup component={null}>
                    {items}
                </TransitionGroup>
            </ul>
        )
    }

    const elements = useMemo(() => {
        return setContent(process, () => renderItems(charList), newItemLoading);
    }, [process])

    return (
        <div className="char__list">
            {elements}
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