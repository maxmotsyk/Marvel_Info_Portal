import { useHttp } from "../hooks/htttp.hook";

const useMarvelService = () => {
    const {loading, requst, error, clearError} = useHttp();
    const _apiKey = process.env.REACT_APP_MARVEL_API_KEY;
    const _apiBase = process.env.REACT_APP_MARVEL_BASE_URL;
    const _baseOffset = 210;

    // getResource = async (url) =>  {
    //     let res = await fetch(url);

    //     if(!res.ok){
    //         throw new Error(`Coulde not fetch ${url}, status ${res.status}`);
    //     }

    //     return await res.json();

    // }

    const getAllCharacters = async (offset = _baseOffset) => {
        const res = await requst(`${_apiBase}/characters?limit=9&offset=${offset}&apikey=${_apiKey}`);
        return res.data.results.map(_transformeCharacter);
    }

    const getSingleCharacter = async (id) =>{
        const res =  await requst(`${_apiBase}/characters/${id}?apikey=${_apiKey}`);
        return _transformeCharacter(res.data.results[0]);
    }

    const _transformeCharacter = (res) =>{

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

    return {loading, error, getAllCharacters, getSingleCharacter,clearError}

}

export default useMarvelService;

