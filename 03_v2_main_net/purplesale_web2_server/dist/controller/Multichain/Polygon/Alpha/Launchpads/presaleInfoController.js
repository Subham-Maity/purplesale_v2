import PresaleData from '../../../../../model/Multichain/Polygon/Alpha/LaunchpadsInfo/presaleInfoModel.js';
import catchAsyncError from '../../../../../middleware/catchAsyncError.js';
import ErrorHandler from '../../../../../utils/errorHandler.js';
export const saveDataPolygon = catchAsyncError(async (req, res, next) => {
    try {
        const { id, logoUrl, bgLogoUrl, websiteUrl, facebook, twitter, github, instagram, discord, reddit, youtube, description, } = req.body;
        const newData = new PresaleData({
            id,
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
        res.status(201).json({ message: "Data saved successfully" });
    }
    catch (error) {
        console.error("Error saving data:", error);
        next(new ErrorHandler("Internal server error", 500)); // Pass the error to the error handling middleware
    }
});
export const fetchDataAllPolygon = catchAsyncError(async (req, res, next) => {
    try {
        const allData = await PresaleData.find();
        res.status(200).json(allData);
    }
    catch (error) {
        console.error("Error fetching data:", error);
        next(new ErrorHandler("Internal server error", 500));
    }
});
export const fetchDataByIdPolygon = catchAsyncError(async (req, res, next) => {
    try {
        const idParam = req.params.id;
        const data = await PresaleData.findOne({ id: idParam });
        if (!data) {
            return res.status(404).json({ message: "Data not found" });
        }
        res.status(200).json(data);
    }
    catch (error) {
        console.error("Error fetching data:", error);
        next(new ErrorHandler("Internal server error", 500)); // Pass the error to the error handling middleware
    }
});
//# sourceMappingURL=presaleInfoController.js.map