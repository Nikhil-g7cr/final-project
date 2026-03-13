
export interface Action{
    type:string, 
    payload?:any
}

export interface ReducerFunction<T>{
    (state:Store<T>, action:Action): Store<T>
}

export interface ReducerMap<T>{
    [key:string]: ReducerFunction<T>
}

interface Store<T>{
    model: T,
    error?: Error,
    status:string
}

const statusReducer=<T> (key:string)=>({
    [`status/${key}`]: (state: Store<T>, action:Action)=>{
        return {...state, [`status/${key}`]: action.payload }
    },
    [`error/${key}`]: (state: Store<T>, action:Action)=>{
        return {...state, [`error/${key}`]: action.payload }
    },
    
})

export const createReducer=<T>(key:string, reducerMap: any )=>{

    reducerMap={...reducerMap, ... statusReducer<T>(key)}

    let reducer = (state:Store<T>, action:Action)=>{
        for(let key in reducerMap){
            if(action.type===key){
                let model= reducerMap[key](state.model,action)   
                if(model!== state.model){
                    return {...state, model}
                } else
                    return state;            
            }
        }
        return state;
    }

    return reducer;

}



function asyncActionCreator( key:string, dispatch:Function, asyncFunction:Function ){


    const _dispatch=( type: string, payload:any)=>{
        dispatch({type, payload})
    }

    async function innerFunnction(...params:any[]){   //userService.login(email,password)
          
        try{
            _dispatch(`status/${key}`, "loading")        // status/user --> loading
            _dispatch(`error/${key}`, null)              // error/user ---> null
            const data = await asyncFunction(...params)  // userService.login(email,password)
            _dispatch(key, data)                         // user, data
            _dispatch(`error/${key}`,null)               // error/user -->null

            _dispatch(`status/${key}`, "done")           //status/user -->done
        } catch(error){
            _dispatch(`error/${key}`, error)            // errror/user --> error
            _dispatch(`status/${key}`, "error")         // status/user ---> "error"
            
        }

        

    }

    return innerFunnction;


}