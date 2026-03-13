import {useState} from 'react';
import {useLocation} from 'react-router-dom'

interface NotFoundScreenProps{
    errorMessage?:string
}

const NotFoundScreen = ({errorMessage}:NotFoundScreenProps) => {
    //component logic here
    const {pathname} = useLocation();

    let message=errorMessage?? `Not Found ${pathname}`

    return (
        <div className='NotFoundScreen '>
            <h2>{message}</h2>
            <img src='/404.png' alt='Not Found' 
            title='Not Found'/>
            <p>Sorry we couldn't find what you were looking for</p>
        </div>
    );
};

export default NotFoundScreen;