import {Request, Response, NextFunction} from 'express';
import PrivateSaleData from '../../../../model/Multichain/Ethereum/Privatesale/privateSaleModel.js';
import catchAsyncError from '../../../../middleware/catchAsyncError.js';
import ErrorHandler from '../../../../utils/errorHandler.js';

export const saveDataEthereum = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {
            id,
            title,
            logoUrl,
            bgLogoUrl,
            websiteUrl,
            facebook,
            twitter,
            github,
            instagram,
            discord,
            reddit,
            youtube,
            description,
        } = req.body;

        const newData = new PrivateSaleData({
            id,
            title,
            logoUrl,
            bgLogoUrl,
            websiteUrl,
            facebook,
            twitter,
            github,
            instagram,
            discord,
            reddit,
            youtube,
            description,
        });

        await newData.save();
        res.status(201).json({message: "Data saved successfully"});
    } catch (error) {
        console.error("Error saving data:", error);
        next(new ErrorHandler("Internal server error", 500));
    }
});

export const fetchDataAllEthereum = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const allData = await PrivateSaleData.find();
        res.status(200).json(allData);
    } catch (error) {
        console.error("Error fetching data:", error);
        next(new ErrorHandler("Internal server error", 500));
    }
});

export const fetchDataByIdEthereum = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const idParam = req.params.id;
        const data = await PrivateSaleData.findOne({id: idParam});
        if (!data) {
            return res.status(404).json({message: "Data not found"});
        }
        res.status(200).json(data);
    } catch (error) {
        console.error("Error fetching data:", error);
        next(new ErrorHandler("Internal server error", 500)); // Pass the error to the error handling middleware
    }
});
