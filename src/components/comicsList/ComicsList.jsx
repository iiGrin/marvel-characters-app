import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService';

import './comicsList.scss';
import { Transition, TransitionGroup } from 'react-transition-group';

const ComicsList = (props) => {

    const [comicsList, setComicsList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(0);
    const [comicsEnded, setComicsEnded] = useState(false);

    const { loading, error, getAllComics } = useMarvelService();

    useEffect(() => {
        onRequest(offset, true);
    }, [])

    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllComics(offset)
            .then(onComicsListLoaded)
    }

    const onComicsListLoaded = async (newComicsList) => {
        let ended = false;
        if (newComicsList.length < 8) {
            ended = true;
        }

        setComicsList(comicsList => [...comicsList, ...newComicsList]);
        setNewItemLoading(newItemLoading => false);
        setOffset(offset + 8);
        setComicsEnded(comicsEnded => ended);
    }

    const nodeRef = useRef(null);

    function renderItems(arr) {
        const items = arr.map((item, i) => {

            const defaultStyle = {
                transition: `opacity 300ms ease-in-out ${i%8 * 0.18}s, transform 300ms ease-in-out`,
                opacity: 0,
            };
            const transitionStyles = {
                entering: { opacity: 0 },
                entered: { opacity: 1},
                exiting: { opacity: 0 },
                exited: { opacity: 0 },
            };

            return (
                <Transition key={i} timeout={600} nodeRef={nodeRef}>
                    {state => (
                        <li
                        style={{
                            ...defaultStyle,
                            ...transitionStyles[state]
                        }}
                        className='comics__list__item'
                        key={i}
                        tabIndex={0}>
                        <Link to={`/comics/${item.id}`}>
                                <img className='comics__list__item-img' src={item.thumbnail} alt={item.title} />
                                <h3 className="comics__list__item-title">{item.title}</h3>
                                <span className="comics__list__item-price">{item.price}</span>
                            </Link>
                        </li>
                    )}
                </Transition>
            )
        })

        return (
            <ul className='comics__list'>
                <TransitionGroup component={null}>
                    {items}
                </TransitionGroup>
            </ul>
        )
    }

    const items = renderItems(comicsList);
    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading && !newItemLoading ? <Spinner /> : null;

    return (
        <div className='comics'>
            {errorMessage}
            {spinner}
            {items}
            <button
                disabled={newItemLoading}
                onClick={() => onRequest(offset)}
                className="button button__main button__long">
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;