import { Component } from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import MarvelService from '../../services/MarvelService';
import './charList.scss';

class CharList extends Component {

    state = { // начальный state
        charList: [],
        loading: true,
        error: false,
        newItemLoading: false, // charList state
        offset: 210,
        charEnded: false
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.onRequest(); // baseOffset = 210
    }

    onRequest = (offset) => { // запрос новых char в list
        this.onCharListLoading();
        this.marvelService.getAllCharacters(offset) // получение данных
            .then(this.onCharListLoaded) // данные загружены (список объектов получен, индикатор загрузки удален)
            .catch(this.onError) // рендер ошибки при неуспешном запросе
    }

    onCharListLoading = () => {
        this.setState({
            newItemLoading: true
        })
    }

    onCharListLoaded = (newCharList) => { // загрузка массива объектов
        let ended = false;
        if (newCharList.length < 9) {
            ended = true;
        }

        this.setState(({ offset, charList }) => ({ // текущий state
            charList: [...charList, ...newCharList], // новый state (массив объектов)
            loading: false, // удаление индикатора загрузки
            newItemLoading: false,
            offset: offset + 9,
            charEnded: ended
        }));
    }

    onError = () => { // функция отрисовки error заглушки
        this.setState({ // старый state
            loading: false, // новый state
            error: true
        })
    }

    itemRefs = [];

    setRef = (ref) => {
        this.itemRefs.push(ref);
    }

    // Ref 
    focusOnItem = (id) => {
        this.itemRefs.forEach(item => item.classList.remove('char__item_selected'));
        this.itemRefs[id].classList.add('char__item_selected');
        this.itemRefs[id].focus();
    }

    renderItems(arr) { // функция отрисовки массива объектов
        const items = arr.map((item, i) => { // новый массив (каждый item )
            let imgStyle = { 'objectFit': 'cover' }; // если картинка заглушка
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = { 'objectFit': 'unset' };
            }
            return ( // верстка для каждого полученного объекта (результат map функции)
                <li
                    className="char__item"
                    tabIndex={0}
                    ref={this.setRef}
                    key={item.id}
                    onClick={() => {
                        this.props.onCharSelected(item.id);
                        this.focusOnItem(i);
                    }}
                    onKeyPress={(e) => {
                        if (e.key === ' ' || e.key === "Enter") {
                            this.props.onCharSelected(item.id);
                            this.focusOnItem(i);
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

    render() {
        const { charList, loading, error, offset, newItemLoading, charEnded } = this.state;
        const items = this.renderItems(charList)
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
                    onClick={() => this.onRequest(offset)}
                    className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

export default CharList;