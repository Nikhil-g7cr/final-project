
export class ValidationError extends Error{
    public key:string;
    public context:any;
    constructor(errorMessage:string,  key:string, context:any){
        super(errorMessage);
        this.key=key;
        this.context=context;
    }
}

interface ValidationFunction{
    (value:string, key:string, context:any  ):void
}

export interface ValidationModel{
    dataType?:string,
    defaultValue?:any,
    validations: ValidationFunction
}

// export class ValidationModel{
//     constructor(dataType, defaultValue, ...validations){
//         this.dataType=dataType,
//         this.defaultValue=defaultValue,
//         this.validations=validations;
//     }
// }




export const throwOnError=  (errorCondition:boolean, errorMessage:string, key:string, context:any)=>{
    if(errorCondition){
        throw new ValidationError(errorMessage, key, context);    
    }
}

export const required= (errorMessage="Required") =>(value:string, key:string,context:any)=> throwOnError(!value || !value.trim, errorMessage,key,context)

export const isNumber=(errorMessage="Should be Number") => (value:any, key:string,context:any)=>{
    throwOnError( isNaN(value), errorMessage, key, context)
}

export const min = (min:number,errorMessage:string)=>(value:string|number, key:string,context:any)=>{
    throwOnError(Number(value)<min,  errorMessage|| `${key} should not be less than ${min}`, key,context)
}

export const max = (max:number,errorMessage:string)=>(value:string, key:string,context:any)=>{
    throwOnError(Number(value)>max,  errorMessage|| `${key} should not be more than ${max}`, key,context)
}

export const minLength = (min:number,errorMessage:string)=>(value:any, key:string,context:any)=>{
    throwOnError(value.length < min,  errorMessage|| `${key} should not be less than ${min}`, key,context)
}

export const maxLength = (max:number,errorMessage:string)=>(value:any, key:string,context:any)=>{
    throwOnError(value.length>max,  errorMessage|| `${key} should not be more than ${max}`, key,context)
}


// final validator

function validateKey (obj:any, model:any, key:string){

    let {validators} = model[key]
    if(!validators)
        return;

    const valueToValidate=obj[key];
    for(const validator of validators){
        try{

            validator(valueToValidate, key, obj)
        }catch(error){
            let e = error as ValidationError;
            return {[key]: e.message};
        }
    }
}

export interface ValidationSummaryInfo{
    count:number,
    obj:any,
    model:any,
    errors:any
}


export class ValidationSummaryError extends Error{
    info:ValidationSummaryInfo
    constructor(info:ValidationSummaryInfo){
        super("Validation Error")
        this.info=info;
    }
}


export function validate( obj:any, model:any, key:string){

    let errors:any={}
    let errorCount=0;

    if(key){
        let error= validateKey(obj,model,key)
        if(error){
            throw new ValidationSummaryError({
                count:1,obj, model,
                errors:{[key]: error[key]}
            })
        }
    }
    
    
    for(let key in model){
        let error = validateKey(obj, model, key)
        if(error){
           // console.log('validation error detected',error)
            errorCount++;
            errors[key]=error[key]
        }       
    }

    if(errorCount){
        throw new ValidationSummaryError( {
            count:errorCount, 
            obj, 
            model, 
            errors});
    }
    //no new is good news
}





/* suppose you want to test if book title is required

    required('Book Title is Required')(book.title, 'title', book)

*/