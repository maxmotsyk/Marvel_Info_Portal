import { useState, useEffect} from 'react';
import PropTypes from 'prop-types'
import MarvelService from '../../services/MarvelService';
import LouderSpinner from '../louderSpinner/louderSpinner';
import ErrorMessage from '../errorMessage/errorMessage';
import Skeleton from '../skeleton/Skeleton'
import './charInfo.scss';


const CharInfo = ({selectedChar}) => {
    const [char, setChar] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const skeleton = char || loading || error ? null :  <Skeleton/>;
    const errorMessage = error ? <ErrorMessage/> : null;
    const spiner = loading ? <LouderSpinner/> : null;
    const content = !(loading || error || !char) ? <View char={char}/> : null;
    const marvelService = new MarvelService();

    useEffect(() => {
        onCharInfoUpdate();
    },[selectedChar])


    const onCharInfoUpdate = () => {

        setLoading(true);

        marvelService.getSingleCharacter(selectedChar)
            .then(onCharInfoLouded)
            .catch(onError)

    }

    const onCharInfoLouded = (char) => {

        setChar(char);
        setLoading(false);

    }

    const onError = () => {

        setLoading(false);
        setError(true)

    }

    return (
        <div className="char__info">
           {skeleton}
           {errorMessage}
           {spiner}
           {content}
        </div>
    )

}

const View = ({ char }) => {
    const { name, description, thumbnail, homepage, wiki, comics } = char;
    const imgStyle = thumbnail?.includes('image_not_available') ? { objectFit: 'contain' } : null;

    const comicsRender =  () =>{

        if(comics?.length !== 0){
            const sliceComics = comics?.length > 0 ? comics.slice(0,10) : comics; 

            return(

                sliceComics?.map(({ name, resourceURI }, i) => {

                    return (
                        <li key={i} className="char__comics-item">

                            <a href={resourceURI}>
                                {name}
                            </a>

                        </li>
                    )

                })

            )

        }       
        else
        {
            return <p>Not found comics</p>
        }

    }

    return (
        <>
            <div className="char__basics">
                <img style={imgStyle} src={thumbnail} alt={name} />
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

                {comicsRender()}

            </ul>
        </>
    )

}

CharInfo.propTypes  = {
    selectedChar: PropTypes.number,
}

export default CharInfo;