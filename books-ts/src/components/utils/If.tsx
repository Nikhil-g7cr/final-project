
import React  from "react";

interface IfProps{
    condition:boolean,
    children?: React.JSX.Element,
    element?: React.JSX.Element
}

const If=({condition,children,element}:IfProps)=>{

    if(!condition)
        return null; //no UI

    if(element)
        return element;
    else
        return children;
}


export default If;