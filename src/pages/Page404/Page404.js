import SpiderP  from '../../resources/img/404.png'
import { Link } from 'react-router-dom';
import './Page404.scss';

const Page404 = () => {
    return(
        <div className="page__404">
            <img src={SpiderP} alt="" />

            <Link className='button button__main' to="/">
                <div className="inner">come back</div>
            </Link>
            
        </div>
    )
}

export default Page404;