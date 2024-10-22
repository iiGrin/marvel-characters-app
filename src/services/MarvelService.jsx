class MarvelService {

    _apiBase = 'https://gateway.marvel.com:443/v1/public/'; // неизменные свойства   
    _apiKey = 'apikey=46266c05cc60286736867e707160a8e9';
    _baseOffset = 210;

    getResource = async (url) => { // получаем данные и конвертируем в json 
        let res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Couldn't fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
    }

    getAllCharacters = async (offset = this._baseOffset) => { // гибкая передача (по умолчанию будет 210, при изменении будет меняться сам аргумент при интерполяции)
        const res = await this.getResource(`${this._apiBase}characters?limit=9&offset=${offset}&${this._apiKey}`); // получение всех char
        return res.data.results.map(this._transformCharacter);
    }

    getCharacter = async (id) => {
        const res = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`); // получение случайного char
        return this._transformCharacter(res.data.results[0]);
    }

    _transformCharacter = (char) => {

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
}

export default MarvelService;