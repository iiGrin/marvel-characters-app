import { useHttp } from "../hooks/http.hook";

const useMarvelService = () => {

    const { loading, request, error, clearError } = useHttp();

    const _apiBase = 'https://gateway.marvel.com:443/v1/public/'; // неизменные свойства   
    const _apiKey = 'apikey=46266c05cc60286736867e707160a8e9';
    const _baseOffset = 210;

    // getResource = async (url) => { // получаем данные и конвертируем в json 
    //     let res = await fetch(url);

    //     if (!res.ok) {
    //         throw new Error(`Couldn't fetch ${url}, status: ${res.status}`);
    //     }

    //     return await res.json();
    // }

    const getAllCharacters = async (offset = _baseOffset) => { // гибкая передача (по умолчанию будет 210, при изменении будет меняться сам аргумент при интерполяции)
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`); // получение всех char
        return res.data.results.map(_transformCharacter);
    }

    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`); // получение случайного char
        return _transformCharacter(res.data.results[0]);
    }

    const getAllComics = async (offset = 0) => {
        const res = await request(`${_apiBase}comics?orderBy=-issueNumber&limit=8&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformComics);
    }

    const getComics = async (id) => {
        const res = await request(`${_apiBase}comics/${id}&${_apiKey}`);
        return _transformComics(res.data.results[0]);
    }

    const _transformCharacter = (char) => {

        return { // отрисовка char по данным json 
            id: char.id,
            name: char.name,
            description: char.description ? `${char.description.slice(0, 210)}...` : 'Description is not found', // если в json нет данных  
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items
        }
    }

    const _transformComics = (comics) => {

        return {
            id: comics.id,
            title: comics.title,
            description: comics.description || 'There is no description',
            pageCount: comics.pageCount ?
                `${comics.pageCount} p.` : "No information about the number of pages",
            price: comics.prices[0].price ?
                `${comics.prices[0].price}$` : "not available",
            thumbnail: comics.thumbnail.path + '.' + comics.thumbnail.extension,
            language: comics.textObjects[0]?.language || "en-us",
        }
    }

    return { loading, error, getAllCharacters, getCharacter, clearError, getAllComics, getComics };
}

export default useMarvelService;