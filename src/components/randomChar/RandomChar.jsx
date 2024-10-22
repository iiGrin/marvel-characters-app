import { Component } from 'react';

import mjolnir from '../../resources/img/mjolnir.png';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import MarvelService from '../../services/MarvelService';

import './randomChar.scss';

class RandomChar extends Component {

    state = { // начальный state
        char: {},
        loading: true,
        error: false
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.updateChar(); // получение данных (случайный char по id)
        // this.timerId = setInterval(this.updateChar, 3000);
    }

    onCharLoaded = (char) => { // загрузка char
        this.setState({ //текущий state
            char, // новый state (объект)
            loading: false, // удаляем spinner
        });
    }

    onCharLoading = () => { // функция отрисовки spinner
        this.setState({ // старый state
            loading: true, // новый state
            error: false
        })
    }

    onError = () => { // функция отрисовки error
        this.setState({ // старый state
            loading: false, // новый state
            error: true
        });
    }

    updateChar = () => { // получение объекта случайного char
        const id = Math.floor(Math.random() * (1010789 - 1009146) + 1009146); // случайный id
        this.onCharLoading(); // отрисовка spinner
        this.marvelService // экземпляр класса
            .getCharacter(id) // получение данных по случайному id
            .then(this.onCharLoaded) // (успех) замена старого state на новый 
            .catch(this.onError) // (ошибка) замена старого state на error 
    }

    render() {
        const { char, loading, error } = this.state;
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
                    <button onClick={this.updateChar} className="button button__main">
                        <div className="inner">try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
                </div>
            </div>
        )
    }
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