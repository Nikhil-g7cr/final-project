import React,{useState} from 'react';
import NotFoundScreen from './NotFoundScreen';
import ValidationSummary from './ValidationSummary'

interface Status{
    status?:number
}


interface ErrorProps{
    error:Error & Status
}

// const Error400 =({error}:ErrorProps)=>{
//     return <ValidationSummary error={error} />
// }

const Error401 = ({error}:ErrorProps)=>{
    return <h2 >Authentication Failed</h2>
}

const Error403 = ({error}:ErrorProps)=>{
    return <h2 >Authorization Failed</h2>
}

const DefaultError=({error}:ErrorProps)=>{
    return <h2>{error.message}</h2>
}

const Error404=({error}:ErrorProps)=>{
    return <NotFoundScreen errorMessage={error.message} />
}

const NetworkError=({error}:ErrorProps)=>{
    return <h2>Sorry! Server is unreachable. Retry.</h2>
}

interface ErrorViewProps{
    error:Error & Status,
    errorMap?: any
}

const ErrorView = ({error, errorMap}:ErrorViewProps) => {
    //component logic here
    const defaultErrorMap={
      //  400: Error400,
        401: Error401,
        403: Error403,
        404: Error404,
        "Network Error": NetworkError
        
    }

    if(errorMap){
        errorMap={
            ...defaultErrorMap,
            ...errorMap
        }
    } else
        errorMap=defaultErrorMap

    let SelectedErrorView=DefaultError

    if(error.status && errorMap[error.status])
        SelectedErrorView=errorMap[error.status]
    else if(errorMap[error.message])
        SelectedErrorView=errorMap[error.message]

    
    return (
        <div className='ErrorView text-danger'>
            <SelectedErrorView error={error} />
        </div>
    );
};

export default ErrorView;