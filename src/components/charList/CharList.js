import { Component } from 'react/cjs/react.production.min';
import MarvelService from '../../services/MarvelService';
import LouderSpinner from '../louderSpinner/louderSpinner';
import './charList.scss';
import ErrorMessage from '../errorMessage/errorMessage';


class CharList extends Component {

    state = {
        charList: [],
        louding: true,
        error: false
    }

    marvelService = new MarvelService();


    componentDidMount() {
        this.updateCharList();
    }

    onError = () => {

        this.setState({
            loading: false,
            error: true
        })

    }

    onChatListLouded = (char) => {

        this.setState({
            charList: char,
            louding: false
        })

    }

    updateCharList = () => {

        this.setState({
            loading: true,
        })

        this.marvelService
            .getAllCharacters()
            .then(this.onChatListLouded)
            .catch(this.onError)


    }
    

    onClickChar = () =>{
        console.log('click');
    }

    render() {

        const { charList, louding, error } = this.state;
        const {onCharSelected} = this.props;

        return (

            < div className="char__list" >
                {error ? <ErrorMessage updateChar={this.updateCharList} /> : null}
                {louding ? <LouderSpinner /> : <View charList={charList} onCharSelected ={onCharSelected} />}
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div >
        )

    }

}

const View = ({ charList, onCharSelected}) => {

    return (

        <ul className="char__grid">
            {
                charList.map(({id, thumbnail, name }) => {
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

export default CharList;