import { Request, Response, NextFunction } from "express";
import BaseError from './baseError';
import { INext, IRequest, IResponse } from "../interface/vendors";



const returnError = (err : BaseError, req : IRequest, res : IResponse, next : NextFunction) => {
    
    const statusCode = err.statusCode || 500;
    return res.status(statusCode).json({
        message : err.message,
        statusCode,
        err : err.err
    });
}

function isOperationalError(error : Error) {
    if (error instanceof BaseError) {   
        return error.isOperational
    }
    return false
}

export default  {
    returnError,
    isOperationalError
}
