import { Component } from 'react/cjs/react.production.min';
import PropTypes from 'prop-types';
import MarvelService from '../../services/MarvelService';
import LouderSpinner from '../louderSpinner/louderSpinner';
import './charList.scss';
import ErrorMessage from '../errorMessage/errorMessage';


class CharList extends Component {

    state = {
        charList: [],
        louding: true,
        error: false,
        newItemsLouding: false,
        offset: 210,
        maxChar: 1540,
        endCharList: false
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.updateCharList();
    }

    onAdditionLoading = (offset) => {
        
        this.onCharListLoauding();
        this.updateCharList(offset);
    }

    onCharListLoauding = () => {

        this.setState({
            newItemsLouding: true
        })
    }

    onError = () => {

        this.setState({
            loading: false,
            error: true
        })

    }

    onCharListLouded = (newCharList) => {

        if (this.state.offset + 9 >= this.state.maxChar) {

            this.setState({
                endCharList: true
            })

        }
        else {

            this.setState(({ charList, offset }) => ({
                charList: [...charList, ...newCharList],
                louding: false,
                newItemsLouding: false,
                offset: offset + 9
            }))

        }

    }

    updateCharList = (offset) => {

        this.setState({
            loading: true,
        })

        this.marvelService
            .getAllCharacters(offset)
            .then(this.onCharListLouded)
            .catch(this.onError)


    }


    render() {

        const { charList, louding, error, offset, newItemsLouding, endCharList } = this.state;
        const { onCharSelected } = this.props;

        return (

            < div className="char__list" >
                {error ? <ErrorMessage updateChar={this.updateCharList} /> : null}
                {louding ? <LouderSpinner /> : <View charList={charList} onCharSelected={onCharSelected} />}
                <button
                    style={endCharList ? { visibility: "hidden" } : null}
                    disabled={newItemsLouding}
                    onClick={() => { this.onAdditionLoading(offset) }}
                    className="button button__main button__long">
                    <div className="inner">{newItemsLouding ? "Loading" : 'load more'}</div>
                </button>
            </div >
        )

    }

}

const View = ({ charList, onCharSelected }) => {

    return (

        <ul className="char__grid">
            {
                charList.map(({ id, thumbnail, name }) => {
                    const imgStyle = thumbnail.includes('image_not_available') ? { objectFit: 'contain' } : null;
                    return (

                        <li
                            onClick={() => onCharSelected(id)}
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
    onCharSelected : PropTypes.func
}

export default CharList;