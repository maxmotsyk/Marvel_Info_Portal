import './errorMessage.scss';


const ErrorMessage = ({ typeError, updateChar}) => {

    return (

        <div className="error_body">

            <div className="text_content">

                <h2>ERROR <b>{typeError}</b> </h2>

                <p>
                    Oh Groot what have you done...
                    Something went wrong try again please    
                </p>    

                <button onClick={updateChar}>Try IT</button>
            </div>

            <img src='/img/errorMessageImg/small_groot.png' alt="error img" />

        </div>

    )

}

export default ErrorMessage;