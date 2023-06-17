import { useState, useEffect } from 'react';
import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import useMarvelService from '../../services/MarvelService';
import LouderSpinner from '../louderSpinner/louderSpinner';
import ErrorMessage from '../errorMessage/errorMessage';

const RandomChar = () =>  {
    const [char, setChar] = useState({});
    const {loading, error, getSingleCharacter, clearError}= useMarvelService();  

    useEffect(() => {
        updateChar()
    },[])

    const updateChar = () => {
        clearError();
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);

        getSingleCharacter(id)
            .then(onChatLouded)
            .catch(error)
    }

    const onChatLouded = (char) => {
        setChar(char);
    }

    return (
        <div className="randomchar">

            <div className="randomchar__block">
                {error ? <ErrorMessage updateChar /> : ''}
                {loading ? <LouderSpinner /> : <View char={char} />}
            </div>

            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br />
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button className="button button__main">
                    <div onClick={updateChar} className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
            </div>
        </div>
    )

}

const View = ({ char: { name, description, homepage, thumbnail, wiki } }) => {

    const imgStyle = thumbnail?.includes('image_not_available') ? {objectFit : 'contain'} : null;

    return (
        <>
            <img style={imgStyle} src={thumbnail} alt={`img ${name}`} className="randomchar__img" />
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">{description}</p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </>
    )
}

export default RandomChar;