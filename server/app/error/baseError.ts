import ErrorCode from './httpStatusCode';

class BaseError extends Error {    
    statusCode : number;
    isOperational : boolean;
    description : any;
    err ?: any;
    constructor(message : string, statusCode: number = ErrorCode.BAD_REQUEST, isOperational: boolean = true,description: any = {}){
        super(description);

        Object.setPrototypeOf(this, new.target.prototype);
        this.name = message;
        this.message = message;
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        this.description = description;
        Error.captureStackTrace(this);
    }
}

export default BaseError;
