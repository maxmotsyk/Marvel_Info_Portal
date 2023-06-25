import { useState, useEffect } from 'react';
import PropTypes from 'prop-types'
import useMarvelService from '../../services/MarvelService';
import LouderSpinner from '../../components/louderSpinner/louderSpinner';
import ErrorMessage from '../../components/errorMessage/errorMessage';
import './ComicPage.scss';
import { useParams, Link } from 'react-router-dom';

const ComicPage = () => {
    const { comicId } = useParams();
    const [comic, setComic] = useState({});
    const { getComic, loading, error, clearError } = useMarvelService();

    useEffect(() => {
        updateComicData();
    }, [comicId])

    const updateComicData = () => {
        clearError();
        getComic(comicId)
            .then(setComic)
            .catch(error)
    }

    return (
        <div className="single-comic">
            {loading ? <LouderSpinner/> : <View char={comic}/>}
        </div>
    )

}

const View = ({ char }) => {
    const {title, description, thumbnail, price, pageCount} = char;

    return (
        <>
            <img src={thumbnail} alt={title} className="single-comic__img" />
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pageCount} pages</p>
                <p className="single-comic__descr">Language: en-us</p>
                <div className="single-comic__price">{price}$</div>
            </div>
            <Link to='/comics' className="single-comic__back">Back to all</Link>
        </>
    )
}

export default ComicPage;