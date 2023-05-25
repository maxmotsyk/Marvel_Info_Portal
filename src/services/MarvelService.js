class MarvelService {
    _apiKey = process.env.REACT_APP_MARVEL_API_KEY;
    _apiBase = process.env.REACT_APP_MARVEL_BASE_URL;
    _baseOffset = 210;

    getResource = async (url) =>  {
        let res = await fetch(url);

        if(!res.ok){
            throw new Error(`Coulde not fetch ${url}, status ${res.status}`);
        }

        return await res.json();

    }

    getAllCharacters = async (offset = this._baseOffset) => {
        const res = await this.getResource(`${this._apiBase}/characters?limit=9&offset=${offset}&apikey=${this._apiKey}`);
        return res.data.results.map(this._transformeCharacter);
    }

    getSingleCharacter = async (id) =>{
        const res =  await this.getResource(`${this._apiBase}/characters/${id}?apikey=${this._apiKey}`);
        return this._transformeCharacter(res.data.results[0]);
    }

    _transformeCharacter = (res) =>{

        return {
            id: res.id,
            name: res.name,
            description: res.description,
            thumbnail: `${res.thumbnail.path}.${res.thumbnail.extension}`,
            homepage: res.urls[0].url,
            wiki: res.urls[1].url,
            comics: res.comics.items
        }

    }

}

export default MarvelService;