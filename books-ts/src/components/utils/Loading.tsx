import {useState} from 'react';

interface LoadingProps{
    image?:string,
    size?:number,
    message?:string,
    showMessage?:boolean
}

const Loading = ({image="/loading.webp", size=80, message="loading...", showMessage=false}:LoadingProps) => {
    //component logic here

    let style={
        width:size,
        margin:20
    }
    
    return (
        <div className='Loading '>
            <img src={image} style={style} alt={message} title={message} />
            {showMessage||message}
        </div>
    );
};

export default Loading;