import { Request, Response, NextFunction } from 'express';

const catchAsyncError = (asyncFun: (req: Request, res: Response, next: NextFunction) => Promise<any>) => (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    Promise.resolve(asyncFun(req, res, next)).catch(next);
};

export default catchAsyncError;