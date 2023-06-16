import { Component } from 'react/cjs/react.production.min';
import { useState, useEffect } from 'react';
import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import MarvelService from '../../services/MarvelService';
import LouderSpinner from '../louderSpinner/louderSpinner';
import ErrorMessage from '../errorMessage/errorMessage';

const RandomChar = () =>  {

    const [char, setChar] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const marvelService = new MarvelService();  

    useEffect(() => {
        updateChar()
    }, [])

    const updateChar = () => {
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        setLoading(true);
        setError(false);

        marvelService
            .getSingleCharacter(id)
            .then(onChatLouded)
            .catch(onError)
    }

    const onChatLouded = (char) => {
        setChar(char);
        setLoading(false);
    }

    const onError = () => {
        setLoading(false);
        setError(true);
    }

    return (
        <div className="randomchar">

            <div className="randomchar__block">
                {error ? <ErrorMessage updateChar={updateChar} /> : ''}
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