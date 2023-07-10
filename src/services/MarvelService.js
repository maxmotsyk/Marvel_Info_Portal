import { useHttp } from "../hooks/htttp.hook";

const useMarvelService = () => {
    const {loading, requst, error, clearError} = useHttp();
    const _apiKey = process.env.REACT_APP_MARVEL_API_KEY;
    const _apiBase = process.env.REACT_APP_MARVEL_BASE_URL;
    const _baseOffset = 210;
    const _baseComicsOffset = 200;

    const getAllCharacters = async (offset = _baseOffset) => {
        const res = await requst(`${_apiBase}/characters?limit=9&offset=${offset}&apikey=${_apiKey}`);
        return res.data.results.map(_transformeCharacter);
    }

    const getSingleCharacter = async (id) =>{
        const res =  await requst(`${_apiBase}/characters/${id}?apikey=${_apiKey}`);
        return _transformeCharacter(res.data.results[0]);
    }

    const getSingleCharacterByName = async (name) =>{
        const res =  await requst(`${_apiBase}/characters?name=${name}&apikey=${_apiKey}`);
        console.log(res);
        return _transformeCharacter(res.data.results[0]);
    }

    const getComic = async (id) => {
        const res = await requst(`${_apiBase}/comics/${id}?&apikey=${_apiKey}`)
        return _transformeComics(res.data.results[0]);
    }

    const getAllComics = async (offset = _baseComicsOffset) => {
        const res = await requst(`${_apiBase}/comics?limit=9&offset=${offset}&apikey=${_apiKey}`);
        return res.data.results.map(_transformeComics)
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

    const _transformeComics = (res) =>{

        return {
            id: res.id,
            title: res.title,
            description: res.description,
            thumbnail: `${res.thumbnail.path}.${res.thumbnail.extension}`,
            homepage: res.urls[0].url,
            price: res.prices[0].price,
            pageCount: res.pageCount
        }

    }

    return {loading, error, getAllCharacters, getSingleCharacter, clearError, getAllComics, getComic, getSingleCharacterByName}

}

export default useMarvelService;

