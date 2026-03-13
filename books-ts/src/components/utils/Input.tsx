import { useState, type ChangeEvent, type SyntheticEvent } from 'react';


interface ChangeEventHandler{
    (event:ChangeEvent<HTMLInputElement, HTMLInputElement>):void
}



export interface LabeledInputProps{
    id:string,
    value:string,
    onChange:(value:string, id:string, eventTarget: HTMLInputElement)=>void,
    type?:string,
    inputClassName?:string,
    labelClassName?:string,
    groupClassName?:string,
    placeholder?:string,
    errorMessage?:string,
    label?:string,
    inputBuilder?:Function
}

interface InputProps{
    id:string,
    value:string,
    onChange:(event:any)=>void,
    type:string,
    className:string,
    placeholder:string,
    
}


export const LabeledInput = ({ id, value = '', onChange,  //most import required elements
    type = 'text', label = id, placeholder = label, //ui structure  
    errorMessage = "", //error display
    inputClassName = "", labelClassName = "", groupClassName = "", //optional styling
    //input control
    inputBuilder
}:LabeledInputProps) => {

    const [innerValue, setInnerValue] = useState<Object>(value)
 

    const handleChange=(event:any)=>{
        const {value, id} = event.target;
               
        setInnerValue(value)
        if(onChange)
            onChange(value, id, event.target);

    }



   

    if(!inputBuilder)
        inputBuilder = (param:InputProps)=>(<input {...param} />)

    return (
        <div className={`form-group ${groupClassName}`}>
            <label className={labelClassName} htmlFor={id}>{label}</label>

            {inputBuilder({id,value:innerValue,onChange:handleChange,className:`form-control ${inputClassName}`,type,placeholder})}
            < small id="infoSection" className="form-text  text-danger">{errorMessage}</small>

        </div >
    )
}

export const textAreaBuilder=(params:InputProps)=> <textarea {...params} />






export default LabeledInput;