

export class ChainManager{

    constructor(defaultHandler=()=>{}){
        this.handlers=[]
        this.defaultHandler=defaultHandler
    }

    add(handler){
        this.handlers.push(handler)
        return this
    }

    

    execute(...params){
        let index=0
        const next = ()=>{
            if(index>=this.handlers.length)
                return this.defaultHandler(...params)

            let handler= this.handlers[index++]
            return handler(...params,next)            
        }

        return next()
    }


}