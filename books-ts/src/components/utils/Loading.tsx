interface LoadingProps{
    image?:string,
    size?:number,
    message?:string,
    showMessage?:boolean
}

const Loading = ({image="/loadinggif.gif", size=80, message="loading...", showMessage=false}:LoadingProps) => {

    const style={
        width:size,
        margin:20
    }

    return (
        <div className="loading">
            <img src={image} style={style} alt={message} title={message} />
            {showMessage && <p className="loadingText">{message}</p>}
        </div>
    );
};

export default Loading;