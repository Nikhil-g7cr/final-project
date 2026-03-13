export class InvalidIdError extends Error{
    constructor(id, message){
        super(message??`Invalid Id: ${id}`)
        this.info={
            id,
            message:this.message
        }
    }
}

export class ValidationError extends Error{
    constructor(errors, message="Validation Error"){
        super(message)
        this.errors=errors??{}
        
    }

    assert(condition,key,message){
        if(!condition){
            this.errors[key]=message
        }
        return this;
    }
    throwIfError(){
        if(Object.keys(this.errors).length){
            throw this;
        }
    }
}

export class AuthenticationError extends Error {

    constructor(message = "UnAuthenticated", requiredRoles = []) {
        super(message)

        this.info = {
            message,
            requiredRoles
        }
    }

}

export class DuplicateIdError extends Error{
    constructor(id,message){
        super(message??`Duplicate Id: ${id}`)
        this.info={
            id,
            message: this.message
        }
    }
}

export class HttpError extends Error{
    constructor(status, url, message){
        super(message??`Http Error`)
        this.info={
            status,
            url,
            message:this.message
        }        
    }

    get status(){return this.info.status}
    get body() {return this.info}
}

