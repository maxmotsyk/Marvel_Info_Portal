import './searchChar.scss';
import { useState, useEffect } from 'react';
import { Form, Field, Formik, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import useMarvelService from '../../services/MarvelService';

const SearchChar = () => {
    const [char, setChar] = useState();
    const { getSingleCharacterByName, clearError } = useMarvelService()

    const serachChar = (value,{setSubmitting,setFieldError}) => {
        clearError();

        getSingleCharacterByName(value.name)
            .then((data)=>onCharLouded(data,setFieldError))
            .catch(()=>searchError(setFieldError));

        setSubmitting(false);
    }

    const onCharLouded = (data,setFieldError) => {
        setChar(data);
        setFieldError('name', `There is! ${data.name} Visit  page?`)
    }

    const searchError = (setFieldError) => {
        setChar(null);
        setFieldError('name','The character was not found. Check the name and try again' )
    }

    return (
        <Formik
            initialValues={{
                name: '',
            }}

            validationSchema={Yup.object({
                name: Yup.string()
                    .min(2, 'Min 2 latter')
                    .required('This field is required'),
            })}

            onSubmit={serachChar}

        >
            {
                ({ isSubmitting }) => (
                    <Form className='char_found_from'>
                        <div className="form_content">
                            <label>Or find a character by name:</label>
                            <Field name="name" />
                            <ErrorMessage component={'p'} name='name' className='error_msg'/>
                        </div>
                      

                        <div className="bt_area">
                            <button type='submit' 
                                    disabled={isSubmitting} 
                                    className="button button__main">
                                <p className="inner">find</p>
                            </button>

                        {char != null ? (
                            <Link content='a' className='button button__secondary' to={`char/${char.id}`}>
                            <p className="inner">to page</p>
                            </Link>
                        ): null}
                         
                        </div>

                    </Form>
                )
            }

        </Formik>
    )

}

export default SearchChar;