
class MarvelService {
    _apiKey = process.env.REACT_APP_MARVEL_API_KEY;
    _apiBase = process.env.REACT_APP_MARVEL_BASE_URL;

    getResource = async (url) =>  {
        let res = await fetch(url);

        if(!res.ok){
            throw new Error(`Coulde not fetch ${url}, status ${res.status}`);
        }

        return await res.json();

    }

    getAllCharacters = () => {
        console.log(this._apiKey);
        return this.getResource(`${this._apiBase}/characters?apikey=${this._apiKey}`)
    }

    getSingleCharacters = (id) =>{
        return this.getResource(`${this._apiBase}/characters/${id}?apikey=${this._apiKey}`)
    }

}

export default MarvelService;