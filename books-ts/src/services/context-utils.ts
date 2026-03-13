
type Status="idle"|"loading"|"done"|"error"

interface Store{
    model:any,
    status: string,
    error?:Error,
}

export const createStore = (model:any)=>({
    model,
    status:"idle",
    error:null
})

//let userLoginActionCreator = asyncActionCreator("user", dispatch, userService.login)

export const createAsyncAction=(actionType:string, dispatch:Function, actionFn:Function)=>{

    return async (...params:any[] )=>{
        try{

            dispatch({type:'status', payload:'loading'})
            dispatch({type:'error', payload:null})


            let result = await actionFn(...params)

            
            dispatch({type:actionType, payload:result})
            dispatch({type:'status', payload:'done'})
            dispatch({type:'error', payload:null})
            return result;//we have to return the data here
        }catch(error){
            dispatch({type:'status', payload:'error'})
            dispatch({type:'error', payload:error})
        }

    }


}


export const createReducer = (reducerMap:any)=>{

    let statusHelpers={
        status(store:any, action:any){
            store.status=action.payload
        },
        error(store:any, action:any){
            store.error=action.payload
        }
    }

    reducerMap={...reducerMap, ...statusHelpers}

    const actualReducer=(store:any, action:any)=>{
        let reducerFn= reducerMap[action.type]
        if(!reducerFn)
            return store; 
        reducerFn(store,action)
        return {...store}; //shallow logic
    }

    return actualReducer;


}

