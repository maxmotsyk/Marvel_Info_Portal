import { useState, useEffect } from 'react';
import useMarvelService from '../../services/MarvelService';
import PropTypes from 'prop-types';
import './charList.scss';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import ErrorMessage from '../errorMessage/errorMessage';

const CharList = ({ onCharSelected }) => {
    const [charList, setCharList] = useState([]);
    const [offset, setOffset] = useState(210);
    const [maxChar, setMaxChar] = useState(1540);
    const [endCharList, setEndCharList] = useState(false);
    const { loading, error, getAllCharacters, clearError } = useMarvelService();

    useEffect(() => {
        updateCharList()
    }, [])

    const updateCharList = (offset) => {
        clearError()

        getAllCharacters(offset)
            .then(onCharListLouded)
            .catch(error)
    }

    const onCharListLouded = (newCharList) => {

        if (offset + 9 >= maxChar) {
            setEndCharList(true);
        }
        else {
            setCharList([...charList, ...newCharList]);
            setOffset(offset + 9)
        }

    }

    const onAdditionLoading = (offset) => {
        updateCharList(offset);
    }

    return (

        <div className="char__list" >
            {error ? <ErrorMessage updateChar={updateCharList} /> : null}
            <View charList={charList} onCharSelected={onCharSelected} />
            <button
                style={endCharList ? { visibility: "hidden" } : null}
                disabled={loading}
                onClick={() => { onAdditionLoading(offset) }}
                className="button button__main button__long">
                <div className="inner">{loading ? "Loading" : 'load more'}</div>
            </button>
        </div>

    )

}

const View = ({ charList, onCharSelected }) => {
    let massRefArr = [];
    let countNewElements = 0;

    useEffect(()=>{
        countNewElements = 0;
    },[charList])

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
        <ul className='char__grid'>
            <TransitionGroup component={null}>
                {
                    charList.map(({ id, thumbnail, name }, i) => {
                        countNewElements++;
                        const imgStyle = thumbnail.includes('image_not_available') ? { objectFit: 'contain' } : null;
                        return (
                            <CSSTransition
                                key={id}
                                timeout={500 * Math.abs((charList.length - i) - charList.length)}
                                classNames="char__item"
                            >
                                <li
                                    onClick={() => onClickItem(i, id)}
                                    tabIndex={0}
                                    ref={setRefArr}
                                    className="char__item">
                                    
                                    <img style={imgStyle}
                                        src={thumbnail}
                                        alt={name + i} />

                                    <div className="char__name">{name}</div>

                                </li>
                            </CSSTransition>
                        )

                    })

                }
            </TransitionGroup>
        </ul>

    )

}

CharList.propTypes = {
    onCharSelected: PropTypes.func
}

export default CharList;