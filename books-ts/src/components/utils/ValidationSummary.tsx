import {useState} from 'react';

interface ErrorInfo{
    _count?:number;
    errors?:any
}

interface ValidationSummaryProps{
    id?:string,
    error:ErrorInfo
}

const ValiationSummary = ({id,error}:ValidationSummaryProps) => {
    //component logic here

    if(!error || !error.errors || error?._count===0)
        return null;
    
    return (
        <div className='ValiationSummary text-danger '>
            <ul>
                {
                    Object.keys(error.errors).map(key=><li key={key}>{error.errors[key]}</li>)
                }
            </ul>
        </div>
    );
};

export default ValiationSummary;