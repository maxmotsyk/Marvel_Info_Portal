import { Component } from 'react/cjs/react.production.min';
import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import MarvelService from '../../services/MarvelService';
import LouderSpinner from '../louderSpinner/louderSpinner';
import ErrorMessage from '../errorMessage/errorMessage';

class RandomChar extends Component {
    constructor(props) {
        super(props);

        this.updateChar();
    }

    state = {
        char: {},
        loading: true,
        error: false
    }

    marvelService = new MarvelService();

    onChatLouded = (char) => {

        this.setState({
            char: char,
            loading: false
        })

    }

    updateChar = () => {
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        this.setState({ 
            loading: true ,
            error: false
        })

        this.marvelService
            .getSingleCharacter(id)
            .then(this.onChatLouded)
            .catch(this.onError)

    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }

    render() {
        const { char, loading, error} = this.state;

        return (
            <div className="randomchar">

                <div className="randomchar__block">
                    {error ? <ErrorMessage updateChar={this.updateChar} /> : ''}
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
                        <div onClick={this.updateChar} className="inner">try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
                </div>
            </div>
        )
    }

}

const View = ({ char: { name, description, homepage, thumbnail, wiki } }) => {

    return (
        <>
            <img src={thumbnail} alt={`img ${name}`} className="randomchar__img" />
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