import { Schema, model } from 'mongoose';
const fairLaunchDataSchemaPolygon = new Schema({
    id: Number,
    logoUrl: String,
    bgLogoUrl: String,
    websiteUrl: String,
    facebook: String,
    twitter: String,
    github: String,
    instagram: String,
    discord: String,
    reddit: String,
    youtube: String,
    description: String,
});
const FairLaunchDataSchemaPolygon = model("dutchAuctionDataAlphaPolygon", fairLaunchDataSchemaPolygon);
export default FairLaunchDataSchemaPolygon;
//# sourceMappingURL=dutchAuctionModel.js.map