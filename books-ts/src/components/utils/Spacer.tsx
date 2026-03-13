import React from 'react'

interface SpacerProps{
    width?:number|string,
    height?:number|string
}

const Spacer=({width,height}:SpacerProps)=>{

    let style:React.CSSProperties={}
    if(width)
        style.minWidth=width;
    if(height)
        style.minHeight=height;

    return <div style={style}> </div>

}


export default Spacer