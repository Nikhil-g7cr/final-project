import {useState,useEffect} from 'react';
import Loading from './Loading'
import ErrorView from './ErrorView'

interface AsyncActionProps{
    promise:Promise<any>,
    // promise:Function,
    children:Function,
    onLoading?:Function,
    onError?:Function,
    id?:string
    // initialdata?:any,
}

const AsyncAction = ({promise,id, children,onLoading, onError}:AsyncActionProps) => {
    //component logic here
    const [status,setStatus]=useState("loading")
    const [error,setError]=useState<any>(null)
    const [data, setData] = useState<any>(null)
    // const [data,setdata]=useState<any>(initialdata)
    
    console.log("AsyncActionPage is called")
    console.log("AsyncActionPage data:--",data)
    
    
    
    useEffect(()=>{
        setStatus('loading')
        
        setError(null)
        promise//==>
        .then(data=>{
            console.log("asyncAction inside the useEffect")
            setData(data)
            setStatus('done')
            // console.log("data from asyncAction",data)
            setError(null)
            console.log("AsyncActionPage data:--",data)
            })
            .catch(error=>{
                setStatus("error")
                setError(error)
            })
    },[id?id:''])

    if(status==='loading')
        return onLoading? onLoading() : <Loading/>

    if(status==='error')
       return onError? onError(error) : <ErrorView error={error} />

    if(status==='done')
        return children(data)

    else 
        return "unexpected"
    
    
};

export default AsyncAction;