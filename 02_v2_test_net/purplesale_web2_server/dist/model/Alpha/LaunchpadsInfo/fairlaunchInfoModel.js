import { Schema, model } from 'mongoose';
const fairLaunchDataSchemaAlpha = new Schema({
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
const FairLaunchDataSchemaAlpha = model("FairLaunchDataAlpha", fairLaunchDataSchemaAlpha);
export default FairLaunchDataSchemaAlpha;
//# sourceMappingURL=fairlaunchInfoModel.js.map