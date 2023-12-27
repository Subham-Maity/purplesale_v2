import { Schema, model } from 'mongoose';
const fairLaunchDataSchemaAlphaPolygon = new Schema({
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
const FairLaunchDataSchemaAlphaPolygon = model("FairLaunchDataAlphaPolygon", fairLaunchDataSchemaAlphaPolygon);
export default FairLaunchDataSchemaAlphaPolygon;
//# sourceMappingURL=fairlaunchInfoModel.js.map