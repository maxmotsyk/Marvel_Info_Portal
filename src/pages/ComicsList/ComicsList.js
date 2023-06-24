import { useState, useEffect, } from 'react';
import useMarvelService from '../../services/MarvelService';
import './comicsList.scss';
import Banner from '../../images/Banner.png'


const ComicsList = () => {
    const [comicsList, setComicsList] = useState([]);
    const [offset, setOffset] = useState(210);
    const [maxComics, setMaxComics] = useState(1540);
    const [endComicsList, setEndComicsList] = useState(false);
    const { loading, error, getAllComics, clearError } = useMarvelService();

    useEffect(() => {
        updateComics();
    }, [])

    const updateComics = (offset) => {
        clearError()

        getAllComics(offset)
            .then(onComicsLouded)
            .catch(error);
    }

    const onComicsLouded = (newDate) => {

        if (offset + 9 >= maxComics) {
            setEndComicsList(true)
        }
        else {
            setComicsList([...comicsList, ...newDate])
            setOffset(offset + 9);
        }

    }

    return (
        <>
            <div className="comics__list__banner">
                    <img src={Banner} alt="baner comics" />
            </div>

            <div className="comics__list">
                <ul className="comics__grid">
                    {
                        comicsList.map(({ id, title, price, thumbnail }) => {
                            return <ComicsItem key={id} price={price} title={title} thumbnail={thumbnail} />
                        })
                    }
                </ul>

                <button
                    onClick={() => updateComics(offset)}
                    disabled={loading}
                    style={endComicsList ? { visibility: "hidden" } : null}
                    className="button button__main button__long">
                    <div className="inner">{loading ? 'Loading' : 'Load more'}</div>
                </button>
            </div>
        </>

    )
}

const ComicsItem = ({ price, title, thumbnail }) => {

    return (
        <li className="comics__item">
            <a href="#">
                <img src={thumbnail} alt={title} className="comics__item-img" />
                <div className="comics__item-name">{title}</div>
                <div className="comics__item-price">{price}$</div>
            </a>
        </li>
    )

}

export default ComicsList;