import { useState, useEffect, useRef } from 'react';
import { Transition, TransitionGroup } from 'react-transition-group';
import { Link } from 'react-router-dom';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService';

import './comicsList.scss';

const setContent = (process, Component, newItemLoading) => {
    switch (process) {
        case 'waiting':
            return <Spinner />;
        case 'loading':
            return newItemLoading ?  <Component /> : <Spinner />;
        case 'confirmed':
            return <Component />;
        case 'error':
            return <ErrorMessage />;
        default:
            throw new Error('Unexpected process state');
    }
} 

const ComicsList = (props) => {

    const [comicsList, setComicsList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(0);
    // eslint-disable-next-line
    const [comicsEnded, setComicsEnded] = useState(false);

    const { getAllComics, process, setProcess } = useMarvelService();

    useEffect(() => {
        onRequest(offset, true);
        // eslint-disable-next-line
    }, [])

    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllComics(offset)
            .then(onComicsListLoaded)
            .then(() => setProcess('confirmed'))
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
                transition: `opacity 300ms ease-in-out ${i % 8 * 0.18}s, transform 300ms ease-in-out`,
                opacity: 0,
            };


            const transitionStyles = {
                entering: { opacity: 0 },
                entered: { opacity: 1 },
                exiting: { opacity: 0 },
                exited: { opacity: 0 },
            };

            const { id, title, thumbnail, price } = item;

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
                            <Link to={`/comics/${id}`}>
                                <img className='comics__list__item-img' src={thumbnail} alt={title} />
                                <h3 className="comics__list__item-title">{title}</h3>
                                <span className="comics__list__item-price">{price}</span>
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

    return (
        <div className='comics'>
            {setContent(process, () => renderItems(comicsList), newItemLoading)}
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