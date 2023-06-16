import { Component } from 'react/cjs/react.production.min';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import MarvelService from '../../services/MarvelService';
import LouderSpinner from '../louderSpinner/louderSpinner';
import './charList.scss';
import ErrorMessage from '../errorMessage/errorMessage';


const CharList = ({ onCharSelected }) => {
    const [charList, setCharList] = useState([]);
    const [louding, setLouding] = useState(true);
    const [error, setError] = useState(false);
    const [newItemsLouding, setNewItemsLouding] = useState(false);
    const [offset, setOffset] = useState(210);
    const [maxChar, setMaxChar] = useState(1540);
    const [endCharList, setEndCharList] = useState(false);
    const marvelService = new MarvelService();

    useEffect(()=> {
        updateCharList()
    },[])

    const updateCharList = (offset) => {

        marvelService
            .getAllCharacters(offset)
            .then(onCharListLouded)
            .catch(onError)
    }

    const onCharListLouded = (newCharList) => {

        if (offset + 9 >= maxChar) {
            
            setEndCharList(true);

        }
        else {
            setCharList([...charList,...newCharList]);
            setLouding(false);
            setNewItemsLouding(false);
            setOffset(offset + 9)
        }

    }

    const onAdditionLoading = (offset) => {
        onCharListLoauding();
        updateCharList(offset);
    }

    const onCharListLoauding = () => {
        setNewItemsLouding(true);
    }

    const onError = () => {

        setLouding(false);
        setError(true);
    }

    return (

        <div className="char__list" >
            {error ? <ErrorMessage updateChar={updateCharList} /> : null}
            {louding ? <LouderSpinner /> : <View charList={charList} onCharSelected={onCharSelected} />}
            <button
                style={endCharList ? { visibility: "hidden" } : null}
                disabled={newItemsLouding}
                onClick={() => { onAdditionLoading(offset) }}
                className="button button__main button__long">
                <div className="inner">{newItemsLouding ? "Loading" : 'load more'}</div>
            </button>
        </div>

    )

}

const View = ({charList, onCharSelected }) => {

    let massRefArr = [];

    const setRefArr = (e) => {
        massRefArr.push(e);
    }

    const onClickItem = (i, id) => {
        onCharSelected(id);

        massRefArr.forEach(item => item.classList.remove('char__item_selected'));
        massRefArr[i].classList?.add('char__item_selected');
        massRefArr[i].focus();
    }

    return (

        <ul className="char__grid">
            {
                charList.map(({ id, thumbnail, name }, i) => {
                    const imgStyle = thumbnail.includes('image_not_available') ? { objectFit: 'contain' } : null;
                    return (

                        <li
                            onClick={() => onClickItem(i, id)}
                            tabIndex={0}
                            ref={setRefArr}
                            key={id}
                            className="char__item">

                            <img style={imgStyle}
                                src={thumbnail}
                                alt="abyss" />

                            <div className="char__name">{name}</div>

                        </li>

                    )

                })
            }

        </ul>

    )

}

CharList.propTypes = {
    onCharSelected: PropTypes.func
}

export default CharList;