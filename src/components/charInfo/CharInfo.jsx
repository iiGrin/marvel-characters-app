import { Component } from 'react';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';
import './charInfo.scss';

class CharInfo extends Component {

    state = { // начальный state
        char: null,
        loading: false,
        error: false
    }

    marvelService = new MarvelService();

    componentDidMount() { // для отрисовки первый раз
        this.updateChar();
    }

    componentDidUpdate(prevProps, prevState) { // для обновления state
        if (this.props.charId !== prevProps.charId) { // если новые пропсы не равны старым
            this.updateChar();
        }
    }

    updateChar = () => { // обновляем state новым id
        const { charId } = this.props
        if (!charId) {
            return;
        }

        this.onCharLoading(); // спиннер для видимость обновления
        this.marvelService // получение данных
            .getCharacter(charId)
            .then(this.onCharLoaded)
            .catch(this.onError)
    }

    onCharLoaded = (char) => { // загрузка персонажа
        console.log('update');
        this.setState({ //текущий state
            char, // новый state (объект)
            loading: false, // удаляем индикатор загрузки
        })
    }

    onCharLoading = () => { // функция отрисовки индикатора загрузки
        this.setState({ // старый state
            loading: true, // новый state
            error: false
        })
    }

    onError = () => { // функция отрисовки error заглушки
        this.setState({ // старый state
            loading: false, // новый state
            error: true
        })
    }

    render() {
        const { char, loading, error } = this.state;

        const skeleton = char || loading || error ? null : <Skeleton />;
        const errorMessage = error ? <ErrorMessage /> : null; //если не ошибка - null
        const spinner = loading ? <Spinner /> : null; // если не загрузка - null
        const content = !(errorMessage || spinner || !char) ? <View char={char} /> : null; // если не ошибка и не загрузка - контент : null

        return (
            <div className="char__info">
                {skeleton}
                {errorMessage}
                {spinner}
                {content}
            </div>
        )
    }
}

const View = ({ char }) => {
    const { name, description, thumbnail, homepage, wiki, comics } = char;

    const element = comics.map((item, index) => {
        // eslint-disable-next-line array-callback-return
        if (index > 9) return;
        return (
            < li key={index} className="char__comics-item" >
                {item.name}
            </li>
        );
    })

    const empty = !element.length ? ' is not found' : null;


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
                {empty}
                {element}
            </ul>
        </>
    )
}

export default CharInfo;