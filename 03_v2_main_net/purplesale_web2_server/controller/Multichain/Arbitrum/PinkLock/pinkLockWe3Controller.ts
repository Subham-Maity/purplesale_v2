import { Request, Response, NextFunction } from 'express';
import PinkLockWeb3 from '../../../../model/Multichain/Arbitrum/PinkLock/pinklockWeb3Model.js';
import catchAsyncError from '../../../../middleware/catchAsyncError.js';
import ErrorHandler from '../../../../utils/errorHandler.js';



export const savePinkLockWeb3Web3DataArbitrum = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {title} = req.body;

        const newData = new PinkLockWeb3({
            title,
        });

        await newData.save();
        res.status(201).json({ message: "Data saved successfully" });
    } catch (error) {
        console.error("Error saving data:", error);
        next(new ErrorHandler("Internal server error", 500));
    }
});

export const fetchPinkLockWeb3Web3DataAllArbitrum = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const allData = await PinkLockWeb3.find();
        res.status(200).json(allData);
    } catch (error) {
        console.error("Error fetching data:", error);
        next(new ErrorHandler("Internal server error", 500));
    }
});
